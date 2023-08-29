export const MODAL_CONTENTS = {
    default: {
        header: '프로그램 신청 안내',
        body: () => '프로그램은 최대 3개까지 신청 가능합니다.',
        footer: '확인',
    },
    noUserInfo: {
        header: '필수 정보 미입력 안내',
        body: (data) =>
            `필수 정보(${data})가 입력되지 않았습니다. \n내 정보 수정 페이지에서 필수 정보를 입력해주세요.`,
        footer: '내 정보 수정하기',
    },
};
