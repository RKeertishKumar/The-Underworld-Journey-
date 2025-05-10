import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
// import { useJourney } from '../contexts/JourneyContext';

const FinalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #4b0082 50%, #3c1518 100%);
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

const CollectiblesDisplay = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

const Collectible = styled(motion.div)`
  width: 50px;
  height: 50px;
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px ${props => props.color};
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
  
  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
`;

const MessageContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  color: #1a1a2e;
  padding: 1.5rem;
  border-radius: 10px;
  max-width: 600px;
  margin: 1.5rem 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.2rem;
    max-width: 90%;
    margin: 1.2rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    margin: 1rem 0;
  }
`;

const Message = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
  white-space: pre-line;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.3;
  }
`;

const ResponseOptions = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.4rem;
    margin-top: 0.8rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.3rem;
    margin-top: 0.6rem;
  }
`;

const ResponseButton = styled(motion.button)`
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  background: ${props => props.isprimary === "true" ? 'rgba(255, 215, 0, 0.8)' : 'rgba(192, 192, 192, 0.8)'};
  border: none;
  color: #1a1a2e;
  cursor: pointer;
  border-radius: 4px;
  font-family: 'Cinzel', serif;
  font-weight: bold;
  margin-bottom: 60px; /* Add space for the navigation bar */
  
  &:hover {
    background: ${props => props.isprimary === "true" ? 'rgba(255, 215, 0, 1)' : 'rgba(192, 192, 192, 1)'};
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
    margin-bottom: 50px;
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.7rem;
    margin-bottom: 40px;
  }
`;

const FinalMessage = () => {
  // No need to use journey context here
  const [showConfetti, setShowConfetti] = useState(false);
  const [response, setResponse] = useState(null);
  
  const message = `Hey,

I realized the last time we met that I really like you and would love to ask you out on a date. I didn't want to look back at college someday and feel like I missed a chance with someone as wonderful as you.

There's absolutely no pressure—I really value our friendship, and if you don't feel the same, that's totally okay. You're someone I feel so comfortable around, and there's no one else I can just chill and joke with the way I can with you.

I'd like the first date to be an open conversation—somewhere chill, just the two of us talking through what we'd want from a relationship. If it feels right, we take it forward. If not, we part on the same friendly note we started with.

And just to end this on a cheesy note—sure, I may not come close to Hades, god of the underworld—but I'd still love to take you out. If the answer's yes, what's your idea of a perfect date?

Take your time, no rush at all. No matter what, I'm still glad to have you in my life.`;

  const handleResponse = (choice) => {
    setResponse(choice);
    if (choice === 'yes') {
      setShowConfetti(true);
    }
  };
  
  return (
    <FinalContainer>
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        The Heart of the Underworld
      </Title>
      
      <CollectiblesDisplay
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Collectible 
          color="#88d8c0"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >🍵</Collectible>
        <Collectible 
          color="#9932cc"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >✒️</Collectible>
        <Collectible 
          color="#ff8c00"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >👞</Collectible>
        <Collectible 
          color="#3a1a00"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >🍫</Collectible>
      </CollectiblesDisplay>
      
      <MessageContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Message>{message}</Message>
        
        {!response && (
          <ResponseOptions
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <ResponseButton
              isprimary="true"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleResponse('yes')}
            >
              Yes, I'd like that
            </ResponseButton>
            
            <ResponseButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleResponse('maybe')}
            >
              Maybe, I need time
            </ResponseButton>
            
            <ResponseButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleResponse('no')}
            >
              No
            </ResponseButton>
          </ResponseOptions>
        )}
        
        {response === 'yes' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Perfect! I'm looking forward to our date.</h3>
            <p>I'll reach out soon to plan something special.</p>
          </motion.div>
        )}
        
        {response === 'maybe' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>No rush at all!</h3>
            <p>Take all the time you need. I'm here whenever you're ready to talk.</p>
          </motion.div>
        )}
        
        {response === 'no' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>I appreciate your honesty.</h3>
            <p>Thank you for being straightforward. I respect your decision.</p>
          </motion.div>
        )}
      </MessageContainer>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        No matter your choice, our story continues...
      </motion.p>
    </FinalContainer>
  );
};

export default FinalMessage;
