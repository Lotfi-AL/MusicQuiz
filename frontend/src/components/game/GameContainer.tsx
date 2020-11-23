import React, { useEffect, useState } from 'react'
import { getData } from "src/utils/requests";
import { IQuiz } from "src/typings/IQuiz";
import { useRouter } from 'next/router';

const GameContainer = ({ song }) => {
    // const [quiz, setQuiz] = useState<IQuiz>();
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     getData("/quiz/" + pid3, false)
    //         .then((data) => {
    //             setQuiz(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);
    console.log(song);
    return (
        <div>

        </div>
    )
}


export default GameContainer
