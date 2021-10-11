import React from 'react';

export const createContext = (displayName: string, defaultValue?: any) => {
  const context = React.createContext(defaultValue);
  context.displayName = displayName;

  return {
    Provider: context.Provider,
    useContext: () => React.useContext(context),
  };
};
