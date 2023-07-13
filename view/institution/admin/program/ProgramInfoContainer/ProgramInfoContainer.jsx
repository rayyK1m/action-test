import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import useToggle from '@/hooks/useToggle';

import Layout from '@/components/Layout/Layout';
import FormContainer from '@/view/components/FormContainer/FormContainer';
import InfoForm from '@/view/institution/admin/program/ProgramInfoForm';
import EditForm from '@/view/institution/admin/program/ProgramApplyForm';
import ApplyModal from '@/view/institution/admin/program/ApplyModal/ApplyModal';

import { Badge, Button, Form } from '@goorm-dev/gds-components';
import { EditIcon, BackPageIcon } from '@goorm-dev/gds-icons';
import styles from '../program.module.scss';
import PageHeader from '@/components/PageHeader';

const MOCK_DATA = {
    thumbnail: {
        name: '프로그램 썸네일.jpg',
        src: 'https://statics.goorm.io/images/edu/no_search.svg',
    },
    thumnailFile: null,
    name: '신나는 로봇 코딩',
    type: {
        camp: '집합형',
        duration: '단기',
    },
    category: '드론',
    price: 30000,
    description:
        '<p>미래사회의 주된 이동, 운송 수단이 될 드론에 대해 알아보고 이를 통해 목적을 가진 드론을 설계해보는 활동을 진행한다. 이 과정에서 학생들은 인간과 컴퓨터의 연결, 즉 HCI를 생각하며 드론을 조종할 수 있는 조종기 역시 만들어 보도록 한다. 종합적으로 실제 기술을 인간 친화적인 관점과 목적으로 사람에게 도움이 되는 드론을 제작한다.</p>',
    operateLocation: '경기도',
    contact: '담당기관 연락처 : 032-561-7243',
    applyDate: {
        type: {
            start: new Date('2023.06.08. 11:00'),
            end: new Date('2023.06.18. 20:00'),
        },
    },
    // NOTE : targetGroup flat하게 표시하고, 빈 배열 초기화도 시켜서 전달하기
    // targetGroup: {
    //     elementarySchool: [1, 2],
    // },
    elementarySchool: [1, 2],
    middleSchool: [],
    highSchool: [],
    learningTime: 20,
    educationDate: {
        type: {
            start: new Date('2023.06.08. 11:00'),
            end: new Date('2023.06.18. 20:00'),
        },
    },
    curriculum:
        '<p>CHAPTER1</p> <ol><li>우리의 일을 도와줄 로봇의 필요성 탐색, 산업용 로봇의 활용 알아보기</li> <li>드론의 사례 알아보기. 드론의 특징을 알아보기</li></ol>',
    attachedFiles: {
        name: '교안.pdf',
        src: '#',
    },
    notice: '24~25일 2일동안 진행되는 프로그램입니다.',
    educationLocation: {
        name: '구름 타운홀',
        address: ' 경기도 성남시 분당구 판교로 242 PDC A동 902호',
    },
};

function ProgramInfoContainer({ program = MOCK_DATA }) {
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, toggle] = useToggle();

    const { camp, duration } = program.type;

    const methods = useForm({
        mode: 'onTouched',
        defaultValues: program,
    });

    const handleClick = () => {
        setIsEdit(false);
        console.log(methods.getValues());
        // 승인 요청 & toast(승인 요청이 완료되었습니다.) 함께 처리
    };

    return (
        <Layout>
            <Layout.Header />
            <Layout.Main>
                <FormContainer>
                    <PageHeader useHrTag={true}>
                        <PageHeader.Title>
                            <PageHeader.Breadcrumb
                                breadcrumbs={[
                                    {
                                        children: (
                                            <>
                                                {program.name}
                                                <Badge>{camp}</Badge>
                                                <Badge color="dark">
                                                    {duration}
                                                </Badge>
                                            </>
                                        ),
                                        active: false,
                                    },
                                    { children: '프로그램 정보', acitve: true },
                                ]}
                            />
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <Button
                                        icon={<BackPageIcon />}
                                        className="mr-2"
                                        color="link"
                                    />
                                    <h3 className="d-inline">프로그램 정보</h3>
                                </div>
                                {!isEdit && (
                                    <Button
                                        icon={<EditIcon />}
                                        color="link"
                                        onClick={() => setIsEdit(true)}
                                    >
                                        수정하기
                                    </Button>
                                )}
                            </div>
                        </PageHeader.Title>
                    </PageHeader>
                    {/* <div className={styles.header}>
                        <Breadcrumb>
                            <BreadcrumbItem>프로그램 관리</BreadcrumbItem>
                            <BreadcrumbItem className={styles.breadcrumbItem}>
                                {program.name}
                                <Badge>{camp}</Badge>
                                <Badge color="dark">{duration}</Badge>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                프로그램 정보
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <Button
                                    icon={<BackPageIcon />}
                                    className="mr-2"
                                    color="link"
                                />
                                <h3 className="d-inline">프로그램 정보</h3>
                            </div>
                            {!isEdit && (
                                <Button
                                    icon={<EditIcon />}
                                    color="link"
                                    onClick={() => setIsEdit(true)}
                                >
                                    수정하기
                                </Button>
                            )}
                        </div>
                        <hr width="100%" className="mt-3 mb-3" />
                    </div> */}
                    <FormProvider {...methods}>
                        <Form className={styles.forms}>
                            {isEdit ? (
                                <EditForm camp={camp} />
                            ) : (
                                <InfoForm camp={camp} />
                            )}
                        </Form>
                    </FormProvider>
                    {isEdit && (
                        <>
                            <hr width="100%" className="mt-4 mb-4" />
                            <div className="d-flex justify-content-end">
                                <Button color="link" size="xl" className="mr-3">
                                    임시 저장하기
                                </Button>
                                <Button
                                    size="xl"
                                    onClick={toggle}
                                    // NOTE: setError로 에러 처리한 fileInput,checkbox는 따로 에러 처리 해야함
                                    disabled={!methods.formState.isValid}
                                >
                                    승인 요청하기
                                </Button>
                                <ApplyModal
                                    isOpen={isOpen}
                                    toggle={toggle}
                                    handleClick={handleClick}
                                />
                            </div>
                        </>
                    )}
                </FormContainer>
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}

export default ProgramInfoContainer;
