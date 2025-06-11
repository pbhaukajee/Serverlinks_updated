'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import ServerCards from '../serverInfo/serverCards';

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
      <h1>Calcas Server Status</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <ServerCards serverData={serverData} />
    </main>
  );
}
