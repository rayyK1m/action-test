import Summary from './Summary';
import Title from './Title';

import cn from 'classnames';
import styles from './Box.module.scss';

function Box({ className, ...props }) {
    return <div className={cn(styles.container, className)} {...props} />;
}

Box.Title = Title;
Box.Summary = Summary;

export default Box;
