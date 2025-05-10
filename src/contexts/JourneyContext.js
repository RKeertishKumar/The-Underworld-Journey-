import React, { createContext, useState, useContext } from 'react';

// Create the context
const JourneyContext = createContext();

// Custom hook to use the journey context
export const useJourney = () => useContext(JourneyContext);

// Provider component
export const JourneyProvider = ({ children }) => {
  // State for tracking the current realm/stage
  const [currentRealm, setCurrentRealm] = useState('landing');
  
  // State for tracking collected items
  const [collectibles, setCollectibles] = useState({
    teaLeaf: false,
    magicalQuill: false,
    dancingShoes: false,
    specialChocolate: false
  });
  
  // Function to collect an item
  const collectItem = (item) => {
    setCollectibles(prev => ({
      ...prev,
      [item]: true
    }));
  };
  
  // Function to navigate to a new realm
  const navigateToRealm = (realm) => {
    setCurrentRealm(realm);
  };
  
  // Check if all items have been collected
  const allItemsCollected = () => {
    return Object.values(collectibles).every(value => value === true);
  };
  
  // The value that will be provided to consumers of this context
  const value = {
    currentRealm,
    navigateToRealm,
    collectibles,
    collectItem,
    allItemsCollected
  };
  
  return (
    <JourneyContext.Provider value={value}>
      {children}
    </JourneyContext.Provider>
  );
};
