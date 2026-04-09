# Design Brief

**Purpose**: Premium e-commerce platform showcasing luxury products with scroll-driven storytelling and 3D immersion.

**Tone**: Luxury minimalism with theatrical flair—disciplined, refined, never sterile.

**Differentiation**: Glassmorphic UI with scroll-linked animations, soft directional shadows, and premium motion choreography (GSAP, motion, Three.js).

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| background | 0.99 0 0 | 0.12 0 0 | Full-bleed, neutral foundation |
| foreground | 0.1 0 0 | 0.95 0 0 | Typography, high contrast |
| primary/accent | 0.5 0.18 95 | 0.65 0.20 95 | CTA buttons, links, highlights |
| card | 0.98 0.01 50 | 0.16 0.01 40 | Glass cards, elevated surfaces |
| border | 0.88 0.01 50 | 0.25 0.02 50 | Subtle dividers |
| muted | 0.92 0.01 50 | 0.2 0.01 30 | Secondary text, disabled states |

## Typography

| Layer | Font | Weight | Usage |
|-------|------|--------|-------|
| Display | Fraunces, serif | 700–900 | Hero headlines, section titles |
| Body | DM Sans, sans-serif | 400–600 | Body copy, product descriptions |
| Mono | JetBrains Mono, mono | 400–600 | Code blocks, technical specs |

Type scale: 12px (xs), 14px (sm), 16px (base), 18px (lg), 24px (xl), 32px (2xl), 48px (3xl).

## Structural Zones

| Zone | Treatment | Details |
|------|-----------|---------|
| Header/Nav | Glass card | Translucent backdrop, soft border, sticky on scroll |
| Hero | Full-bleed | Parallax background, large serif text, gradient accent |
| Product Sections | Alternating cards | Even: light card; Odd: glass card. Soft shadows. |
| Footer | Muted minimal | Light: bg-muted/10; Dark: bg-card. Minimal border-top. |
| CTA | Accent glass | Primary color, glass treatment, glow shadow on hover |

## Elevation & Depth

- **Ambient**: 0 4px 12px rgba(0,0,0,0.08)
- **Elevated**: 0 12px 24px rgba(0,0,0,0.12)
- **Glow**: 0 0 24px rgba(102, 204, 153, 0.15) on accent elements
- **No harsh shadows**—only soft, directional light

## Spacing & Rhythm

Grid: 4px base unit. Generous (1.5x–2x standard) top/bottom padding on sections for breathing room. Tight horizontal margins on mobile, relaxed on desktop.

## Component Patterns

- **Cards**: border-radius 1rem, glass or solid depending on zone
- **Buttons**: Primary (solid accent), Secondary (outlined), Ghost (transparent text)
- **Forms**: Subtle input borders, focus states with ring glow
- **Navigation**: Minimal text labels, icon support, active state with accent underline

## Motion & Animation

- **Scroll reveal**: Fade-in + slide-up on scroll (GSAP ScrollTrigger)
- **Hover**: Smooth lift (2px translateY), color shift (opacity/chroma boost)
- **3D**: Product rotation on hover (Three.js), parallax on hero
- **Transition**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) for all interactive states
- **No bounce**: Cubic easing only, no elastic effects

## Signature Detail

**Floating glass orbs**: Subtle, positioned absolutealong hero/footer, with soft glow and slow drift animation. Used sparingly for premium impression without clutter.

## Constraints

- Mobile-first responsive design (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- Accessibility: AA+ contrast in both light/dark modes
- Performance: Lazy-loaded images, optimized Three.js models, debounced scroll listeners
- No auto-play audio/video—explicit user interaction required
