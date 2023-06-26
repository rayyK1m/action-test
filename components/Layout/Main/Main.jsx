import styles from './Main.module.scss';
import cn from 'classnames';

const Main = ({ className, ...props }) => {
    return <main className={cn(styles.container, className)} {...props} />;
};

export default Main;
