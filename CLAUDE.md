# LoanCorp — Claude Code Rules

## Stack
Next.js 16.1 · React 19.2 · TypeScript strict · Tailwind CSS v4 · MUI v7 · TanStack Query v5 · Zustand v5

## API rules
- All types come from src/types/api or src/lib/api/generated — never hand-write API types
- All fetch calls go through the generated orval hooks — never use fetch/axios directly in components
- Run `npm run generate:api` after any OpenAPI spec change before touching components
- API routes in src/app/api/ are thin proxies only — no business logic

## Component rules
- MUI v7 components for all UI primitives
- Use Tailwind only for layout (flex, grid, gap, padding, margin) — never for colors or typography
- MUI sx prop for one-off style overrides — never inline style={{}} objects
- 'use client' is required on every file that uses MUI components (they need React context)
- Keep Server Components for data-fetching shells; pass data down to 'use client' UI components
- Feature components go in src/components/{feature}/ — never flat in src/components/
- Extract a component after the second reuse — not before

## Page rules
- Every page folder gets a loading.tsx and error.tsx sibling
- Forms: react-hook-form + zod resolver — never uncontrolled inputs
- No `any` types anywhere — use generated types throughout

## State rules
- Zustand (src/stores/) for client/UI state (auth, modals, filters)
- TanStack Query for all server/API state (lists, details, mutations)
- Never store server data in Zustand

## Figma rules
- Inspect the Figma frame via MCP before building any screen
- Match spacing, colors, and typography exactly from Figma tokens in src/lib/theme.ts
- After building a screen, run a Figma comparison pass before marking it done

## Git rules
- One commit per completed screen/feature
- Format: feat(feature-name): short description
