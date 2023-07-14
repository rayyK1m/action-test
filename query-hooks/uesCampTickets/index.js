import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@goorm-dev/gds-toastify';

import campTicketsKeys from './keys';
import campTicketsApis from './apis';

const useGetCampTickets = (filters) => {
    return useQuery({
        queryKey: campTicketsKeys.itemsDetail({ ...filters }),
        queryFn: () => campTicketsApis.getCampTickets({ ...filters }),
    });
};

const useGetCampTicket = (filters) => {
    return useQuery({
        queryKey: campTicketsKeys.itemDetail({ ...filters }),
        queryFn: () => campTicketsApis.getCampTicket({ ...filters }),
    });
};

/**
 * 아래 코드는 예시입니다. 실제 개발 시 삭제 후 작업해주세요.
 *
 * 예시와 같이 쿼리 훅은 사용해야 하는 행위(캠프 신청 내역 리스트 조회, 캠프 신청, 리뷰 상태 변경, 캠프 신청 내역 수정...) 단위로 작성합니다.
 * 쿼리 훅의 위치는 메인으로 사용하는 자원(캠프 신청이면 useCampTickets) 폴더 내부에 위치합니다.
 *
 * 서버로 요청을 보내는 함수 (remote 함수)는 CRUD에 맞춰 비슷한 로직이 중복 생성되지 않도록 관리합니다.
 * 쿼리 훅에서는 위의 리모트 함수들을 필요에 따라 적절히 불러와 사용합니다.
 */

const useGetCampTicketsAdmin = () => {
    // 특정 자원에 대해 어드민 용으로 불러오는 경우에도 자원 폴더 내부에서 쿼리 훅을 선언해서 사용합니다.
};
const useCreateCampTicket = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ type, formData }) =>
            campTicketsApis.createCampTicket({ type, formData }),
        {
            onSuccess: (e) => {
                if (!e) {
                    toast('캠프 신청에 실패했습니다.', {
                        type: toast.TYPE.ERROR,
                    });
                    return;
                }
                toast('캠프 신청이 완료되었습니다.', {
                    type: toast.TYPE.SUCCESS,
                });
                queryClient.invalidateQueries(campTicketsKeys.items());
            },
        },
    );
};

export {
    useGetCampTickets,
    useGetCampTicket,
    useGetCampTicketsAdmin,
    useCreateCampTicket,
    campTicketsApis,
    campTicketsKeys,
};
