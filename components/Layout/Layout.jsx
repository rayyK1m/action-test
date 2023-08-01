import cn from 'classnames';

import Header from './Header/Header';
import Banner from './Banner/Banner';
import Main from './Main/Main';
import Footer from './Footer';

import styles from './Layout.module.scss';

const Layout = ({ className, children, ...props }) => {
    return (
        <div className={cn(styles.container, className)} {...props}>
            {children}
        </div>
    );
};

Layout.Header = Header;
Layout.Banner = Banner;
Layout.Main = Main;
Layout.Footer = Footer;

export default Layout;
