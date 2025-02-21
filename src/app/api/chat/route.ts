// import { azure } from "@/lib/ai/azure"
import { tools } from '@/lib/ai/tools';
import { azure } from '@ai-sdk/azure';
import { streamText } from 'ai';

// export const runtime = "edge"
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = await streamText({
    model: azure(process.env.AZURE_DEPLOYMENT_NAME!),
    messages,
    maxSteps: 5,
    tools,
  })

  return result.toDataStreamResponse()
}

