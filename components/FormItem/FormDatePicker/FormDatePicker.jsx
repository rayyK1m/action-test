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
    formText,
    calendarProps,
    datePickerKey,
    timePickerKey,
    disabled,
}) => {
    return (
        <FormWrapper
            label={label}
            isRequired={isRequired}
            feedback={feedback}
            formText={formText}
        >
            <div className={styles.body}>
                <DatePickerItem
                    datePickerKey={datePickerKey}
                    disabled={disabled}
                    calendarProps={calendarProps}
                />
                <TimePickerItem
                    timePickerKey={timePickerKey}
                    disabled={disabled}
                />
            </div>
        </FormWrapper>
    );
};

export default FormDatePicker;
