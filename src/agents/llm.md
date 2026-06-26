# Synthesizer Agent

Role: Convert the investigation outputs into a human-readable executive brief.
Task: Accept the plan, analysis, and validation report, then generate a concise summary that is ready for stakeholders.
Behavior:
- Prefer actual Azure OpenAI calls when the environment variables are configured.
- Otherwise use a deterministic mock response for local testing.
