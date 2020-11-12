import { ContactsOutlined } from "@material-ui/icons";
import React, { createRef, Fragment, PureComponent } from "react";
import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { getData } from "../../utils/requests";
import Song from "./Song";
const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};
let items: ISong[] = [];

interface ISong {
    title: string;
    bpm: Number;
    artist: string;
    genre: string;
}
// // function fetchMoreListItems() {
// const response = getData("/songs", false);
// const data = response.then(res => setSongs(prevState => ([...prevState, ...res])));
// //     setIsFetching(false);
// // }

const isItemLoaded = index => !!itemStatusMap[index];


// }).then(el => {
//     for (let index = startIndex; index <= stopIndex; index++) {
//         itemStatusMap[index] = LOADED;
//     }
// });






// };

// class Row extends PureComponent {
//     render() {
//         const { index, style } = this.props;
//         const song = songs[index];
//         if (itemStatusMap[index] === LOADED) {
//             label = item.title;
//         } else {
//             label = "Loading...";
//         }
//         return (
//             <div className="ListItem" style={style}>
//                 {label}
//                 {/* {item !== undefined ? item.title : "nei"} */}
//             </div>
//         );
//     }
// }




export default function SongList() {
    const ser: ISong[] = []
    const [songs, setSongs] = useState(ser);
    const loadMoreItems = (startIndex, stopIndex) => {
        for (let index = startIndex; index <= stopIndex; index++) {
            itemStatusMap[index] = LOADING;
        }

        const response = getData("/songs", false);
        const data = response.then(res => setSongs(prevState => ([...prevState, ...res])));
        for (let index = startIndex; index <= stopIndex; index++) {
            itemStatusMap[index] = LOADED;
        }
        console.log(itemStatusMap);
    }

    const Row = ({ index }) => {
        if (itemStatusMap[index] === LOADED) {
            return <Song {...songs[index]} />
        }
        else if (itemStatusMap[index] === LOADING)
            return <div className="ListItem">
                {"loading"}
            </div>
        else {
            return <div className="ListItem">
                {"idk"}
            </div>
        }
    }

    return (
        <Fragment>
            <p className="Note">
                This demo app mimics loading remote data with a 2.5s timer. While rows
                are "loading" they will display a "Loading..." label. Once data has been
                "loaded" the row number will be displayed. Start scrolling the list to
                automatically load data.
      </p>
            <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={100}
                loadMoreItems={loadMoreItems}
            >
                {({ onItemsRendered, ref }) => (
                    <List
                        className="List"
                        height={150}
                        itemCount={100}
                        itemSize={100}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        width={1000}
                    >
                        {Row}
                    </List>
                )}
            </InfiniteLoader>
            <p className="Note">
                Check out the documentation to learn more:
        <br />
                <a href="https://github.com/bvaughn/react-window-infinite-loader#documentation">
                    github.com/bvaughn/react-window-infinite-loader
        </a>
            </p>
        </Fragment>
    );
}