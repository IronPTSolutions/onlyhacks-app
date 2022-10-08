import React, { useCallback, useMemo, useState } from 'react';

const ThemeContext = React.createContext()

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  const modifyContext = useCallback(() => { // este hook me permite "guardar" la referencia de una función cuando se vuelva a montar el componente, si lo utilizo por ejemplo en el array de dependencias de un useEffect se vería modificado si se monta el componente de nuevo.
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme])

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

