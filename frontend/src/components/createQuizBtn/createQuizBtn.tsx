import { Button } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

const CreateQuizBtn = () => {
    return (
        <Link href="/quiz/edit"><Button variant="contained" color="primary">Create Quiz</Button></Link>
    )
}


export default CreateQuizBtn;