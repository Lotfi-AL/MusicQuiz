/*
*Takes in all the query params you want and returns a search query url based on them.
*/

const makeQuery = (q: any) => {
    let search: string = q.baseQuery + "?";
    if (q.pageSize) {
        search += "&limit=" + q.pageSize
    }
    if (q.title) {
        search += "&title=" + q.title
    }
    if (q.quantity) {
        search += "&quantity[gte]=" + q.quantity[0].toString() + "&quantity[lte]=" + q.quantity[1].toString();
    }
    if (q.genres) {
        for (const [key, value] of Object.entries(q.genres)) {
            if (value) {
                search += "&genre[]=" + key
            }
        }
    }
    if (q.sortModel.sortDirection) {
        search += "&sort_by=" + q.sortModel.field + "&order_by=" + q.sortModel.sortDirection
    }
    if (q.duration) {
        search += "&duration[gte]=" + q.duration[0].toString() + "&duration[lte]=" + q.duration[1].toString()
    }
    if (q.page) {
        search += "&page=" + q.page;
    }

    return search
}

export default makeQuery;