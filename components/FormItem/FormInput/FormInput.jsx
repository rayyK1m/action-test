import { Input } from '@goorm-dev/gds-components/dist/cjs';
import FormWrapper from '../FormWrapper';

const FormInput = ({ label, isRequired, size, feedback, ...props }) => {
    return (
        <FormWrapper label={label} isRequired={isRequired} feedback={feedback}>
            <Input bsSize={size} {...props} />
        </FormWrapper>
    );
};

FormInput.defaultProps = {
    size: 'lg',
};

export default FormInput;
