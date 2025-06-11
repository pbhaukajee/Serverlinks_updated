export default function formatUptime(seconds) {
  if (!seconds || isNaN(seconds)) return ' UNKNOWN';

  const hours = Math.floor(seconds / 3600);

  if (hours < 24) {
    return hours <= 1 ? ` ${hours} hour` : `${hours} hours`;
  } else {
    const days = Math.floor(hours / 24);
    return days <= 1 ? ` ${days} day` : ` ${days} days`;
  }
}
