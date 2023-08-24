import cn from 'classnames';
import styles from './CarouselController.module.scss';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    PauseIcon,
    PlayIcon,
} from '@goorm-dev/gds-icons';

/**
 *
 * @param {import('./CarouselController.types').CarouselControllerProps} props
 * @returns
 */
function CarouselController({
    className,
    activeIndex,
    count,
    isPaused,
    onClickPrevious,
    onClickPause,
    onClickNext,
    direction = 'top-right',
}) {
    const PlayModeIcon = isPaused ? PlayIcon : PauseIcon;

    return (
        <div
            className={cn(
                styles.container,
                styles[`container_${direction}`],
                className,
            )}
        >
            <span>
                {activeIndex + 1}/{count}
            </span>
            <div className={cn(styles.controller)}>
                <ChevronLeftIcon
                    size="14px"
                    color="#FFF"
                    onClick={onClickPrevious}
                />
                <PlayModeIcon size="14px" color="#FFF" onClick={onClickPause} />
                <ChevronRightIcon
                    size="14px"
                    color="#FFF"
                    onClick={onClickNext}
                />
            </div>
        </div>
    );
}

export default CarouselController;
