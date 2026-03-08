# Summon Fitness

Static Next.js web app for a home pickleball training plan focused on power, agility, speed, footwork, rotational strength, balance, recovery, and shot technique.

## Run locally

1. Install dependencies:
   `npm install`
2. Start development:
   `npm run dev`
3. Build the GitHub Pages export:
   `npm run build`

The app stores onboarding answers, plan selection, workout progress, notes, favorites, and video-review history in `localStorage`.

## GitHub Pages deployment

The repo includes [deploy.yml](/workspaces/summon-fitness/.github/workflows/deploy.yml) for GitHub Pages via GitHub Actions.

Key details:

1. The app uses `output: "export"` in [next.config.ts](/workspaces/summon-fitness/next.config.ts) so it builds to `out/`.
2. The workflow sets `BASE_PATH` to the repository name so routes work on project pages.
3. In GitHub repository settings, set Pages to use `GitHub Actions`.

## Project structure

- [app](/workspaces/summon-fitness/app): App Router routes and global styles.
- [components/providers/app-state-provider.tsx](/workspaces/summon-fitness/components/providers/app-state-provider.tsx): localStorage-backed app state.
- [data/training-data.ts](/workspaces/summon-fitness/data/training-data.ts): typed seed data for exercises, techniques, and weekly plans.
- [components/workout](/workspaces/summon-fitness/components/workout): workout session UI, timer, and exercise cards.
- [components/technique](/workspaces/summon-fitness/components/technique): technique library and detail screens.
- [components/progress](/workspaces/summon-fitness/components/progress): progress dashboards and history views.

## Replace placeholder media

Placeholder demo cards are rendered by [media-placeholder.tsx](/workspaces/summon-fitness/components/media-placeholder.tsx).

To swap in real assets:

1. Add your video thumbnails, GIFs, or image sequences under `public/`.
2. Update the `media(...)` entries in [training-data.ts](/workspaces/summon-fitness/data/training-data.ts).
3. Replace the placeholder rendering in [media-placeholder.tsx](/workspaces/summon-fitness/components/media-placeholder.tsx) with real `<video>`, `<img>`, or embedded player logic.

## Modify the training plan

Most content changes happen in [training-data.ts](/workspaces/summon-fitness/data/training-data.ts):

1. Edit `exercises` to add or change drill data.
2. Edit `techniqueSkills` to change cues, mistakes, and review checklists.
3. Edit `fullPlanBaseDays`, `condensedPlanBaseDays`, or `hybridPlanBaseDays` to change the weekly structure.
4. Adjust `progressionThemes` and `buildPlan(...)` if you want different week 1-4 progression logic.
