import { NoticeCircleIcon } from '@goorm-dev/gds-icons';

const ClassStatusText = {
    '교육 진행 중': () => <p className="text-primary">교육 진행 중</p>,
    '교육 예정': () => <p className="text-hint">교육 예정</p>,
    '교육 종료': () => <p className="text-hint">교육 종료</p>,
};

const SubmitedText = {
    제출: () => <p className="text-hint">제출</p>,
    미제출: () => (
        <span className="d-flex align-items-center text-warning">
            <NoticeCircleIcon className="mr-2" />
            <p>미제출</p>
        </span>
    ),
};

const CompletedText = {
    완료: () => <p className="text-hint">완료</p>,
    미완료: () => (
        <span className="d-flex align-items-center text-warning">
            <NoticeCircleIcon className="mr-2" />
            <p>미완료</p>
        </span>
    ),
};

const getKeyOfText = (status) => ({
    '교육 진행 여부': ClassStatusText[status],
    '제출 여부': SubmitedText[status],
    '완료 여부': CompletedText[status],
});

const StatusText = ({ type, status }) => {
    const Component = getKeyOfText(status)[type];

    return <Component />;
};

export default StatusText;
