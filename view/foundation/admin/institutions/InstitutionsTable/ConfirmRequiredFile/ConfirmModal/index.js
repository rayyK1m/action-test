import { Suspense } from 'react';
import ConfirmModalComponent from './ConfirmModal';

export default function ConfirmModal({ ...props }) {
    return (
        <Suspense fallback={<></>}>
            <ConfirmModalComponent {...props} />
        </Suspense>
    );
}
