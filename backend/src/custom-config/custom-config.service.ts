import { cosmiconfigSync } from 'cosmiconfig';

export default (options: Record<string, any>) => {
  const explorer = cosmiconfigSync('kuzco');
  const searchPaths = options?.searchPaths || [process.cwd()];

  try {
    const result = explorer.search();
    if (result) {
      return result.config;
    } else {
      return {
        baseUrl: 'http://localhost:11434',
        model: 'llama2',
        requestOptions: {
          useMMap: true,
          numThread: 6,
          numGpu: 1,
        },
        database: {
          tableName: 'documents',
          columnName: 'match_documents',
        },
        extensions: ['.ts', '.js', '.json'],
        chatTemperature: 0.5,
        chatTopP: 1,
        chatTopK: 30,
      };
    }
  } catch (e) {
    console.error(e);
  }
};
