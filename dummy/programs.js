import {
    PROGRAM_OPERATION_LOCATIONS,
    PROGRAM_CATEGORIES,
} from '@/constants/db';
import { PROGRAM_DIVISION } from '@/constants/db';

import { getRandomElement } from './utils';

export const PROGRAMS = [
    {
        uuid: 'uuid-1',
        lectureIndex: 'lectureindex-temp',
        institutionIndex: 'institutionIndex-temp',
        thumbnail:
            'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
        name: '아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름',
        type: {
            camp: getRandomElement(Object.values(PROGRAM_DIVISION)),
            duration: '장기',
        },
        category: getRandomElement(PROGRAM_CATEGORIES),
        price: 0,
        description:
            '아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명',
        operateLocation: getRandomElement(PROGRAM_OPERATION_LOCATIONS),
        applyDate: {
            start: new Date('2023.01.01'),
            end: new Date('2023.02.01'),
        },
        educationDate: {
            start: new Date('2023.10.01'),
            end: new Date('2023.11.01'),
        },
    },
    {
        uuid: 'uuid-2',
        lectureIndex: 'lectureindex-temp',
        institutionIndex: 'institutionIndex-temp',
        thumbnail:
            'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
        name: '아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름',
        type: {
            camp: getRandomElement(Object.values(PROGRAM_DIVISION)),
            duration: '장기',
        },
        category: getRandomElement(PROGRAM_CATEGORIES),
        price: 0,
        description:
            '아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명',
        operateLocation: getRandomElement(PROGRAM_OPERATION_LOCATIONS),
        applyDate: {
            start: new Date('2023.05.01'),
            end: new Date('2023.07.01'),
        },
        educationDate: {
            start: new Date('2023.10.01'),
            end: new Date('2023.11.01'),
        },
    },
    {
        uuid: 'uuid-3',
        lectureIndex: 'lectureindex-temp',
        institutionIndex: 'institutionIndex-temp',
        thumbnail:
            'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
        name: '아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름',
        type: {
            camp: getRandomElement(Object.values(PROGRAM_DIVISION)),
            duration: '장기',
        },
        category: getRandomElement(PROGRAM_CATEGORIES),
        price: 0,
        description:
            '아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명',
        operateLocation: getRandomElement(PROGRAM_OPERATION_LOCATIONS),
        applyDate: {
            start: new Date('2023.10.01'),
            end: new Date('2023.11.01'),
        },
        educationDate: {
            start: new Date('2023.12.01'),
            end: new Date('2023.12.31'),
        },
    },

    {
        uuid: 'uuid-1-2',
        lectureIndex: 'lectureindex-temp',
        institutionIndex: 'institutionIndex-temp',
        thumbnail:
            'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
        name: '아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름',
        type: {
            camp: getRandomElement(Object.values(PROGRAM_DIVISION)),
            duration: '장기',
        },
        category: getRandomElement(PROGRAM_CATEGORIES),
        price: 0,
        description:
            '아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명',
        operateLocation: getRandomElement(PROGRAM_OPERATION_LOCATIONS),
        applyDate: {
            start: new Date('2023.01.01'),
            end: new Date('2023.02.01'),
        },
        educationDate: {
            start: new Date('2023.10.01'),
            end: new Date('2023.11.01'),
        },
    },
    {
        uuid: 'uuid-2-2',
        lectureIndex: 'lectureindex-temp',
        institutionIndex: 'institutionIndex-temp',
        thumbnail:
            'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
        name: '아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름',
        type: {
            camp: getRandomElement(Object.values(PROGRAM_DIVISION)),
            duration: '장기',
        },
        category: getRandomElement(PROGRAM_CATEGORIES),
        price: 0,
        description:
            '아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명',
        operateLocation: getRandomElement(PROGRAM_OPERATION_LOCATIONS),
        applyDate: {
            start: new Date('2023.05.01'),
            end: new Date('2023.07.01'),
        },
        educationDate: {
            start: new Date('2023.10.01'),
            end: new Date('2023.11.01'),
        },
    },
    {
        uuid: 'uuid-3-2',
        lectureIndex: 'lectureindex-temp',
        institutionIndex: 'institutionIndex-temp',
        thumbnail:
            'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
        name: '아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름',
        type: {
            camp: getRandomElement(Object.values(PROGRAM_DIVISION)),
            duration: '장기',
        },
        category: getRandomElement(PROGRAM_CATEGORIES),
        price: 0,
        description:
            '아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명',
        operateLocation: getRandomElement(PROGRAM_OPERATION_LOCATIONS),
        applyDate: {
            start: new Date('2023.10.01'),
            end: new Date('2023.11.01'),
        },
        educationDate: {
            start: new Date('2023.12.01'),
            end: new Date('2023.12.31'),
        },
    },

    {
        uuid: 'uuid-1-3',
        lectureIndex: 'lectureindex-temp',
        institutionIndex: 'institutionIndex-temp',
        thumbnail:
            'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
        name: '아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름',
        type: {
            camp: getRandomElement(Object.values(PROGRAM_DIVISION)),
            duration: '장기',
        },
        category: getRandomElement(PROGRAM_CATEGORIES),
        price: 0,
        description:
            '아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명',
        operateLocation: getRandomElement(PROGRAM_OPERATION_LOCATIONS),
        applyDate: {
            start: new Date('2023.01.01'),
            end: new Date('2023.02.01'),
        },
        educationDate: {
            start: new Date('2023.10.01'),
            end: new Date('2023.11.01'),
        },
    },
    {
        uuid: 'uuid-2-3',
        lectureIndex: 'lectureindex-temp',
        institutionIndex: 'institutionIndex-temp',
        thumbnail:
            'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
        name: '아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름',
        type: {
            camp: getRandomElement(Object.values(PROGRAM_DIVISION)),
            duration: '장기',
        },
        category: getRandomElement(PROGRAM_CATEGORIES),
        price: 0,
        description:
            '아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명',
        operateLocation: getRandomElement(PROGRAM_OPERATION_LOCATIONS),
        applyDate: {
            start: new Date('2023.05.01'),
            end: new Date('2023.07.01'),
        },
        educationDate: {
            start: new Date('2023.10.01'),
            end: new Date('2023.11.01'),
        },
    },
    {
        uuid: 'uuid-3-3',
        lectureIndex: 'lectureindex-temp',
        institutionIndex: 'institutionIndex-temp',
        thumbnail:
            'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
        name: '아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름',
        type: {
            camp: getRandomElement(Object.values(PROGRAM_DIVISION)),
            duration: '장기',
        },
        category: getRandomElement(PROGRAM_CATEGORIES),
        price: 0,
        description:
            '아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명',
        operateLocation: getRandomElement(PROGRAM_OPERATION_LOCATIONS),
        applyDate: {
            start: new Date('2023.10.01'),
            end: new Date('2023.11.01'),
        },
        educationDate: {
            start: new Date('2023.12.01'),
            end: new Date('2023.12.31'),
        },
    },

    {
        uuid: 'uuid-1-4',
        lectureIndex: 'lectureindex-temp',
        institutionIndex: 'institutionIndex-temp',
        thumbnail:
            'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
        name: '아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름',
        type: {
            camp: getRandomElement(Object.values(PROGRAM_DIVISION)),
            duration: '장기',
        },
        category: getRandomElement(PROGRAM_CATEGORIES),
        price: 0,
        description:
            '아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명',
        operateLocation: getRandomElement(PROGRAM_OPERATION_LOCATIONS),
        applyDate: {
            start: new Date('2023.01.01'),
            end: new Date('2023.02.01'),
        },
        educationDate: {
            start: new Date('2023.10.01'),
            end: new Date('2023.11.01'),
        },
    },
    {
        uuid: 'uuid-2-4',
        lectureIndex: 'lectureindex-temp',
        institutionIndex: 'institutionIndex-temp',
        thumbnail:
            'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
        name: '아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름',
        type: {
            camp: getRandomElement(Object.values(PROGRAM_DIVISION)),
            duration: '장기',
        },
        category: getRandomElement(PROGRAM_CATEGORIES),
        price: 0,
        description:
            '아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명',
        operateLocation: getRandomElement(PROGRAM_OPERATION_LOCATIONS),
        applyDate: {
            start: new Date('2023.05.01'),
            end: new Date('2023.07.01'),
        },
        educationDate: {
            start: new Date('2023.10.01'),
            end: new Date('2023.11.01'),
        },
    },
    {
        uuid: 'uuid-3-4',
        lectureIndex: 'lectureindex-temp',
        institutionIndex: 'institutionIndex-temp',
        thumbnail:
            'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
        name: '아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름 아주 긴 이름',
        type: {
            camp: getRandomElement(Object.values(PROGRAM_DIVISION)),
            duration: '장기',
        },
        category: getRandomElement(PROGRAM_CATEGORIES),
        price: 0,
        description:
            '아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명 아주 긴 설명',
        operateLocation: getRandomElement(PROGRAM_OPERATION_LOCATIONS),
        applyDate: {
            start: new Date('2023.10.01'),
            end: new Date('2023.11.01'),
        },
        educationDate: {
            start: new Date('2023.12.01'),
            end: new Date('2023.12.31'),
        },
    },
];
