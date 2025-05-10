import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useJourney } from '../contexts/JourneyContext';

const RiverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #3c1518, #5e2129);
  color: white;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Cinzel', serif;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

const RiverScene = styled.div`
  width: 80%;
  max-width: 600px;
  height: 200px;
  background: #5e2129;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  margin-bottom: 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    width: 90%;
    height: 180px;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    width: 95%;
    height: 150px;
    margin-bottom: 1.5rem;
  }
`;

const ChocolateWave = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: #8b4513;
  border-radius: 50% 50% 0 0;
  animation: wave 8s infinite ease-in-out;
  
  @keyframes wave {
    0%, 100% {
      transform: translateY(0) scaleX(1.1);
    }
    50% {
      transform: translateY(-10px) scaleX(0.9);
    }
  }
`;

const ChocolatePiece = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 20px;
  background: #3a1a00;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
  top: ${props => props.top || '30%'};
  left: ${props => props.left || '50%'};
  
  @media (max-width: 768px) {
    width: 35px;
    height: 18px;
  }
  
  @media (max-width: 480px) {
    width: 30px;
    height: 15px;
  }
`;

const Message = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  color: #3c1518;
  padding: 1.5rem;
  border-radius: 10px;
  max-width: 500px;
  margin-top: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.2rem;
    max-width: 90%;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    margin-top: 1rem;
  }
`;

const NavigateButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background: rgba(60, 21, 24, 0.8);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 2rem;
  font-family: 'Cinzel', serif;
  margin-bottom: 60px; /* Add space for the navigation bar */
  
  &:hover {
    background: rgba(60, 21, 24, 1);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
    margin-top: 1.5rem;
    margin-bottom: 50px;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    margin-top: 1rem;
    margin-bottom: 40px;
  }
`;

const ChocolateRiver = () => {
  const { navigateToRealm, collectItem, collectibles } = useJourney();
  const [chocolatePieces, setChocolatePieces] = useState([
    { id: 1, top: '30%', left: '20%', collected: false },
    { id: 2, top: '50%', left: '40%', collected: false },
    { id: 3, top: '20%', left: '60%', collected: false },
    { id: 4, top: '40%', left: '80%', collected: false }
  ]);
  const [showMessage, setShowMessage] = useState(false);
  
  const handleChocolateClick = (id) => {
    setChocolatePieces(chocolatePieces.map(piece => 
      piece.id === id ? { ...piece, collected: true } : piece
    ));
  };
  
  useEffect(() => {
    // Check if all chocolate pieces are collected
    if (chocolatePieces.every(piece => piece.collected) && !collectibles.specialChocolate) {
      collectItem('specialChocolate');
      setShowMessage(true);
    }
  }, [chocolatePieces, collectItem, collectibles.specialChocolate]);
  
  const handleContinue = () => {
    navigateToRealm('finalDestination');
  };
  
  return (
    <RiverContainer>
      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        The Chocolate River
      </Title>
      
      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        A rich, flowing river of the finest dark chocolate. Collect all the chocolate pieces floating on the surface.
      </Description>
      
      <RiverScene>
        <ChocolateWave />
        
        {chocolatePieces.map(piece => !piece.collected && (
          <ChocolatePiece
            key={piece.id}
            top={piece.top}
            left={piece.left}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleChocolateClick(piece.id)}
            animate={{
              y: [0, -5, 0],
              x: [0, 3, 0, -3, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        ))}
      </RiverScene>
      
      {showMessage && (
        <Message
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Special Chocolate Collected!</h3>
          <p>Sweet moments are better when shared...</p>
          
          <NavigateButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
          >
            Continue to the Heart of the Underworld
          </NavigateButton>
        </Message>
      )}
    </RiverContainer>
  );
};

export default ChocolateRiver;
