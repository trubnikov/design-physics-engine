/**
 * DESIGN PHYSICS ENGINE
 * Implementation of "Generative Topology & Physics Ontology"
 * 
 * This engine calculates spatial, visual, and kinetic properties
 * based on physical laws rather than static values.
 */

// ==========================================
// 1. SPATIAL MATHEMATICS (Grid & Matter)
// ==========================================

export const BASE_UNIT = 4; // 4px

export const DensityScale = {
  Compact: BASE_UNIT * 2,   // 8px - internal spacing
  Optimal: BASE_UNIT * 4,   // 16px - standard padding
  Loose: BASE_UNIT * 6,     // 24px - macro spacing
} as const;

/**
 * Calculates dynamic radius based on element height.
 * Formula: min(Base_Unit * 3, height / 2)
 * Prevents over-rounding on small elements.
 */
export const calculateRadius = (height: number): number => {
  return Math.min(BASE_UNIT * 3, height / 2);
};

export const SURFACE_RADIUS = BASE_UNIT * 4; // 16px for cards/modals

// ==========================================
// 2. ENERGY LEVELS (Z-Axis & Illumination)
// ==========================================

export type EnergyLevel = 0 | 1 | 2 | 2.5 | 3 | 'Destructive';

export interface EnergyTheme {
  bg: string;
  text: string;
  border?: string;
  glow?: string;
}

export const EnergySystem: Record<EnergyLevel, EnergyTheme> = {
  0: { 
    bg: '#050505', 
    text: '#71717A' 
  }, // Void (Background)
  
  1: { 
    bg: '#111113', 
    text: '#E4E4E7', 
    border: '1px solid rgba(255, 255, 255, 0.08)' 
  }, // Surface (Cards)
  
  2: { 
    bg: '#1F1F24', 
    text: '#FFFFFF' 
  }, // Interactive Base (Idle)
  
  2.5: { 
    bg: '#2A2A30', 
    text: '#FFFFFF' 
  }, // Hover State
  
  3: { 
    bg: '#3B82F6', 
    text: '#FFFFFF', 
    glow: '0 8px 24px rgba(59, 130, 246, 0.25)' 
  }, // Kinetic Peak (Primary)
  
  'Destructive': { 
    bg: '#EF4444', 
    text: '#FFFFFF', 
    glow: '0 8px 24px rgba(239, 68, 68, 0.25)' 
  }
};

// ==========================================
// 3. TYPOGRAPHIC CALCULUS (Relational Scale)
// ==========================================

const BASE_FONT_SIZE = 16;
const RATIO = 1.25; // Major Third

export const Typography = {
  body: { 
    fontSize: `${BASE_FONT_SIZE}px`, 
    fontWeight: 400, 
    lineHeight: 1.6,
    letterSpacing: 'normal'
  },
  h3: { 
    fontSize: `${BASE_FONT_SIZE * RATIO}px`, 
    fontWeight: 500, 
    lineHeight: 1.4,
    letterSpacing: '-0.01em'
  },
  h2: { 
    fontSize: `${BASE_FONT_SIZE * RATIO * RATIO}px`, 
    fontWeight: 600, 
    lineHeight: 1.2,
    letterSpacing: '-0.02em'
  },
  h1: { 
    fontSize: `${BASE_FONT_SIZE * RATIO * RATIO * RATIO}px`, 
    fontWeight: 700, 
    lineHeight: 1.1,
    letterSpacing: '-0.03em'
  },
} as const;

// ==========================================
// 4. KINEMATICS (Motion & State Physics)
// ==========================================

export interface SpringConfig {
  type: "spring";
  mass: number;
  stiffness: number;
  damping: number;
}

export const MotionPresets = {
  micro: { 
    type: "spring" as const, 
    mass: 0.5, 
    stiffness: 500, 
    damping: 25 
  }, // Buttons, toggles
  
  macro: { 
    type: "spring" as const, 
    mass: 1, 
    stiffness: 250, 
    damping: 30 
  }, // Modals, sidebars
} as const;

// ==========================================
// 5. SEMANTIC SKELETON (Accessibility)
// ==========================================

export const Accessibility = {
  MIN_HITBOX: 44, // px (Fitts Law)
  
  getFocusRing: (color: string = EnergySystem[3].bg) => {
    return `0 0 0 2px ${color}`;
  }
} as const;

// ==========================================
// 6. GENERATIVE ASSEMBLY (Main Function)
// ==========================================

export interface ComponentConfig {
  type: 'button' | 'input' | 'card' | 'modal';
  energyLevel: EnergyLevel;
  height?: number;
  isInteractive?: boolean;
  isActive?: boolean;
}

export interface GeneratedStyles {
  backgroundColor: string;
  color: string;
  borderRadius?: string;
  padding?: string;
  minHeight?: string;
  boxShadow?: string;
  border?: string;
  fontFamily?: string;
  transition?: string;
  transform?: string;
  [key: string]: any;
}

/**
 * Synthesizes styles based on physics laws.
 * No templates, pure calculation.
 */
export function generateStyles(config: ComponentConfig): GeneratedStyles {
  const { type, energyLevel, height = 48, isInteractive = false, isActive = false } = config;
  const theme = EnergySystem[energyLevel];
  
  const styles: GeneratedStyles = {
    backgroundColor: theme.bg,
    color: theme.text,
    fontFamily: 'Inter, system-ui, sans-serif',
  };

  if (theme.border) styles.border = theme.border;
  
  // Apply Glow if interactive or active
  if ((isInteractive || isActive) && theme.glow) {
    styles.boxShadow = theme.glow;
  }

  // Apply Spatial Math based on component type
  if (type === 'button' || type === 'input') {
    styles.padding = `${DensityScale.Optimal}px`; // 16px
    styles.borderRadius = height ? `${calculateRadius(height)}px` : `${SURFACE_RADIUS}px`;
    
    // Enforce Fitts Law
    const minSize = Math.max(height, Accessibility.MIN_HITBOX);
    styles.minHeight = `${minSize}px`;
    
    if (isInteractive) {
      styles.transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
      // Simulate press state compression
      if (isActive) {
        styles.transform = "scale(0.96)";
      }
    }
  } else if (type === 'card') {
    styles.padding = `${DensityScale.Loose}px`; // 24px
    styles.borderRadius = `${SURFACE_RADIUS}px`;
  } else if (type === 'modal') {
    styles.padding = `${DensityScale.Loose * 2}px`; // 48px
    styles.borderRadius = `${SURFACE_RADIUS}px`;
  }

  return styles;
}

// Demo output if run directly
if (typeof require !== 'undefined' && require.main === module) {
  console.log("⚡ Design Physics Engine Loaded");
  console.log("\nExample: Primary Button (Level 3)");
  console.log(generateStyles({ type: 'button', energyLevel: 3, isInteractive: true }));
  
  console.log("\nExample: Card Surface (Level 1)");
  console.log(generateStyles({ type: 'card', energyLevel: 1 }));
}