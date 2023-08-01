import { Footer as GDSFooter } from '@goorm-dev/gds-components';

import { LOGO_IMAGE, LOGO_LINK } from '@/constants/common';
import { MENU_LIST, POLICY_LIST, COMPANY_INFO_LIST } from './Footer.constants';

function Footer() {
    return (
        <GDSFooter>
            <GDSFooter.Top>
                <GDSFooter.Brand
                    logoImage={LOGO_IMAGE}
                    logoLink={LOGO_LINK}
                    logoStyle={{ width: 121, height: 37 }}
                />
                <GDSFooter.Menu menuWrappers={MENU_LIST} />
            </GDSFooter.Top>
            <GDSFooter.Bottom>
                <GDSFooter.Policy policyListGroup={POLICY_LIST} />
                <GDSFooter.CompanyInfo infoGroup={COMPANY_INFO_LIST} />
            </GDSFooter.Bottom>
        </GDSFooter>
    );
}

export default Footer;
