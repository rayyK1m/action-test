import { ellipsisedString } from '@/utils';
import ProgramTypeBadge from '@/view/components/ProgramTypeBadge';
import { useRouter } from 'next/router';

export const getBreadcrumbs = (program) => {
    const router = useRouter();
    let isFoundationPage = false;
    if (router.pathname.split('/')[1] === 'foundation') {
        isFoundationPage = true;
    }

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
