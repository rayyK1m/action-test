import { useState } from 'react';
import cn from 'classnames';

import {
    Container,
    Row,
    Col,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    SearchInput,
    Nav,
    NavItem,
    NavLink,
    Checkbox,
    BasicPagination,
} from '@goorm-dev/gds-components';

import styles from './ProgramListContainer.module.scss';
import CampCard from '../CampCard';

export default function ProgramListContainer() {
    /** 운영지역 dropdonw */
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    /** 카테고리 dropdonw */
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

    /** 프로그램 이름 검색 */
    const [searchValue, setSearchValue] = useState('');

    /**
     * Dummy Data
     */
    const programCount = 32;

    return (
        <Container fluid="xxl" className={styles.container}>
            <Row>
                <Col>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <ul className={cn('d-flex', styles.dropdowns)}>
                            <li>
                                <ButtonDropdown
                                    isOpen={isLocationDropdownOpen}
                                    toggle={() =>
                                        setIsLocationDropdownOpen(
                                            (prev) => !prev,
                                        )
                                    }
                                >
                                    <DropdownToggle caret color="link">
                                        운영 지역
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>asdf</DropdownItem>
                                        <DropdownItem>asdf</DropdownItem>
                                        <DropdownItem>asdf</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </li>
                            <li>
                                <ButtonDropdown
                                    isOpen={isCategoryDropdownOpen}
                                    toggle={() =>
                                        setIsCategoryDropdownOpen(
                                            (prev) => !prev,
                                        )
                                    }
                                >
                                    <DropdownToggle caret color="link">
                                        카테고리
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>asdf</DropdownItem>
                                        <DropdownItem>asdf</DropdownItem>
                                        <DropdownItem>asdf</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </li>
                        </ul>

                        <SearchInput
                            size="lg"
                            placeholder="프로그램 이름을 검색해보세요."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <Nav tabs className={cn('mb-4', styles.navTabs)}>
                        <NavItem className={styles.navItem}>
                            <NavLink className={styles.navLink}>
                                선생님용 (방문형)
                            </NavLink>
                        </NavItem>
                        <NavItem className={styles.navItem}>
                            <NavLink className={styles.navLink}>
                                학새용 (집합형)
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>
            </Row>

            <ul className="d-flex justify-content-between align-items-center mb-4">
                <li className="d-flex">
                    <h6 className="text-dark">전체 프로그램</h6>
                    <h6 className="text-primary ml-1">{programCount}</h6>
                </li>
                <li className="d-flex">
                    <Checkbox />
                    <p>신청 가능한 프로그램 보기</p>
                </li>
            </ul>

            <div className={styles.campCardContainer}>
                <CampCard />
                <CampCard />
                <CampCard />
                <CampCard />
                <CampCard />
                <CampCard />
                <CampCard />
                <CampCard />
                <CampCard />
                <CampCard />
            </div>

            <BasicPagination
                className={styles.pagination}
                page={1}
                pageCount={10}
                limitCount={5}
                size="md"
            />
        </Container>
    );
}
