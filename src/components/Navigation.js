import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useJourney } from '../contexts/JourneyContext';

const NavContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 100;
  
  @media (max-width: 768px) {
    bottom: 10px;
  }
  
  @media (max-width: 480px) {
    bottom: 5px;
  }
`;

const NavBar = styled(motion.div)`
  display: flex;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 480px) {
    padding: 0.3rem;
    border-radius: 20px;
  }
`;

const NavItem = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${props => props.isactive === "true" ? props.color : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  font-size: 1.2rem;
  box-shadow: ${props => props.isactive === "true" ? `0 0 10px ${props.color}` : 'none'};
  
  &:hover {
    background: ${props => props.isactive === "true" ? props.color : 'rgba(255, 255, 255, 0.3)'};
  }
  
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
    margin: 0 0.3rem;
  }
  
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
    margin: 0 0.2rem;
  }
`;

const CollectibleIndicator = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: gold;
  border: 2px solid white;
`;

const Navigation = () => {
  const { currentRealm, navigateToRealm, collectibles } = useJourney();
  
  const navItems = [
    { id: 'landing', emoji: '🏛️', color: '#9932cc', label: 'Entrance' },
    { id: 'teaGarden', emoji: '🍵', color: '#2d6a4f', label: 'Tea Garden', collectible: 'teaLeaf' },
    { id: 'writersSanctuary', emoji: '✒️', color: '#2c3e50', label: 'Writer\'s Sanctuary', collectible: 'magicalQuill' },
    { id: 'danceHall', emoji: '💃', color: '#1a1a2e', label: 'Dance Hall', collectible: 'dancingShoes' },
    { id: 'chocolateRiver', emoji: '🍫', color: '#3c1518', label: 'Chocolate River', collectible: 'specialChocolate' },
    { id: 'finalDestination', emoji: '❤️', color: '#4b0082', label: 'Heart of the Underworld' }
  ];
  
  return (
    <NavContainer>
      <NavBar
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {navItems.map(item => (
          <NavItem
            key={item.id}
            isactive={(currentRealm === item.id).toString()}
            color={item.color}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateToRealm(item.id)}
            title={item.label}
          >
            {item.emoji}
            {item.collectible && collectibles[item.collectible] && (
              <CollectibleIndicator />
            )}
          </NavItem>
        ))}
      </NavBar>
    </NavContainer>
  );
};

export default Navigation;
