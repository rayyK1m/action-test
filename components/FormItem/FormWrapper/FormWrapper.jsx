import { Label } from '@goorm-dev/gds-components';
import styles from './FormWrapper.module.scss';
import cn from 'classnames';
import { NoticeCircleIcon } from '@goorm-dev/gds-icons';

const FormWrapper = ({
    children,
    label,
    isRequired,
    className,
    formText,
    feedback,
}) => {
    return (
        <div className={cn('w-100', className)}>
            <Label for={label} className={styles.label}>
                {label}
                {isRequired && <span className="ml-1 text-danger">*</span>}
            </Label>
            <div name={label}>{children}</div>
            {feedback && (
                <div className="d-flex align-items-center text-danger mt-1">
                    <NoticeCircleIcon />
                    <p className="ml-1">{feedback}</p>
                </div>
            )}
            {formText && (
                <div className="d-flex align-items-center text-hint mt-1">
                    <p className="ml-1">{formText}</p>
                </div>
            )}
        </div>
    );
};

export default FormWrapper;
