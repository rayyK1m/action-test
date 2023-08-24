import Layout from '@/components/Layout/Layout';
import FormContainer from '@/view/components/FormContainer/FormContainer';

import { CheckCircleIcon } from '@goorm-dev/gds-icons';
import styles from './CompleteView.module.scss';
import useSession from '@/query-hooks/useSession';

function CompleteView({ title, description, children: buttons }) {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Layout.Header userData={userData} />
            <Layout.Main>
                <FormContainer>
                    <div className={styles.completeFrame}>
                        <CheckCircleIcon
                            width="5.5rem"
                            height="5.5rem"
                            className="mb-2 text-blue-500"
                        />
                        <h2 className="mb-1">{title}</h2>
                        <div className={styles.description}>{description}</div>
                        {buttons}
                    </div>
                </FormContainer>
            </Layout.Main>
            <Layout.ContributorBanner />
            <Layout.Footer />
        </Layout>
    );
}

export default CompleteView;
