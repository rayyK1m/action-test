import cn from 'classnames';

import { Checkbox, TextButton } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';

import styles from '../CampForms.module.scss';
import { POLICY_AND_TERMS_LINK } from '@/constants/common';

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

        const { id } = e.target.dataset;

        if (id === '개인정보 수집 및 이용 동의') {
            window.open(POLICY_AND_TERMS_LINK.개인정보_수집_및_이용_동의);
        } else if (id === '개인정보 제3자 제공 동의') {
            window.open(POLICY_AND_TERMS_LINK.개인정보_제_3자_제공동의);
        }
    };

    return (
        <div className={styles.form}>
            <h5>약관 동의</h5>
            <div className={styles.checkForm}>
                <div className="d-flex">
                    <Checkbox
                        name="all"
                        checked={thirdPartyInfoTerm && personalInfoTerm}
                        onChange={(e) => handleChange(e.target)}
                    />
                    <span>전체 동의</span>
                </div>
                <div className="d-flex align-items-center">
                    <div className="d-flex mr-4">
                        <Checkbox
                            name="personalInfoTerm"
                            checked={personalInfoTerm}
                            onChange={(e) => handleChange(e.target)}
                        />
                        <span>[필수] 개인정보 수집 및 이용 동의</span>
                    </div>
                    <TextButton
                        color="link"
                        size="sm"
                        icon={ChevronRightIcon}
                        iconSide="right"
                        data-id="개인정보 수집 및 이용 동의"
                        onClick={handleTermClick}
                    >
                        더보기
                    </TextButton>
                </div>
                <div className="d-flex align-items-center">
                    <div className="d-flex mr-4">
                        <Checkbox
                            name="thirdPartyInfoTerm"
                            checked={thirdPartyInfoTerm}
                            onChange={(e) => handleChange(e.target)}
                        />
                        <span>[필수] 개인정보 제3자 제공 동의</span>
                    </div>
                    <TextButton
                        color="link"
                        size="sm"
                        icon={ChevronRightIcon}
                        iconSide="right"
                        data-id="개인정보 제3자 제공 동의"
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

        const { id } = e.target.dataset;

        if (id === '개인정보 수집 및 이용 동의') {
            window.open(POLICY_AND_TERMS_LINK.개인정보_수집_및_이용_동의);
        } else if (id === '개인정보 제3자 제공 동의') {
            window.open(POLICY_AND_TERMS_LINK.개인정보_제_3자_제공동의);
        }
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
                        label="[필수] 개인정보 수집 및 이용 동의"
                        className={cn('mr-4', styles.readOnly)}
                        checked
                        readOnly
                    />
                    <TextButton
                        color="link"
                        size="sm"
                        icon={ChevronRightIcon}
                        iconSide="right"
                        data-id="개인정보 수집 및 이용 동의"
                        onClick={handleTermClick}
                    >
                        더보기
                    </TextButton>
                </div>
                <div className="d-flex align-items-center">
                    <Checkbox
                        label="[필수] 개인정보 제3자 제공 동의"
                        className={cn('mr-4', styles.readOnly)}
                        checked
                        readOnly
                    />
                    <TextButton
                        color="link"
                        size="sm"
                        icon={ChevronRightIcon}
                        iconSide="right"
                        data-id="개인정보 제3자 제공 동의"
                        onClick={handleTermClick}
                    >
                        더보기
                    </TextButton>
                </div>
            </div>
        </div>
    );
};
