import Image from 'next/image';
import cn from 'classnames';

import styles from './EmptyTableCard.module.scss';

const EMPTY_TYPE = {
    NO_DATA: 'https://statics.goorm.io/images/gds/empty_folder.svg',
    NO_SEARCH: 'https://statics.goorm.io/images/gds/empty_search.svg',
};

/**
 * @param {Object} props - The component props.
 * @param {('NO_DATA' | 'NO_SEARCH')} [props.type='NO_DATA']
 */
function EmptyTableCard({ text, type = 'NO_DATA', useBg = false }) {
    return (
        <div className={cn(styles.container, useBg && 'bg-gray-100')}>
            <Image
                src={EMPTY_TYPE[type]}
                alt="empty view"
                width={160}
                height={120}
            />
            <div className="text-gray-800 mt-2">{text}</div>
        </div>
    );
}

export default EmptyTableCard;
