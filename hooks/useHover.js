import { useRef, useState, useEffect, useCallback } from 'react';

function useHover() {
    const [value, setValue] = useState(false);

    const ref = useRef(null);

    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);

    useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener('mouseenter', setTrue);
                node.addEventListener('mouseleave', setFalse);

                return () => {
                    node.removeEventListener('mouseenter', setTrue);
                    node.removeEventListener('mouseleave', setFalse);
                };
            }
            return undefined;
        },
        [ref.current], // Recall only if ref changes
    );

    return [ref, value, setTrue, setFalse];
}

export default useHover;
