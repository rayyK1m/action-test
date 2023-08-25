import { useRouter } from 'next/router';

import QuillViewer from '@/components/QuillViewer';
import { useGetProgramAdmin } from '@/query-hooks/usePrograms';

import styles from './EducationInfo.module.scss';
import Content from '../Content';
import DownloadButton from '@/components/DownloadButton/DownloadButton';
import { getFileIcon } from './EducationInfo.utils';
import { PROGRAM_DIVISION } from '@/constants/db';

function EducationInfo() {
    const router = useRouter();
    const { data: program } = useGetProgramAdmin(router.query.id);

    return (
        <Content.Container>
            <Content.Container.Title>교육 정보</Content.Container.Title>
            <Content.Wrapper>
                <Content.Wrapper isRow isSameRatio>
                    {program.type.division === PROGRAM_DIVISION.집합형 && (
                        <Content.Box>
                            <Content.Box.Title>교육 장소</Content.Box.Title>
                            <div>
                                <Content.Box.Summary isBlock className="mb-1">
                                    {program.educationLocation.name}
                                </Content.Box.Summary>
                                <span className="paragraph text-hint">
                                    {program.educationLocation.address}
                                </span>
                            </div>
                        </Content.Box>
                    )}
                    <Content.Box>
                        <Content.Box.Title>교육 기간</Content.Box.Title>
                        <Content.Box.DateInfo {...program.educationDate} />
                    </Content.Box>
                    <Content.Box>
                        <Content.Box.Title>총 교육 차시</Content.Box.Title>
                        <div className="paragraph-lg">
                            {program.learningTime}차시
                        </div>
                    </Content.Box>
                </Content.Wrapper>
                <Content.Box>
                    <Content.Box.Title>커리큘럼</Content.Box.Title>
                    <QuillViewer className={styles.content}>
                        {program.curriculum}
                    </QuillViewer>
                </Content.Box>
                <Content.Box>
                    <Content.Box.Title>프로그램 교안</Content.Box.Title>
                    <div>
                        <DownloadButton
                            isZip
                            filename="프로그램 교안"
                            href={program.attachedFiles}
                            size="sm"
                            iconSide="left"
                            block={false}
                        >
                            전체 다운로드
                        </DownloadButton>
                    </div>
                    <ul className={styles.attachedFilelist}>
                        {program.attachedFiles.map(
                            ({ filename, url }, index) => {
                                return (
                                    <li key={`${filename}-${index}`}>
                                        <DownloadButton
                                            filename={filename}
                                            isText
                                            size="md"
                                            color="dark"
                                            icon={getFileIcon(filename)}
                                            iconSide="left"
                                            outline={false}
                                            href={url}
                                        >
                                            {filename}
                                        </DownloadButton>
                                    </li>
                                );
                            },
                        )}
                    </ul>
                </Content.Box>
                <Content.Box>
                    <Content.Box.Title>안내 사항</Content.Box.Title>
                    <QuillViewer className={styles.content}>
                        {program.notice}
                    </QuillViewer>
                </Content.Box>
            </Content.Wrapper>
        </Content.Container>
    );
}

export default EducationInfo;
