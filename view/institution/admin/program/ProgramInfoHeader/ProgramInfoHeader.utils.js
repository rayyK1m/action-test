import { Badge } from '@goorm-dev/gds-components';

export const getBreadcrumbs = (program) => {
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
                    <Badge className="mr-1">{program.type.division}</Badge>
                    <Badge color="dark">{program.type.duration}</Badge>
                </>
            ),
            active: true,
        },
    ];
};
