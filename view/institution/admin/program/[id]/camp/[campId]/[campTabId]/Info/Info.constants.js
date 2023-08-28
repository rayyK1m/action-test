export const relationField = {
    elementarySchool: 'targetGroup',
    middleSchool: 'targetGroup',
    highSchool: 'targetGroup',
    educationStartDate: 'educationDate',
    educationStartTime: 'educationDate',
    educationEndDate: 'educationDate',
    educationEndTime: 'educationDate',
    educationLocationName: 'educationLocation',
    educationLocationAddress: 'educationLocation',
};

export const matchedKey = {
    targetGroup: ['elementarySchool', 'middleSchool', 'highSchool'],
    educationDate: [
        'educationStartDate',
        'educationStartTime',
        'educationEndDate',
        'educationEndTime',
    ],
    educationLocation: ['educationLocationName', 'educationLocationAddress'],
};
