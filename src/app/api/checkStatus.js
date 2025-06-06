import formatStatus from '../../utils/formatStatus';

export default async function checkStatus(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      return formatStatus('SERVER NOT AVAILABLE');
    }

    const text = (await response.text()).trim();
    console.log('text: ', text);

    //Checking BC status
    if (text === '2' || text === '-') {
      return formatStatus('UP');
    }

    let data;

    try {
      data = JSON.parse(text);
      // console.log('data: ', data);
    } catch {
      return formatStatus('FAILED TO START');
    }

    let status;
    const runLevelName = data.runLevelName;
    const runLevelCode = data.runLevelCode;
    const uptimeSeconds = data.uptimeSeconds;
    const runLevelOrdinal = data.runLevelOrdinal;

    if (url.includes('/pc') || url.includes('cc-')) {
      status =
        runLevelName === 'MULTIUSER' && runLevelCode ? 'UP' : 'FAILED TO START';
    } else if (url.includes('cm-')) {
      status =
        runLevelName === 'MULTIUSER' && runLevelOrdinal
          ? 'UP'
          : 'FAILED TO START';
    } else {
      status = 'UNKNOWN';
    }

    return {
      ...formatStatus(
        status,
        runLevelName,
        runLevelCode,
        uptimeSeconds,
        runLevelOrdinal
      ),
    };
  } catch {
    // console.log('fetch failed');
    return formatStatus('DOWN');
  }
}
