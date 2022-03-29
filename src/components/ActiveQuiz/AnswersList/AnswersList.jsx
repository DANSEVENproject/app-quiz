import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'
import { useCallback } from 'react'

const AnswersList = (props) => {
    //eslint-disable-next-line
    const answersMap = useCallback(props.answers.map((answer, index) => {
        return (
            <AnswerItem 
                key={index}
                answer={answer}
                onAnswerClick={props.onAnswerClick}
                state={props.state ? props.state[answer.id] : null}
            />
        )
    }), [props.state])

    return (
        <ul className={classes.AnswersList}>
                {answersMap}
        </ul>
    )   
}

export default AnswersList