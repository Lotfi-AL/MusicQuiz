import React from 'react'

export const players = [{ name: "jay", score: 1 }, { name: "joe", score: 2 }]

export const reducer = (players, action) => {
    switch (action.type) {
        case "add":
            return [...players, players[action.name] = 0]
        case "inc":
            return [...players, players[action.name] = players[action.name] + 1]
        case "dec":
            return [...players, players[action.name] = players[action.name] - 1]

    }
}