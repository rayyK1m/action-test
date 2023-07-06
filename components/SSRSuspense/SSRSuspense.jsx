import useMount from '@/hooks/useMount';
import React, { Suspense } from 'react';

function SSRSuspense({ fallback, ...props }) {
    const isMounted = useMount();

    if (!isMounted) {
        return <>{fallback}</>;
    }
    return <Suspense fallback={fallback} {...props} />;
}

export default SSRSuspense;
