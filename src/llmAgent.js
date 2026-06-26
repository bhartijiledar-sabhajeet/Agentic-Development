
import { AzureOpenAI } from "openai";
const AZURE_OPENAI_KEY = import.meta.env.VITE_AZURE_OPENAI_KEY;
const AZURE_OPENAI_ENDPOINT =''
const AZURE_OPENAI_DEPLOYMENT = ''
const apiKey = import.meta.env.VITE_AZURE_OPENAI_KEY;
const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
const deployment = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT;
export async function runLlmAgent(data, insights, summary, logs1) {
  const logs = []
  logs.push('LLM Agent starting.')
    const apiKey = AZURE_OPENAI_KEY;
  const apiVersion = "2024-12-01-preview";
  const options = { endpoint, apiKey, deployment, apiVersion ,dangerouslyAllowBrowser: true}
  const client = new AzureOpenAI(options);
  const prompt = buildLlmPrompt(data, insights, summary)
   const response = await client.chat.completions.create({
    messages: [
      { role:"system", content: "You are a helpful assistant." },
      { role:"user", content: "I am going to Paris, what should I see?" }
    ],
    max_completion_tokens: 16384,
      model: modelName
  });
 if (response?.error !== undefined && response.status !== "200") {
    throw response.error;
  }
  console.log(response.choices[0].message.content);
  if (!AZURE_OPENAI_KEY || !AZURE_OPENAI_ENDPOINT || !AZURE_OPENAI_DEPLOYMENT) {
   logs.push('Azure OpenAI settings missing. Using mock LLM response for testing.')
    return createMockLlmResponse(data, insights, summary)
  }
logs.push('Sending prompt to Azure OpenAI API.')
  const llmText = response?.choices?.[0]?.message?.content?.trim() || 'LLM returned no text.'
  logs.push('LLM Agent received a response.')
  return llmText
}

function buildLlmPrompt(data, insights, summary) {
  const samplePosts = data.slice(0, 3).map((post) => `- ${post.title}`).join('\n')

  return `You are given a list of posts and a summary of insights. ` +
    `Write a short human-readable analysis in 2-3 sentences.

Posts:\n${samplePosts}\n\n` +
    `Insights:\n- totalPosts: ${insights.totalPosts}\n- topUserId: ${insights.topUserId}\n- longestTitle: ${insights.longestTitle}\n\n` +
    `Summary:\n${summary}`
}

function createMockLlmResponse(data, insights, summary) {
  return `MOCK LLM OUTPUT: The system fetched ${insights.totalPosts} posts, with user ${insights.topUserId} as the most active author. ` +
    `The longest title is \"${insights.longestTitle}\". Summary: ${summary}`
}
