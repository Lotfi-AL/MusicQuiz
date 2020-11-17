import { Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useState } from "react";

let pageSize: number = 10;

const PaginatedList = ({ loading, rowCount, rows, rowClick, columns, updateState, ListView }) => {
    const [page, setPage] = useState<number>(1);

    const [sortModel, setSortModel] = React.useState({ field: "", sortDirection: "" });

    const handlePageChange = (params: { page: number }) => {
        setPage(params.page);
    };

    //because of material ui has sort direction 1 behind we need this switch
    const onColumnHeaderClick = (params: { colDef: { sortDirection: string }, field: string }) => {
        let { sortDirection } = params.colDef;
        if (sortDirection === null) {
            sortDirection = "asc";
        } else if (sortDirection === "asc") {
            sortDirection = "desc";
        } else if (sortDirection === "desc") {
            sortDirection = "";
        }
        const obj = { field: params.field, sortDirection: sortDirection }
        setSortModel(obj);
    };

    return (
        <Grid container spacing={2}>
            <ListView updateState={updateState} page={page} sortModel={sortModel} />
            <Grid item xs={12}>
                <div data-test="paginated-list" style={{ height: 700, width: "100%" }}>
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
                        onColumnHeaderClick={onColumnHeaderClick}
                    />
                </div>
            </Grid>
        </Grid>
    );
};

export default PaginatedList;
