import { environments } from '../../../utils/environments';
import checkStatus from '../checkStatus';

export async function GET() {
  try {
    const results = await Promise.all(
      environments.map(async ({ envName, servers }) => {
        const serverLinkDetails = await Promise.all(
          Object.entries(servers).map(async ([serverName, url]) => {
            try {
              const status = await checkStatus(url);
              return [serverName, status];
            } catch (error) {
              console.error(`Error checking status for ${serverName}: `, error);
              return [
                serverName,
                {
                  status: 'Error',
                  runLevelName: 'UNKNOWN',
                  runLevelCode: null,
                  uptimeSeconds: null,
                  runLevelOrdinal: null,
                },
              ];
            }
          })
        );
        return { envName, serverStatus: Object.fromEntries(serverLinkDetails) };
      })
    );

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Server failed to start', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
