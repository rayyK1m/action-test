import { useRouter } from 'next/router';
import { useRef } from 'react';

import { DownloadIcon } from '@goorm-dev/gds-icons';
import Layout from '@/components/Layout/Layout';
import DownloadButton from '@/components/DownloadButton/DownloadButton';
import GridContainer from '@/components/GridContainer';

import useSession from '@/query-hooks/useSession';
import useProgram from '@/query-hooks/useProgram';

import Container from './Container/Container';
import SummaryTable from './SummaryTable';
import EducationLocation from './EducationLocation/index.jsx';
import ContentContainer from './ContentContainer/ContentContainer';
import ContentWrapper from './ContentWrapper/ContentWrapper';
import TargetGroup from './TargetGroup/TargetGroup';
import ApplyButton from './ApplyButton/ApplyButton';
import Nav from './Nav/Nav';

const ProgramDetail = () => {
    const router = useRouter();
    const { data: userData } = useSession.GET();
    const { id } = router.query;
    const { data: programData } = useProgram.GET({
        type: 'detail',
        id,
    });
    const NAV_REF_LIST = [
        { text: '프로그램 소개', ref: useRef(null) },
        { text: '교육 장소', ref: useRef(null) },
        { text: '기관 정보', ref: useRef(null) },
    ].filter(({ text }) => {
        if (programData.type.division !== '집합형') {
            return text !== '교육 장소';
        }
        return true;
    });

    const getNavRef = (navText) => {
        return NAV_REF_LIST.find(({ text }) => text === navText).ref;
    };

    return (
        <>
            <Nav.Provider value={NAV_REF_LIST}>
                <Layout>
                    <Layout.Header userData={userData} />
                    <Layout.Banner />
                    <Layout.Main>
                        <GridContainer
                            colProps={{
                                xs: { size: 8, offset: 2 },
                            }}
                        >
                            <Container>
                                <h2>{programData.name}</h2>
                                <Nav />
                                <ContentContainer>
                                    <ContentContainer
                                        ref={getNavRef('프로그램 소개')}
                                    >
                                        <div>
                                            <h6 className="subtitle-1">
                                                요약 정보
                                            </h6>
                                            <SummaryTable />
                                        </div>
                                        <div>
                                            <h6 className="subtitle-1">
                                                프로그램 소개
                                            </h6>
                                            <ContentWrapper>
                                                {programData.description}
                                            </ContentWrapper>
                                        </div>
                                        <div>
                                            <h6 className="subtitle-1">
                                                운영 지역
                                            </h6>
                                            <ContentWrapper>
                                                {programData.operateLocation}
                                            </ContentWrapper>
                                        </div>
                                        <div>
                                            <h6 className="subtitle-1">
                                                신청 대상
                                            </h6>
                                            <ContentWrapper>
                                                <TargetGroup
                                                    targetGroup={
                                                        programData.targetGroup
                                                    }
                                                />
                                            </ContentWrapper>
                                        </div>
                                        <div>
                                            <h6 className="subtitle-1">
                                                커리큘럼
                                            </h6>
                                            <ContentWrapper>
                                                {programData.curriculum}
                                            </ContentWrapper>
                                        </div>
                                        <div>
                                            <h6 className="subtitle-1">
                                                프로그램 교안 첨부파일
                                            </h6>
                                            <ContentWrapper>
                                                <DownloadButton
                                                    tag="a"
                                                    href={
                                                        programData
                                                            .attachedFiles[0]
                                                    }
                                                    download
                                                    color="basic"
                                                    icon={<DownloadIcon />}
                                                    iconSide="right"
                                                    outline
                                                >
                                                    첨부파일 다운로드
                                                </DownloadButton>
                                                <div className="mt-2 text-hint">
                                                    ※ 교안세부 내용은
                                                    참고용이며, 교육차시나
                                                    세부내용은 변경될 수
                                                    있습니다.
                                                </div>
                                            </ContentWrapper>
                                        </div>
                                        <div>
                                            <h6 className="subtitle-1">
                                                안내 사항
                                            </h6>
                                            <ContentWrapper>
                                                {programData.notice}
                                            </ContentWrapper>
                                        </div>
                                        <div>
                                            <h6 className="subtitle-1">
                                                문의처
                                            </h6>
                                            <ContentWrapper>
                                                {programData.contact}
                                            </ContentWrapper>
                                        </div>
                                    </ContentContainer>
                                    {programData.type.division === '집합형' && (
                                        <div ref={getNavRef('교육 장소')}>
                                            <h6 className="subtitle-1">
                                                교육 장소
                                            </h6>
                                            <EducationLocation />
                                        </div>
                                    )}
                                    <div ref={getNavRef('기관 정보')}>
                                        <h6 className="subtitle-1">
                                            기관 정보
                                        </h6>
                                        <ContentWrapper>
                                            기관 정보
                                        </ContentWrapper>
                                    </div>
                                </ContentContainer>
                            </Container>
                        </GridContainer>
                        <ApplyButton />
                    </Layout.Main>
                    <Layout.Footer />
                </Layout>
            </Nav.Provider>
        </>
    );
};

export default ProgramDetail;
