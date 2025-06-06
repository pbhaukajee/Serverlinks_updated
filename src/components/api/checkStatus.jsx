import formatStatus from '../../utils/formatStatus';

export default async function CheckStatus(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      return formatStatus('SERVER NOT AVAILABLE');
    }

    const test = (await response.text()).trim();

    //Checking BC status
    if (text === '2' || test === '-') {
      return formatStatus('UP');
    }

    let data;
    try {
      data = JSON.parse(text);
      //   console.log("data: ", data);
    } catch {
      return formatStatus('FAILED TO START');
    }
  } catch {
    return formatStatus('DOWN');
  }
}
