# FitForge CSS & Design System Guide

This document serves as the source of truth for the visual identity of FitForge. To maintain UI consistency, **never use hardcoded hex colors in component files**. Always use the defined CSS variables.

## 🎨 Theme Variables

The app uses a `data-theme` attribute on the `html` element to toggle between modes.

### Core Palette
| Variable | Dark Mode (Default) | Light Mode | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg` | `#05080f` | `#f5f7fb` | Main body background |
| `--bg-gradient` | `#0f172a` | `#94a3b8` | Secondary background for gradients |
| `--panel` | `rgba(16, 23, 38, 0.7)` | `rgba(255, 255, 255, 0.7)` | Card, panel, and modal backgrounds |
| `--panel-alt` | `rgba(255, 255, 255, 0.05)` | `rgba(0, 0, 0, 0.03)` | Subtle overlays (e.g., stats grid items) |
| `--text` | `#f8fafc` | `#111827` | Primary headings and body text |
| `--muted` | `#94a3b8` | `#5b6472` | Secondary text and labels |
| `--accent` | `#ff6b35` | `#ff6b35` | Primary action color (Orange) |
| `--accent-2` | `#1cc9a0` | `#0f9b78` | Secondary accent/success color (Teal) |
| `--border` | `rgba(255, 255, 255, 0.1)` | `rgba(17, 24, 39, 0.1)` | Dividers and borders |

### Functional Variables
| Variable | Dark Mode | Light Mode | Purpose |
| :--- | :--- | :--- | :--- |
| `--topbar-bg` | `rgba(5, 8, 15, 0.8)` | `rgba(245, 247, 251, 0.7)` | Sticky navigation background |
| `--input-bg` | `rgba(15, 23, 42, 0.6)` | `rgba(255, 255, 255, 0.8)` | Input field backgrounds |
| `--info-bg` | `rgba(28, 201, 160, 0.1)` | `rgba(15, 155, 120, 0.1)` | Background for info banners/results |
| `--info-border` | `rgba(28, 201, 160, 0.2)` | `rgba(15, 155, 120, 0.2)` | Border for info banners |
| `--info-text` | `#dff8f1` | `#0a5c46` | Text inside info banners |

## 🧱 Component Standards

### 1. Cards & Panels
Use `.card`, `.feature-card`, or `.auth-panel`. 
- **Background:** `var(--panel)`
- **Border:** `1px solid var(--border)`
- **Radius:** `20px` or `24px`

### 2. Buttons
- **Primary:** `.btn .btn-primary` $\rightarrow$ Background: `var(--accent)`, Text: `white`.
- **Secondary:** `.btn .btn-secondary` $\rightarrow$ Background: `transparent`, Border: `var(--border)`, Text: `var(--text)`.

### 3. Typography
- **Headings:** `color: var(--text)`
- **Body/Descriptions:** `color: var(--muted)`
- **Eyebrows:** `color: var(--accent-2)`, `text-transform: uppercase`, `letter-spacing: 0.2em`.

## 🛠️ Implementation Checklist for New Features
- [ ] Does the component use `var(--text)` instead of `white` or `black`?
- [ ] Does the background use `var(--panel)` or `var(--bg)`?
- [ ] Are borders using `var(--border)`?
- [ ] Is the component responsive (using `grid` and `@media` queries)?
