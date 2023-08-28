export const relationField = {
    elementarySchool: 'targetGroup',
    middleSchool: 'targetGroup',
    highSchool: 'targetGroup',
    educationStartDate: 'educationDate',
    educationEndDate: 'educationDate',
    educationLocationName: 'educationLocation',
    educationLocationAddress: 'educationLocation',
};

export const matchedKey = {
    targetGroup: ['elementarySchool', 'middleSchool', 'highSchool'],
    educationDate: ['educationStartDate', 'educationEndDate'],
    educationLocation: ['educationLocationName', 'educationLocationAddress'],
};
