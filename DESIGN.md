# Pastel Rainbow Academy Design System
## Teacher Theint English — Global Visual Identity & Technical Tokens

### 1. Brand Identity Overview
- **Name**: Pastel Rainbow Academy
- **Design Philosophy**: Tactile Soft-Pastel Modernism
- **Visual Personality**: Soft, friendly, rounded, warm, approachable English-learning brand identity.
- **Primary Brand Anchor**: Bubblegum Pink (`#F48FB1`)
- **Supporting Accents**: Sky Blue (`#81D4FA`), Sunshine Pastel (`#FFE082`), Meadow Mint (`#A5D6A7`), Deep Cacao Ink (`#22191B` / `#2D2426`), Soft Cloud Cream (`#FFF8F8` / `#FFFDF9`).

---

### 2. Global Color System Tokens

#### Core Surfaces
- `surface`: `#FFF8F8`
- `surface-dim`: `#E6D6D9`
- `surface-bright`: `#FFF8F8`
- `surface-container-lowest`: `#FFFFFF`
- `surface-container-low`: `#FFF0F2`
- `surface-container`: `#FBEAEC`
- `surface-container-high`: `#F5E4E7`
- `surface-container-highest`: `#EFDFE1`

#### Typography & Text
- `on-surface`: `#22191B` (Deep Cacao Ink)
- `on-surface-variant`: `#534247` (Warm Cacao Charcoal)

#### Borders & Outlines
- `outline`: `#867277`
- `outline-variant`: `#D8C1C6`
- `border-soft`: `#FBEAEC`
- `border-accent`: `#F5E4E7`

#### Primary Tokens
- `primary`: `#964261`
- `primary-container`: `#F48FB1` (Bubblegum Pink)
- `on-primary`: `#FFFFFF`
- `on-primary-container`: `#722544`
- `inverse-primary`: `#FFB0C9`

#### Secondary Tokens
- `secondary`: `#006685`
- `secondary-container`: `#84D7FD`
- `on-secondary`: `#FFFFFF`
- `on-secondary-container`: `#005D79`

#### Tertiary Tokens
- `tertiary`: `#725C06`
- `tertiary-container`: `#C7AB53`
- `on-tertiary`: `#FFFFFF`
- `on-tertiary-container`: `#503F00`

#### Functional Tokens
- `error`: `#BA1A1A`
- `error-container`: `#FFDAD6`
- `success`: `#1B5E20`
- `success-container`: `#E8F5E9`

#### Pastel Rainbow Accent Palette
- **Bubblegum Pink**: `#F48FB1` (Bevel: `#D87395`)
- **Sky Blue**: `#81D4FA` (Bevel: `#4BA3E3`)
- **Sunshine Pastel**: `#FFE082` (Bevel: `#DCB236`)
- **Meadow Mint**: `#A5D6A7` (Bevel: `#72B274`)
- **Deep Cacao Ink**: `#22191B` / `#2D2426`
- **Soft Cloud Cream**: `#FFF8F8` / `#FFFDF9`

---

### 3. Typography Tokens
- **Headings & Titles**: `Quicksand`, system-ui, sans-serif (Weights: 600, 700)
- **Buttons, Badges & Labels**: `Quicksand`, system-ui, sans-serif (Weight: 700)
- **Body & Prose**: `Nunito Sans`, system-ui, sans-serif (Weights: 400, 600)
- **Tabular Figures & Metrics**: `font-variant-numeric: tabular-nums`

---

### 4. Shape & Radius Language
- `rounded-lg`: 0.5rem (small badges & tags)
- `rounded-xl`: 1rem (compact controls & inner cards)
- `rounded-2xl`: 1.5rem (medium content cards)
- `rounded-3xl`: 2rem (primary container cards, learning containers)
- `rounded-full`: 9999px (tactile buttons, search bars, pills, avatars)

---

### 5. Button System
- **Primary**: Bubblegum Pink (`#F48FB1`), text white, `rounded-full`, tactile bottom bevel (`0 4px 0 #D87395`), active press-down (`translateY(3px)`).
- **Secondary**: Sky Blue (`#81D4FA`), text Deep Cacao (`#22191B`), `rounded-full`, bottom bevel (`0 4px 0 #4BA3E3`).
- **Tertiary / Sunshine**: Sunshine Yellow (`#FFE082`), text Deep Cacao, `rounded-full`, bottom bevel (`0 4px 0 #DCB236`).
- **Mint**: Soft Mint (`#A5D6A7`), text dark forest, `rounded-full`, bottom bevel (`0 4px 0 #72B274`).
- **Ghost / Outlined**: Warm surface (`#FFF0F2`), border `#F5E4E7`, text `#964261`, hover `#FFE4E9`.

---

### 6. Card System
- **Surfaces**: `#FFFFFF` or `#FFF8F8`
- **Radii**: `rounded-3xl`
- **Border**: 1.5px `#FBEAEC` or `#F5E4E7`
- **Ambient Shadow**: `shadow-[0_4px_16px_rgba(244,143,177,0.12)]`
- **Hover Elevation**: `hover:shadow-[0_8px_24px_rgba(244,143,177,0.20)] hover:-translate-y-0.5`
