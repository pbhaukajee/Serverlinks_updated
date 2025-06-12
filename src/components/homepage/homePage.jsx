'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import ServerCards from '../serverInfo/serverCards';
import { Container, Box, Button, Typography } from '@mui/material';

export default function Homepage() {
  const [serverData, setServerData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/serverStatus');
      setServerData(res.data);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching server data: ', err);
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  useEffect(() => {
    //initial fetch
    fetchData();

    //Auto refresh every 30 secs
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <Container maxWidth="xl">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={4}
          mb={4}
        >
          <Box flex={1} />
          <Typography
            variant="h4"
            color=' color="rgb(0, 48, 94)"'
            component="h1"
            sx={{
              fontWeight: 700,
              fontFamily: 'Raleway',
              color: 'rgb(0, 48, 94)',
              textAlign: 'center',
              flex: 1,
            }}
          >
            Calcas Server Status
          </Typography>
          <Box flex={1} display="flex" justifyContent="flex-end">
            <Button
              onClick={handleRefresh}
              sx={{
                backgroundColor: 'rgb(20, 129, 158)',
                color: 'white',
                borderRadius: '6px',
                padding: '0.3rem 1rem',
                fontSize: '0.9rem',
                textTransform: 'none',

                '&:hover': {
                  backgroundColor: 'rgb(10, 78, 97)',
                },
              }}
            >
              Refresh
            </Button>
          </Box>
        </Box>
        <ServerCards serverData={serverData} />
      </Container>
    </main>
  );
}
