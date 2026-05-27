import { useState, useRef } from 'react';
import { useGenerativeAudio } from './useGenerativeAudio';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Moon, Star, Sparkles, Wind, Music, Timer, Settings2, Shuffle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './index.css';
import { calculateEnergyColor, calculateGlow, calculateIconSize } from '../../src/design-physics-engine';

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
const iconSizeCircle = calculateIconSize(48); // 48 / 2.4 = 20
const iconSizePill = calculateIconSize(44); // 44 / 2.4 = 18

// 3D Moon Component
function MoonSphere({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.2}
        roughness={0.7}
        metalness={0.1}
        wireframe={true} // Add a digital/physics wireframe aesthetic
      />
    </mesh>
  );
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNode, setActiveNode] = useState(2);
  const [volume, setVolume] = useState(0.6);

  useGenerativeAudio(activeNode, isPlaying, volume);

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
          Sleep Space
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

      {/* 2. Constellation Interactive Card (Now with 3D Canvas) */}
      <motion.div
        style={{
          width: '100%',
          height: '520px',
          backgroundColor: baseSurface,
          border: `1px solid ${baseInteractive}`,
          borderRadius: `32px`,
          marginBottom: 'var(--space-loose)',
          marginTop: 'var(--space-loose)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ width: '100%', height: '100%', cursor: 'grab' }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={1} color={baseKinetic} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color={baseInteractive} />
          
          <MoonSphere color={baseKinetic} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.5} 
          />
        </Canvas>

        {/* Floating UI Elements Overlaying the 3D Space */}
        <ConstellationNode top="10%" left="20%" />
        <ConstellationNode top="80%" left="30%" />
        <ConstellationNode top="20%" left="80%" />
        <ConstellationNode top="70%" left="75%" />
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
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{
              width: '100px',
              accentColor: baseKinetic,
              cursor: 'pointer'
            }}
          />
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
        boxShadow: calculateGlow(size, size, 1, baseKinetic), // dynamic glow
        cursor: 'pointer',
        pointerEvents: 'auto'
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
        border: 'none',
      }}
    >
      {icon}
      {label}
    </motion.button>
  );
}

export default App;
