import { Carousel, CarouselItem } from '@goorm-dev/gds-components';

import styles from './ContributorBanner.module.scss';
import useCarousel from '@/hooks/useCarousel';
import CarouselController from '@/components/CarouselController';
import Image from 'next/image';
import { createHangulJamoCombination } from '@/utils';
import { CONTRIBUTOR_LOGOS_LIST } from './ContributorBanner.constants';

function ContributorBanner() {
    const {
        activeIndex,
        isPaused,
        next,
        previous,
        togglePause,
        onExiting,
        onExited,
    } = useCarousel(CONTRIBUTOR_LOGOS_LIST.length);

    return (
        <div className={styles.container}>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                interval={3000}
                keyboard={false}
                className={styles.carouselSlide}
            >
                {CONTRIBUTOR_LOGOS_LIST.map((CONTRIBUTOR_LOGOS, index) => {
                    return (
                        <CarouselItem
                            key={index}
                            onExiting={onExiting}
                            onExited={onExited}
                        >
                            <div className={styles.logoContainer}>
                                {CONTRIBUTOR_LOGOS.map((CONTRIBUTOR) => {
                                    return (
                                        <Image
                                            key={`${CONTRIBUTOR}_${index}`}
                                            src={`https://statics.goorm.io/images/newsac/contributor-logo/${createHangulJamoCombination(
                                                CONTRIBUTOR,
                                            )}.svg`}
                                            alt={CONTRIBUTOR}
                                            width={150}
                                            height={55}
                                        />
                                    );
                                })}
                            </div>
                        </CarouselItem>
                    );
                })}
            </Carousel>
            <CarouselController
                activeIndex={activeIndex}
                count={CONTRIBUTOR_LOGOS_LIST.length}
                isPaused={isPaused}
                onClickPrevious={previous}
                onClickNext={next}
                onClickPause={togglePause}
            />
        </div>
    );
}

export default ContributorBanner;
