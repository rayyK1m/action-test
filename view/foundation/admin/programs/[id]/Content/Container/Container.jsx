import cn from 'classnames';

import Title from './Title';

import styles from './Container.module.scss';

/**
 *
 * @param {import('./Container.types').ContainerProps} props
 * @returns
 */
function Container({ gap = 'md', className, ...props }) {
    return (
        <div
            className={cn(
                styles.container,
                { [styles[`gap_${gap}`]]: true },
                className,
            )}
            {...props}
        />
    );
}

Container.Title = Title;

export default Container;
