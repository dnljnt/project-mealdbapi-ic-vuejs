# 🍳 UI Design Prompt — "AI Chef Companion"
**Design Reference**: Goutu Restaurant (goutu.framer.website)
**Stack**: Vue 3 + Vite + TailwindCSS
**API**: TheMealDB + Google Gemini

---

## 🎨 DESIGN LANGUAGE & VISUAL IDENTITY

### Aesthetic Direction
**"Editorial Dark Kitchen"** — Inspired by Goutu's raw, warm, no-nonsense feel.
Dark, moody, ingredient-forward. Think: a michelin-starred chef's private notebook meets a minimal recipe magazine. Not a standard food app — feels like an independent publication.

### Color Palette
```css
:root {
  /* Backgrounds */
  --bg-primary:    #0F0D0B;   /* near-black, warm-tinted — main bg */
  --bg-surface:    #1A1713;   /* card / surface level */
  --bg-elevated:   #252118;   /* hover state, elevated elements */
  --bg-glass:      rgba(255,250,235,0.04); /* frosted glass panels */

  /* Text */
  --text-primary:  #F5F0E8;   /* warm white — headings */
  --text-secondary:#B8AE9C;   /* muted warm gray — body */
  --text-tertiary: #6B6457;   /* dim labels, placeholders */

  /* Accent / Brand */
  --accent-warm:   #E8A44A;   /* amber/golden — primary CTA, highlights */
  --accent-glow:   #F2C16B;   /* lighter gold — hover state */
  --accent-soft:   rgba(232,164,74,0.12); /* amber tint bg */

  /* Semantic */
  --tag-bg:        #2C2318;
  --tag-border:    rgba(232,164,74,0.25);
  --divider:       rgba(245,240,232,0.08);
  --border-subtle: rgba(245,240,232,0.12);

  /* Nutrition Colors */
  --cal-color:  #E8593C;  /* coral-red — calories */
  --prot-color: #4A9EBA;  /* teal-blue — protein */
  --carb-color: #E8A44A;  /* amber — carbs */
  --fat-color:  #8B7EC8;  /* muted purple — fat */
}
```

### Typography
```css
/* Display / Hero — bold editorial feel (Fraunces, Playfair Display, or Cormorant Garamond) */
--font-display: 'Fraunces', 'Cormorant Garamond', Georgia, serif;

/* Body / UI — clean, slightly humanist sans (DM Sans, Sora, or Plus Jakarta Sans) */
--font-body: 'DM Sans', 'Plus Jakarta Sans', sans-serif;

/* Mono — ingredient codes, nutrition numbers */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

**Type Scale:**
| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero Title | display | 72–96px | 700 | Goutu-style full-width big type |
| Section Head | display | 36–48px | 500 italic | Elegant, editorial |
| Card Title | body | 18–22px | 600 | |
| Body Text | body | 15–16px | 400 | line-height: 1.7 |
| Label / Tag | body | 12–13px | 500 | letter-spacing: 0.05em, UPPERCASE |
| Nutrition Number | mono | 28–32px | 700 | Tabular nums |
| Caption | body | 12px | 400 | --text-tertiary |

### Motion Principles
- Page transitions: **fade + subtle upward translate** (0.35s ease-out)
- Card hovers: **scale(1.02) + border glow** (0.2s ease)
- AI loading states: **skeleton pulse** with warm amber shimmer
- Tag pills: **spring scale-in** when added, slide-out when removed
- Results grid: **staggered fade-in** (each card delayed by 60ms)
- Nutrition indicators: **counter animation** (count up from 0 on mount)

---

## 📐 LAYOUT SYSTEM

### Grid & Spacing
```
Container max-width: 1280px
Gutter: 24px (mobile) / 48px (desktop)
Grid: 12-column
Card columns: 4-col grid (desktop), 2-col (tablet), 1-col (mobile)
Spacing scale: 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96px)
```

### Border Radius
```
Cards:        16px
Tags/Pills:   100px (fully round)
Buttons:      10px
Inputs:       10px
Image frames: 20px
Nutrition cards: 14px
```

---

## 🧩 PAGES & COMPONENT SPECS

---

### PAGE 1 — HOME / RECIPE CATALOGUE

#### 1.1 Navigation Bar
```
Position: sticky top
Height: 64px
Background: --bg-primary with blur backdrop-filter: blur(20px)
Border-bottom: 1px solid --divider

Left:   Logo — "AI Chef" in --font-display, italic, --accent-warm, ~24px
Center: Live Search Bar (see below)
Right:  Icon buttons — [🔍 Search] [❄ Leftover Snapshot] [ℹ About]
```

**Logo Detail:**
- "AI" in thin weight (300), --text-secondary
- "Chef" in bold weight (700), --accent-warm, slightly italic
- Small herb/leaf SVG icon to the left (monoline, 16px)

#### 1.2 Hero Random Banner
```
Height: 520px (desktop) / 380px (mobile)
Layout: Full-width, edge-to-edge bleed
```

**Composition:**
- Full-bleed food photography from TheMealDB (thumbnail URL)
- Overlay: **bottom-up gradient** `linear-gradient(to top, #0F0D0B 0%, transparent 60%)`
- Content anchored bottom-left (40px padding):
  - CATEGORY TAG (small uppercase pill, amber border)
  - DISH NAME in --font-display, 72px, --text-primary, max 2 lines
  - AREA ORIGIN — "🌍 Italian · Seafood" in small caps, --text-secondary
  - CTA Button: "View Full Recipe →" (amber filled, 48px height)
- Top-right corner: "Today's Pick" badge — small rotated label, --accent-warm
- Refresh button: circular icon in top-right (`↻` Regenerate), subtle border

**Hover State on Hero:**
- Scale image very slightly (1.03) over 0.5s
- No text change on hover

#### 1.3 Live Search Bar
```
Width: 480px (desktop center), full-width (mobile)
Height: 48px
Background: --bg-elevated
Border: 1px solid --border-subtle
Border-radius: 10px
```

**Inside Search Bar:**
- Left: 🔍 search icon (16px, --text-tertiary)
- Placeholder: `"Search recipes... Chicken, Pasta, Tacos"`
- Right: "×" clear button (appears when text exists), subtle
- **Behavior:** debounced 300ms → fires API → updates grid live
- Under input: animated thin progress bar (--accent-warm) while fetching

#### 1.4 Results Section Header
```
Layout: flex space-between
Left:   "Found 12 Recipes" — --font-display italic, 28px, --text-primary
Right:  Subtle sort/filter chips: [All] [Popular] [Quick] — pill buttons
```

#### 1.5 Recipe Catalogue Grid
**Grid:** `repeat(4, 1fr)` with `gap: 20px`

**Recipe Card Component:**
```
Background: --bg-surface
Border: 1px solid --border-subtle
Border-radius: 16px
Overflow: hidden
Cursor: pointer
Transition: transform 0.2s, box-shadow 0.2s
```

**Card Hover:** `transform: translateY(-4px)`, glow border `rgba(232,164,74,0.3)`

**Card Layout (top to bottom):**
1. **Image Container** (height: 200px, overflow hidden)
   - Aspect ratio 4:3
   - Image zoom on card hover (`transform: scale(1.05)`)
   - Bottom-left: AREA badge — frosted pill `backdrop-filter: blur(8px)`, dark bg

2. **Content Padding** (16px all sides)
   - CATEGORY label — 11px uppercase, --accent-warm, letter-spacing 0.1em
   - Dish Name — 17px, --font-body 600, --text-primary, max 2 lines ellipsis
   - Spacer
   - Footer row: `[🌍 Area text]` left, `[→]` arrow icon right (--accent-warm)

**Empty / Loading State:**
- Skeleton cards with amber shimmer animation
- 8 skeleton cards shown while fetching

---

### PAGE 2 — RECIPE DETAIL PAGE

**URL Pattern:** `/recipe/:id`

#### 2.1 Hero Section (Detail)
```
Height: 400px
Layout: full-width image with layered overlays
```

**Layers (bottom to top):**
1. Food photo (object-fit: cover, full width)
2. Dark overlay: `rgba(15,13,11,0.55)`
3. Gradient overlay: `linear-gradient(to top, --bg-primary 0%, transparent 50%)`
4. **Back button** (top-left): `← Back` — frosted glass pill, --text-primary
5. **Content** (bottom of hero):
   - Breadcrumb: `Home › [Category] › [Dish Name]` in 12px, --text-secondary
   - Dish name: --font-display, 56px, bold, max 2 lines
   - Meta row: [Category pill] [Area pill] [YouTube button if exists]

#### 2.2 Content Layout (2-column)
```
Left column:  65% width — Ingredients + Instructions
Right column: 35% width — Nutrition Scanner (sticky)
```

**Left Column — Ingredients Table:**
```
Component heading: "Ingredients" — --font-display italic 32px
Table style: no outer border, rows separated by --divider
```

Row structure:
```
[Ingredient thumbnail (32px circle)] [Name in --text-primary 15px] [Measure in --accent-warm 14px mono right-aligned]
```
- Alternating row tint: even rows slightly lighter (--bg-elevated)
- Hover row: amber left border 2px

**Left Column — Instructions:**
```
Component heading: "How to Make It" — --font-display italic 32px
```

Each step:
```
Step number: large, --font-display, --accent-warm, 48px, low opacity (0.25), absolute positioned
Step text: 15px, --text-secondary, line-height 1.8
Divider: thin dashed line between steps
```

**Right Column — AI Nutrition Scanner (sticky):**
*(Full spec in Section 3.3 below)*

---

### PAGE 3 — LEFTOVER SNAPSHOT

**URL:** `/leftover-snapshot`
**Tab/Nav Label:** ❄ Leftover Snapshot

#### 3.1 Page Header
```
Max-width: 720px, centered
Top padding: 64px
```

- Section label (uppercase, --accent-warm, 12px, letter-spacing): `AI CREATIVE CHEF`
- Headline: `"What's in your fridge?"` — --font-display, italic, 52px, --text-primary
- Subtext: "Add your leftover ingredients and we'll create a unique recipe just for you." — --text-secondary, 16px

#### 3.2 Ingredient Tag Input
```
Container:
  Background: --bg-surface
  Border: 1.5px solid --border-subtle
  Border-radius: 16px
  Padding: 16px
  Min-height: 80px
  Transition: border-color 0.2s
  Focus-within: border-color --accent-warm
```

**Tag Pills (added ingredients):**
```
Background:    --tag-bg
Border:        1px solid --tag-border
Color:         --text-primary
Font:          12px, weight 500
Padding:       6px 10px 6px 12px
Border-radius: 100px
Gap between:  8px
```

**Pill layout:** `[🥕 ingredient name] [× delete]`
- Delete button: `×` in --text-tertiary, hover --accent-warm
- Add animation: scale from 0.6 → 1.0, spring easing
- Remove animation: scale to 0 + fade

**Input field (inside container):**
```
Background: transparent
Border: none
Outline: none
Placeholder: "Add an ingredient... (e.g. chicken, tomato, garlic)"
Font: 15px --font-body
Color: --text-primary
```

- On `Enter` or `,`: wrap current text as a new tag pill
- Minimum 1 character to create tag

**Suggestion Strip (below input):**
```
Row of quick-add chips for common ingredients:
[🧅 Onion] [🥚 Egg] [🧄 Garlic] [🍅 Tomato] [🧀 Cheese] [🌾 Rice]
Style: same as tags but with dotted border (--tag-border), lighter bg
Click: adds to tag list
```

#### 3.3 AI Execute Button
```
Width: full (100% of container)
Height: 56px
Background: --accent-warm
Color: #0F0D0B (dark text on amber)
Font: --font-body, 15px, weight 600
Border-radius: 10px
Letter-spacing: 0.05em
```

**Button text:**
- Idle: `✦ Generate My Recipe`
- Loading: `[spinner] Cooking up something special...` — italic
- Error: `⚠ Something went wrong. Try again.`

**Loading State Animation:**
- Button shimmer from left to right (amber lighten pulse)
- Below button: fun loading copy rotates every 2s:
  - "Consulting our AI Chef..."
  - "Mixing the flavors..."
  - "Taste-testing the algorithm..."
  - "Almost ready to plate..."

#### 3.4 AI Recipe Result Card
```
Background: --bg-surface
Border: 1.5px solid rgba(232,164,74,0.2)
Border-radius: 20px
Padding: 32px
Margin-top: 32px
```

**Card Header:**
```
Top label: "AI CREATED RECIPE" — 11px uppercase, --accent-warm
Dish name: --font-display, italic, 42px, --text-primary
Description: 15px, --text-secondary, line-height 1.7, max 3 lines
```

**Meta Row (below description):**
```
Three pills in a row:
[⏱ 30 mins] [⚡ Medium] [🍽 4 Servings]
Style: --bg-elevated, 13px, rounded pill, --text-secondary
```

**Ingredients Grid:**
```
Section label: "What You'll Need"
2-column grid of ingredient rows:
  [•] [amount in --accent-warm mono] [ingredient name in --text-primary]
```

**Steps List:**
```
Section label: "How to Cook It"
Numbered steps with connecting vertical line on left:
  [Step number circle, --accent-warm border] → [instruction text]
```

**Injected Nutrition Scanner:**
Same component as detail page — automatically fires after recipe is generated

---

## 🧪 COMPONENT 3.5 — AI NUTRITION SCANNER

**Used in:** Recipe Detail Page (right column) & Leftover Snapshot result card (bottom section)

### Scanner Container
```
Background: --bg-surface
Border: 1px solid --border-subtle
Border-radius: 16px
Padding: 24px
```

**Section Header:**
```
Icon: ⚗ or sparkle SVG (16px, --accent-warm)
Label: "Nutrition Estimate" — 13px uppercase, --accent-warm
Subtitle: "AI-powered analysis via Gemini" — 11px, --text-tertiary
```

**Loading Skeleton:**
```
4 placeholder cards with amber shimmer
Running text: "Analyzing ingredients..."
```

### Macro Nutrition Cards Grid
```
Grid: 2×2
Gap: 12px
```

**Single Nutrition Card:**
```
Background: --bg-elevated
Border-radius: 14px
Padding: 16px 18px
```

Layout (top to bottom):
1. Icon + Label row:
   - Colored dot (4px circle, semantic color) + label text 12px --text-secondary
2. Value row:
   - Number: --font-mono, 28px, weight 700, colored per macro
   - Unit: 14px, --text-tertiary (e.g. "kcal", "g")
3. Progress bar:
   - Height: 3px, background --divider
   - Fill: semantic color, based on % of daily value

**Macro Color Codes:**
```
Calories:      --cal-color  (#E8593C) — fire/energy feel
Protein:       --prot-color (#4A9EBA) — clean blue
Carbohydrates: --carb-color (#E8A44A) — amber (same as brand)
Fat:           --fat-color  (#8B7EC8) — muted purple
```

**Counter Animation:**
- Numbers count up from 0 to value over 800ms
- Easing: ease-out cubic
- Trigger: IntersectionObserver (fires when card enters viewport)

### AI Health Note Whisper
```
Margin-top: 16px
Padding: 14px 16px
Background: --accent-soft (rgba(232,164,74,0.08))
Border-left: 3px solid --accent-warm
Border-radius: 0 10px 10px 0
```

**Content:**
```
Icon: ✦ sparkle (12px, --accent-warm)
Text: 14px, --text-secondary, italic, line-height 1.7
Source: "— AI Analysis" right-aligned, 11px, --text-tertiary
```

Example output style:
> *"High in plant-based protein and dietary fiber, making this an excellent choice for those managing blood sugar levels."*

---

## 🗂 GLOBAL COMPONENTS

### Navigation / Tab Bar
```
Position: sticky top-0
Z-index: 100
Height: 64px
Background: --bg-primary + backdrop-blur(20px)
Border-bottom: 1px solid --divider
```

**Logo:** `AI` (light weight) + `Chef` (bold, italic, amber)
**Nav Links:** Home · Leftover Snapshot
**Active indicator:** amber underline 2px, bottom of nav item

### Toast Notifications
```
Position: bottom-right, 24px margin
Width: 320px
Background: --bg-elevated
Border: 1px solid --border-subtle
Border-radius: 12px
Padding: 14px 18px
```

Types: `success (--accent-warm icon)`, `error (#E8593C icon)`, `info (default)`

### Empty State
```
Centered vertically + horizontally
Icon: large (64px) food emoji or monoline illustration
Heading: --font-display italic, 28px
Body: --text-secondary, 15px
CTA: amber outlined button
```

Example text: *"Nothing found yet. Try searching for 'Pasta' or 'Chicken'."*

### Page Transition
```
Entering: opacity 0 → 1, translateY(8px) → 0, duration 0.35s ease-out
Leaving:  opacity 1 → 0, duration 0.2s ease-in
```

---

## 📱 RESPONSIVE BREAKPOINTS

| Breakpoint | Columns | Notes |
|---|---|---|
| Mobile `< 640px` | 1 col | Hero 300px, search full-width |
| Tablet `640–1024px` | 2 col | Nutrition panel below main |
| Desktop `> 1024px` | 4 col | Full layout, sticky right panel |

**Mobile adjustments:**
- Hero font: 42px (down from 72px)
- Dish name on detail: 36px
- Nutrition grid: 2×2 full width (not in sidebar)
- Tag input: full width, larger tap targets (44px min)

---

## 🖼 IMAGERY GUIDELINES

- Use `object-fit: cover` on all food photos
- Lazy-load all images with fade-in on load (`opacity 0 → 1, 0.4s`)
- On image error: show stylized placeholder with dish name initials
- No hard-cropping faces of people if any appear in recipe photos

---

## ✨ MICRO-INTERACTIONS CHECKLIST

| Interaction | Behavior |
|---|---|
| Search typing | Debounced shimmer on results grid → new cards fade in staggered |
| Card hover | translateY(-4px) + amber glow border |
| Tag added | Spring scale-in + haptic-style brief border flash |
| Tag removed | Scale to 0 + fade-out, siblings close gap smoothly |
| Generate button click | Shimmer pulse, loading copy rotates |
| Nutrition mount | Cards fade in, numbers count up from 0 |
| Hero refresh | Cross-fade to new image (opacity transition 0.5s) |
| Back navigation | Slide-out left / slide-in from left page transition |

---

## 🧱 COMPONENT FILE STRUCTURE (Vue 3)

```
src/
├── components/
│   ├── layout/
│   │   ├── AppNavbar.vue
│   │   └── PageTransition.vue
│   ├── home/
│   │   ├── HeroRandomBanner.vue
│   │   ├── SearchBar.vue
│   │   └── RecipeCatalogueGrid.vue
│   ├── recipe/
│   │   ├── RecipeCard.vue
│   │   ├── RecipeDetailHero.vue
│   │   ├── IngredientsTable.vue
│   │   └── InstructionSteps.vue
│   ├── leftover/
│   │   ├── IngredientTagInput.vue
│   │   ├── GenerateButton.vue
│   │   └── AIRecipeResult.vue
│   └── nutrition/
│       ├── NutritionScanner.vue
│       ├── MacroCard.vue
│       └── HealthNoteWhisper.vue
├── views/
│   ├── HomeView.vue
│   ├── RecipeDetailView.vue
│   └── LeftoverSnapshotView.vue
└── composables/
    ├── useMealDB.js
    ├── useGeminiRecipe.js
    └── useGeminiNutrition.js
```

---

## 🤖 AI PROMPT TEMPLATES (Gemini)

### Leftover Recipe Prompt
```
You are a creative professional chef. A user has these ingredients: [INGREDIENTS LIST].

Create an original recipe using primarily these ingredients. Respond ONLY in valid JSON with this exact structure:
{
  "name": "Recipe name",
  "description": "2-sentence flavor description",
  "difficulty": "Easy | Medium | Hard",
  "time_minutes": 30,
  "servings": 4,
  "ingredients": [
    { "amount": "2 tbsp", "name": "olive oil" }
  ],
  "steps": [
    "Step 1 instruction",
    "Step 2 instruction"
  ]
}
Do not include markdown, preamble, or any text outside the JSON.
```

### Nutrition Analyzer Prompt
```
You are a certified nutritionist. Analyze this recipe's approximate nutrition.
Recipe: [DISH NAME]
Ingredients: [INGREDIENTS WITH MEASURES]

Respond ONLY in valid JSON:
{
  "calories": 450,
  "protein_g": 28,
  "carbs_g": 55,
  "fat_g": 14,
  "health_note": "One sentence health insight about this dish."
}
All values should be estimates per serving. Do not include markdown or extra text.
```

---

*End of Design Prompt — AI Chef Companion v1.0*
*Reference: goutu.framer.website | Dark Editorial Kitchen Aesthetic*