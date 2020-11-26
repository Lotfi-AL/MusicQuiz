import React from "react";
export type playerType = {
    name: string;
    score: number;
};

export type EnumScore = playerType[];

// const { status, setStatus, setCurrScene, currScene } = useStatus();


// export type sceneType = {};


export type ScoreContextType = {
    players: playerType[];
    incScore: (index: number, delta: number) => void;
    addPlayer: (player: playerType) => void;
    getScore: (index: number) => number;
    getHighestScore: () => playerType;
};

export const ScoreContext = React.createContext<ScoreContextType | undefined>(undefined);
