import { createContext } from 'react';

export const NavContext = createContext(null);

const NavProvider = ({ value, children }) => {
    return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export default NavProvider;
