import { Badge } from '@goorm-dev/gds-components';
import { CheckCircleIcon, ErrorCircleIcon } from '@goorm-dev/gds-icons';

export const CampTypeBadge = {
    방문형: <Badge color="primary">선생님</Badge>,
    집합형: <Badge color="success">학생</Badge>,
};

export const ReviewStatusBadge = {
    APPROVE: (
        <Badge color="success" leftIcon={CheckCircleIcon} size="lg">
            승인됨
        </Badge>
    ),
    REJECT: (
        <Badge color="danger" leftIcon={ErrorCircleIcon} size="lg">
            거절됨
        </Badge>
    ),
};
