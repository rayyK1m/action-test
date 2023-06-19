import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { Button } from '@goorm-dev/gds-components';
import { WarningIcon, BackPageIcon } from '@goorm-dev/gds-icons';

import styles from './ErrorBoundary.module.scss';

// NOTE: 디자인팀에서 임시로 만들어 둔 UI, 추후 고도화하게 된다면 업데이트 필요
const ErrorFallback = () => {
    const handleClick = () => {
        window.history.back();
    };

    return (
        <div className={styles.errorWrapper}>
            <div className={styles.warningBox}>
                <WarningIcon width="28" height="28" />
            </div>
            <div className="text-gray-600">
                예상치 못한 문제가 발생했습니다.
                <br /> 잠시 후 다시 시도해 주세요.
            </div>
            <Button onClick={handleClick} color="basic" outline>
                <BackPageIcon />
                뒤로가기
            </Button>
        </div>
    );
};

const isExpectedError = (error) => {
    if (!error?.response?.data) {
        return false;
    }
    const { err } = error.response.data;
    // NOTE: err.code 가 존재한다면 예상했던 에러로 판단
    if (!err?.code) {
        return false;
    }
    return true;
};

/**
 * NOTE: 앱 최상단에 감싸서 공통의 에러 fallback UI를 보여주기 위해 사용, 페이지 전체에 에러 화면 표시
 */
const ErrorBoundary = ({ fallback = ErrorFallback, onReset, ...props }) => {
    const { children } = props;
    const { reset } = useQueryErrorResetBoundary(); // NOTE: react-query 사용 시, 에러 초기화 할 때 캐싱된 에러도 초기화해야 함
    const handleError = (error, info) => {
        if (!isExpectedError(error)) {
            // TODO: 적절한 에러 로깅 처리 필요
            console.error(error, info);
        }
    };

    return (
        <ReactErrorBoundary
            fallbackRender={fallback}
            onError={handleError}
            onReset={typeof onReset === 'function' ? onReset : reset}
            {...props}
        >
            {children}
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary;
