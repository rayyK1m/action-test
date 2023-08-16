import { useRouter } from 'next/router';
import { useRef } from 'react';

import { DownloadIcon } from '@goorm-dev/gds-icons';
import DownloadButton from '@/components/DownloadButton/DownloadButton';
import GridContainer from '@/components/GridContainer';
import QuillViewer from '@/components/QuillViewer';

import useProgram from '@/query-hooks/useProgram';

import Container from './Container/Container';
import SummaryTable from './SummaryTable';
import EducationLocation from './EducationLocation';
import ContentContainer from './ContentContainer/ContentContainer';
import ContentWrapper from './ContentWrapper/ContentWrapper';
import TargetGroup from './TargetGroup/TargetGroup';
import ApplyButton from './ApplyButton';
import Nav from './Nav/Nav';
import InstitutionInfo from './InstitutionInfo';

const ProgramDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const {
        data: { item: programData },
    } = useProgram.GET({
        type: 'detail',
        id,
    });
    const NAV_REF_LIST = [
        { text: '프로그램 소개', ref: useRef(null) },
        { text: '교육 장소', ref: useRef(null) },
        { text: '기관 정보', ref: useRef(null) },
    ];

    const getNavRef = (navText) => {
        return NAV_REF_LIST.find(({ text }) => text === navText).ref;
    };

    return (
        <Nav.Provider value={NAV_REF_LIST}>
            <GridContainer
                colProps={{
                    xs: { size: 10, offset: 1 },
                }}
            >
                <Container>
                    <h2>{programData.name}</h2>
                    <Nav />
                    <ContentContainer>
                        <ContentContainer ref={getNavRef('프로그램 소개')}>
                            <div>
                                <h6 className="subtitle-1">요약 정보</h6>
                                <SummaryTable />
                            </div>
                            <div>
                                <h6 className="subtitle-1">프로그램 소개</h6>
                                <QuillViewer tag={ContentWrapper}>
                                    {programData.description}
                                </QuillViewer>
                            </div>
                            <div>
                                <h6 className="subtitle-1">운영 지역</h6>
                                <ContentWrapper>
                                    {programData.operateLocation}
                                </ContentWrapper>
                            </div>
                            <div>
                                <h6 className="subtitle-1">신청 대상</h6>
                                <ContentWrapper>
                                    <TargetGroup
                                        targetGroup={programData.targetGroup}
                                    />
                                </ContentWrapper>
                            </div>
                            <div>
                                <h6 className="subtitle-1">커리큘럼</h6>
                                <QuillViewer tag={ContentWrapper}>
                                    {programData.curriculum}
                                </QuillViewer>
                            </div>
                            <div>
                                <h6 className="subtitle-1">
                                    프로그램 교안 첨부파일
                                </h6>
                                <ContentWrapper>
                                    <DownloadButton
                                        filename="프로그램 교안"
                                        href={programData.attachedFiles[0].url}
                                    >
                                        첨부파일 다운로드
                                    </DownloadButton>
                                    <div className="mt-2 text-hint">
                                        <span className="d-block">
                                            ※ 교안 세부 내용은 참고용이며, 교육
                                            차시나 세부 내용은 변경될 수
                                            있습니다.
                                        </span>
                                        <span className="d-block">
                                            ※ 다운로드에 이상이 있을 경우
                                            contact@goorm.io로 문의해주세요.
                                        </span>
                                    </div>
                                </ContentWrapper>
                            </div>
                            <div>
                                <h6 className="subtitle-1">안내 사항</h6>
                                <ContentWrapper>
                                    {programData.notice}
                                </ContentWrapper>
                            </div>
                            <div>
                                <h6 className="subtitle-1">문의처</h6>
                                <ContentWrapper>
                                    {programData.contact}
                                </ContentWrapper>
                            </div>
                        </ContentContainer>
                        <div ref={getNavRef('교육 장소')}>
                            <h6 className="subtitle-1">교육 장소</h6>
                            <EducationLocation />
                        </div>
                        <div ref={getNavRef('기관 정보')}>
                            <h6 className="subtitle-1">기관 정보</h6>
                            <InstitutionInfo />
                        </div>
                    </ContentContainer>
                </Container>
            </GridContainer>
            <ApplyButton />
        </Nav.Provider>
    );
};

export default ProgramDetail;
