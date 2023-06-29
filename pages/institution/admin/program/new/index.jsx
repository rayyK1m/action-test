import React from 'react';
import { useRouter } from 'next/router';

function ProgramNewPage() {
    const router = useRouter();
    const { type } = router.query;

    return (
        <div>
            <h3> 프로그램 생성하기</h3>
            {type}
        </div>
    );
}

export default ProgramNewPage;
