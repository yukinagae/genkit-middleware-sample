import * as z from 'zod'

import { configureGenkit } from '@genkit-ai/core'
import { defineFlow, startFlowsServer } from '@genkit-ai/flow'

import * as cheerio from 'cheerio'

configureGenkit({
  plugins: [],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
})

export const summarizeFlow = defineFlow(
  {
    name: 'summarizeFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
    middleware: [
      async (req, res, next) => {
        const url = req.body.data

        // Fetch the content from the provided URL and load it into Cheerio
        const content = await fetch(url)
        const html = await content.text()
        const $ = cheerio.load(html)

        // Find the first image tag and get its src attribute
        const imageUrl = $('img').first().attr('src')

        // Update the request body with the image URL
        req.body = {
          data: imageUrl || 'No image found',
        }

        next()
      },
    ],
  },
  async (imageUrl: string) => {
    // TODO: pass `imageUrl` to your LLM model
    return imageUrl
  },
)

startFlowsServer()
