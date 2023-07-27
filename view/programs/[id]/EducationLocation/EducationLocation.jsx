import { useRouter } from 'next/router';

import useProgram from '@/query-hooks/useProgram';

import Table from '../Table/Table';
import styles from './EducationLocation.module.scss';
import { PROGRAM_DIVISION } from '@/constants/db';

const EducationLocation = () => {
    const router = useRouter();
    const { id } = router.query;
    const {
        data: { item: programData },
    } = useProgram.GET({
        type: 'detail',
        id,
    });

    return (
        <div className={styles.container}>
            <Table>
                <tbody>
                    <tr>
                        <th>교육 장소</th>
                        {programData.type.division ===
                            PROGRAM_DIVISION.방문형 && (
                            <td>각 학교에서 진행</td>
                        )}
                        {programData.type.division ===
                            PROGRAM_DIVISION.집합형 && (
                            <td>{programData.educationLocation.name}</td>
                        )}
                    </tr>
                    {programData.type.division === PROGRAM_DIVISION.집합형 && (
                        <tr>
                            <th>주소</th>
                            <td>{programData.educationLocation.address}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default EducationLocation;
