import PageHeader from '@/components/PageHeader';
import RequiredFileSubmitButton from './RequiredFileSubmitButton';
import RegistNewProgramButton from './RegistNewProgramButton';

import styles from './Header.module.scss';

function Header() {
    return (
        <>
            <PageHeader useHrTag={true}>
                <PageHeader.Title className="d-flex justify-content-between">
                    <h3>프로그램 관리</h3>
                    <div className={styles.buttonGroup}>
                        <RequiredFileSubmitButton />
                        <RegistNewProgramButton />
                    </div>
                </PageHeader.Title>
                <PageHeader.Description>
                    프로그램 등록 후 재단의 승인을 받으면 신청자는 신청
                    페이지에서 해당 프로그램을 볼 수 있습니다.
                </PageHeader.Description>
            </PageHeader>
        </>
    );
}

export default Header;
