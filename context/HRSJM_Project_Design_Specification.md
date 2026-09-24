# HRSJM --- NGO Website

## Human Rights & Social Justice Mission

> Premium, dignified, human-centered and institutional website system
> for HRSJM.

This document consolidates the HRSJM project direction, UI/UX rules,
visual system, responsive behavior, interaction rules, core journeys,
and the website structure shown in the provided design references.

------------------------------------------------------------------------

## 1. Project Overview

**Organization:** Human Rights & Social Justice Mission (HRSJM)

**Product Scope:** - Public Website - Web App - Mobile App

**Primary Goal:** Create a trustworthy, accessible and action-oriented
digital experience that helps users understand HRSJM and quickly take
meaningful actions such as:

-   Join / Membership
-   Donate
-   Renew Membership
-   File a Complaint / Get Help
-   Learn About Human Rights
-   Explore HRSJM's Work
-   View Events and Activities
-   Read Human Stories

The interface should remain clear, dignified and action-oriented. Visual
design must support actual HRSJM user journeys rather than becoming
decorative for its own sake.

------------------------------------------------------------------------

# 2. Design Direction

The HRSJM visual identity is based on:

-   Deep navy
-   Royal gold
-   Warm cream
-   White
-   Documentary photography
-   Editorial typography
-   Gold brush elements
-   Organic image compositions

### Design Principles

#### Dignity First

The interface should feel serious, respectful and institutional.

Avoid: - Cartoon-like visual styles - Neon colors - Overly playful UI -
Excessive decorative effects

#### Human First

Use documentary photography and real-world human stories.

Preferred subjects include: - Indian communities - Human expressions -
Community meetings - Legal awareness - Education - Women and children -
Social work - Events

#### Clear Before Beautiful

Users should quickly understand: - Who HRSJM is - What HRSJM does - How
to Join - How to Donate - How to Renew - How to File a Complaint

#### Institutional Trust

Use: - Strong typography - Generous whitespace - Consistent spacing -
Restrained animation - Clear hierarchy

#### Accessibility

The interface should support: - Keyboard navigation - Readable text -
Proper labels - Clear errors - Alt text - Sufficient contrast - Visible
focus states

#### One Brand

The Website, Web App and Mobile App should feel like one unified HRSJM
product.

------------------------------------------------------------------------

# 3. Brand Color System

  -----------------------------------------------------------------------
  Token             Color             Hex               Usage
  ----------------- ----------------- ----------------- -----------------
  Brand / Navy      Deep Navy         `#062A4F`         Hero, headers,
                                                        footer, dark
                                                        sections

  Brand / Navy Dark Dark Navy         `#031D38`         Hero depth and
                                                        footer

  Brand / Gold      Royal Gold        `#D9A928`         Primary CTA,
                                                        highlights,
                                                        active states

  Brand / Gold      Soft Gold         `#F4D477`         Hover and subtle
  Light                                                 accents

  Brand / Cream     Warm Cream        `#F7F4EC`         Main background
                                                        and editorial
                                                        sections

  Brand / White     White             `#FFFFFF`         Cards, forms and
                                                        navigation

  Text / Primary    Deep Text         `#102A43`         Headings and body

  Text / Secondary  Muted Text        `#52606D`         Supporting copy

  Text / Muted      Gray              `#7B8794`         Muted UI content

  Border / Light    Warm Border       `#E5E0D5`         Borders and
                                                        dividers

  Success           Green             `#287D5A`         Success / Active
                                                        / Approved

  Warning           Amber             `#B7791F`         Warnings /
                                                        Pending

  Error             Red               `#B83232`         Errors / Expired
                                                        / Rejected

  Info              Blue              `#2B6CB0`         Information /
                                                        Under Review
  -----------------------------------------------------------------------

### Visual Balance

Target approximate visual balance:

-   **60%** white / cream
-   **25%** navy
-   **10%** gold
-   **5%** supporting colors

Gold is an accent and should not become the dominant background color.

------------------------------------------------------------------------

# 4. Typography

## Primary Typography

### Display / Editorial

**Cormorant Garamond**

Alternatives: - Playfair Display - DM Serif Display

### UI / Body

**Manrope**

Alternatives: - Inter - Plus Jakarta Sans

Use no more than two font families and preferably two to three weights
per family.

## Typography Scale

  Element         Desktop     Mobile Weight / Line Height
  ------------ ---------- ---------- ----------------------
  Hero H1            64px       40px 600 / 0.95--1.05
  H1                 52px       36px 600 / 1.05
  H2                 42px       30px 600 / 1.10
  H3                 30px       24px 600 / 1.20
  H4                 24px       20px 600 / 1.25
  Body Large         18px       16px 400 / 1.60
  Body               16px       16px 400 / 1.60
  Body Small         14px       14px 400 / 1.50
  Caption            12px       12px 500 / 1.40
  Button         14--15px   14--15px 600 / 1.00

------------------------------------------------------------------------

# 5. Spacing & Layout

## Spacing Tokens

  Token          Value Typical Use
  ------------ ------- ---------------------------
  `space-1`        4px Micro gaps
  `space-2`        8px Icon/text gaps
  `space-3`       12px Compact components
  `space-4`       16px Standard internal spacing
  `space-5`       24px Card padding
  `space-6`       32px Large component gaps
  `space-7`       40px Section sub-spacing
  `space-8`       48px Large component spacing
  `space-9`       64px Mobile section spacing
  `space-10`      80px Desktop section spacing
  `space-11`      96px Large desktop sections
  `space-12`     120px Hero / major sections

## Container

-   Maximum width: **1440px**
-   Desktop horizontal padding: **32--48px**
-   Tablet padding: **32px**
-   Mobile padding: **20px**
-   Desktop grid: **12 columns**
-   Tablet grid: **8 columns**
-   Mobile grid: **4 columns**
-   Desktop gutter: **24px**

At widths greater than 1440px, center the content and do not stretch
text across the entire viewport.

------------------------------------------------------------------------

# 6. Components

## Buttons

### Primary Button

-   Gold background
-   Navy text
-   48px height
-   16--24px horizontal padding
-   8px radius

### Secondary Button

-   Transparent or white background
-   Navy border
-   Navy text

### Button States

Every button should support: - Default - Hover - Active - Focus -
Disabled - Loading

### Button Interaction

-   Transition: approximately 200--300ms
-   Subtle 1--2px lift on hover

------------------------------------------------------------------------

## Cards

-   Radius: 8--16px
-   Internal padding: 16--24px
-   Image ratios: 16:10 or 4:3
-   Subtle hover zoom
-   Subtle shadow
-   Avoid excessive card effects

------------------------------------------------------------------------

## Forms

-   Input height: 48--52px
-   Radius: 8px
-   Labels: 14px / 600
-   Navy focus border
-   Gold emphasis
-   Errors must include both clear text and/or an appropriate icon
-   Labels must remain accessible and explicit

------------------------------------------------------------------------

# 7. Status System

  Status                Color   Hex
  --------------------- ------- -----------
  Active / Approved     Green   `#287D5A`
  Pending / Warning     Amber   `#B7791F`
  Expired / Rejected    Red     `#B83232`
  Under Review / Info   Blue    `#2B6CB0`
  Draft                 Gray    `#7B8794`

Status should never be communicated by color alone.

------------------------------------------------------------------------

# 8. Header & Navigation

## Desktop Header

Target height: - 72--80px

Visual structure: - White background - HRSJM logo - Home - About HRSJM -
What HRSJM Does - Know Your Rights - Membership - Donation - Complaint /
Get Help - Events & Activities - News / Blog - Contact - Search - Donate
CTA

### Active Navigation

-   Navy text
-   2px Royal Gold underline

### Header Behavior

-   Sticky on scroll
-   Subtle shadow after scrolling
-   Clean and compact

------------------------------------------------------------------------

# 9. Homepage Structure

The homepage should follow this overall sequence:

1.  Header
2.  Hero
3.  Quick Actions
4.  About HRSJM
5.  Know Your Rights
6.  What HRSJM Does / Our Work
7.  Impact
8.  Human Stories
9.  Events & Activities
10. Action / Donation CTA
11. Footer

------------------------------------------------------------------------

# 10. Homepage Hero

## Purpose

Immediately communicate: - Who HRSJM is - What HRSJM stands for - What
users can do next

## Layout

Desktop: - Approximately **45% content / 55% visual**

Background: - `#062A4F`

### Hero Content

-   Uppercase gold eyebrow
-   Large serif headline
-   White headline with selected gold emphasis
-   Supporting copy limited to approximately 2--3 lines
-   Primary CTA
-   Secondary CTA

### Primary CTA

**Join Our Movement**

### Secondary CTA

**Make a Donation**

### Visual Treatment

Use: - Documentary photography - Navy / monochrome treatment - Gold
brush accents - Organic / torn-paper image edges

------------------------------------------------------------------------

# 11. Quick Actions

The homepage should provide four equal action blocks:

1.  Join Membership
2.  File a Complaint
3.  Make a Donation
4.  Renew Membership

These actions should be immediately visible and easy to understand.

Example messaging:

### Join Membership

Be a part of the change.

### File a Complaint

Get help. We are with you.

### Make a Donation

Support justice for all.

### Renew Membership

Continue your support.

------------------------------------------------------------------------

# 12. About HRSJM

The About section should establish understanding and trust.

Recommended visual composition: - Editorial text - Documentary image
collage - Values / principles - Gold brush accents - Organic image masks

Example positioning:

### Heading

**A Democratic Network Working for Human Rights**

HRSJM is presented as a democratic regional network committed to human
rights at national and regional levels.

The section should communicate: - Democracy - Peace - Secularism - Human
security - Social justice - Dignity - Equality

------------------------------------------------------------------------

# 13. Know Your Rights

Use: - Deep navy background - Large white serif heading - White cards -
Gold iconography / accents

Rights categories shown in the specification include:

-   Human Rights
-   Civil Rights
-   Fundamental Rights
-   Women's Rights
-   Children's Rights
-   Labour Rights
-   Senior Citizen Rights
-   Minority Rights
-   Right to Education
-   Right to Information
-   Freedom of Speech
-   Civil Liberties

The purpose is rights education and awareness.

------------------------------------------------------------------------

# 14. What HRSJM Does / Our Work

Use strong program cards such as:

-   Human Rights
-   Legal Awareness
-   Community Engagement / Organising
-   Training & Leadership Development

Possible work areas include: - Legal Aid & Support - Awareness &
Education - Community Development - Research & Policy - Advocacy &
Campaigns - Crisis Support

Use documentary photography and concise descriptions.

------------------------------------------------------------------------

# 15. Impact Section

Use large editorial numbers with clear labels.

Important rule:

> Only use approved HRSJM statistics.

Do not invent or fabricate impact numbers.

The design direction calls for: - Large numbers - Clear labels - Strong
editorial typography - Human / documentary visual context

------------------------------------------------------------------------

# 16. Human Stories

Purpose: - Human storytelling - Real-life experiences - Community impact

Visual direction: - Large photography - Story cards - Short quotations -
Location/context information where applicable - Navigation for multiple
stories

The design should feel editorial rather than like a generic testimonial
carousel.

------------------------------------------------------------------------

# 17. Events & Activities

Use a date-led event layout.

Each event should clearly communicate: - Date - Event title - Location -
Short description where needed - Link to details

The section should provide an obvious path to: **View All Events**

------------------------------------------------------------------------

# 18. Donation / Action CTA

The website should repeatedly make meaningful actions easy to access.

Core actions:

-   Join HRSJM
-   Make a Donation
-   File a Complaint
-   Renew Membership

CTA sections should use the HRSJM navy/gold visual language without
overwhelming the user.

------------------------------------------------------------------------

# 19. Join Movement Section

Use a light editorial section with: - Cream / white background - Human /
community photography - Strong serif heading - Gold CTA - Supporting
message about participating in the movement

Visual language: - Mountains / community imagery where appropriate -
Gold brush strokes - Editorial typography - Human-centered composition

------------------------------------------------------------------------

# 20. Footer

Footer direction: - Deep navy - Institutional - Trust-focused - Gold
accents

Recommended footer columns:

### HRSJM

-   Logo
-   Short organization description
-   Social media links

### Quick Links

-   Home
-   About HRSJM
-   Know Your Rights
-   What HRSJM Does
-   Membership
-   Donation
-   Complaint / Get Help
-   Events & Activities
-   News / Blog
-   Contact

### Useful Links

-   Join Us
-   Make a Donation
-   File a Complaint
-   Renew Membership
-   Our Constitution
-   FAQs

### Contact Us

-   Address
-   Phone
-   Email

### Footer Tagline

Human Rights\
Dignity\
Justice\
For All

Include: - Copyright - Privacy Policy - Terms & Conditions - Sitemap -
Back to Top

------------------------------------------------------------------------

# 21. Complaint CTA

The complaint/help functionality should be clearly visible.

Purpose: **Get Help**

Core flow:

**Choose Category → Enter Details → Add Supporting Information → Consent
→ Submit → Confirmation / Status**

The UI should communicate support clearly and avoid making users search
for help.

------------------------------------------------------------------------

# 22. Newsletter

Purpose: **Stay Informed**

Visual direction: - Cream / white form - Simple layout - Clear labels -
Strong accessibility - Minimal friction

------------------------------------------------------------------------

# 23. Responsive Design

## Mobile --- under 640px

-   4-column grid
-   20px page padding
-   Single-column sections
-   Reorganize content instead of simply shrinking desktop layouts
-   Touch targets minimum 44×44px
-   Preferably 48×48px

## Tablet --- 640--1024px

-   8-column grid
-   32px page padding
-   Two-column cards where appropriate

## Desktop --- 1024--1440px

-   12-column grid
-   Full navigation
-   Editorial layouts

## Large Desktop --- above 1440px

-   Center content
-   Do not stretch text across the entire viewport

------------------------------------------------------------------------

# 24. Mobile Navigation

The mobile app/web experience should provide a bottom navigation
containing:

-   Home
-   Membership
-   Donate
-   Events
-   Profile

Touch targets should be at least 44×44px, preferably 48×48px.

------------------------------------------------------------------------

# 25. Dashboard & Admin UI

The dashboard system should use:

-   White / cream surfaces
-   Navy navigation
-   Gold highlights

## Member Area

Potential navigation: - Dashboard - Membership - Digital ID - Payments -
Renewal - Donations - Documents - Events - Notifications - Support

## Admin Area

Potential navigation: - Dashboard - Members - Applications - Payments -
Renewals - Donations - Donation Requests - Documents - News - Events -
Notifications - Complaints - Accounting - Settings

### Dashboard Rules

Prioritize: - Readable tables - Filtering - Clear status indicators -
Simple accounting reports - Clear period/date controls

------------------------------------------------------------------------

# 26. Animation & Interaction

Animation should be restrained and purposeful.

## Entrance Animation

Recommended: - Fade - translateY - Approximately 400--600ms

## Hover

-   Approximately 200--300ms
-   Subtle movement
-   Small card/button interactions

## Allowed

-   Smooth scrolling
-   Selective parallax
-   Animated impact numbers
-   Small card interactions
-   Small button interactions

## Avoid

-   Animating every component
-   Excessive motion
-   Animation that communicates essential information

Always respect:

``` css
@media (prefers-reduced-motion: reduce) {
  /* Reduce or disable non-essential motion */
}
```

Important information must never depend only on animation.

------------------------------------------------------------------------

# 27. Photography & Graphic Language

## Preferred Photography

Use: - Indian communities - Human expressions - Community meetings -
Legal awareness - Education - Women and children - Social work - Events

## Treatments

Use selectively: - Monochrome - Muted color - Navy overlays - Editorial
cropping

## Signature Graphics

Recurring motifs: - Gold brush strokes - Torn-paper edges - Organic
image masks - Thin gold rules

## Avoid

-   Generic SaaS gradients
-   Glassmorphism
-   Neon colors
-   Excessive 3D illustrations
-   Overly playful UI

------------------------------------------------------------------------

# 28. Accessibility

Required principles:

-   Keyboard-friendly navigation
-   Visible focus states
-   Readable text
-   Adequate contrast
-   Proper form labels
-   Clear error messages
-   Alt text for important images
-   Status must not rely on color alone
-   One clear H1 per page
-   Logical H2/H3 hierarchy

------------------------------------------------------------------------

# 29. SEO-Aware UI

Support:

-   Clean URLs
-   Internal links
-   Image alt text
-   Sitemap
-   `robots.txt`
-   Structured information
-   Logical heading hierarchy
-   Accessible navigation

------------------------------------------------------------------------

# 30. Core User Journeys

## Membership

``` text
Choose Membership
      ↓
Fill Form
      ↓
Upload Information
      ↓
Consent
      ↓
Payment
      ↓
Confirmation
      ↓
Status / Activation
```

## Donation

``` text
Choose Work Area
      ↓
Choose Amount
      ↓
Enter Details
      ↓
Payment
      ↓
Success / Failure
      ↓
Confirmation / Receipt
```

## Complaint / Help

``` text
Choose Category
      ↓
Enter Details
      ↓
Add Supporting Information
      ↓
Consent
      ↓
Submit
      ↓
Confirmation / Status
```

## Renewal

``` text
View Expiry
      ↓
Start Renewal
      ↓
Payment
      ↓
Confirmation
      ↓
Updated Validity
      ↓
Renewal History
```

------------------------------------------------------------------------

# 31. Development Design Tokens

``` css
:root {
  --color-navy: #062A4F;
  --color-navy-dark: #031D38;

  --color-gold: #D9A928;
  --color-gold-light: #F4D477;

  --color-cream: #F7F4EC;
  --color-white: #FFFFFF;

  --color-text-primary: #102A43;
  --color-text-secondary: #52606D;
  --color-text-muted: #7B8794;

  --color-border: #E5E0D5;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;

  --space-5: 24px;
  --space-6: 32px;
  --space-7: 40px;
  --space-8: 48px;

  --space-9: 64px;
  --space-10: 80px;
  --space-11: 96px;
  --space-12: 120px;
}
```

------------------------------------------------------------------------

# 32. Visual Reference Summary

The provided HRSJM reference screens establish the following visual
pattern:

### Header

Clean white navigation with: - HRSJM logo - Compact navigation -
Search - Gold Donate CTA - Gold active-page indicator

### Hero

Large navy editorial hero with: - Serif headline - Gold emphasis -
Documentary image - Human-focused photography - Gold brush / organic
accents

### Editorial Sections

Alternating: - Cream - White - Navy

Use large serif headlines alongside modern sans-serif body text.

### Image Collages

Use: - Documentary photographs - Irregular masks - Layered images - Gold
brush textures

### Cards

White cards on cream/navy sections with: - Moderate radius - Light
shadow - Gold iconography - Clear hierarchy

### CTA Sections

Gold CTA buttons on navy or light editorial backgrounds.

### Footer

Deep navy institutional footer with: - Logo - Navigation - Contact -
Social links - Gold accents - Legal links

------------------------------------------------------------------------

# 33. Page-Specific Reference: About HRSJM

The supplied About HRSJM reference establishes:

1.  About hero
2.  Who We Are
3.  Mission & Vision
4.  Values & Principles
5.  Leadership
6.  Join Movement CTA
7.  Footer

## About Hero Example Direction

Eyebrow: **ABOUT HRSJM**

Headline structure: **A Fairer Society**\
**for Every One**

Use: - White serif typography - Gold emphasis - Documentary community
image - Human-focused composition - Supporting statement - Gold brush
detail

## Who We Are

Headline: **A Democratic Network Working for Human Rights**

Visual: - Documentary image collage - Gold brush elements - Editorial
text - Supporting quote / visual statement

## Mission & Vision

Dark navy section containing: - Purpose headline - Mission card - Vision
card

## Values & Principles

Use icon cards for principles such as: - Peace - Democracy -
Secularism - Human Security - Social Development - Political
Development - Economic Development - Cultural Development - Equality -
Dignity for All

## Leadership

Use: - Portrait cards - Name - Role - Short quote

The supplied reference uses a four-card leadership layout.

## Final CTA

Light editorial section with: **Together for a More Just and Equal
World**

Use: - Community imagery - Mountain/background imagery - Gold CTA -
Handwritten/editorial quote treatment

------------------------------------------------------------------------

# 34. Page-Specific Reference: Homepage

The supplied homepage reference establishes:

## Hero

Headline direction: **Justice Should Never Depend on Who You Are.**

Use: - Navy background - Large serif headline - Gold emphasis -
Documentary image - Human-rights messaging - Primary and secondary
actions

## Quick Action Cards

Four cards: - Join Membership - File a Complaint - Make a Donation -
Renew Membership

## About HRSJM

Editorial two-sided layout: - Organization introduction - Documentary
image collage - Values/principles list - Quote

## Know Your Rights

Large navy section with: - Large serif heading - Rights cards -
Justice-themed imagery

## What HRSJM Does

Program cards: - Human Rights - Legal Awareness & Policy Support -
Community Organising - Training & Leadership Development

## Impact

Large editorial numbers with supporting labels.

## Human Stories

Story cards with: - Human portrait/image - Story title - Short quote -
Location

## Events & Activities

Date-led event list.

## Action CTA

A final section focused on: - Join HRSJM - Make a Donation - File a
Complaint - Renew Membership

------------------------------------------------------------------------

# 35. Final Design Rule

The HRSJM design language can be summarized as:

  Element                   Meaning
  ------------------------- --------------------------------------
  **Navy**                  Trust & Institution
  **Gold**                  Justice & Action
  **Cream**                 Humanity & Warmth
  **White**                 Clarity
  **Photography**           People & Reality
  **Serif Typography**      Dignity & Editorial Authority
  **Sans Typography**       Modernity & Usability
  **Gold Brush Elements**   HRSJM's distinctive visual signature

## Final Principle

> **The interface should remain clear, dignified and action-oriented.**

> **Visual design must support the actual HRSJM journeys rather than
> becoming decorative for its own sake.**

------------------------------------------------------------------------

## Source

Based on the provided:

**HRSJM UI/UX Specification & Design Guidelines --- Human Rights &
Social Justice Mission --- Website + Web App + Mobile App**

The specification defines the visual system, typography, spacing,
components, responsive behavior, interaction rules, accessibility,
SEO-aware UI, dashboard structure and core user journeys.
