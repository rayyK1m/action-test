import { ellipsisedString } from '@/utils';
import ProgramTypeBadge from '@/view/components/ProgramTypeBadge';

export const getBreadcrumbs = (program, isFoundationPage) => {
    return [
        {
            children: '프로그램 관리',
            to: isFoundationPage
                ? '/foundation/admin/programs'
                : '/institution/admin',
        },
        {
            children: (
                <>
                    <span>{ellipsisedString(program.name, 20)}</span>
                    <ProgramTypeBadge
                        className="ml-1"
                        division={program.type.division}
                        duration={program.type.duration}
                    />
                </>
            ),
            to: isFoundationPage
                ? `/foundation/admin/programs/${program.id}`
                : `/institution/admin/program/${program.id}`,
        },
        {
            children: '신청자 관리',
            active: true,
        },
    ];
};
