# HRSJM Project - Agent Instructions

## 1. Project Overview

This repository contains the website for **HRSJM - Human Rights & Social Justice Mission**.

The website must communicate:

- Human rights
- Dignity
- Equality
- Justice
- Peace
- Community
- Accessibility
- Institutional trust

The product scope includes the HRSJM public website and may later expand into Web App and Mobile App experiences.

The interface must remain **clear, dignified, human-centered and action-oriented**.

---

# 2. Source of Truth

Before implementing or modifying any feature:

1. Inspect the relevant files inside `/context`.
2. Treat `/context` as the project's documentation and design reference.
3. Follow documented terminology, visual rules, spacing, typography and user journeys.
4. Use the supplied HRSJM wireframes/reference designs as the visual source of truth.
5. Do not invent a conflicting visual system.
6. Do not silently change documented requirements.
7. If something is not documented, make the smallest reasonable assumption and clearly mention it when relevant.

### Context Directory

All project documentation and AI context files belong inside:

```text
/context
```

Example:

```text
context/
├── HRSJM_Project_Design_Specification.md
├── HRSJM_UI_UX_Guidelines.md
├── PROJECT_REQUIREMENTS.md
└── WEBSITE_STRUCTURE.md
```

Do not modify files inside `/context` unless explicitly instructed.

---

# 3. Technology Stack

The project uses:

- Next.js
- React
- TypeScript
- Next.js App Router
- CSS / project-approved styling system
- Next.js `Link` for internal navigation

### TypeScript Is Mandatory

All newly created application code must use TypeScript.

Use:

```text
.ts
.tsx
```

Do NOT create new:

```text
.js
.jsx
```

files.

Use proper interfaces/types.

Avoid:

```ts
any
```

unless genuinely unavoidable.

Do not simply rename JavaScript files to TypeScript. Write properly typed code.

---

# 4. Recommended Project Structure

Follow the existing project architecture if it already has an equivalent structure.

Otherwise use:

```text
HRSJM/
│
├── context/
│   ├── HRSJM_Project_Design_Specification.md
│   ├── HRSJM_UI_UX_Guidelines.md
│   └── ...
│
├── public/
│   ├── images/
│   ├── icons/
│   └── ...
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ...
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── ...
│   │
│   ├── config/
│   │   ├── navigation.ts
│   │   └── footer.ts
│   │
│   └── ...
│
├── package.json
├── tsconfig.json
└── ...
```

Do not create unnecessary folders or duplicate existing architecture.

---

# 5. HRSJM Design System

## Brand Colors

```text
Deep Navy       #062A4F
Dark Navy      #031D38
Royal Gold     #D9A928
Soft Gold      #F4D477
Warm Cream     #F7F4EC
White          #FFFFFF
Deep Text      #102A43
Muted Text     #52606D
Muted Gray     #7B8794
Warm Border    #E5E0D5
```

Status colors:

```text
Success Green  #287D5A
Warning Amber  #B7791F
Error Red      #B83232
Info Blue      #2B6CB0
```

### Visual Balance

Approximately:

- 60% white / cream
- 25% navy
- 10% gold
- 5% supporting colors

Gold is an accent, not the dominant background.

---

# 6. Typography

### Display / Editorial

Use:

**Cormorant Garamond**

Alternatives documented by the design specification:

- Playfair Display
- DM Serif Display

### UI / Body

Use:

**Manrope**

Alternatives:

- Inter
- Plus Jakarta Sans

Do not introduce unnecessary font families.

Use serif typography for editorial authority and sans-serif typography for usability.

---

# 7. Core Design Principles

### Dignity First

The website must feel:

- Serious
- Respectful
- Institutional
- Trustworthy

Avoid:

- Cartoon-like interfaces
- Neon colors
- Excessive playfulness
- Excessive visual effects

### Human First

Prefer documentary photography and real-world human stories.

Preferred imagery includes:

- Indian communities
- Human expressions
- Community meetings
- Legal awareness
- Education
- Women and children
- Social work
- Events

### Clear Before Beautiful

Users should quickly understand:

- Who HRSJM is
- What HRSJM does
- How to Join
- How to Donate
- How to Renew
- How to File a Complaint

### Institutional Trust

Use:

- Strong typography
- Whitespace
- Consistent spacing
- Clear hierarchy
- Restrained animation

---

# 8. Visual Language

Use:

- Documentary photography
- Editorial typography
- Navy sections
- Warm cream sections
- White cards
- Gold accents
- Gold brush strokes
- Torn-paper edges
- Organic image masks
- Thin gold rules

Avoid:

- Generic SaaS gradients
- Glassmorphism
- Neon colors
- Excessive 3D illustrations
- Unnecessary decorative animations

The website should NOT look like a generic SaaS landing page.

---

# 9. Layout Rules

Maximum content width:

```text
1440px
```

Desktop:
- 12-column grid
- 32–48px page padding
- 24px desktop gutter

Tablet:
- 8-column grid
- 32px page padding

Mobile:
- 4-column grid
- 20px page padding

Above 1440px:
- Center content
- Do not stretch text across the full viewport

---

# 10. Spacing Tokens

```text
space-1   4px
space-2   8px
space-3   12px
space-4   16px
space-5   24px
space-6   32px
space-7   40px
space-8   48px
space-9   64px
space-10  80px
space-11  96px
space-12  120px
```

Use the documented spacing system instead of arbitrary values whenever practical.

---

# 11. Shared Components

Shared components must be reusable.

Important shared components include:

```text
Header
Footer
Navigation
MobileMenu
Button
Card
SectionHeading
```

Do not duplicate the Header or Footer inside individual pages.

Use the root Next.js layout:

```tsx
<Header />

<main>
  {children}
</main>

<Footer />
```

---

# 12. Header Rules

The Header is a global component.

Desktop:

- White background
- Approximately 72–80px height
- HRSJM logo
- Navigation
- Search
- Donate CTA
- Sticky on scroll
- Subtle shadow on scroll
- Active navigation uses navy text and a 2px gold underline

Main navigation:

```text
Home
About HRSJM
Know Your Rights
What HRSJM Does
Membership
Donation
Complaint / Get Help
Events & Activities
News / Blog
Contact
```

Navigation must be data-driven.

Prefer:

```text
src/config/navigation.ts
```

rather than hardcoding navigation repeatedly inside JSX.

Use Next.js routing correctly.

---

# 13. Mobile Header

Do not simply shrink the desktop header.

Create a proper mobile navigation.

Mobile:

- HRSJM logo
- Menu trigger
- Accessible mobile menu
- All primary navigation links
- Keyboard support
- Escape-to-close where appropriate
- Proper `aria-expanded`
- Proper `aria-controls`
- Visible focus states

Do not create excessive menu animation.

---

# 14. Footer Rules

The Footer is global and reusable.

Use:

- Deep Navy / Dark Navy background
- White text
- Gold accents
- Institutional layout

Main areas:

### HRSJM Brand

- Logo
- Organization description
- Social links

### Quick Links

```text
Home
About HRSJM
Know Your Rights
What We Do
Membership
Donation
Complaint / Get Help
Events & Activities
News / Blog
Contact
```

### Useful Links

```text
Join Us
Make a Donation
File a Complaint
Renew Membership
Our Constitution
FAQs
```

### Contact

- Address
- Phone
- Email

### Brand Message

```text
Human Rights
Dignity
Justice
For All
```

Bottom bar:

```text
© 2026 HRSJM. All rights reserved.
Privacy Policy
Terms & Conditions
Sitemap
Back to Top
```

Do not invent missing contact or social URLs.

---

# 15. Accessibility

Accessibility is mandatory.

Always consider:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper labels
- Proper button elements
- Proper links
- Meaningful image alt text
- Sufficient contrast
- Accessible mobile navigation
- `aria-label` where necessary
- `aria-expanded`
- `aria-controls`

Never use a `div` as a button when a real `<button>` is appropriate.

Do not communicate important status information using color alone.

---

# 16. Responsive Rules

### Mobile - under 640px

- 20px page padding
- Single-column content where appropriate
- Minimum touch target 44×44px
- Prefer 48×48px

### Tablet - 640–1024px

- 32px page padding
- Reorganize layouts appropriately
- Two-column cards where suitable

### Desktop - 1024–1440px

- Full navigation
- 12-column layout
- Editorial compositions

### Large Desktop - above 1440px

- Center content
- Prevent excessive line lengths

Mobile layouts should be **reorganized**, not simply scaled down from desktop.

---

# 17. Animation

Animation should be restrained.

Recommended:

```text
Hover: 200–300ms
Entrance: 400–600ms
```

Use animation selectively for:

- Navigation
- Buttons
- Cards
- Impact numbers
- Selective parallax
- Page transitions where appropriate

Do not animate every component.

Respect:

```css
prefers-reduced-motion
```

Important information must never depend only on animation.

---

# 18. Images & Assets

Before creating or replacing an image:

1. Check `/public`.
2. Reuse existing project assets.
3. Preserve supplied HRSJM branding.
4. Do not invent logos.
5. Do not replace real HRSJM imagery with generic assets without instruction.

Do not distort logos or important images.

Use meaningful `alt` text.

---

# 19. Component Development Rules

Before creating a component:

1. Search the existing codebase for an equivalent component.
2. Reuse existing components when appropriate.
3. Avoid duplicate implementations.
4. Keep components focused.
5. Keep data separate from presentation where practical.
6. Use TypeScript interfaces/types.
7. Avoid unnecessary state.
8. Avoid unnecessary dependencies.

Prefer reusable configuration/data structures.

Example:

```ts
export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  external?: boolean;
}
```

---

# 20. Dependency Rules

Before installing a package:

1. Check `package.json`.
2. Check whether the functionality already exists.
3. Prefer existing dependencies.
4. Only install a new package when it provides clear value.

Do not add large libraries for small problems.

---

# 21. Next.js Rules

Use the Next.js App Router.

Prefer:

```tsx
import Link from "next/link";
```

for internal navigation.

Use appropriate Next.js APIs for:

- Routing
- Metadata
- Images
- Layouts
- Navigation state

Do not use unnecessary client components.

Only add:

```tsx
"use client";
```

when client-side interactivity actually requires it.

Keep static components server-rendered where possible.

---

# 22. Code Quality

Write production-quality code.

Requirements:

- Clean
- Readable
- Typed
- Reusable
- Maintainable
- Accessible
- Responsive

Avoid:

- Huge monolithic components
- Copy-pasted markup
- Magic numbers everywhere
- Unnecessary absolute positioning
- Excessive inline styles
- `any`
- Dead code
- Unused imports
- Console errors
- Placeholder implementations presented as complete features

---

# 23. Do Not Over-Engineer

Do not build abstractions before they are needed.

Do not introduce:

- Unnecessary state management
- Unnecessary providers
- Unnecessary hooks
- Unnecessary design systems
- Unnecessary dependencies

Build the simplest architecture that supports the documented requirements.

---

# 24. Context-First Workflow

For every significant task:

### Step 1
Read relevant `/context` documentation.

### Step 2
Inspect the current codebase.

### Step 3
Identify existing components that can be reused.

### Step 4
Plan the smallest implementation that satisfies the requirements.

### Step 5
Implement.

### Step 6
Run/build the project.

### Step 7
Check for:

- TypeScript errors
- ESLint errors
- Console errors
- Broken links
- Responsive issues
- Accessibility issues

### Step 8
Visually compare against the supplied HRSJM references.

### Step 9
Fix discrepancies.

### Step 10
Only then report completion.

---

# 25. Git Rules

Keep commits focused.

Do not mix unrelated work.

For the first Header/Footer task, the intended commit is:

```bash
git commit -m "feat: add dynamic HRSJM header and footer"
```

Before committing:

```bash
git status
```

Inspect changed files and make sure unrelated changes are not included.

Do not automatically push unless explicitly instructed.

---

# 26. Current First Task

The first implementation task is:

## Dynamic Header + Footer

Scope:

- Header
- Desktop navigation
- Dynamic navigation configuration
- Active route state
- Sticky header
- Search trigger
- Donate CTA
- Mobile menu
- Responsive header
- Footer
- Footer link configuration
- Contact section
- Social link configuration
- Back to Top
- Accessibility
- Global layout integration
- TypeScript

Do NOT build the homepage sections during this task.

Do NOT implement:

- Hero
- About section
- Know Your Rights section
- Our Work
- Impact
- Human Stories
- Events
- Homepage CTA

Those are separate tasks.

---

# 27. Verification Checklist

Before declaring the task complete:

### Header

- [ ] Correct HRSJM logo
- [ ] Correct typography
- [ ] Correct colors
- [ ] Navigation is data-driven
- [ ] Active route works
- [ ] Gold active underline
- [ ] Search button works/has correct interaction
- [ ] Donate CTA links correctly
- [ ] Sticky behavior works
- [ ] Mobile menu works
- [ ] Keyboard accessible
- [ ] No horizontal overflow

### Footer

- [ ] Correct navy background
- [ ] Correct HRSJM logo
- [ ] Correct link groups
- [ ] Contact area
- [ ] Social links
- [ ] Gold accents
- [ ] Bottom legal bar
- [ ] Back-to-top works
- [ ] Responsive layout
- [ ] Keyboard accessible

### Project

- [ ] TypeScript passes
- [ ] Build passes
- [ ] No console errors
- [ ] No unused imports
- [ ] No unnecessary dependencies
- [ ] No unrelated files modified

---

# 28. Final Rule

When in doubt, prioritize:

1. HRSJM documentation in `/context`
2. Supplied HRSJM wireframes/reference designs
3. Accessibility
4. Reusability
5. Maintainability
6. Visual consistency
7. Simplicity

The final interface should feel:

**Trustworthy. Human. Dignified. Institutional. Clear.**

Never sacrifice usability for decorative visual effects.
