import { createAzure } from "@ai-sdk/azure"

export const azure = createAzure({
  resourceName: process.env.AZURE_RESOURCE_NAME!, 
  apiKey: process.env.AZURE_API_KEY!,
  // apiVersion: "2024-02-15-preview"
})

