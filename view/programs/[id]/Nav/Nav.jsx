import { useContext, useEffect, useId, useState } from 'react';

import {
    Nav as GDSNav,
    NavItem as GDSNavItem,
    NavLink as GDSNavLink,
} from '@goorm-dev/gds-components';

import cn from 'classnames';
import styles from './Nav.module.scss';

import NavProvider, { NavContext } from './NavProvider/NavProvider';
import { NAV_TOP_GAP } from './Nav.constants';

const Nav = () => {
    const navId = useId();

    const navContextValue = useContext(NavContext);

    const defaultActiveMap = navContextValue?.reduce(
        (acc, { text }, index) => ({ ...acc, [text]: !index }),
        {},
    );
    const [activeMap, setActiveMap] = useState(defaultActiveMap || {});

    const toggleActiveMap = (text) => {
        const newActiveMap = Object.keys(activeMap).reduce((acc, navText) => {
            return {
                ...acc,
                [navText]: text === navText,
            };
        }, {});

        setActiveMap(newActiveMap);
    };

    // 옵저버 감지 방식
    useEffect(() => {
        if (!navContextValue) return;
        const observerCallback = (text) => (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                toggleActiveMap(text);
            });
        };

        const { height: navHeight } = document
            .getElementById(navId)
            .getBoundingClientRect();

        const ROOT_MARGIN = {
            top: `-${navHeight}px`,
            bottom: `-${window.innerHeight - navHeight - 24}px`,
        };

        const observerOptions = {
            rootMargin: `${ROOT_MARGIN.top} 0px ${ROOT_MARGIN.bottom} 0px`,
            threshold: 0,
        };

        const observerList = navContextValue
            .map(({ text, ref }) => {
                if (!ref.current) return;
                const observer = new IntersectionObserver(
                    observerCallback(text),
                    observerOptions,
                );
                observer.observe(ref.current);

                return { observer };
            })
            .filter(Boolean);

        return () => {
            observerList.forEach(({ observer }) => {
                observer.disconnect();
            });
        };
    }, []);

    return (
        <GDSNav
            tabs
            id={navId}
            className={cn(styles.nav, 'nav-tabs-lg')}
            tag="nav"
        >
            {navContextValue?.map(({ text, ref }) => {
                const scrollToContent = () => {
                    /** ref content의 순수한 스크롤 위치 */
                    const CONTENT_SCROLL_Y =
                        ref.current.getBoundingClientRect().top +
                        window.scrollY;

                    /** navigation height (reactstrap Nav가 ref를 받지 않아서 아래와 같이 사용) */
                    const NAV_HEIGHT = document
                        .getElementById(navId)
                        .getBoundingClientRect().height;

                    /**
                     * sticky한 nav height로 인해 UI가 덮이는 이슈가 있어
                     * 어쩔 수 없이 scrollTo 로직을 사용했음
                     */
                    window.scrollTo({
                        top: CONTENT_SCROLL_Y - NAV_HEIGHT - NAV_TOP_GAP,
                        behavior: 'smooth',
                    });
                };

                return (
                    <GDSNavItem key={text}>
                        <GDSNavLink
                            tag="button"
                            active={activeMap[text]}
                            className={cn(
                                styles.link,
                                {
                                    [styles.link_isActive]: activeMap[text],
                                },
                                // 'nav-link-lg',
                            )}
                            onClick={scrollToContent}
                        >
                            {text}
                        </GDSNavLink>
                    </GDSNavItem>
                );
            })}
        </GDSNav>
    );
};

Nav.Provider = NavProvider;

export default Nav;
