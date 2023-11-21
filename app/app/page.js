import dynamic from 'next/dynamic';
import React from 'react';

const GameComponentNoSSR = dynamic(() => import('./game'), {
  ssr: false
});

const GamePage = () => {
  return <GameComponentNoSSR />;
};

export default GamePage;