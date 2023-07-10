import Table from '../Table/Table';
import Map from '@/components/Map/Map';
import styles from './EducationLocation.module.scss';
import { Skeleton } from '@goorm-dev/gds-components/dist/cjs';

const EducationLocationLoading = () => {
    return (
        <div className={styles.container}>
            <Map />
            <Table>
                <tbody>
                    <tr>
                        <th>
                            <Skeleton width="100%" />
                        </th>
                        <td>
                            <Skeleton width="100%" />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <Skeleton width="100%" />
                        </th>
                        <td>
                            <Skeleton width="100%" />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default EducationLocationLoading;
