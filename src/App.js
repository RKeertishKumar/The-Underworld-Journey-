import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { JourneyProvider, useJourney } from './contexts/JourneyContext';
import Landing from './components/Landing';
import TeaGarden from './components/TeaGarden';
import WritersSanctuary from './components/WritersSanctuary';
import DanceHall from './components/DanceHall';
import ChocolateRiver from './components/ChocolateRiver';
import FinalMessage from './components/FinalMessage';
import Navigation from './components/Navigation';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Dancing+Script&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Arial', sans-serif;
    overflow-x: hidden;
  }
`;

const JourneyContent = () => {
  const { currentRealm } = useJourney();
  
  const renderRealm = () => {
    switch(currentRealm) {
      case 'teaGarden':
        return <TeaGarden />;
      case 'writersSanctuary':
        return <WritersSanctuary />;
      case 'danceHall':
        return <DanceHall />;
      case 'chocolateRiver':
        return <ChocolateRiver />;
      case 'finalDestination':
        return <FinalMessage />;
      case 'landing':
      default:
        return <Landing />;
    }
  };
  
  return (
    <>
      {renderRealm()}
      <Navigation />
    </>
  );
};

function App() {
  return (
    <JourneyProvider>
      <GlobalStyle />
      <JourneyContent />
    </JourneyProvider>
  );
}

export default App;
