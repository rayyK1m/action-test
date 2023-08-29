import React from 'react';
import cn from 'classnames';

import { Button } from '@goorm-dev/gds-components';
import { RefreshIcon, WarningIcon } from '@goorm-dev/gds-icons';

import styles from './ErrorBox.module.scss';

const PRODUCTION = 'production';
function ErrorBox({
    onClick = () => window.location.reload(),
    feedback = '',
    devFeedback = '',
    useRetry = true,
}) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div
                className={cn(
                    styles.div,
                    'd-flex justify-content-center align-items-center bg-orange-500 mb-3',
                )}
            >
                <WarningIcon className={cn(styles.icon, 'text-gray-000')} />
            </div>
            <p className="text-hint text-center my-2 mb-3">
                <div className="d-block subtitle-2 mb-0  text-gray-600">
                    정보를 불러오는데 실패했습니다.
                    <br /> 다시 시도해 주세요.
                </div>

                <div className="d-block subtitle-2 mb-0 text-gray-600">
                    {feedback}
                    [DEV] {process.env.NODE_ENV !== PRODUCTION && devFeedback}
                </div>
            </p>
            {useRetry && (
                <Button
                    color="basic"
                    size="md"
                    outline
                    className="d-flex align-items-center"
                    onClick={onClick}
                >
                    <RefreshIcon className="mr-1" />
                    <span>새로고침</span>
                </Button>
            )}
        </div>
    );
}

export default ErrorBox;
