import React from 'react';
import ReactDOM from 'react-dom';

/**
 * HScrollTable에서 드롭다운을 포탈로 띄울 때 사용하는 키, 같은 포탈에 커스텀 요소를 띄우기 위한 컴포넌트
 * https://github.com/goorm-dev/gds/blob/9ca3f071522e844ac964556be454f7099430870d/packages/gds-tables/src/components/HScrollTable/TableDropdown/TableDropdown.jsx#L11
 *
 * 사용 방법: DropdownMenu 컴포넌트를 children으로 넣어준다.
 */
const H_SCROLL_TABLE_PORTAL_KEY = 'fiexed-column-dropdown-item';
function TableDropdownPortal({ children }) {
    const target = document.getElementById(H_SCROLL_TABLE_PORTAL_KEY);
    if (!target) {
        return null;
    }
    return ReactDOM.createPortal(<div>{children}</div>, target);
}

export default TableDropdownPortal;
