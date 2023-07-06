// Setting up my createClient for my client whome I have given access to read and write data

import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: 'v1',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: true,
})