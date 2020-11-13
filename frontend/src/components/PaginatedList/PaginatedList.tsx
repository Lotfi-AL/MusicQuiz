import { Grid } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import React, { useEffect, useState } from 'react'


let pageSize = 10;

const PaginatedList = ({ loading, setLoading, rowCount, rows, baseQuery, rowClick, columns, updateState, ListView }) => {
    const [page, setPage] = useState<number>(1);


    const handlePageChange = (params) => {
        setPage(params.page);
    };

    const [sortModel, setSortModel] = React.useState([{ field: "", sort: "" }]);

    const handleSortModelChange = (params) => {
        console.log(params.sortModel)
        console.log(sortModel)
        if (params.sortModel !== sortModel) {
            setSortModel(params.sortModel);
        }
    };

    return (
        <Grid container spacing={2}>

            <ListView updateState={updateState} page={page} sortModel={sortModel} setLoading={setLoading} />
            <Grid item xs={12}>
                {console.log("på nytt")}
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
                        sortingMode="server"
                        onSortModelChange={handleSortModelChange}
                    />
                </div>
            </Grid>
        </Grid>
    )
}

export default PaginatedList