import cn from 'classnames';

import { Checkbox, Input, TextButton } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';

import styles from '../CampForms.module.scss';
import { POLICY_AND_TERMS_LINK } from '@/constants/common';

export const TermsForm = ({ terms, setTerms }) => {
    const { thirdPartyInfoTerm, personalInfoTerm } = terms;

    const handleChange = (e) => {
        if (e.target.checked) {
            if (e.target.id === 'all')
                setTerms({ thirdPartyInfoTerm: true, personalInfoTerm: true });
            setTerms((terms) => ({ ...terms, [e.target.id]: true }));
        } else {
            if (e.target.id === 'all')
                setTerms({
                    thirdPartyInfoTerm: false,
                    personalInfoTerm: false,
                });
            setTerms((terms) => ({ ...terms, [e.target.id]: false }));
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
            <h5 className="text-gray-700">약관 동의</h5>
            <div className={styles.checkForm}>
                <div className="d-flex">
                    <Input
                        type="checkbox"
                        id="all"
                        checked={thirdPartyInfoTerm && personalInfoTerm}
                        onChange={handleChange}
                    />
                    <label for="all" className={styles.label}>
                        전체 동의
                    </label>
                </div>
                <div className="d-flex align-items-center">
                    <Input
                        type="checkbox"
                        id="personalInfoTerm"
                        checked={personalInfoTerm}
                        onChange={handleChange}
                    />
                    <label for="personalInfoTerm" className="mr-4">
                        [필수] 개인정보 수집 및 이용 동의
                    </label>
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
                    <Input
                        type="checkbox"
                        id="thirdPartyInfoTerm"
                        checked={thirdPartyInfoTerm}
                        onChange={handleChange}
                    />
                    <label for="thirdPartyInfoTerm" className="mr-4">
                        [필수] 개인정보 제3자 제공 동의
                    </label>
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
            <h5 className="text-gray-700">약관 동의</h5>
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
