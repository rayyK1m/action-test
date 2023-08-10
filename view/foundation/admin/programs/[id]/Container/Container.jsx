import cn from 'classnames';
import styles from './Container.module.scss';

function Container({ className, ...props }) {
    return <div className={cn(styles.container, className)} {...props} />;
}

export default Container;
