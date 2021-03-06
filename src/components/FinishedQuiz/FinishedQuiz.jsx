import classes from './FinishedQuiz.module.css'
import Button from 'components/UI/Button/Button'
import { Link } from 'react-router-dom'
import { useCallback } from 'react'

const FinishedQuiz = (props) => {
    //eslint-disable-next-line
    const successCount = useCallback(Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0), [props.results])

    //eslint-disable-next-line
    const successList = useCallback(props.quiz.map((quizItem, index) => {   
        const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[quizItem.id]]
        ]    
        return (
            <li 
                key={index}
            >
                <strong>{index + 1}</strong>.&nbsp;
                {quizItem.question}
                <i className={cls.join(' ')} />
            </li>
        )
    }), [props.quiz])

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {successList}
            </ul>

            <p>Правильно {successCount} из {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type='primary'>Повторить</Button>
                <Link to='/'>
                    <Button type='success'>Перейти в список тестов</Button>
                </Link>
                
            </div>
        </div>
    )
}
export default FinishedQuiz