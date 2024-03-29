export const whoami = (game, decoded) => {
  const lightPlayer = game?.lightPlayer ?? null;
  const darkPlayer = game?.darkPlayer ?? null;

  if (lightPlayer && lightPlayer.split('/')[5] === decoded.id) return 'LIGHT';
  if (darkPlayer && darkPlayer.split('/')[5] === decoded.id) return 'DARK';
  return 'SPECTATOR';
};

export const getOrientation = (player) => {
  if (player === 'LIGHT') return 'white';
  if (player === 'DARK') return 'black';
  return 'white';
};
