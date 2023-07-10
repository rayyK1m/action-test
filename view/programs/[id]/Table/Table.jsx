import cn from 'classnames';
import styles from './Table.module.scss';

const Table = ({ className, ...props }) => {
    return <table className={cn(styles.table, className)} {...props} />;
};

export default Table;
