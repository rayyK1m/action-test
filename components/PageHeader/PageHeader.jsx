import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

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

    return (
        <GDSBreadcrumb className="mb-2">
            {breadcrumbs.map((breadcrumb) => {
                // NOTE: 현재 페이지에 대해서는 링크 태그를 사용할 필요가 없기 때문에 그에 대한 처리를 위해 아래 커스텀 A 태그를 사용
                const ATag = breadcrumb.active ? 'span' : Link;
                return (
                    <BreadcrumbItem
                        key={breadcrumb.to}
                        active={breadcrumb.active}
                        size="md"
                        className={styles.breadcrumbItem}
                    >
                        <ATag href={breadcrumb.to}>{breadcrumb.children}</ATag>
                    </BreadcrumbItem>
                );
            })}
        </GDSBreadcrumb>
    );
}
function Description({ children }) {
    return (
        <CustomAlert
            leftIcon={InfoCircleIcon}
            className={cn(styles.alert, 'mb-0')}
        >
            {children}
        </CustomAlert>
    );
}

PageHeader.Title = Title;
PageHeader.Breadcrumb = Breadcrumb;
PageHeader.Description = Description;

export default PageHeader;
