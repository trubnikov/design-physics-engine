import { useEffect, useRef } from 'react';

type StemConfig = {
  src: string;
  period: number;
};

const STEMS: Record<string, StemConfig> = {
  drone: { src: '/audio/drone.ogg', period: 37000 },
  chimes: { src: '/audio/chimes.ogg', period: 43000 },
  rain: { src: '/audio/rain.ogg', period: 53000 },
  wind: { src: '/audio/wind.ogg', period: 61000 },
  ocean: { src: '/audio/ocean.ogg', period: 71000 },
  birds: { src: '/audio/birds.ogg', period: 79000 },
};

// Target base volumes for each stem depending on the active node category
const MIX_MATRIX: Record<number, Record<string, number>> = {
  2: { drone: 0.6, chimes: 0.0, rain: 0.8, wind: 0.2, ocean: 0.1, birds: 0.0 }, // Moon
  3: { drone: 0.9, chimes: 0.0, rain: 0.0, wind: 0.0, ocean: 0.3, birds: 0.0 }, // Star
  4: { drone: 0.0, chimes: 0.8, rain: 0.0, wind: 0.0, ocean: 0.5, birds: 0.3 }, // Sparkles
  5: { drone: 0.0, chimes: 0.3, rain: 0.0, wind: 0.9, ocean: 0.0, birds: 0.0 }, // Wind
  6: { drone: 0.0, chimes: 0.0, rain: 0.4, wind: 0.0, ocean: 0.0, birds: 0.8 }, // Music
};

export function useGenerativeAudio(activeCategory: number, isPlaying: boolean, masterVolume: number) {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const rafRef = useRef<number>(0);
  
  // Initialize audio elements once
  useEffect(() => {
    const refs: Record<string, HTMLAudioElement> = {};
    for (const [stemName, config] of Object.entries(STEMS)) {
      const audio = new Audio(config.src);
      audio.loop = true;
      audio.volume = 0; // start silent
      refs[stemName] = audio;
    }
    audioRefs.current = refs;

    return () => {
      // Cleanup
      for (const audio of Object.values(refs)) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  // Handle Play/Pause
  useEffect(() => {
    for (const audio of Object.values(audioRefs.current)) {
      if (isPlaying) {
        audio.play().catch(console.error);
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  // The Generative Audio Loop
  useEffect(() => {
    if (!isPlaying) return;

    const currentTargets = { drone: 0, chimes: 0, rain: 0, wind: 0, ocean: 0, birds: 0 };
    
    const tick = () => {
      const now = Date.now();

      // Get target matrix for current category (fallback to Moon/2 if invalid)
      const targetMatrix = MIX_MATRIX[activeCategory] || MIX_MATRIX[2];

      for (const [stemName, config] of Object.entries(STEMS)) {
        // 1. Smoothly glide the target volume towards the active category mix (Crossfading)
        const targetVol = targetMatrix[stemName] || 0;
        currentTargets[stemName as keyof typeof currentTargets] += (targetVol - currentTargets[stemName as keyof typeof currentTargets]) * 0.02;

        // 2. Calculate the LFO (Oscillates smoothly between 0.6 and 1.0 based on period)
        const lfo = 0.8 + 0.2 * Math.sin(now / config.period * Math.PI * 2);

        // 3. Final volume calculation
        const finalVolume = currentTargets[stemName as keyof typeof currentTargets] * lfo * masterVolume;
        
        // Safety bound volume between 0 and 1
        const safeVolume = Math.max(0, Math.min(1, finalVolume));
        
        if (audioRefs.current[stemName]) {
          audioRefs.current[stemName].volume = safeVolume;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, activeCategory, masterVolume]);

}
