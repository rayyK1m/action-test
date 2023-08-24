import { useRouter } from 'next/router';
import Image from 'next/image';

import { useGetProgramAdmin } from '@/query-hooks/usePrograms';
import QuillViewer from '@/components/QuillViewer';

import styles from './BasicInfo.module.scss';
import DownloadButton from '@/components/DownloadButton/DownloadButton';
import { Badge } from '@goorm-dev/gds-components';
import { STATUS_BADGE } from '../[id].constants';
import Content from '../Content';

function BasicInfo() {
    const router = useRouter();
    const { data: program } = useGetProgramAdmin(router.query.id);

    const {
        thumbnail,
        name,
        category,
        type: { division, duration },
        operateLocation,
        description,
        contact,
        difficulty,
    } = program;

    return (
        <Content.Container>
            <Content.Container.Title>기본 정보</Content.Container.Title>
            <Content.Wrapper isRow>
                <Content.Box>
                    <Content.Box.Title>프로그램 썸네일</Content.Box.Title>
                    <Image
                        src={thumbnail.url}
                        alt="thumbnail"
                        width={319}
                        height={179}
                        className={styles.thumbnailImage}
                    />
                    <DownloadButton
                        filename={thumbnail.filename}
                        href={thumbnail.url}
                    >
                        {thumbnail.filename}
                    </DownloadButton>
                </Content.Box>
                <Content.Wrapper>
                    <Content.Box>
                        <Content.Box.Title>프로그램 명</Content.Box.Title>
                        <Content.Box.Summary>{name}</Content.Box.Summary>
                    </Content.Box>
                    <Content.Box>
                        <Content.Box.Title>프로그램 카테고리</Content.Box.Title>
                        <Content.Box.Summary>{category}</Content.Box.Summary>
                    </Content.Box>
                    <Content.Wrapper isRow>
                        <Content.Box>
                            <Content.Box.Title>프로그램 수준</Content.Box.Title>
                            <Content.Box.Summary>
                                {difficulty}
                            </Content.Box.Summary>
                        </Content.Box>
                        <Content.Box>
                            <Content.Box.Title>프로그램 유형</Content.Box.Title>
                            <div className={styles.badges}>
                                <Badge
                                    size="md"
                                    pill
                                    color={STATUS_BADGE[division].color}
                                >
                                    {division}
                                </Badge>
                                <Badge size="md" pill color="dark">
                                    {duration}
                                </Badge>
                            </div>
                        </Content.Box>
                        <Content.Box>
                            <Content.Box.Title>운영 지역</Content.Box.Title>
                            <Content.Box.Summary>
                                {operateLocation}
                            </Content.Box.Summary>
                        </Content.Box>
                    </Content.Wrapper>
                    <Content.Box>
                        <Content.Box.Title>프로그램 소개</Content.Box.Title>
                        <QuillViewer className={styles.content}>
                            {description}
                        </QuillViewer>
                    </Content.Box>
                    <Content.Box>
                        <Content.Box.Title>문의처</Content.Box.Title>
                        <div className={styles.content}>{contact}</div>
                    </Content.Box>
                </Content.Wrapper>
            </Content.Wrapper>
        </Content.Container>
    );
}

export default BasicInfo;
