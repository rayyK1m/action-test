import ProgramTypeBadge from '@/view/components/ProgramTypeBadge';

import { ellipsisedString } from '@/utils';
import { ROLE } from '@/constants/db';

export const getCampsBreadcrumbs = (program, role) => {
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
            active: true,
        },
    ];
};
