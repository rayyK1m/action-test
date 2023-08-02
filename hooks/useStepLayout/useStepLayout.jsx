import React, { Fragment, useState } from 'react';
import cn from 'classnames';

import { ChevronRightIcon } from '@goorm-dev/gds-icons';

import styles from './styles.module.scss';

const STATUS = {
    SUCCESS: 'success',
    ACTIVE: 'active',
    DEFAULT: 'default',
};

const getStepStatus = (index, stepIndex) => {
    let status = '';
    if (index < stepIndex) {
        status = STATUS.SUCCESS;
    } else if (index === stepIndex) {
        status = STATUS.ACTIVE;
    } else {
        status = STATUS.DEFAULT;
    }
    return status;
};

const Steps = ({ steps, stepIndex }) => {
    return (
        <div className={styles.stepContainer}>
            {steps.map((step, idx) => {
                const Icon = step.icon;
                const status = getStepStatus(idx, stepIndex);
                const isFirst = idx === 0;
                return (
                    <Fragment key={step.key}>
                        {!isFirst && (
                            <ChevronRightIcon
                                className="text-gray-600"
                                width="16"
                                height="16"
                            />
                        )}
                        <div key={step.key} className={styles.step}>
                            <Icon
                                className={cn(
                                    styles.icon,
                                    styles[`icon_${status}`],
                                )}
                            />
                            <div
                                className={cn(
                                    styles.text,
                                    styles[`text_${status}`],
                                )}
                            >
                                {step.text}
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
};

function useStepLayout(steps, defaultIndex = 0) {
    const [stepIndex, setStepIndex] = useState(defaultIndex);
    const StepLayout = () => <Steps steps={steps} stepIndex={stepIndex} />;

    const prev = () =>
        setStepIndex((prev) => {
            if (prev < 1) {
                return 0;
            }
            return prev - 1;
        });
    const next = () =>
        setStepIndex((prev) => {
            if (prev > steps.length - 1) {
                return steps.length - 1;
            }

            return prev + 1;
        });
    return { stepIndex, prev, next, StepLayout };
}

export default useStepLayout;
