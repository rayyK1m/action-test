import Image from 'next/image';
import cn from 'classnames';

import styles from './EmptyTableCard.module.scss';

export const EMPTY_IMAGE_TYPE = {
    SEARCH: 'https://statics.goorm.io/images/gds/empty_search.svg',
    FOLDER: 'https://statics.goorm.io/images/gds/empty_folder.svg',
    LIST: 'https://statics.goorm.io/images/gds/empty_list.svg',
};

/**
 * @param {String} text 엠티 뷰 텍스트
 * @param {<T> | String} imageSrc EMPTY_IMAGE_TYPE | string
 * @param {Boolean} useBg 백그라운드 박스 사용 여부
 */
function EmptyTableCard({ text, imageSrc, useBg = false }) {
    return (
        <div className={cn(styles.container, useBg && 'bg-gray-100')}>
            <Image src={imageSrc} alt="empty view" width={160} height={120} />
            <div className="text-gray-800 mt-2">{text}</div>
        </div>
    );
}

export default EmptyTableCard;
