import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import formatUptime from '../../utils/formatUptime';

export default function ServerDetails({ server, info }) {
  const [showDetails, setShowDetails] = useState(false);
  const status = (info?.status || 'down').trim().toLowerCase();

  const getStatusStyles = (status) => {
    switch (status) {
      case 'up':
        return { backgroundColor: '#28a745', color: 'white' };
      case 'down':
        return { backgroundColor: '#dc3545', color: 'white' };
      case 'failed to start':
        return { backgroundColor: '#ffc107', color: 'white' };
      default:
        return { backgroundColor: '#6c757d', color: 'white' };
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '6px',
        padding: '0.75rem 1rem',
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography color="rgb(0, 48, 94)" sx={{ fontWeight: 600 }}>
          {server}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="span"
            sx={{
              ...getStatusStyles(status),
              padding: '0.2rem 0.75rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            {status.toUpperCase()}
          </Box>

          <Button
            onClick={() => setShowDetails((prev) => !prev)}
            sx={{
              textTransform: 'none',
              fontSize: '0.85rem',
              padding: 0,
              minWidth: 'auto',
              color: 'rgb(20, 129, 158)',
              '&:hover': {
                color: 'rgb(11, 71, 88)',
                backgroundColor: 'transparent',
              },
            }}
          >
            {showDetails ? 'Hide Details' : 'More Details'}
          </Button>
        </Box>
      </Box>

      {showDetails && (
        <Box sx={{ ml: 0.5 }}>
          {info?.serverName === 'AB' ? (
            <>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Run Level Name:</strong>{' '}
                {info?.runLevelName ?? 'UNKNOWN'}
              </Typography>
              <Typography variant="body2">
                <strong>Run Level Ordinal:</strong>{' '}
                {info?.runLevelOrdinal ?? 'UNKNOWN'}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Run Level Code:</strong>{' '}
                {info?.runLevelCode ?? 'UNKNOWN'}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Run Level Name:</strong>{' '}
                {info?.runLevelName ?? 'UNKNOWN'}
              </Typography>
              <Typography variant="body2">
                <strong>Uptime:</strong>{' '}
                {formatUptime(info?.uptimeSeconds) ?? 'UNKNOWN'}
              </Typography>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
