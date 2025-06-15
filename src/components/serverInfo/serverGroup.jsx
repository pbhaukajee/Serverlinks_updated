import ServerDetails from './serverDetails';

export default function ServerGroup({ env }) {
  return (
    <div>
      {Object.entries(env.serverStatus).map(([server, info]) => (
        <ServerDetails
          key={server}
          server={server}
          info={{ ...info, envName: env.envName }}
        />
      ))}
    </div>
  );
}
