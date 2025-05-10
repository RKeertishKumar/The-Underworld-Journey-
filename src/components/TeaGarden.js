import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useJourney } from '../contexts/JourneyContext';

const GardenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #a8e6cf, #1b4332);
  color: white;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Cinzel', serif;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
`;

const TeaCup = styled(motion.div)`
  width: 150px;
  height: 100px;
  background: #f5f5f5;
  border-radius: 0 0 75px 75px;
  position: relative;
  margin-bottom: 3rem;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
    background: ${props => props.ischilled === "true" ? '#88d8c0' : '#90ee90'};
    border-radius: 0 0 75px 75px;
    transition: background 0.5s ease;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 20%;
    right: -30px;
    width: 40px;
    height: 60px;
    border: 10px solid #f5f5f5;
    border-radius: 20px;
  }
`;

const TeaLeaf = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 60px;
  background: #2d6a4f;
  border-radius: 50% 50% 0 50%;
  transform: rotate(45deg);
  top: ${props => props.top || '40%'};
  left: ${props => props.left || '60%'};
  opacity: ${props => props.isVisible ? 1 : 0};
  cursor: pointer;
  z-index: 10;
`;

const Message = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  color: #1b4332;
  padding: 1.5rem;
  border-radius: 10px;
  max-width: 500px;
  margin-top: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const NavigateButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background: rgba(45, 106, 79, 0.8);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 2rem;
  font-family: 'Cinzel', serif;
  
  &:hover {
    background: rgba(45, 106, 79, 1);
  }
`;

const TeaGarden = () => {
  const { navigateToRealm, collectItem, collectibles } = useJourney();
  const [isChilled, setIsChilled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showLeaf, setShowLeaf] = useState(false);
  
  const handleTeaCupClick = () => {
    setIsChilled(true);
    setTimeout(() => {
      setShowLeaf(true);
    }, 1000);
  };
  
  const handleLeafClick = () => {
    if (!collectibles.teaLeaf) {
      collectItem('teaLeaf');
      setShowMessage(true);
    }
  };
  
  const handleContinue = () => {
    navigateToRealm('writersSanctuary');
  };
  
  return (
    <GardenContainer>
      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        The Tea Gardens
      </Title>
      
      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        A serene garden where thoughts brew like perfectly chilled tea. Click the cup to cool it down.
      </Description>
      
      <TeaCup 
        ischilled={isChilled ? "true" : "false"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleTeaCupClick}
      />
      
      {showLeaf && (
        <TeaLeaf 
          isVisible={showLeaf}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleLeafClick}
          top="30%"
          left="55%"
        />
      )}
      
      {showMessage && (
        <Message
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>A Glowing Tea Leaf Collected!</h3>
          <p>Like your favorite tea, some feelings are best when they've had time to develop...</p>
          
          <NavigateButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
          >
            Continue to Writer's Sanctuary
          </NavigateButton>
        </Message>
      )}
    </GardenContainer>
  );
};

export default TeaGarden;
