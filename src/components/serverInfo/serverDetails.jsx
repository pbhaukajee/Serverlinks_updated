import { useState } from 'react';
import formatUptime from '../../utils/formatUptime';

export default function ServerDetails({ server, info }) {
  const [showDetails, setShowDetails] = useState(false);
  const status = info?.status || 'down';
  //   const cleanStatus = status.trim().toLowerCase();

  // const statusClass =
  //   cleanStatus === 'up'
  //     ? styles.statusUp
  //     : cleanStatus === 'down'
  //     ? styles.statusDown
  //     : cleanStatus === 'failed to start'
  //     ? styles.statusFailedToStart
  //     : styles.statusUnknown;

  return (
    <div>
      <div>
        <span>{server}</span>
        <span>{status.toUpperCase()}</span>
        <button onClick={() => setShowDetails((prev) => !prev)}>
          {showDetails ? 'Hide Details' : 'More Details'}
        </button>
      </div>

      {showDetails && (
        <div>
          {info?.serverName === 'AB' ? (
            <>
              <p>
                <strong>Run Level Name:</strong>{' '}
                {info?.runLevelName ?? 'UNKNOWN'}
              </p>
              <p>
                <strong>Run Level Ordinal:</strong>{' '}
                {info?.runLevelOrdinal ?? 'UNKNOWN'}
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Run Level Code:</strong>{' '}
                {info?.runLevelCode ?? 'UNKNOWN'}
              </p>
              <p>
                <strong>Run Level Name:</strong>{' '}
                {info?.runLevelName ?? 'UNKNOWN'}
              </p>
              <p>
                <strong>Uptime:</strong> {formatUptime(info?.uptimeSeconds)}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
