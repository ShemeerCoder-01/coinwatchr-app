import React, { createContext, useEffect, useState } from "react";

interface ThemeContextType{
    theme:string;
    onChangeTheme:() => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps{
    children:React.ReactNode;
}

type Theme = "dark" | "light";

export const ThemeSwitchProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";

    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  }, []);

  const onChangeTheme = () => {
    setTheme((prevState) => {
      const nextTheme = prevState === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      return nextTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, onChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};