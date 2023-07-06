import React from 'react';

import { InfoCircleIcon } from '@goorm-dev/gds-icons';
import {
    Breadcrumb as GDSBreadcrumb,
    BreadcrumbItem,
} from '@goorm-dev/gds-components';
import CustomAlert from '@/components/CustomAlert/CustomAlert';

import styles from './PageHeader.module.scss';

function PageHeader({ children, useHrTag }) {
    return (
        <div className={styles.header}>
            {children}
            {useHrTag && <hr width="100%" className="m-0" />}
        </div>
    );
}

function Title({ children, className }) {
    return <header className={className}>{children}</header>;
}

function Breadcrumb({ breadcrumbs }) {
    // NOTE: PageHeader.Title 내부에서 사용해야 gap (css)가 시안대로 적용됨
    // TODO: 2차 MVP로 Breadcrumb에 네비게이션 기능 추가 필요, 아래 컴포넌트는 추후에 수정될 수 있음 (확정 x)

    return (
        <GDSBreadcrumb className="mb-2">
            {breadcrumbs.map((breadcrumb) => {
                return (
                    <BreadcrumbItem
                        key={breadcrumb.to}
                        active={breadcrumb.active}
                        size="md"
                    >
                        {breadcrumb.children}
                    </BreadcrumbItem>
                );
            })}
        </GDSBreadcrumb>
    );
}
function Description({ children }) {
    return (
        <CustomAlert leftIcon={InfoCircleIcon} className="mb-0">
            {children}
        </CustomAlert>
    );
}

PageHeader.Title = Title;
PageHeader.Breadcrumb = Breadcrumb;
PageHeader.Description = Description;

export default PageHeader;
