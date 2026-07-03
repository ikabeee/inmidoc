---
name: Institutional Sovereignty
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#544245'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#877275'
  outline-variant: '#d9c0c4'
  surface-tint: '#994157'
  primary: '#4c041d'
  on-primary: '#ffffff'
  primary-container: '#691c32'
  on-primary-container: '#eb8399'
  inverse-primary: '#ffb1bf'
  secondary: '#795926'
  on-secondary: '#ffffff'
  secondary-container: '#ffd395'
  on-secondary-container: '#7a5926'
  tertiary: '#2c2208'
  on-tertiary: '#ffffff'
  tertiary-container: '#43371c'
  on-tertiary-container: '#b2a07d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9de'
  primary-fixed-dim: '#ffb1bf'
  on-primary-fixed: '#3f0016'
  on-primary-fixed-variant: '#7b2a3f'
  secondary-fixed: '#ffddb1'
  secondary-fixed-dim: '#eac083'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#5e4110'
  tertiary-fixed: '#f5e0ba'
  tertiary-fixed-dim: '#d8c49f'
  on-tertiary-fixed: '#241a03'
  on-tertiary-fixed-variant: '#524529'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  gob-maroon-dark: '#611232'
  gob-gold-light: '#D4C19C'
  surface-gray: '#F5F5F5'
  border-subtle: '#E0E0E0'
  text-main: '#212121'
typography:
  display-lg:
    fontFamily: sourceSerif4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: sourceSerif4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: sourceSerif4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: sourceSerif4
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: sourceSerif4
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
This design system is built upon the principles of institutional authority, accessibility, and national identity. It targets a broad demographic of citizens and administrative officials, requiring a UI that feels sober, dependable, and official.

The design style is **Corporate / Modern** with a focus on high-legibility and structured hierarchies. It avoids decorative trends in favor of a timeless, stable aesthetic that conveys the weight of government functions. The visual language uses clear divisions, ample white space, and a restricted palette to ensure that the user's focus remains on information and utility.

## Colors
The palette is deeply rooted in national heritage. The primary maroon (#691C32) is used for the most important institutional identifiers, such as the global header and primary call-to-action buttons. The gold/tan tones (#BC955C) serve as sophisticated accents for secondary navigation, borders, and highlighting specific administrative sections.

The background remains predominantly white or very light gray to maintain the "clean" look requested for an administrative portal. Darker shades of maroon should be reserved for high-level headers (Level 1) to anchor the page, while the lighter tan is used to soften the interface in informational sidebars or decorative separators.

## Typography
The typography strategy employs a "Sober Serif" approach for headings to evoke tradition and authority, using **Source Serif 4**. This contrasts with **Montserrat** for body text and labels, which provides a clean, geometric, and modern feel for high readability on digital screens.

Headlines should use the primary maroon color or black to ensure maximum contrast. For administrative forms, labels must be clear and utilize the Montserrat Semibold weights to distinguish them from user input. All serif headings should have a slightly tighter letter-spacing to maintain a compact, professional appearance in display sizes.

## Layout & Spacing
The layout follows a **Fixed Grid** model for desktop, centered within a 1200px container to ensure content density remains manageable for administrative tasks. The 8px baseline grid governs all internal component spacing to ensure a rhythmic, mathematical precision.

On desktop, the portal uses a 12-column grid. For citizen service forms, content should typically occupy the central 8 columns to prevent excessively long line lengths, while sidebars or auxiliary information occupy the remaining 4. Mobile layouts reflow to a single column with 16px side margins, prioritizing vertical stack order for form fields.

## Elevation & Depth
This design system uses **Tonal Layers** and **Low-contrast outlines** rather than heavy shadows. Depth is communicated through subtle shifts in background color (e.g., using a light gray surface for the main content area and a white surface for active form cards).

Where elevation is necessary to indicate interaction (like a hovering card), use a very soft, ambient shadow with 0% offset and a high blur radius, tinted with the primary maroon at 5% opacity. Borders should be 1px wide and use the "gold-light" or "border-subtle" colors to define boundaries without adding visual noise.

## Shapes
To maintain a serious and institutional tone, this system utilizes **Sharp** corners (0px roundedness). This geometric rigidity reinforces the sense of stability and formal structure expected from a government portal. 

All UI elements, including buttons, input fields, and containers, should feature crisp 90-degree angles. Decorative elements, such as the "gold" accents, should be applied as thin, horizontal or vertical lines to act as anchors for the layout.

## Components

### Institutional Header
The global header must be the primary maroon (#611232). It features the National Coat of Arms on the left, followed by the "gob.mx" logotype. Navigation links are set in Montserrat Bold, 14px, white.

### Standard Action Buttons
- **Primary:** Solid maroon (#691C32) background with white text. No border. Sharp corners.
- **Secondary:** Solid gold (#BC955C) background with white or black text.
- **Outline:** 1px maroon border with maroon text and transparent background.

### Government Forms
Form inputs must have a 1px border (#D4C19C) on all sides. When focused, the border thickness increases to 2px in the primary maroon color. Labels are placed above the field in Montserrat 14px Semibold. Required fields are marked with a maroon asterisk.

### Cards & Containers
Cards used for "Citizen Services" should have a white background and a 1px solid border (#E0E0E0). A 4px gold top-border is used to indicate a "featured" or "high-priority" service.

### Chips & Status Indicators
Status indicators (e.g., "In Progress," "Approved") use the gold palette for background fills with high-contrast text. They are rectangular, maintaining the sharp-edge shape language.

### Lists
Lists in administrative views should use alternating row colors (White and #F9F9F9) to assist with horizontal scanning. Row separators should be 1px in a very light gray.