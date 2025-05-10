import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ItemContainer = styled(motion.div)`
  position: absolute;
  cursor: pointer;
  z-index: 10;
  top: ${props => props.top || '40%'};
  left: ${props => props.left || '50%'};
`;

const CollectibleItem = ({ 
  type, 
  top, 
  left, 
  onClick, 
  isVisible = true,
  customStyles = {}
}) => {
  // Different item styles based on type
  const renderItem = () => {
    switch(type) {
      case 'teaLeaf':
        return (
          <motion.div
            style={{
              width: '30px',
              height: '60px',
              background: '#2d6a4f',
              borderRadius: '50% 50% 0 50%',
              transform: 'rotate(45deg)',
              boxShadow: '0 0 10px rgba(45, 106, 79, 0.7)',
              ...customStyles
            }}
            whileHover={{ scale: 1.2, rotate: 50 }}
            whileTap={{ scale: 0.9 }}
          />
        );
        
      case 'magicalQuill':
        return (
          <motion.div
            style={{
              width: '10px',
              height: '80px',
              background: 'linear-gradient(to bottom, #f5f5dc 0%, #f5f5dc 20%, #9932cc 20%, #9932cc 100%)',
              transform: 'rotate(45deg)',
              position: 'relative',
              ...customStyles
            }}
            whileHover={{ scale: 1.2, rotate: 50 }}
            whileTap={{ scale: 0.9 }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-5px',
              width: '20px',
              height: '20px',
              background: '#9932cc',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }} />
          </motion.div>
        );
        
      case 'dancingShoes':
        return (
          <motion.div
            style={{
              width: '60px',
              height: '30px',
              background: '#9932cc',
              borderRadius: '10px 10px 0 0',
              position: 'relative',
              ...customStyles
            }}
            whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
            whileTap={{ scale: 0.9 }}
          >
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '10px',
              background: '#7b2cbf',
              borderRadius: '0 0 10px 10px'
            }} />
          </motion.div>
        );
        
      case 'specialChocolate':
        return (
          <motion.div
            style={{
              width: '40px',
              height: '20px',
              background: '#3a1a00',
              borderRadius: '5px',
              position: 'relative',
              ...customStyles
            }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.8 }}
          >
            <div style={{
              position: 'absolute',
              top: '5px',
              left: '5px',
              width: '30px',
              height: '10px',
              background: '#4a2511',
              borderRadius: '2px'
            }} />
          </motion.div>
        );
        
      default:
        return (
          <motion.div
            style={{
              width: '30px',
              height: '30px',
              background: '#9932cc',
              borderRadius: '50%',
              ...customStyles
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        );
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <ItemContainer
      top={top}
      left={left}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderItem()}
    </ItemContainer>
  );
};

export default CollectibleItem;
