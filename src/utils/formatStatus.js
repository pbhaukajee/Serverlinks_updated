export default function formatStatus(
  status,
  runLevelName = 'UNKNOWN',
  runLevelCode = null,
  uptimeSeconds = null,
  runLevelOrdinal = null
) {
  return { status, runLevelName, runLevelCode, uptimeSeconds, runLevelOrdinal };
}
