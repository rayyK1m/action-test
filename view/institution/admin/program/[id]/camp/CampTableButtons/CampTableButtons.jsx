import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

import {
    MoreCommonIcon,
    SubmitModeIcon,
    ChevronRightIcon,
} from '@goorm-dev/gds-icons';
import {
    Button,
    ButtonDropdown,
    DropdownToggle,
} from '@goorm-dev/gds-components';

import CustomDropdownItem from '@/components/CustomDropdownItem';
import CustomDropdownMenu from '@/components/CustomDropdownMenu';
import useSession from '@/query-hooks/useSession';

import styles from './CampTableButtons.module.scss';

import { ROLE } from '@/constants/db';

function CampTableButtons({
    campId,
    classNumberStr,
    channelUrl,
    onClickDropdownItem,
}) {
    const router = useRouter();
    const {
        asPath,
        query: { institutionId },
    } = router;

    /**
     * server state
     */
    const {
        data: { role },
    } = useSession.GET();

    /**
     * 지역 state
     */
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    /** 재단 admin에서는 institutionId가 session에 없으므로, query string으로 전달한다. */
    const basePath = asPath.substring(0, asPath.lastIndexOf('?'));
    const campDetailPagePath =
        role === ROLE.FOUNDATION
            ? `${basePath}/${campId}/info?institutionId=${institutionId}`
            : `${basePath}/${campId}`;

    return (
        <div className={styles.buttons}>
            <Button
                tag={Link}
                color="link"
                icon={<ChevronRightIcon />}
                iconSide="right"
                href={campDetailPagePath}
            >
                캠프 상세
            </Button>
            <Button
                tag={Link}
                color="link"
                icon={<SubmitModeIcon />}
                iconSide="right"
                target="_blank"
                href={channelUrl}
            >
                채널로 이동
            </Button>

            {
                /**
                 * 기관 admin 에서만 복사하기 및 수정하기가 가능하다.
                 */
                role === ROLE.INSTITUTION && (
                    <ButtonDropdown
                        isOpen={isDropdownOpen}
                        toggle={() => setIsDropdownOpen((prev) => !prev)}
                    >
                        <DropdownToggle
                            color="link"
                            className={cn(styles.moreButton, 'p-0')}
                        >
                            <MoreCommonIcon />
                        </DropdownToggle>
                        <CustomDropdownMenu>
                            <CustomDropdownItem
                                data-id="copy"
                                data-camp-id={campId}
                                data-class-number-str={classNumberStr}
                                onClick={(e) => onClickDropdownItem(e)}
                            >
                                복사하기
                            </CustomDropdownItem>
                            <CustomDropdownItem
                                data-id="delete"
                                data-camp-id={campId}
                                data-class-number-str={classNumberStr}
                                onClick={(e) => onClickDropdownItem(e)}
                            >
                                삭제하기
                            </CustomDropdownItem>
                        </CustomDropdownMenu>
                    </ButtonDropdown>
                )
            }
        </div>
    );
}

export default CampTableButtons;
