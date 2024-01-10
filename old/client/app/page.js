// "use client"
import dynamic from 'next/dynamic';
import React from 'react';
// import Game from './game';

const GameComponentNoSSR = dynamic(() => import('./game'), {
  ssr: false
});

const GamePage = () => {
  return <GameComponentNoSSR />;
};

export default GamePage;