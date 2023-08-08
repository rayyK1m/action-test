import { Suspense } from 'react';

import BackButtonComponent from './BackButton';
import BackButtonLoading from './BackButton.loading';

export default function BackButton(props) {
    return (
        <Suspense fallback={<BackButtonLoading />}>
            <BackButtonComponent {...props} />
        </Suspense>
    );
}
