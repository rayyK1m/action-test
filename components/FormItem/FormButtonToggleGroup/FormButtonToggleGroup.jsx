import { UncontrolledButtonToggleGroup } from '@goorm-dev/gds-components';
import FormWrapper from '../FormWrapper';

const FormButtonToggleGroup = ({
    label,
    isRequired,
    defaultIndex,
    items,
    ...props
}) => {
    return (
        <FormWrapper label={label} isRequired={isRequired}>
            <UncontrolledButtonToggleGroup
                defaultIndex={defaultIndex}
                {...props}
            >
                {items.map((item, index) => (
                    <UncontrolledButtonToggleGroup.ButtonToggleItem
                        key={index}
                        {...item.props}
                    >
                        {item.children}
                    </UncontrolledButtonToggleGroup.ButtonToggleItem>
                ))}
            </UncontrolledButtonToggleGroup>
        </FormWrapper>
    );
};

export default FormButtonToggleGroup;
