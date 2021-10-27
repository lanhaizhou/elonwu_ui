import React from 'react';

export const createContext = (
  displayName: string,
  defaultValue?: any,
): {
  Provider: React.Provider<any>;
  useContext: () => any;
} => {
  const Context = React.createContext(defaultValue);
  Context.displayName = displayName;

  return {
    Provider: Context.Provider,
    useContext: () => React.useContext(Context),
  };
};
