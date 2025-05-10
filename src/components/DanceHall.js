import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useJourney } from '../contexts/JourneyContext';

const HallContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #1a1a2e;
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
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  
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

const DanceFloor = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 5px;
  width: 300px;
  height: 300px;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
    margin-bottom: 1.5rem;
    gap: 3px;
  }
`;

const FloorTile = styled(motion.div)`
  background: ${props => props.islit === "true" ? props.color : '#333'};
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: ${props => props.islit === "true" ? `0 0 10px ${props.color}` : 'none'};
`;

const DancingShoes = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 30px;
  background: #9932cc;
  border-radius: 10px 10px 0 0;
  bottom: 40%;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 10;
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: #7b2cbf;
    border-radius: 0 0 10px 10px;
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 25px;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 20px;
  }
`;

const Message = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  color: #1a1a2e;
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
  background: rgba(153, 50, 204, 0.8);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 2rem;
  font-family: 'Cinzel', serif;
  margin-bottom: 60px; /* Add space for the navigation bar */
  
  &:hover {
    background: rgba(153, 50, 204, 1);
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

const DanceHall = () => {
  const { navigateToRealm, collectItem, collectibles } = useJourney();
  const [litTiles, setLitTiles] = useState([]);
  const [showShoes, setShowShoes] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  
  const colors = ['#9932cc', '#ffd700', '#ff8c00']; // Purple, Yellow, Orange
  
  const handleTileClick = (index) => {
    if (litTiles.includes(index)) {
      setLitTiles(litTiles.filter(i => i !== index));
    } else {
      const newLitTiles = [...litTiles, index];
      setLitTiles(newLitTiles);
      
      // If at least 10 tiles are lit, show the shoes
      if (newLitTiles.length >= 10 && !showShoes) {
        setShowShoes(true);
      }
    }
  };
  
  const handleShoesClick = () => {
    if (!collectibles.dancingShoes) {
      collectItem('dancingShoes');
      setShowMessage(true);
    }
  };
  
  const handleContinue = () => {
    navigateToRealm('chocolateRiver');
  };
  
  // Create an array of 25 tiles
  const renderTiles = () => {
    const tiles = [];
    for (let i = 0; i < 25; i++) {
      const isLit = litTiles.includes(i);
      const color = colors[i % colors.length];
      
      tiles.push(
        <FloorTile 
          key={i}
          islit={isLit ? "true" : "false"}
          color={color}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleTileClick(i)}
        />
      );
    }
    return tiles;
  };
  
  return (
    <HallContainer>
      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        The Dance Hall
      </Title>
      
      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        A place where rhythm meets soul. Click on the floor tiles to light them up in your favorite colors.
      </Description>
      
      <DanceFloor>
        {renderTiles()}
      </DanceFloor>
      
      {showShoes && (
        <DancingShoes 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
          onClick={handleShoesClick}
        />
      )}
      
      {showMessage && (
        <Message
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Dancing Shoes Collected!</h3>
          <p>Life is better with someone to dance through it with...</p>
          
          <NavigateButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
          >
            Continue to Chocolate River
          </NavigateButton>
        </Message>
      )}
    </HallContainer>
  );
};

export default DanceHall;
