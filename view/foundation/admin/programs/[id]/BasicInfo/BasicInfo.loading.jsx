import { Skeleton } from '@goorm-dev/gds-components';

import styles from './BasicInfo.module.scss';

import Content from '../Content';

function BasicInfoLoading() {
    return (
        <Content.Container>
            <Content.Container.Title>기본 정보</Content.Container.Title>
            <Content.Wrapper isRow>
                <Content.Box>
                    <Content.Box.Title>프로그램 썸네일</Content.Box.Title>
                    <Skeleton width="319px" height="179px" />
                    <Skeleton height="32px" />
                </Content.Box>
                <Content.Wrapper>
                    <Content.Box>
                        <Content.Box.Title>프로그램 명</Content.Box.Title>
                        <Skeleton height="24px" />
                    </Content.Box>
                    <Content.Box>
                        <Content.Box.Title>프로그램 카테고리</Content.Box.Title>
                        <Skeleton height="24px" />
                    </Content.Box>
                    <Content.Wrapper isRow>
                        <Content.Box>
                            <Content.Box.Title>프로그램 유형</Content.Box.Title>
                            <div className={styles.badges}>
                                <Skeleton
                                    className={styles.badgeSkeleton}
                                    width="46.83px"
                                    height="24px"
                                />
                                <Skeleton
                                    className={styles.badgeSkeleton}
                                    width="36.56px"
                                    height="24px"
                                />
                            </div>
                        </Content.Box>
                        <Content.Box>
                            <Content.Box.Title>운영 지역</Content.Box.Title>
                            <Skeleton height="24px" />
                        </Content.Box>
                    </Content.Wrapper>
                    <Content.Box>
                        <Content.Box.Title>프로그램 소개</Content.Box.Title>
                        <Skeleton height="40px" />
                    </Content.Box>
                    <Content.Box>
                        <Content.Box.Title>문의처</Content.Box.Title>
                        <Skeleton height="40px" />
                    </Content.Box>
                </Content.Wrapper>
            </Content.Wrapper>
        </Content.Container>
    );
}

export default BasicInfoLoading;
