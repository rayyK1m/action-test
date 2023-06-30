import { useState } from 'react';
import cn from 'classnames';

import { SearchInput, Checkbox } from '@goorm-dev/gds-components';
import GridContainer from '@/components/GridContainer';

import InstitutionsCards from '../InstitutionsCards';

import styles from './InstitutionsContainer.module.scss';

function InstitutionsContainer() {
    /** 운영기관 검색 */
    const [inputValue, setInputValue] = useState(''); // input onChange value
    const [searchValue, setSearchValue] = useState(''); // input onKeypress 'Enter' value

    /** 신청 가능한 기관 체크 여부 */
    const [isCheckPossibleApply, setIsCheckPossibleApply] = useState(false);

    return (
        <GridContainer className="d-flex flex-column">
            <SearchInput
                size="lg"
                placeholder="기관 이름을 검색해보세요."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') setSearchValue(e.target.value);
                }}
                onCancelClick={() => {
                    setInputValue('');
                    setSearchValue('');
                }}
                className={cn(styles.searchInput, 'mb-4')}
            />

            <ul className="d-flex justify-content-between align-items-center mb-4">
                <li className="d-flex">
                    <h6 className="text-dark">전체 운영 기관</h6>
                    <h6 className="text-primary ml-1">{123}</h6>
                </li>
                <li className="d-flex">
                    <Checkbox
                        value={isCheckPossibleApply}
                        onChange={() =>
                            setIsCheckPossibleApply((prev) => !prev)
                        }
                    />
                    <p>신청 가능한 프로그램 보기</p>
                </li>
            </ul>

            <InstitutionsCards />
        </GridContainer>
    );
}

export default InstitutionsContainer;
