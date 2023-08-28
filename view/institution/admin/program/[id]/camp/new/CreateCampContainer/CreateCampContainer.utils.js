import {
    ellipsisedString,
    removePhoneNumberHyphen,
    setDateWithHourAndMinute,
} from '@/utils';
import ProgramTypeBadge from '@/view/components/ProgramTypeBadge';
import { CAMP_KEYS } from '../../CampForms/CampForms.constants';
import _isEmpty from 'lodash/isEmpty';

export const getBreadcrumbs = (program) => {
    return [
        {
            children: '프로그램 관리',
            to: '/institution/admin',
        },
        {
            children: (
                <>
                    <span>{ellipsisedString(program.name, 20)}</span>
                    <ProgramTypeBadge
                        className="ml-1"
                        division={program.type.division}
                        duration={program.type.duration}
                    />
                </>
            ),
            to: `/institution/admin/program/${program.id}`,
        },
        {
            children: '캠프 관리',
            to: `/institution/admin/program/${program.id}/camp?division=집합형`,
        },
        {
            children: '캠프 생성하기',
            active: true,
        },
    ];
};

/** API Docs와 일치된 형태로 포맷 */
const formatData = (data) => {
    const {
        educationStartDate,
        educationEndDate,
        elementarySchool = [],
        middleSchool = [],
        highSchool = [],
        educationLocationName = '',
        educationLocationAddress,
        mainEducator = '',
        subEducator,
        managerPhoneNumber = '',
        /** programName, learningTime은 body에 포함되지 않음. */
        programName,
        learningTime,
        difficulty,
        ...rest
    } = data;

    const formData = {
        targetGroup: {
            elementarySchool,
            middleSchool,
            highSchool,
        },
        educationDate: {
            start: educationStartDate,
            end: setDateWithHourAndMinute(educationEndDate, 23, 59),
        },
        educationLocation: {
            name: educationLocationName,
            address: educationLocationAddress,
        },
        educator: {
            main: mainEducator,
            sub: subEducator ? [subEducator] : [],
        },
        managerPhoneNumber: removePhoneNumberHyphen(managerPhoneNumber),
        ...rest,
    };
    return formData;
};

export const parseData = (formData) => {
    const targetGroupKeys = [
        CAMP_KEYS.elementaryTargetKey,
        CAMP_KEYS.middleTargetKey,
        CAMP_KEYS.highTargetKey,
    ];

    /** 값이 입력되지 않은 필드 삭제 */
    const data = Object.entries(formData).reduce((acc, [key, value]) => {
        if (targetGroupKeys.includes(key) || !!value) {
            acc[key] = value;
        }
        return acc;
    }, {});

    /** API Docs와 일치된 형태로 포맷 */
    const formattedData = formatData(data);

    return formattedData;
};

/** 정보 입력이 미입력 상태인지 확인 */
export const checkIsInfoTemporary = (formData) => {
    const { elementarySchool, middleSchool, highSchool, ...restFormData } =
        formData;
    const isTargetGroupEmpty = _isEmpty(
        [elementarySchool, middleSchool, highSchool].flat(),
    );

    const isRestDataInValid = Object.values(restFormData).reduce(
        (acc, value) => {
            return acc || !value;
        },
        false,
    );

    return isTargetGroupEmpty || isRestDataInValid;
};
