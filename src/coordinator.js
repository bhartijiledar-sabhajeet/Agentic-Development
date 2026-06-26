import { runLlmAgent } from './llmAgent.js'

const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=12'

export async function runMultiAgentSystem({ brief, scenario }) {
  const logs = []
  debugger;
  const objective = brief || 'Investigate recent customer feedback and identify the most urgent product follow-up actions.'
  const workflowScenario = scenario || 'Customer feedback triage'

  logs.push('Coordinator agent starting multi-agent investigation workflow.')
  logs.push(`Scenario selected: ${workflowScenario}`)

  logs.push('Executing Researcher Agent...')
  const data = await fetchJsonData(API_URL, logs)

  logs.push('Executing Planner Agent...')
  const plan = createInvestigationPlan(objective, workflowScenario, data, logs)

  logs.push('Executing Analyst Agent...')
  const analysis = createAnalysis(data, plan, logs)

  logs.push('Executing Validator Agent...')
  const validation = validateAnalysis(data, plan, analysis, logs)

  logs.push('Executing Synthesizer Agent...')
  const synthesis = createSynthesis(plan, analysis, validation, logs)

  logs.push('Executing LLM Agent...')
  const llmResponse = await runLlmAgent(data, plan, analysis, validation, synthesis, logs)

  logs.push('Coordinator agent completed workflow.')

  return { data, plan, analysis, validation, synthesis, llmResponse, logs }
}

async function fetchJsonData(url, logs) {
  logs.push(`Researcher Agent fetching evidence from ${url}`)
  const response = await fetch(url)
  if (!response.ok) {
    const message = `API request failed with status ${response.status}`
    logs.push(message)
    throw new Error(message)
  }

  const json = await response.json()
  logs.push(`Researcher Agent collected ${json.length} evidence items.`)
  return json
}

function createInvestigationPlan(objective, scenario, data, logs) {
  const plan = {
    scenario,
    objective,
    questions: [
      'What recurring themes appear in the evidence?',
      'Which signals are strongest and most actionable?',
      'What decisions or follow-up actions are justified by the evidence?'
    ],
    evidenceSources: [`Public sample feed (${data.length} records)`],
    successCriteria: ['Clear thematic patterns', 'Priority recommendations', 'Confidence and risk assessment']
  }

  logs.push(`Planner Agent drafted a ${plan.questions.length}-question investigation plan.`)
  return plan
}

function createAnalysis(data, plan, logs) {
  const textCorpus = data.map((item) => `${item.title} ${item.body}`).join(' ').toLowerCase()
  const keywords = ['error', 'bug', 'slow', 'delay', 'api', 'login', 'data', 'support', 'design', 'mobile', 'service', 'performance']
  const themeHits = keywords
    .map((theme) => ({ theme, matches: countMatches(textCorpus, theme) }))
    .filter((item) => item.matches > 0)
    .sort((a, b) => b.matches - a.matches)
    .slice(0, 5)

  const prioritySignals = data
    .map((item) => ({
      title: item.title,
      userId: item.userId,
      relevance: countMatches(`${item.title} ${item.body}`.toLowerCase(), themeHits[0]?.theme || 'error') + countMatches(`${item.title} ${item.body}`.toLowerCase(), themeHits[1]?.theme || 'support')
    }))
    .filter((item) => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 4)

  const recommendedActions = themeHits.slice(0, 3).map((item) => `Investigate ${item.theme} related issues and prepare an action item for the owning team.`)

  const analysis = {
    themes: themeHits,
    prioritySignals,
    recommendedActions,
    evidenceCount: data.length
  }

  logs.push(`Analyst Agent identified ${analysis.themes.length} emerging themes and ${analysis.prioritySignals.length} priority signals.`)
  return analysis
}

function validateAnalysis(data, plan, analysis, logs) {
  const confidenceScore = Math.min(95, 60 + analysis.themes.length * 7 + analysis.prioritySignals.length * 4)
  const evidenceStrength = confidenceScore >= 80 ? 'Strong' : confidenceScore >= 70 ? 'Moderate' : 'Needs more evidence'

  const validation = {
    confidenceScore,
    evidenceStrength,
    risks: confidenceScore < 80 ? ['The evidence set is small and should be supplemented with more live customer input.'] : [],
    gaps: confidenceScore < 85 ? ['The current sample is not sufficient to confirm every recommendation.'] : []
  }

  logs.push(`Validator Agent scored the evidence at ${validation.confidenceScore}% confidence with ${validation.evidenceStrength.toLowerCase()} strength.`)
  return validation
}

function createSynthesis(plan, analysis, validation, logs) {
  const synthesis = {
    executiveSummary: `The ${plan.scenario.toLowerCase()} workflow surfaced ${analysis.themes.slice(0, 2).map((item) => item.theme).join(' and ')} as the leading themes. The evidence is ${validation.evidenceStrength.toLowerCase()} enough to support targeted follow-up work, with ${analysis.prioritySignals.length} high-signal examples ready for review.`,
    decisionReady: validation.confidenceScore >= 75,
    nextSteps: [
      'Share the top themes with the relevant product or support team.',
      'Prioritize the highest-signal posts for deeper review.',
      'Add more live evidence before making a final operational decision.'
    ]
  }

  logs.push('Synthesizer Agent assembled an executive-ready summary.')
  return synthesis
}

function countMatches(text, term) {
  const regex = new RegExp(term, 'gi')
  return (text.match(regex) || []).length
}
