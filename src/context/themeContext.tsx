import React, { createContext, useMemo, useState } from 'react';

interface ThemeContextI {
  darkmode: boolean;
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkmodeActive: string;
}

export const themeContext = createContext<ThemeContextI>({
  darkmode: false,
  setDarkmode: () => {},
  isDarkmodeActive: '',
});

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkmode, setDarkmode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
  const isDarkmodeActive: string = useMemo(
    () => (darkmode ? 'dark' : ''),
    [darkmode]
  );

  return (
    <themeContext.Provider value={{ darkmode, setDarkmode, isDarkmodeActive }}>
      {children}
    </themeContext.Provider>
  );
};
