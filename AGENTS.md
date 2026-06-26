# AGENTS instructions

## Project overview
- This repository is a small Vite + React demo for a coordinator-driven investigation workflow.
- The main UI entrypoint is [src/App.jsx](src/App.jsx). It loads the markdown agent instructions from [src/agents](src/agents) and runs the workflow when the user clicks the action button.
- The orchestration logic is in [src/coordinator.js](src/coordinator.js). The LLM integration is in [src/llmAgent.js](src/llmAgent.js).

## Working conventions
- Keep changes small and focused. This project is a demo app rather than a large production system.
- The markdown files in [src/agents](src/agents) are UI-facing agent instructions. If you change the behavior of the pipeline, update the matching markdown file and the flow description in [FLOW_DIAGRAM.md](FLOW_DIAGRAM.md).
- Prefer simple React state updates and avoid introducing extra dependencies unless clearly needed.

## Common commands
- Install dependencies: npm install
- Start the dev server: npm run dev
- Build for production: npm run build

## LLM and environment notes
- The app can call Azure OpenAI when the Vite environment variables VITE_AZURE_OPENAI_KEY, VITE_AZURE_OPENAI_ENDPOINT, and VITE_AZURE_OPENAI_DEPLOYMENT are present.
- If those values are missing, the app falls back to a mock response for local testing.
- Keep any new environment variables consistent with Vite's import.meta.env usage.

## Helpful context
- The workflow order is: gather evidence → create plan → analyze findings → validate confidence → synthesize an executive brief.
- The current demo fetches sample posts from a public JSON API and displays the plan, analysis, validation report, synthesis, and logs in the UI.
