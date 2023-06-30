const isProduction = process.env.NODE_ENV === 'production';

export default (err, req, res) => {
    const statusCode = err.statusCode || 500;
    // TODO: apm등의 장치와 연동 필요
    if (!isProduction && statusCode === 500) {
        console.error(err.stack);
    }

    const message = isProduction
        ? { error: '예상치 못한 에러가 발생했습니다.' }
        : { code: err.name, message: err.message, meta: err.meta };
    return res.status(statusCode).json(message);
};
