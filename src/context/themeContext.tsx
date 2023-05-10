import React, { createContext, useState } from 'react';

interface ThemeContextI {
  darkmode: boolean;
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const themeContext = createContext<ThemeContextI>({
  darkmode: false,
  setDarkmode: () => {},
});

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkmode, setDarkmode] = useState(false);
  return (
    <themeContext.Provider value={{ darkmode, setDarkmode }}>
      {children}
    </themeContext.Provider>
  );
};
