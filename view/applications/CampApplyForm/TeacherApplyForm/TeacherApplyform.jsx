import { FormDropdown, FormInput, FormWrapper } from '@/components/FormItem';
import { Checkbox, Alert } from '@goorm-dev/gds-components';

import { NoticeCircleIcon } from '@goorm-dev/gds-icons';
import Divider from '@/components/Divider/Divider';

import { LOCATION, SCHOOL } from '../CampApplyForm.constants';

import styles from '../CampApplyForm.module.scss';

// 방문형 프로그램 캠프 신청 폼

export const ProgramForm = ({ program, isInfoPage }) => {
    const { institution, type, title } = program;

    return (
        <div className={styles.form}>
            <h5>프로그램 정보</h5>
            <FormInput
                label="운영 기관 명"
                value={institution}
                disabled={!isInfoPage}
            />
            <div className={styles.divideRow}>
                <FormInput
                    label="프로그램 유형"
                    value={`${type.camp}/${type.duration}`}
                    disabled={!isInfoPage}
                />
                <FormInput
                    label="프로그램 명"
                    value={title}
                    disabled={!isInfoPage}
                />
            </div>
        </div>
    );
};

export const ManagerForm = ({ user, manager, isInfoPage }) => {
    const { email, phoneNumber } = user;
    return (
        <div className={styles.form}>
            <h5>담당자 정보</h5>
            <div className={styles.divideRow}>
                <FormInput
                    label="현장 담당자 명"
                    placeholder="예) 김구름"
                    isRequired
                    value={manager?.name}
                />
                <FormInput
                    label="담당자 연락처"
                    value={phoneNumber}
                    disabled={!isInfoPage}
                />
            </div>
            <div className={styles.divideRow}>
                <FormInput
                    label="담당자 이메일"
                    value={email}
                    disabled={!isInfoPage}
                />
                <FormInput
                    label="소속 학교(교육 장소)"
                    placeholder="소속 학교"
                    value={manager?.school.name}
                    isRequired
                />
            </div>
            <div className={styles.divideRow}>
                <FormDropdown
                    label="신청 지역"
                    placeholder={manager?.school.location || '지역 선택'}
                    items={LOCATION}
                    isRequired
                />
                <FormInput
                    label="학교 유형"
                    value={manager?.school.type}
                    placeholder="예) 늘봄 학교"
                    feedback="미 입력시 일반 학교로 자동 등록됩니다."
                />
            </div>
        </div>
    );
};

export const TeacherForm = ({ educator }) => {
    return (
        <div className={styles.form}>
            <h5>강사 정보</h5>
            <div>
                <div className={styles.divideRow}>
                    <FormInput
                        label="강사명"
                        placeholder="예) 김구름"
                        value={educator?.mainEducator}
                    />
                    <FormInput
                        label="보조 강사명"
                        placeholder="예) 김구름"
                        value={educator?.coEducator}
                    />
                </div>
                <Alert
                    leftIcon={NoticeCircleIcon}
                    className={styles.alert}
                    color="dark"
                >
                    강사 혹은 보조강사를 기재하지 않을 경우, 운영기관에서 배정할
                    수 있습니다.
                </Alert>
            </div>
        </div>
    );
};

export const TargetForm = ({ target }) => {
    const count = target?.headCount ? `${target.headCount}명` : '';

    return (
        <div className={styles.form}>
            <h5>신청 대상 정보</h5>
            <FormWrapper label="신청 대상" isRequired>
                <div className={styles.checkForm}>
                    {Object.entries(SCHOOL).map(([key, school]) => (
                        <div className={styles.school} key={school.key}>
                            <div className={styles.schoolName}>
                                {school.key}
                            </div>
                            <Divider
                                height="0.75rem"
                                className={styles.divider}
                            />
                            <div className={styles.schoolGrade}>
                                {school.value.map((_, idx) => {
                                    const targetGroup =
                                        target?.targetGroup[key] || [];
                                    return (
                                        <Checkbox
                                            label={`${idx + 1}학년`}
                                            key={idx}
                                            checked={targetGroup.includes(
                                                idx + 1,
                                            )}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </FormWrapper>
            <div className={styles.divideRow}>
                <FormInput
                    label="신청 인원"
                    value={count}
                    placeholder="예) 15명"
                    isRequired
                />
                <FormInput
                    label="신청 분반"
                    placeholder="예) 3분반"
                    value={target?.class}
                />
            </div>
        </div>
    );
};

export const LearningTimeForm = ({ learningTime }) => {
    const totalTime = learningTime ? `${learningTime}시간` : '';
    return (
        <div className={styles.form}>
            <h5>교육 시간</h5>
            <FormInput
                label="총 교육 시간"
                placeholder="8시간"
                value={totalTime}
            />
            <div>{/* {교육 이수 기간} */}</div>
        </div>
    );
};
