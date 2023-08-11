import cn from 'classnames';

import { useGetInstitutionAdmin } from '@/query-hooks/useInstitutions';

import useToggle from '@/hooks/useToggle';
import { Button } from '@goorm-dev/gds-components';
import { OpenfileIcon } from '@goorm-dev/gds-icons';

import {
    COLOR_MAP,
    TEXT_MAP,
    TOOLTIP_ISSHOW_MAP,
    TOOLTIP_TEXT_MAP,
} from './RequiredFileSubmitButton.constants';

import styles from './RequiredFileSubmitButton.module.scss';

import SubmitModal from './SubmitModal/SubmitModal';
import CustomTooltip from './CustomTooltip';

function RequiredFileSubmitButton() {
    const [isOpenModal, toggleModal] = useToggle();
    const { data: instituionAdmin } = useGetInstitutionAdmin();

    const {
        reports: { reviewStatus },
    } = instituionAdmin;

    return (
        <>
            <Button
                size="lg"
                color={COLOR_MAP[reviewStatus]}
                outline
                icon={<OpenfileIcon />}
                onClick={toggleModal}
                className={cn(
                    styles.button,
                    styles[`button_${COLOR_MAP[reviewStatus]}`],
                )}
            >
                {TOOLTIP_ISSHOW_MAP[reviewStatus] && (
                    <CustomTooltip>
                        {TOOLTIP_TEXT_MAP[reviewStatus]}
                    </CustomTooltip>
                )}
                {TEXT_MAP[reviewStatus]}
            </Button>
            <SubmitModal
                isOpen={isOpenModal}
                toggle={toggleModal}
                isSubmitted
            />
        </>
    );
}

export default RequiredFileSubmitButton;
