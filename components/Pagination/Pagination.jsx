import cn from 'classnames';
import { BasicPagination } from '@goorm-dev/gds-components';

function Pagination({
    /**
     * item 관련
     * - itemTotalCount: 아이템 총 개수
     * - itemLimit: 한 페이지에 몇개의 아이템이 보이게할지
     */
    itemTotalCount,
    itemLimit,

    /**
     * page 관련
     * - page: 현재 선택된 페이지 번호
     * - pageLimit: Pagination number가 최대 몇개까지 보이게할지
     * @example pageLimit = 3 ( < .. 4 5 6 .... > )
     */
    page = 1,
    pageLimit = 5,

    /**
     * BasicPagination props
     */
    size = 'md',
    className,
    ...props
}) {
    return (
        <>
            <BasicPagination
                size={size}
                scrollMove={false}
                page={page}
                pageCount={Math.ceil(itemTotalCount / itemLimit)}
                limitCount={pageLimit}
                className={cn('justify-content-center', className)}
                {...props}
            />
        </>
    );
}

export default Pagination;
