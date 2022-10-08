import React, { useCallback, useMemo, useState } from 'react';

const ThemeContext = React.createContext()

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  const modifyContext = useCallback((value) => {
    setTheme(value)
  }, [])

  const memoValue = useMemo(() => ({
    theme: theme,
    updateContext: modifyContext
  }), [theme, modifyContext])

  return (
    <ThemeContext.Provider value={memoValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext

