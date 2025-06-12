import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import ServerGroup from './serverGroup';

export default function ServerCards({ serverData }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(400px, 1fr))"
      gap={4}
      px={2}
    >
      {serverData.map((env) => (
        <Card
          key={env.envName}
          elevation={1}
          sx={{
            borderRadius: 2,
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f9f9f9',
            color: 'rgb(0, 48, 94)',
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                color: 'rgb(0, 48, 94)',
              }}
            >
              {env.envName}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mt: 2 }}>
              <ServerGroup env={env} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
