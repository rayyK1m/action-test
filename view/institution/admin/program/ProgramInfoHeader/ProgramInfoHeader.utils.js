import { PROGRAM_DIVISION } from '@/constants/db';
import { Badge } from '@goorm-dev/gds-components';

export const getBreadcrumbs = (program) => {
    const isStudent = program.type.division === PROGRAM_DIVISION.집합형;

    return [
        {
            children: '프로그램 관리',
            to: '/institution/admin',
            acitve: false,
        },
        {
            children: (
                <>
                    <span className="mr-1">{program.name}</span>
                    <Badge
                        className="mr-1"
                        color={isStudent ? 'success' : 'primary'}
                    >
                        {program.type.division}
                    </Badge>
                    <Badge color="dark">{program.type.duration}</Badge>
                </>
            ),
            active: true,
        },
    ];
};
