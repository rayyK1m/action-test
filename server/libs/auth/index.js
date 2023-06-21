/**
 * 토큰 유효성을 검증하고 유저 데이터를 불러오는 함수
 *
 * @param {string} token - 검증할 토큰
 * @returns {Object} - 토큰의 유효성과 사용자 데이터를 포함하는 객체
 *  - isValid (boolean): 토큰의 유효성을 나타내는 값. 유효한 경우 true, 그렇지 않은 경우 false
 *  - userData (Object): 유효한 토큰인 경우 포함되는 사용자 데이터 객체
 */
export const validateToken = async (token) => {
    const postData = JSON.stringify({
        user_data: true,
        token,
    });

    const response = await fetch(
        `${process.env.ACCOUNT_HOST}/auth/token/validation`,
        {
            method: 'POST',
            body: postData,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    const data = await response.json();
    if (data.message !== 'SUCCESS') {
        // 토큰 에러 처리
        return { isValid: false };
    }

    return { isValid: true, userData: data.user_data };
};

/**
 * 특정 사용자의 토큰을 폐기하는 함수
 *
 * @param {string} userId - 토큰을 폐기할 유저 ID
 * @param {string} token - 폐기할 토큰
 * @returns {boolean} - 토큰 폐기 성공 여부를 나타내는 값. 성공한 경우 true, 그렇지 않은 경우 false
 */
export const revokeToken = async (userId, token) => {
    const postData = JSON.stringify({
        user_id: userId,
        token: token,
    });
    try {
        const response = await fetch(
            `${process.env.ACCOUNT_HOST}/auth/token/revoke`,
            {
                method: 'POST',
                body: postData,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        const isSuccess = await response.json();
        return isSuccess;
    } catch (error) {
        // TODO: 예상되는 에러 (토큰 만료등) 에러와 그렇지 않은 에러 구분 필요
        throw error;
    }
};
