import { useRouter } from 'next/router';

import cn from 'classnames';

import useProgram from '@/query-hooks/useProgram';

import styles from './SummaryTable.module.scss';
import Table from '../Table/Table';

const SummaryTable = ({ className, ...props }) => {
    const router = useRouter();
    const { id } = router.query;
    const { data: programData } = useProgram.GET({
        type: 'detail',
        id,
    });

    return (
        <Table className={cn(styles.table, className)} {...props}>
            <tbody>
                <tr>
                    <th>신청 기간</th>
                    <td>
                        {programData.applyDate.start}
                        {' ~ '}
                        {programData.applyDate.end}
                    </td>
                </tr>
                <tr>
                    <th>교육 기간</th>
                    <td>
                        {programData.educationDate.start}
                        {' ~ '}
                        {programData.educationDate.end}
                    </td>
                </tr>
                <tr>
                    <th>총 교육 차시</th>
                    <td>
                        {programData.learningTime}시간 (
                        {programData.type.duration})
                    </td>
                </tr>
                <tr>
                    <th>교육 장소</th>
                    <td>{programData.educationLocation.name}</td>
                </tr>
                <tr>
                    <th>비용</th>
                    <td>
                        {programData.price ? `${programData.price}원` : '무료'}
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};

export default SummaryTable;
