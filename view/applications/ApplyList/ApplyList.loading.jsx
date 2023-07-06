import React from 'react';

import { DropdownToggle } from '@goorm-dev/gds-components';
import GridContainer from '@/components/GridContainer';
import ListItemLoading from '../ListItem/ListItem.loading';

import styles from './ApplyList.module.scss';

function ApplyListLoading() {
    return (
        <GridContainer
            colProps={{ md: { size: 10, offset: 1 }, sm: { size: 12 } }}
        >
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h6>신청 내역</h6>{' '}
                <DropdownToggle
                    size="lg"
                    color="link"
                    theme="light"
                    caret
                    disabled
                >
                    전체
                </DropdownToggle>
            </div>

            <div className={styles.item}>
                <ListItemLoading />
                <ListItemLoading />
                <ListItemLoading />
                <ListItemLoading />
                <ListItemLoading />
            </div>
        </GridContainer>
    );
}

export default ApplyListLoading;
