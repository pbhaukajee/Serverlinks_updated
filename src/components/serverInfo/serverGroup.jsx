import ServerDetails from './serverDetails';

export default function ServerGroup({ env }) {
  return (
    <div>
      <h2>{env.envName}</h2>
      {Object.entries(env.serverStatus).map(([server, info]) => (
        <ServerDetails key={server} server={server} info={info} />
      ))}
    </div>
  );
}
