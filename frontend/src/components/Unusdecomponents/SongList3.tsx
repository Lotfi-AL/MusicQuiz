import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import { getData } from '../../utils/requests';

function loadServerRows(page, data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.rows.slice((page - 1) * 5, page * 5));
        }, Math.random() * 500 + 100); // simulate network latency
    });
}

const response = getData("/song", false);
const data = response.then(res => console.log(res));

const columns = [{
    field: "id", hide: true
}, {
    field: "title", headerName: "Title", width: 120
},
{ field: "bpm", headerName: "BPM", width: 120 },]

export default function SongList() {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        maxColumns: 6,
    });
    console.log(data);
    const [page, setPage] = React.useState(1);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handlePageChange = (params) => {
        setPage(params.page);
    };

    React.useEffect(() => {
        let active = true;

        (async () => {
            setLoading(true);
            const newRows = await loadServerRows(page, data);

            if (!active) {
                return;
            }

            setRows(newRows);
            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, [page, data]);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={data.columns}
                pagination
                pageSize={5}
                rowCount={100}
                paginationMode="server"
                onPageChange={handlePageChange}
                loading={loading}
            />
        </div>
    );
}
