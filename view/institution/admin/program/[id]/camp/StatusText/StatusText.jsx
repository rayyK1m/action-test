import { NoticeCircleIcon } from '@goorm-dev/gds-icons';

const ClassStatusText = {
    '교육 진행 중': () => <p className="text-primary">교육 진행 중</p>,
    '교육 예정': () => <p className="text-hint">교육 예정</p>,
    '교육 종료': () => <p className="text-hint">교육 종료</p>,
};

const SubmitText = {
    제출: () => <p className="text-hint">제출</p>,
    미제출: () => (
        <span className="d-flex align-items-center text-warning">
            <NoticeCircleIcon className="mr-2" />
            <p>미제출</p>
        </span>
    ),
};

const getKeyOfText = (status) => ({
    classStatus: ClassStatusText[status],
    submit: SubmitText[status],
});

const StatusText = ({ type, status }) => {
    const Component = getKeyOfText(status)[type];

    return <Component />;
};

export default StatusText;
