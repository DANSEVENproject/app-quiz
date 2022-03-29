import {useCallback, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'
import Loader from 'components/UI/Loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {fetchQuizes} from 'store/actions/quiz'
import { quizListToProps } from 'store/selectors/selectors'

const QuizList = () => {
    const dispatch = useDispatch()
    const selector = useSelector(quizListToProps)

    //eslint-disable-next-line
    const renderQuizes = useCallback(
        selector.quizes.map(quiz => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    , [selector.quizes])

    //eslint-disable-next-line
    useEffect(() => dispatch(fetchQuizes()), [])

    return (
        <div className={classes.QuizList}>
            <div>
                <h1>Список тестов</h1>
            {
                 selector.loading && selector.quizes.length !== 0
                  ? <Loader />
                  : <ul>
                      {renderQuizes}
                    </ul>
            }
            </div>
        </div>
    )
}

export default QuizList