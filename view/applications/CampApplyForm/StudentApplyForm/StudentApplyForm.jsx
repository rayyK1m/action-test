import { FormDropdown, FormInput, FormWrapper } from '@/components/FormItem';
import { Radio } from '@goorm-dev/gds-components';

import styles from '../CampApplyForm.module.scss';
import Divider from '@/components/Divider/Divider';
import { LOCATION, SCHOOL } from '../CampApplyForm.constants';

// 집합형 프로그램 캠프 신청 폼

export const StudentProgramForm = ({ program, isInfoPage }) => {
    const { institution, type, title, learningTime } = program;

    return (
        <div className={styles.form}>
            <h5>프로그램 정보</h5>
            <div className={styles.divideRow}>
                <FormInput
                    label="운영 기관 명"
                    value={institution}
                    disabled={!isInfoPage}
                />
                <FormInput
                    label="프로그램 명"
                    value={title}
                    disabled={!isInfoPage}
                />
            </div>
            <div className={styles.divideRow}>
                <FormInput
                    label="프로그램 유형"
                    value={`${type.camp}/${type.duration}`}
                    disabled={!isInfoPage}
                />
                <FormInput
                    label="총 교육 시간"
                    value={`${learningTime}시간`}
                    disabled={!isInfoPage}
                />
            </div>
        </div>
    );
};

export const ApplyForm = ({ user, camp, isInfoPage }) => {
    const { email } = user;

    return (
        <div className={styles.form}>
            <h5>신청인 정보</h5>
            <div className={styles.divideRow}>
                <FormInput
                    label="이름"
                    placeholder="예) 김구름"
                    isRequired
                    value={camp?.name}
                />
                <FormInput
                    label="연락처"
                    placeholder="예) 010-1234-5678"
                    isRequired
                    value={camp?.phoneNumber}
                />
            </div>
            <div className={styles.divideRow}>
                <FormInput
                    label="이메일"
                    value={email}
                    disabled={!isInfoPage}
                />
                <FormDropdown
                    label="신청 지역"
                    placeholder={camp?.location || '지역 선택'}
                    items={LOCATION}
                    isRequired
                />
            </div>
            <FormInput
                label="소속 학교"
                placeholder="소속 학교"
                isRequired
                value={camp?.school}
            />
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
                                        camp?.targetGroup[key] || [];
                                    return (
                                        <Radio
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
        </div>
    );
};
