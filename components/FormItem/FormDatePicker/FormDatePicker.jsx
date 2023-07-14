import FormWrapper from '../FormWrapper';

import styles from './FormDatePicker.module.scss';
import {
    DatePickerItem,
    TimePickerItem,
} from '@/view/components/ValidateFormItem';

const FormDatePicker = ({
    label,
    isRequired,
    feedback,
    datePickerKey,
    timePickerKey,
}) => {
    return (
        <FormWrapper label={label} isRequired={isRequired} feedback={feedback}>
            <div className={styles.body}>
                <DatePickerItem datePickerKey={datePickerKey} />
                <TimePickerItem timePickerKey={timePickerKey} />
            </div>
        </FormWrapper>
    );
};

export default FormDatePicker;
