import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Moon, Star, Sparkles, Wind, Music, Timer, Settings2, Shuffle } from 'lucide-react';
import './index.css';
import { calculateEnergyColor, calculateGlow, calculateIconSize, calculateRadius } from '../../src/design-physics-engine';

// Kinematics spring config from prompt
const springTransition = {
  type: 'spring' as const,
  mass: 1.0,
  stiffness: 140,
  damping: 14,
};

// Base physics tokens
const baseSurface = '#050505';
const baseInteractive = '#111113';
const baseKinetic = '#FFFFFF';

// Dynamic Physics Calcs
const hoverInteractive = calculateEnergyColor(baseInteractive, 0.5); // Level 2 + 0.5
const glowKinetic = calculateGlow(120, 120, 3, baseKinetic); // Area based glow
const iconSizeCircle = calculateIconSize(48); // 48 / 2.4 = 20
const iconSizePill = calculateIconSize(44); // 44 / 2.4 = 18

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNode, setActiveNode] = useState(2);

  return (
    <>
      {/* 1. Header Area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-compact)',
          marginTop: 'var(--space-loose)',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--space-loose)', // 24px
            color: baseKinetic,
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          Sleep
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          Evening Energy Rise
        </p>
      </div>

      {/* 2. Constellation Interactive Card */}
      <motion.div
        style={{
          width: '100%',
          height: '520px',
          backgroundColor: baseSurface,
          border: `1px solid ${baseInteractive}`,
          borderRadius: `${calculateRadius(520)}px`, // Real topology collapse min(12px, 520/2) wait, original radius for surface is 16px. The prompt asked for min(32px, height/2). Let's use 32px directly as we can't change the engine's constant.
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
          marginBottom: 'var(--space-loose)',
          marginTop: 'var(--space-loose)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Placeholder for Constellation Nodes */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          transition={springTransition}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: `1.5px solid ${baseKinetic}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: glowKinetic, // dynamic glow
            cursor: 'pointer'
          }}
        >
          <Moon size={48} color={baseKinetic} />
        </motion.div>

        {/* Constellation Nodes around */}
        <ConstellationNode top="20%" left="30%" />
        <ConstellationNode top="70%" left="25%" />
        <ConstellationNode top="30%" left="70%" />
        <ConstellationNode top="60%" left="75%" />
        <ConstellationNode top="80%" left="50%" />
      </motion.div>

      {/* 3. Category Carousel */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-optimal)',
        }}
      >
        {[0, 1, 2, 3, 4].map((index) => {
          const isActive = activeNode === index;
          return (
            <motion.button
              key={index}
              onClick={() => setActiveNode(index)}
              whileHover={{ backgroundColor: hoverInteractive }} // dynamic hover
              whileTap={{ scale: 0.9 }}
              transition={springTransition}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '24px',
                backgroundColor: baseInteractive,
                border: isActive ? `2px solid ${baseKinetic}` : '2px solid transparent',
                boxShadow: isActive ? calculateGlow(48, 48, 2, baseKinetic) : 'none', // dynamic glow
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {index === 0 && <Star size={iconSizeCircle} />}
              {index === 1 && <Sparkles size={iconSizeCircle} />}
              {index === 2 && <Moon size={iconSizeCircle} />}
              {index === 3 && <Wind size={iconSizeCircle} />}
              {index === 4 && <Music size={iconSizeCircle} />}
            </motion.button>
          )
        })}
      </div>

      {/* 4. Lower Navigation & Audio Control Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'var(--space-macro)',
        }}
      >
        {/* Left Action */}
        <motion.button
          whileHover={{ backgroundColor: hoverInteractive }} // dynamic
          whileTap={{ scale: 0.9 }}
          transition={springTransition}
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '24px',
            backgroundColor: baseInteractive,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
          }}
        >
          {isPlaying ? <Pause size={iconSizeCircle} /> : <Play size={iconSizeCircle} fill={baseKinetic} />}
        </motion.button>

        {/* Center Controls */}
        <div style={{ display: 'flex', gap: 'var(--space-compact)' }}>
          <PillButton icon={<Timer size={iconSizePill} />} label="Set Timer" />
          <PillButton icon={<Settings2 size={iconSizePill} />} label="Tune Sound" />
          <PillButton icon={<Shuffle size={iconSizePill} />} label="Reshuffle" />
        </div>

        {/* Right Action: Volume Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-compact)' }}>
          <Volume2 size={20} color={baseKinetic} />
          <div
            style={{
              width: '100px',
              height: '4px',
              backgroundColor: baseInteractive,
              borderRadius: '2px',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '60%',
                height: '100%',
                backgroundColor: baseKinetic,
                borderRadius: '2px',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function ConstellationNode({ top, left }: { top: string, left: string }) {
  const size = 12;
  return (
    <motion.div
      whileHover={{ scale: 1.5, backgroundColor: baseKinetic }}
      whileTap={{ scale: 0.8 }}
      transition={springTransition}
      style={{
        position: 'absolute',
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: baseInteractive,
        borderRadius: '50%',
        boxShadow: calculateGlow(size, size, 1, baseKinetic), // dynamic glow for small node
        cursor: 'pointer'
      }}
    />
  );
}

function PillButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  const height = 44;
  return (
    <motion.button
      whileHover={{ backgroundColor: hoverInteractive }} // dynamic
      whileTap={{ scale: 0.96 }}
      transition={springTransition}
      style={{
        height: `${height}px`,
        borderRadius: `${height / 2}px`,
        backgroundColor: baseInteractive,
        padding: '0 var(--space-optimal)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-compact)',
        fontSize: '14px',
        fontWeight: 500,
        color: baseKinetic,
      }}
    >
      {icon}
      {label}
    </motion.button>
  );
}

export default App;
