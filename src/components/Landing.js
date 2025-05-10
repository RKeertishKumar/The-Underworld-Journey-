import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useJourney } from '../contexts/JourneyContext';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #4b0082 0%, #9932cc 50%, #ff8c00 100%);
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
  font-size: 3rem;
  margin-bottom: 2rem;
  font-family: 'Cinzel', serif;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`;

const EnterButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-family: 'Cinzel', serif;
  transition: all 0.3s ease;
  margin-bottom: 80px; /* Add space for the navigation bar */
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.6rem;
    font-size: 1.1rem;
    margin-bottom: 60px;
  }
  
  @media (max-width: 480px) {
    padding: 0.7rem 1.4rem;
    font-size: 1rem;
    margin-bottom: 50px;
  }
`;

const Portal = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, #9932cc 0%, #4b0082 100%);
  margin-bottom: 2rem;
  box-shadow: 0 0 30px rgba(255, 140, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    margin-bottom: 1rem;
  }
`;

const Landing = () => {
  const { navigateToRealm } = useJourney();
  
  const handleEnter = () => {
    navigateToRealm('teaGarden');
  };
  
  return (
    <LandingContainer>
      <Portal
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 1.5, type: 'spring' }}
      />
      
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        The Underworld Journey
      </Title>
      
      <Subtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        A journey awaits... Will you enter?
      </Subtitle>
      
      <EnterButton
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleEnter}
      >
        Enter the Underworld
      </EnterButton>
    </LandingContainer>
  );
};

export default Landing;
