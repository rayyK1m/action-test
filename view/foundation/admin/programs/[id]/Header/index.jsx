import { Suspense } from 'react';

import HeaderComponent from './Header';
import HeaderLoading from './Header.loading';

export default function Header(props) {
    return (
        <Suspense fallback={<HeaderLoading />}>
            <HeaderComponent {...props} />
        </Suspense>
    );
}
