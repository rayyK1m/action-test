import { ellipsisedString } from '@/utils';
import ProgramTypeBadge from '@/view/components/ProgramTypeBadge';

import { ROLE } from '@/constants/db';

export const getCampBreadcrumbs = ({ program, institutionId, role }) => {
    const {
        id: programId,
        name,
        type: { division, duration },
    } = program;

    return [
        {
            children: '프로그램 관리',
            to:
                role === ROLE.INSTITUTION
                    ? '/institution/admin'
                    : '/foundation/admin/programs',
        },
        {
            children: (
                <>
                    <span>{ellipsisedString(name, 20)}</span>
                    <ProgramTypeBadge
                        className="ml-1"
                        division={division}
                        duration={duration}
                    />
                </>
            ),
            to:
                role === ROLE.INSTITUTION
                    ? `/institution/admin/program/${programId}`
                    : `/foundation/admin/programs/${programId}`,
        },
        {
            children: '캠프 관리',
            to:
                role === ROLE.INSTITUTION
                    ? `/institution/admin/program/${programId}/camp?division=${division}`
                    : `/foundation/admin/programs/${programId}/camps?division=${division}&institutionId=${institutionId}`,
        },
        {
            children: '캠프 상세',
            active: true,
        },
    ];
};
