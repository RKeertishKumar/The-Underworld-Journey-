import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useJourney } from '../contexts/JourneyContext';

const SanctuaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #2c3e50;
  color: #ecf0f1;
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

const WritingDesk = styled(motion.div)`
  width: 300px;
  height: 200px;
  background: #8b4513;
  border-radius: 10px;
  position: relative;
  margin-bottom: 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Parchment = styled(motion.div)`
  width: 250px;
  height: 150px;
  background: #f5f5dc;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WrittenText = styled(motion.p)`
  font-family: 'Dancing Script', cursive;
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0;
  line-height: 1.5;
  text-align: center;
`;

const Quill = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 80px;
  background: linear-gradient(to bottom, #f5f5dc 0%, #f5f5dc 20%, #9932cc 20%, #9932cc 100%);
  top: ${props => props.top || '40%'};
  left: ${props => props.left || '70%'};
  transform: rotate(45deg);
  cursor: pointer;
  z-index: 10;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -5px;
    width: 20px;
    height: 20px;
    background: #9932cc;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
`;

const Message = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  padding: 1.5rem;
  border-radius: 10px;
  max-width: 500px;
  margin-top: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
  
  &:hover {
    background: rgba(153, 50, 204, 1);
  }
`;

const WritersSanctuary = () => {
  const { navigateToRealm, collectItem, collectibles } = useJourney();
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showQuill, setShowQuill] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  
  const fullText = "Some stories are written in the stars, others we write together...";
  
  useEffect(() => {
    if (textIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setShowQuill(true);
    }
  }, [textIndex, fullText]);
  
  const handleQuillClick = () => {
    if (!collectibles.magicalQuill) {
      collectItem('magicalQuill');
      setShowMessage(true);
    }
  };
  
  const handleContinue = () => {
    navigateToRealm('danceHall');
  };
  
  return (
    <SanctuaryContainer>
      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        The Writer's Sanctuary
      </Title>
      
      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        A place where words flow like magic, and stories come to life.
      </Description>
      
      <WritingDesk
        whileHover={{ scale: 1.02 }}
      >
        <Parchment>
          <WrittenText>{displayedText}</WrittenText>
        </Parchment>
      </WritingDesk>
      
      {showQuill && (
        <Quill 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleQuillClick}
          top="30%"
          left="65%"
        />
      )}
      
      {showMessage && (
        <Message
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Magical Quill Collected!</h3>
          <p>Some stories are written in the stars, others we write together...</p>
          
          <NavigateButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
          >
            Continue to Dance Hall
          </NavigateButton>
        </Message>
      )}
    </SanctuaryContainer>
  );
};

export default WritersSanctuary;
