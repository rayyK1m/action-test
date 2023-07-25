import React from 'react';

// import styles from './ErrorPage.module.scss';

function ErrorPage({ statusCode, message }) {
    // FIXME: 디자인팀과 논의 후 결정된 시안으로 변경 필요
    return (
        <div className="d-flex">
            <h3>
                {statusCode} - {message}
            </h3>
        </div>
    );
}

export default ErrorPage;
