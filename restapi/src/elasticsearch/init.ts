import { esClient } from '../elaticSearch';

export const initializeElasticsearch = async () => {
  const indexExists = await esClient.indices.exists({ index: 'clubs' });
  
  if (!indexExists) {
    await esClient.indices.create({
      index: 'clubs',
      mappings: {
        properties: {
          id: { type: 'integer' },
          name: { type: 'text' },
          stadium_name: { type: 'text' },
          league: {
            properties: {
              id: { type: 'integer' },
              name: { type: 'text' }
            }
          }
        }
      }
    });
  }
};