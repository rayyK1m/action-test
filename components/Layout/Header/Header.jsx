import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';

import {
    Avatar,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from '@goorm-dev/gds-components';
import { OutIcon, SubmitModeIcon } from '@goorm-dev/gds-icons';
import { useRouter } from 'next/router';

import LinkWithRole from './LinkWithRole/LinkWithRole';

import styles from './Header.module.scss';

import { LOGO_IMAGE } from '@/constants/common';

/**
 *
 * @param {import('./Header.type').HeaderProps} props
 * @returns
 */
const Header = ({ userData, className, children, ...props }) => {
    if (children) {
        console.log('해당 컴포넌트는 children prop을 받지 않습니다.');
    }

    const router = useRouter();

    return (
        <header className={cn(styles.container, className)} {...props}>
            <div className={styles.wrapper}>
                <div className={styles.leftAreaContainer}>
                    <Link href="/" className="mr-4">
                        <Image
                            src={LOGO_IMAGE}
                            alt="디지털 새싹 로고"
                            width={88}
                            height={26.8}
                        />
                    </Link>
                    <div className={styles.leftAreaWrapper}>
                        <Button
                            className={styles.link}
                            tag={Link}
                            color="link"
                            size="lg"
                            href="/institutions"
                            active={
                                router.pathname === '/institutions' ||
                                router.pathname ===
                                    '/institutions/[institutionId]'
                            }
                        >
                            운영 기관
                        </Button>
                        <Button
                            className={styles.link}
                            icon={<SubmitModeIcon />}
                            iconSide="right"
                            tag={Link}
                            color="link"
                            size="lg"
                            href="https://newsac.co.kr/"
                            target="_blank"
                        >
                            소개
                        </Button>
                    </div>
                </div>
                <div className={styles.rightAreaContainer}>
                    {/* 이 부분은 로그인 관련 로직 확인 후 수정 예정 */}
                    {userData && (
                        <>
                            <LinkWithRole role={userData.role} />
                            <UncontrolledDropdown>
                                <DropdownToggle tag="span">
                                    <Avatar
                                        className={styles.avatar}
                                        role="button"
                                        name={userData.name}
                                        size="lg"
                                        textSizeRatio={2.11}
                                        maxInitials={2}
                                        round
                                    />
                                </DropdownToggle>
                                <DropdownMenu
                                    right
                                    className={styles.dropdownMenu}
                                >
                                    <DropdownItem>
                                        <Avatar
                                            name={userData.name}
                                            size="md"
                                            textSizeRatio={2.11}
                                            maxInitials={2}
                                            round
                                        />
                                        <span className={styles.name}>
                                            {userData.name}
                                        </span>
                                    </DropdownItem>
                                    <DropdownItem tag="a" href="/logout">
                                        <OutIcon />
                                        로그아웃
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </>
                    )}
                    {!userData && (
                        <>
                            <Button
                                tag={Link}
                                href="/login"
                                color="primary"
                                size="lg"
                            >
                                로그인
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
