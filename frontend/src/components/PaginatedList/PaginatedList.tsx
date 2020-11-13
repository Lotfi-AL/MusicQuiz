import { Grid } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import React, { useEffect, useState } from 'react'


let pageSize = 10;

const PaginatedList = ({ rowCount, rows, baseQuery, rowClick, columns, updateState, ListView }) => {

    const [page, setPage] = useState<number>(1);

    const [loading, setLoading] = useState(false);

    const handlePageChange = (params) => {
        setPage(params.page);
    };

    return (
        <Grid container spacing={2}>
            <ListView updateState={updateState} page={page} />
            <Grid item xs={12}>
                <div style={{ height: 700, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pagination
                        pageSize={pageSize}
                        rowCount={rowCount}
                        paginationMode="server"
                        onPageChange={handlePageChange}
                        onRowClick={rowClick}
                        loading={loading}
                        page={page}
                    />
                </div>
            </Grid>
        </Grid>
    )
}

export default PaginatedList