import { Skeleton, Table } from '@goorm-dev/gds-components';

export default function SummaryTableLoading() {
    const EMPTY_LIST = Array.from({ length: 5 }, (_, index) => index);

    return (
        <Table>
            <tbody>
                {EMPTY_LIST.map((index) => {
                    return (
                        <tr key={index}>
                            <th>
                                <Skeleton width="100%" />
                            </th>
                            <td>
                                <Skeleton width="100%" />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}
