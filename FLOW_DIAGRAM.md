# Agentic Flow Diagram for AI Agent System

This app now demonstrates a more realistic agentic investigation flow. The coordinator turns a business objective into a plan, gathers evidence, analyzes it, validates confidence, and produces an executive brief.

## Flow Diagram

```text
[User enters objective] 
        |
        v
[App.jsx -> handleRun()]
        |
        v
[Coordinator Agent]
(runMultiAgentSystem in src/coordinator.js)
        |
        v
[Researcher Agent]
(fetchJsonData)
        |
        v
[Public JSON API]
https://jsonplaceholder.typicode.com/posts?_limit=12
        |
        v
[Evidence collected]
        |
        v
[Planner Agent]
(createInvestigationPlan)
        |
        v
[Analyst Agent]
(createAnalysis)
        |
        v
[Validator Agent]
(validateAnalysis)
        |
        v
[Synthesizer Agent]
(createSynthesis)
        |
        v
[LLM Agent]
(runLlmAgent)
        |
        v
[Final investigation report]
        |
        v
App.jsx displays plan, analysis, validation, synthesis, and execution logs
```

## How the coordinator works

1. `App.jsx` loads the agent markdown instructions and captures the user's scenario and objective.
2. When the user clicks the **Run agentic workflow** button, `handleRun()` calls `runMultiAgentSystem()`.
3. `runMultiAgentSystem()` in `src/coordinator.js` creates a shared `logs` array and runs the workflow stages in sequence.
4. The Researcher Agent fetches evidence from a public API.
5. The Planner Agent transforms the business objective into a structured investigation plan.
6. The Analyst Agent identifies themes and high-signal evidence.
7. The Validator Agent scores confidence and flags risks.
8. The Synthesizer Agent produces an executive-ready summary.
9. The LLM Agent enriches that summary with a short narrative for presentation.

## Agent roles in the code

- `src/agents/coordinator.md`
  - Defines the coordinator's role: plan, delegate, and maintain shared context.
- `src/agents/fetcher.md`
  - Defines the Researcher Agent: gather evidence from a real source.
- `src/agents/insights.md`
  - Defines the Analyst Agent: identify patterns and recommend actions.
- `src/agents/summary.md`
  - Defines the Validator Agent: assess evidence quality and confidence.
- `src/agents/llm.md`
  - Defines the Synthesizer Agent: produce an executive brief.

## Notes

- The markdown files are not executable agents. They are used as documentation and UI-facing instructions.
- The orchestration logic lives in `src/coordinator.js`.
- The flow is explicitly multi-stage and decision-oriented rather than a single linear transformation.
