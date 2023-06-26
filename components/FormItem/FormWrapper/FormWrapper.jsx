import { FormFeedback, Label } from '@goorm-dev/gds-components';
import styles from './FormWrapper.module.scss';

const FormWrapper = ({ children, label, isRequired, feedback }) => {
    return (
        <div className="w-100">
            <Label for={label} className={styles.label}>
                {label}
                {isRequired && <span className="ml-1 text-danger">*</span>}
            </Label>
            <div name={label}>{children}</div>
            {feedback && <p className="mt-1 text-gray-600">{feedback}</p>}
        </div>
    );
};

export default FormWrapper;
