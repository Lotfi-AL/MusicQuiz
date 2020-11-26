import * as React from "react";
import { useState } from "react";
import { playerType } from "./ScoreContext";
import { ScoreContext } from "./ScoreContext";
// import Landingpage from "../Landingpage/Landingpage";
// import Game from "../Game/Game";
// import { StatusContext, defStatus, statusType, EnumStatus } from "./StatusContext";
// import Audio from "../ControlPanel/Audio";
// import { loadSession, saveSession } from "../../utils/LoadSave";

type Props = {
    children: React.ReactNode;
};

export const ScoreProvider = ({ children }: Props) => {
    const incScore = (index: number, delta: number) => {
        setPlayers((prevState) => {
            const newArray = [...prevState]
            newArray[index].score += delta;
            return newArray;
        })
    }

    const addPlayer = (player: playerType) => {
        setPlayers((prevState) => {
            return [...prevState, player]
        })
    }

    const getScore = (index: number) => {
        return players[index].score;
    }

    const getHighestScore = (): playerType => {
        let highest = { name: "", score: 0 };
        for (const player of players) {
            if (player.score > highest.score) {
                highest = player
            }
        }
        return highest;
    }
    const [players, setPlayers] = useState<playerType[]>([{ name: "yolo", score: 0 }]);
    // const [scene, setScene] = React.useState(defaultScene);
    // const [currScene, setCurrScene] = React.useState(defaultCurrScene);
    React.useEffect(() => {
        // saveSession(scene, currScene);
        console.log(players);
    }, [players]);

    return (
        <ScoreContext.Provider value={{ players, incScore, addPlayer, getScore, getHighestScore }}>
            {children}
        </ScoreContext.Provider>
    );
};

export const useStatus = () => React.useContext(ScoreContext);
