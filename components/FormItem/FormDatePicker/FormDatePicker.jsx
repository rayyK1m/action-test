import { DatePicker } from '@goorm-dev/gds-components';
import FormWrapper from '../FormWrapper';

const FormDatePicker = ({ label, isRequired, feedback, ...props }) => {
    return (
        <FormWrapper
            label={label}
            isRequired={isRequired}
            feedback={feedback}
        ></FormWrapper>
    );
};
