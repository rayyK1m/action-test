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
            <DatePickerItem
                isRequired={isRequired}
                datePickerKey={datePickerKey}
                disabled={disabled}
                calendarProps={calendarProps}
            />
            {/* <TimePickerItem
                    isRequired={isRequired}
                    timePickerKey={timePickerKey}
                    disabled={disabled}
                /> */}
        </FormWrapper>
    );
};

export default FormDatePicker;
