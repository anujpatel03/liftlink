// Setting up my sanityClient for my client whome I have given access to read and write data

import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion : 'v1',
    token : process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn : false
})