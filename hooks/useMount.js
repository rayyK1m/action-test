import { useState, useEffect } from 'react';

const useMount = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted;
};

export default useMount;
