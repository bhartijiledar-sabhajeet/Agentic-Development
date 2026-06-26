# Agentic Investigation Application

## Overview
This application is a demo of an agentic workflow built with React and Vite. It shows how multiple specialized agents can collaborate to investigate a problem, gather evidence, analyze findings, validate confidence, and produce an executive-ready summary.

The goal of this application is to demonstrate how agentic orchestration can move beyond simple automation and support more realistic decision-making scenarios.

## What This Application Demonstrates
The app simulates an investigation process with the following agents:

- Coordinator Agent: Orchestrates the overall workflow and passes context between stages.
- Researcher Agent: Collects structured evidence from a public data source.
- Planner Agent: Turns a business objective into an investigation plan.
- Analyst Agent: Identifies themes, patterns, and priority signals.
- Validator Agent: Assesses confidence and highlights risks or missing evidence.
- Synthesizer / LLM Agent: Produces a concise executive brief for stakeholders.

## How the Workflow Works
1. The user enters a business scenario and objective.
2. The coordinator starts the multi-agent workflow.
3. Evidence is fetched from a sample public API.
4. The planner creates a structured investigation plan.
5. The analyst identifies key themes and priority signals.
6. The validator checks confidence and exposes limitations.
7. The synthesizer generates a human-readable summary and executive brief.

## Why This Is Valuable
This application is useful because it shows the difference between traditional automation and agentic systems.

### Benefits of the Agentic Application
- Better problem-solving structure: Work is broken into specialized steps instead of one monolithic task.
- Improved decision support: Each agent contributes a different perspective, such as evidence gathering, analysis, validation, and summarization.
- Traceability: The workflow logs each stage, making it easier to understand how a conclusion was formed.
- Flexible use cases: The same pattern can be adapted for customer support triage, incident analysis, market research, or business reporting.
- Human-friendly output: The final result is presented as an executive brief rather than raw technical output.

## Business Relevance
This kind of agentic application is especially useful in scenarios where decisions need:
- multiple sources of information
- structured reasoning
- confidence checks
- clear communication to non-technical stakeholders

## Technology Stack
- React
- Vite
- JavaScript
- Azure OpenAI integration (optional, with mock fallback for local testing)

## Run the Application
```bash
npm install
npm run dev
```

## Summary
This application is a practical demonstration of how agentic orchestration can be used to turn raw information into actionable insight. It highlights the value of collaboration between specialized agents and shows how such systems can support real-world business workflows.
