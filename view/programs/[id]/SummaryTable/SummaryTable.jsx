import { useRouter } from 'next/router';

import cn from 'classnames';

import useProgram from '@/query-hooks/useProgram';

import styles from './SummaryTable.module.scss';
import Table from '../Table/Table';
import { formatDate } from '@/utils';
import { PROGRAM_DIVISION } from '@/constants/db';

const SummaryTable = ({ className, ...props }) => {
    const router = useRouter();
    const { id } = router.query;
    const {
        data: { item: programData },
    } = useProgram.GET({
        type: 'detail',
        id,
    });

    return (
        <Table className={cn(styles.table, className)} {...props}>
            <tbody>
                <tr>
                    <th>신청 기간</th>
                    <td>
                        {formatDate(programData.applyDate.start)}
                        {' ~ '}
                        {formatDate(programData.applyDate.end)}
                    </td>
                </tr>
                <tr>
                    <th>교육 기간</th>
                    <td>
                        {formatDate(programData.educationDate.start)}
                        {' ~ '}
                        {formatDate(programData.educationDate.end)}
                    </td>
                </tr>
                <tr>
                    <th>총 교육 차시</th>
                    <td>
                        {programData.learningTime}차시 (
                        {programData.type.duration})
                    </td>
                </tr>
                <tr>
                    <th>교육 장소</th>
                    {programData.type.division === PROGRAM_DIVISION.방문형 && (
                        <td>각 학교에서 진행</td>
                    )}

                    {programData.type.division === PROGRAM_DIVISION.집합형 && (
                        <td>{programData.educationLocation.name}</td>
                    )}
                </tr>
            </tbody>
        </Table>
    );
};

export default SummaryTable;
