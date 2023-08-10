import cn from 'classnames';
import styles from './Box.module.scss';
import Title from './Title';
import Summary from './Summary';
import DateInfo from './DateInfo';

function Box({ className, ...props }) {
    return <div className={cn(styles.box, className)} {...props} />;
}

Box.Title = Title;
Box.Summary = Summary;
Box.DateInfo = DateInfo;

export default Box;
