import ServerGroup from './serverGroup';

export default function ServerCards({ serverData }) {
  return (
    <div>
      {serverData.map((env) => (
        <ServerGroup key={env.envName} env={env} />
      ))}
    </div>
  );
}
