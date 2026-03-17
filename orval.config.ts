import { defineConfig } from 'orval'

export default defineConfig({
  loancorp: {
    input: {
      target: './openapi.yaml',  // path to your OpenAPI spec
    },
    output: {
      mode: 'tags-split',
      target: './src/lib/api/generated',
      schemas: './src/types/api',
      client: 'react-query',
      httpClient: 'axios',
      override: {
        mutator: {
          path: './src/lib/api/client.ts',
          name: 'default',
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
  },
})
