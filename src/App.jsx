import { useState } from 'react'
import { runMultiAgentSystem } from './coordinator'
import fetchAgentMd from './agents/fetcher.md?raw'
import insightsAgentMd from './agents/insights.md?raw'
import summaryAgentMd from './agents/summary.md?raw'
import llmAgentMd from './agents/llm.md?raw'
import coordinatorAgentMd from './agents/coordinator.md?raw'

function App() {
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [brief, setBrief] = useState('Investigate recent customer feedback and identify the most urgent product follow-up actions.')
  const [scenario, setScenario] = useState('Customer feedback triage')

  const handleRun = async () => {
    setLoading(true)
    setError(null)
    setOutput(null)

    try {
      const result = await runMultiAgentSystem({ brief, scenario })
      setOutput(result)
    } catch (err) {
      setError(err.message || 'Failed to run agents')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <header>
        <h1>Agentic Investigation Demo</h1>
        <p>A realistic multi-agent workflow that gathers evidence, plans an investigation, analyzes it, validates confidence, and produces an executive brief.</p>
      </header>

      <main>
        <section className="panel controls-panel">
          <div className="field">
            <label htmlFor="scenario">Scenario</label>
            <select id="scenario" value={scenario} onChange={(event) => setScenario(event.target.value)}>
              <option value="Customer feedback triage">Customer feedback triage</option>
              <option value="Incident postmortem">Incident postmortem</option>
              <option value="Market signal review">Market signal review</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="brief">Business objective</label>
            <textarea
              id="brief"
              rows="4"
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
            />
          </div>

          <button onClick={handleRun} disabled={loading}>
            {loading ? 'Running investigation...' : 'Run agentic workflow'}
          </button>
          {error && <div className="error">Error: {error}</div>}
        </section>

        <section className="result-panel">
          {output ? (
            <>
              <div className="panel">
                <h2>Investigation Plan</h2>
                <pre>{JSON.stringify(output.plan, null, 2)}</pre>
              </div>
              <div className="panel">
                <h2>Analysis</h2>
                <pre>{JSON.stringify(output.analysis, null, 2)}</pre>
              </div>
              <div className="panel">
                <h2>Validation</h2>
                <pre>{JSON.stringify(output.validation, null, 2)}</pre>
              </div>
              <div className="panel">
                <h2>Synthesis</h2>
                <pre>{JSON.stringify(output.synthesis, null, 2)}</pre>
              </div>
              <div className="panel">
                <h2>LLM Executive Brief</h2>
                <pre>{output.llmResponse}</pre>
              </div>
              <div className="panel">
                <h2>Execution Log</h2>
                <ol>
                  {output.logs.map((log, index) => (
                    <li key={index}>{log}</li>
                  ))}
                </ol>
              </div>
            </>
          ) : (
            <div className="panel empty-state">
              <p>Launch the workflow to see the planner, analyst, validator, synthesizer, and LLM collaborate over a real evidence set.</p>
            </div>
          )}
        </section>

        <section className="instructions-panel">
          <div className="panel">
            <h2>Coordinator Agent</h2>
            <pre>{coordinatorAgentMd}</pre>
          </div>
          <div className="panel">
            <h2>Researcher Agent</h2>
            <pre>{fetchAgentMd}</pre>
          </div>
          <div className="panel">
            <h2>Analyst Agent</h2>
            <pre>{insightsAgentMd}</pre>
          </div>
          <div className="panel">
            <h2>Validator Agent</h2>
            <pre>{summaryAgentMd}</pre>
          </div>
          <div className="panel">
            <h2>Synthesizer Agent</h2>
            <pre>{llmAgentMd}</pre>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
