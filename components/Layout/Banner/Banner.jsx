import Image from 'next/image';
import cn from 'classnames';

import styles from './Banner.module.scss';

const Banner = ({
    imgSrc,
    /**
     * 디지털 새싹 브랜드 박스를 사용할지 여부
     * - 기본값: false
     * - background-color: --newsac-primary / height: 176px
     */
    useBrandBox = false,
    ...props
}) => {
    return (
        <div
            className={cn(
                styles.container,
                useBrandBox && styles.container_useBrandBox,
            )}
            {...props}
        >
            {imgSrc && <Image src={imgSrc} alt="배너 이미지" fill />}
        </div>
    );
};

export default Banner;
