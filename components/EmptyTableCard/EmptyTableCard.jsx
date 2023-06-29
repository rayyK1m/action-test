import React from 'react';

import styles from './EmptyTableCard.module.scss';
import Image from 'next/image';

function EmptyTableCard({ text }) {
    return (
        <div className={styles.container}>
            <Image
                src="https://statics.goorm.io/images/gds/empty_folder.svg"
                alt="empty-table"
                width={160}
                height={120}
            />
            <div className="text-gray-800 mt-2">{text}</div>
        </div>
    );
}

export default EmptyTableCard;
