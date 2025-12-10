/* ===================================================================
   RESPONSIVE DESIGN GUIDE
   ================================================================= */

/*
  BREAKPOINTS REFERENCE:
  ---------------------
  Mobile Small:    320px   - Small phones
  Mobile:          375px   - Standard phones  
  Mobile Large:    425px   - Large phones
  Tablet:          768px   - Tablets
  Tablet Large:    1024px  - Large tablets/laptops
  Desktop:         1280px  - Desktop screens
  Desktop Large:   1440px  - Large desktops
  Desktop XL:      1920px  - Extra large screens

  USAGE EXAMPLES:
  ---------------
  
  1. MOBILE-FIRST APPROACH (Recommended):
  
  .element {
    /* Mobile styles (default) */
    padding: var(--spacing-mobile);
    font-size: var(--font-size-base);
  }
  
  /* Tablet and up */
  @media (min-width: 768px) {
    .element {
      padding: var(--spacing-tablet);
      font-size: var(--font-size-lg);
    }
  }
  
  /* Desktop and up */
  @media (min-width: 1024px) {
    .element {
      padding: var(--spacing-desktop);
      font-size: var(--font-size-xl);
    }
  }
  
  2. RESPONSIVE GRID:
  
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--grid-columns-mobile), 1fr);
    gap: var(--spacing-4);
  }
  
  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(var(--grid-columns-tablet), 1fr);
      gap: var(--spacing-6);
    }
  }
  
  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(var(--grid-columns-desktop), 1fr);
      gap: var(--spacing-8);
    }
  }
  
  3. RESPONSIVE TYPOGRAPHY:
  
  h1 {
    font-size: var(--font-size-h1-mobile);
  }
  
  @media (min-width: 768px) {
    h1 {
      font-size: var(--font-size-h1-tablet);
    }
  }
  
  @media (min-width: 1024px) {
    h1 {
      font-size: var(--font-size-h1-desktop);
    }
  }
  
  4. HIDE/SHOW ELEMENTS:
  
  /* Hide on mobile */
  .desktop-only {
    display: none;
  }
  
  @media (min-width: 1024px) {
    .desktop-only {
      display: block;
    }
  }
  
  /* Hide on desktop */
  .mobile-only {
    display: block;
  }
  
  @media (min-width: 1024px) {
    .mobile-only {
      display: none;
    }
  }
  
  5. RESPONSIVE SIDEBAR:
  
  .sidebar {
    width: var(--sidebar-width-mobile);
    padding: var(--spacing-mobile);
  }
  
  @media (min-width: 768px) {
    .sidebar {
      width: var(--sidebar-width-tablet);
      padding: var(--spacing-tablet);
    }
  }
  
  @media (min-width: 1024px) {
    .sidebar {
      width: var(--sidebar-width-desktop);
      padding: var(--spacing-desktop);
    }
  }
  
  6. CONTAINER PADDING:
  
  .container {
    padding-left: var(--container-padding-mobile);
    padding-right: var(--container-padding-mobile);
  }
  
  @media (min-width: 768px) {
    .container {
      padding-left: var(--container-padding-tablet);
      padding-right: var(--container-padding-tablet);
    }
  }
  
  @media (min-width: 1024px) {
    .container {
      padding-left: var(--container-padding-desktop);
      padding-right: var(--container-padding-desktop);
    }
  }

  COMMON PATTERNS:
  ----------------
  
  - Always design mobile-first (smallest screen first)
  - Use min-width media queries to add styles for larger screens
  - Test on actual devices when possible
  - Consider touch targets (min 44px x 44px for buttons)
  - Avoid horizontal scrolling on mobile
  - Use relative units (rem, em, %) over fixed pixels
  - Consider loading performance on mobile (lazy load images, etc.)
  
  RESPONSIVE LAYOUT STRATEGY:
  ---------------------------
  
  Mobile (<768px):
    - Single column layout
    - Hide secondary content
    - Full-width elements
    - Stack navigation
    - Larger touch targets
  
  Tablet (768px-1023px):
    - Two column layout
    - Show some secondary content
    - Compact navigation
    - Balance between mobile and desktop
  
  Desktop (1024px+):
    - Multi-column layout
    - Show all content
    - Full navigation
    - Richer interactions
    - Utilize screen space
*/
