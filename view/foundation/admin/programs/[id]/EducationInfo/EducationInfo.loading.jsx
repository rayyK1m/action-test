import { Skeleton } from '@goorm-dev/gds-components';

import Content from '../Content';
import DownloadButton from '@/components/DownloadButton/DownloadButton';

function EducationInfoLoading() {
    return (
        <Content.Container>
            <Content.Container.Title>교육 정보</Content.Container.Title>
            <Content.Wrapper>
                <Content.Wrapper isRow isSameRatio>
                    <Content.Box>
                        <Content.Box.Title>교육 기간</Content.Box.Title>
                        <Skeleton height="24px" />
                    </Content.Box>
                    <Content.Box>
                        <Content.Box.Title>총 교육 차시</Content.Box.Title>
                        <Skeleton height="24px" />
                    </Content.Box>
                </Content.Wrapper>
                <Content.Box>
                    <Content.Box.Title>커리큘럼</Content.Box.Title>
                    <Skeleton height="40px" />
                </Content.Box>
                <Content.Box>
                    <Content.Box.Title>프로그램 교안</Content.Box.Title>{' '}
                    <div>
                        <DownloadButton
                            size="sm"
                            iconSide="left"
                            block={false}
                            disabled
                        >
                            전체 다운로드
                        </DownloadButton>
                    </div>
                    <Skeleton height="40px" />
                </Content.Box>
                <Content.Box>
                    <Content.Box.Title>안내 사항</Content.Box.Title>
                    <Skeleton height="40px" />
                </Content.Box>
            </Content.Wrapper>
        </Content.Container>
    );
}

export default EducationInfoLoading;
