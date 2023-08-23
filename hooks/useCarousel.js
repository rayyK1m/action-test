import { useState } from 'react';

import useToggle from '@/hooks/useToggle';

const useCarousel = (length) => {
    const [isPaused, togglePause] = useToggle(false);
    const [index, setIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating || isPaused) {
            return;
        }
        const nextIndex = index === length - 1 ? 0 : index + 1;
        setIndex(nextIndex);
    };

    const previous = () => {
        if (animating || isPaused) {
            return;
        }
        const nextIndex = index === 0 ? length - 1 : index - 1;
        setIndex(nextIndex);
    };

    const onExiting = () => {
        setAnimating(true);
    };

    const onExited = () => {
        setAnimating(false);
    };

    const goToIndex = (newIndex) => {
        if (animating) {
            return;
        }
        setIndex(newIndex);
    };

    return {
        activeIndex: index,
        isPaused,
        next,
        previous,
        goToIndex,
        togglePause,
        onExiting,
        onExited,
    };
};

export default useCarousel;
