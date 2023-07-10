import { useRouter } from 'next/router';

import useProgram from '@/query-hooks/useProgram';

import Table from '../Table/Table';
import Map from '@/components/Map/Map';
import styles from './EducationLocation.module.scss';

const EducationLocation = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: programData } = useProgram.GET({
        type: 'detail',
        id,
    });

    return (
        <div className={styles.container}>
            <Map address={programData.educationLocation.address} />
            <Table>
                <tbody>
                    <tr>
                        <th>교육 장소</th>
                        <td>{programData.educationLocation.name}</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>{programData.educationLocation.address}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default EducationLocation;
