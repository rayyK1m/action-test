import { forwardRef } from 'react';
import { Input } from '@goorm-dev/gds-components';
import FormWrapper from '../FormWrapper';
import cn from 'classnames';
import styles from './FormInput.module.scss';

const FormInput = forwardRef(
    (
        {
            inputField,
            id,
            label,
            isRequired,
            size,
            formText,
            feedback,
            className,
            ...props
        },
        ref,
    ) => {
        return (
            <FormWrapper
                label={label}
                isRequired={isRequired}
                formText={formText}
                feedback={feedback}
            >
                <Input
                    ref={ref}
                    bsSize={size}
                    className={cn(className, styles.input)}
                    {...props}
                />
            </FormWrapper>
        );
    },
);

FormInput.defaultProps = {
    size: 'lg',
};

export default FormInput;
