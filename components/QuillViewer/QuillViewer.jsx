import cn from 'classnames';
import styles from './QuillViewer.module.scss';

function QuillViewer({ tag: Tag = 'div', className, children, ...props }) {
    if (typeof children !== 'string') {
        throw new Error('QuillViewer의 children은 string type만 허용합니다.');
    }

    return (
        <Tag
            className={cn(styles.viewer, className)}
            dangerouslySetInnerHTML={{ __html: children }}
            {...props}
        />
    );
}

export default QuillViewer;
