import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import { Button } from '@goorm-dev/gds-components';
import { WarningIcon, BackPageIcon } from '@goorm-dev/gds-icons';

import styles from './ErrorBoundary.module.scss';

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
 * react-error-boundary를 래핑한 컴포넌트
 * react-query와 함께 사용하며 retry UI를 제공하기 위해서는 ErrorResetBoundary 사용 권장
 *
 * https://www.notion.so/goorm/react-query-43fdd8ffdc43427199e9cb946367ed1f?pvs=4
 *
 * 따로 정의하지 않은 props는 react-error-boundary와 동일
 * @param {function} fallbackRender default: ErrorFallback
 * @param {function} onError 예상치 못한 에러일 경우 실행되지 않고 상위 에러 바운더리로 에러를 던짐
 */
function ErrorBoundary({
	children,
	fallbackRender = ErrorFallback,
	fallback = null,
	onError = (error, info) => {
		if (!isExpectedError(error)) {
			// TODO: 적절한 에러 로깅 처리 필요
			console.error(error, info);
		}
	},
	onReset = null,
	...props
}) {
	return (
		/**
		 * fallback UI props의 우선순위
		 * 1. fallback={<CustomFallback />}
		 * 2. fallbackRender={() => <CustomFallback />}
		 * 3. FallbackComponent={CustomFallback} // 구조분해 할당이 되어 있지 않음
		 *
		 * ex1) <ErrorBoundary />
		 * : defaultProps로 지정되어 있는 <ErrorFallback /> 렌더링 (fallbackRender)
		 *
		 * ex2) <ErrorBoundary fallbackRender={() => <MyFallback />} />
		 * : <MyFallback /> 렌더링
		 *
		 * ex3) <ErrorBoundary fallback={<MyFallback />} />
		 * : defaultProps로 fallbackRender가 지정되긴 하지만, fallback의 우선순위가 높으므로 <MyFallback /> 렌더링
		 */
		<ReactErrorBoundary
			fallbackRender={fallbackRender}
			fallback={fallback}
			onError={onError}
			onReset={onReset}
			{...props}
		>
			{children}
		</ReactErrorBoundary>
	);
}

export default ErrorBoundary;
