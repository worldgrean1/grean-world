# 📚 Component Documentation

## Overview
This document provides comprehensive documentation for all components in the GREAN WORLD Energy Technology application.

## Component Architecture

### 🏗️ Structure
\`\`\`
components/
├── animations/          # Animation components
├── common/             # Shared/reusable components  
├── premium/            # Premium feature components
├── static-nodes/       # Interactive energy system nodes
└── ui/                # Base UI components
\`\`\`

## Core Components

### 🎯 Main Components

#### `PremiumInteractiveDemo`
**Purpose**: Main interactive demonstration container
**Location**: `components/premium/PremiumInteractiveDemo.tsx`
**Props**:
- `showInfoPanel: boolean` - Controls info panel visibility
- `containerWidth: number` - Container width for responsive scaling
- `containerHeight: number` - Container height for responsive scaling
- `onSwitchChange?: (active: boolean) => void` - Switch state callback

**Usage**:
\`\`\`tsx
<PremiumInteractiveDemo
  showInfoPanel={false}
  setShowInfoPanel={() => {}}
  containerWidth={800}
  containerHeight={600}
  onSwitchChange={handleSwitchChange}
/>
\`\`\`

#### `MobileLandingDemo`
**Purpose**: Mobile-optimized landing page experience
**Location**: `components/premium/MobileLandingDemo.tsx`
**Features**:
- Responsive component positioning
- Touch gesture support
- Mobile-specific animations
- Optimized loading states

#### `StaticInverterNode`
**Purpose**: Interactive inverter component with realistic LCD display
**Location**: `components/static-nodes/inverter/index.tsx`
**Props**:
- `position: { x: number; y: number }` - Component position
- `inverterOn: boolean` - Power state
- `onInverterChange: (value: boolean) => void` - State change callback
- `scale?: number` - Component scale factor

**Features**:
- Realistic LCD display with live data
- 3D visual effects
- Responsive scaling
- Boot sequence animation

#### `StaticSwitchNode`
**Purpose**: Interactive wall switch component
**Location**: `components/static-nodes/static-switch-node.tsx`
**Features**:
- Realistic wall switch design
- 3D hover effects
- Touch-friendly mobile scaling
- Visual feedback animations

### 🎨 UI Components

#### `GreanButton`
**Purpose**: Branded button component
**Location**: `components/ui/grean-button.tsx`
**Variants**: `primary`, `secondary`, `outline`
**Sizes**: `sm`, `md`, `lg`

#### `GreanCard`
**Purpose**: Branded card component with patterns
**Location**: `components/ui/grean-card.tsx`
**Patterns**: `dots`, `grid`, `none`
**Features**: Gradient backgrounds, backdrop blur

#### `LEDTextDisplay`
**Purpose**: Scrolling LED text display for header
**Location**: `components/ui/LEDTextDisplay.tsx`
**Features**:
- Smooth scrolling animation
- Digital screen effects
- Responsive sizing

### 🎬 Animation Components

#### `TypingTextAnimation`
**Purpose**: Typewriter effect text animation
**Location**: `components/animations/text/TypingTextAnimation.tsx`
**Props**:
- `text: string` - Text to animate
- `speed?: 'slow' | 'medium' | 'fast'` - Animation speed
- `restartOnVisible?: boolean` - Restart when visible

#### `PowerFlowAnimation`
**Purpose**: Animated power flow between components
**Location**: `components/animations/power-flow-animation.tsx`
**Features**:
- SVG-based animations
- Responsive curve calculations
- Energy particle effects
- Connection indicators

## State Management

### 🏪 Energy System Store
**Location**: `store/energySystemStore.ts`
**Purpose**: Global state management for energy system components

**State Properties**:
- `inverterActive: boolean` - Inverter power state
- `switchActive: boolean` - Switch state
- `booting: boolean` - System boot state
- `animationsPaused: boolean` - Animation control

**Actions**:
- `setInverterActive(active: boolean)` - Control inverter
- `setSwitchActive(active: boolean)` - Control switch
- `toggleAnimations()` - Pause/resume animations
- `deactivateFullSystem()` - Reset all components

## Hooks

### 📱 Responsive Hooks

#### `useWindowDimensions`
**Purpose**: Track window size and scroll state
**Returns**: `{ windowWidth, windowHeight, scrolled }`

#### `useIsMobile`
**Purpose**: Detect mobile devices
**Returns**: `boolean`

#### `useDesktopMode`
**Purpose**: Manage desktop mode preference
**Returns**: `{ isDesktopMode, setDesktopMode, mounted }`

### 🎮 Interaction Hooks

#### `useKeyboardShortcuts`
**Purpose**: Handle keyboard interactions
**Props**: `{ onSpacePress?: () => void, enabled?: boolean }`

#### `useMobileGestures`
**Purpose**: Handle touch gestures
**Props**: Swipe direction callbacks

### 🎨 Theme Hook

#### `useTheme`
**Purpose**: Theme management
**Returns**: `{ isDark, isLight, theme, toggleTheme }`

## Styling System

### 🎨 Design Tokens
**Location**: `utils/constants.ts`

**Brand Colors**:
- Primary: `#3DD56D`
- Secondary: `#2bb757`
- Accent: `#23a455`

**Animation Durations**:
- Fast: `0.2s`
- Normal: `0.3s`
- Slow: `0.5s`

### 📱 Responsive Breakpoints
- SM: `640px`
- MD: `768px`
- LG: `1024px`
- XL: `1280px`

## Performance Optimizations

### 🚀 Loading Strategies
1. **Image Preloading**: Critical images preloaded on app init
2. **Component Lazy Loading**: Non-critical components loaded on demand
3. **Audio Pooling**: Reusable audio elements for better performance
4. **Animation Frame Management**: Optimized animation scheduling

### 📊 Monitoring
- Performance logging for slow renders
- Error boundary with detailed logging
- Memory usage monitoring in development

## Best Practices

### 🔧 Development Guidelines
1. **Component Naming**: Use descriptive, consistent names
2. **Props Interface**: Always define TypeScript interfaces
3. **Error Handling**: Wrap components in error boundaries
4. **Performance**: Use React.memo for expensive components
5. **Accessibility**: Include ARIA labels and semantic HTML

### 🧪 Testing Considerations
1. **Responsive Testing**: Test on multiple screen sizes
2. **Touch Testing**: Verify touch interactions on mobile
3. **Performance Testing**: Monitor render times
4. **Error Testing**: Test error boundary fallbacks

## Troubleshooting

### 🐛 Common Issues
1. **Audio Not Playing**: Check browser autoplay policies
2. **Animations Stuttering**: Verify hardware acceleration
3. **Mobile Scaling Issues**: Check viewport meta tag
4. **Theme Flashing**: Ensure proper SSR handling

### 🔍 Debugging Tools
1. **React DevTools**: Component inspection
2. **Performance Tab**: Render performance analysis
3. **Console Logging**: Enhanced error logging system
4. **Network Tab**: Asset loading verification
