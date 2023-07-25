import cn from 'classnames';

import { Checkbox, TextButton } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';
import styles from '../CampForms.module.scss';

export const TermsForm = ({ terms, setTerms }) => {
    const { thirdPartyInfoTerm, personalInfoTerm } = terms;

    const handleChange = (target) => {
        if (target.checked) {
            if (target.name === 'all')
                setTerms({ thirdPartyInfoTerm: true, personalInfoTerm: true });
            setTerms((terms) => ({ ...terms, [target.name]: true }));
        } else {
            if (target.name === 'all')
                setTerms({
                    thirdPartyInfoTerm: false,
                    personalInfoTerm: false,
                });
            setTerms((terms) => ({ ...terms, [target.name]: false }));
        }
    };

    const handleTermClick = (e) => {
        e.preventDefault();
        /** NOTE: 해당 링크 확정적이지 않음. 수정 예정 */
        window.open(
            'https://www.notion.so/goorm/SWCAMP_LMS-f82c89246ff147bc96a74ab02a2991ae',
        );
    };

    return (
        <div className={styles.form}>
            <h5>약관 동의</h5>
            <div className={styles.checkForm}>
                <Checkbox
                    label="전체 동의"
                    name="all"
                    checked={thirdPartyInfoTerm && personalInfoTerm}
                    onChange={(e) => handleChange(e.target)}
                />
                <div className="d-flex align-items-center">
                    <Checkbox
                        label="[필수] 개인정보 수집 및 이용"
                        className="mr-4"
                        name="personalInfoTerm"
                        checked={personalInfoTerm}
                        onChange={(e) => handleChange(e.target)}
                    />
                    <TextButton
                        color="link"
                        size="sm"
                        icon={ChevronRightIcon}
                        iconSide="right"
                        onClick={handleTermClick}
                    >
                        더보기
                    </TextButton>
                </div>
                <div className="d-flex align-items-center">
                    <Checkbox
                        label="[필수] 제 3자 정보 제공 동의"
                        className="mr-4"
                        name="thirdPartyInfoTerm"
                        checked={thirdPartyInfoTerm}
                        onChange={(e) => handleChange(e.target)}
                    />
                    <TextButton
                        color="link"
                        size="sm"
                        icon={ChevronRightIcon}
                        iconSide="right"
                        onClick={handleTermClick}
                    >
                        더보기
                    </TextButton>
                </div>
            </div>
        </div>
    );
};

export const ReadOnlyTermsForm = () => {
    const handleTermClick = (e) => {
        e.preventDefault();
        /** NOTE: 해당 링크 확정적이지 않음. 수정 예정 */
        window.open(
            'https://www.notion.so/goorm/SWCAMP_LMS-f82c89246ff147bc96a74ab02a2991ae',
        );
    };
    return (
        <div className={styles.form}>
            <h5>약관 동의</h5>
            <div className={styles.checkForm}>
                <Checkbox
                    label="전체 동의"
                    checked
                    readOnly
                    className={styles.readOnly}
                />
                <div className="d-flex align-items-center">
                    <Checkbox
                        label="[필수] 개인정보 수집 및 이용"
                        className={cn('mr-4', styles.readOnly)}
                        checked
                        readOnly
                    />
                    <TextButton
                        color="link"
                        size="sm"
                        icon={ChevronRightIcon}
                        iconSide="right"
                        onClick={handleTermClick}
                    >
                        더보기
                    </TextButton>
                </div>
                <div className="d-flex align-items-center">
                    <Checkbox
                        label="[필수] 제 3자 정보 제공 동의"
                        className={cn('mr-4', styles.readOnly)}
                        checked
                        readOnly
                    />
                    <TextButton
                        color="link"
                        size="sm"
                        icon={ChevronRightIcon}
                        iconSide="right"
                        onClick={handleTermClick}
                    >
                        더보기
                    </TextButton>
                </div>
            </div>
        </div>
    );
};
