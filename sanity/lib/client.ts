import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:"sk8EDLFyDHl3UVwIDaL5vJMaieTahknb2CYe1mOZELBH1kMw9ilCIDLpi0Pyi8UNisulCCAQWWQpvebfLJhtP1Ouhy9z5M5ytbGpnSAXrtDDfnFTnqRlCFN8kbuKrrpHpAMYvSVTF2XEdg58XF9aHABpFv1neVtA0N7gaOcv7cTUbIxG863H",
})
