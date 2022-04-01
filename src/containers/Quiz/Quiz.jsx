import {useEffect} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from 'components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from 'components/FinishedQuiz/FinishedQuiz'
import Loader from 'components/UI/Loader/Loader'
import {useSelector, useDispatch} from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from 'store/actions/quiz'
import {quizProps} from 'store/selectors/selectors'

const Quiz = (props) => {
    const selector = useSelector(quizProps)
    const dispatch = useDispatch()
    const otherProps = {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }

    const QuizCondition = () => (
        selector.isFinished ? 
            <FinishedQuiz 
                results={selector.results}
                quiz={selector.quiz}
                onRetry={otherProps.retryQuiz}
            />
        :   <ActiveQuiz
                answers={selector.quiz[selector.activeQuestion].answers}
                question={selector.quiz[selector.activeQuestion].question}
                onAnswerClick={otherProps.quizAnswerClick}
                quizLength={selector.quiz.length}
                answerNumber={selector.activeQuestion + 1}
                state={selector.answerState}
            />  
    )

    useEffect(() => {  
        otherProps.fetchQuizById(props.match.params.id)
    }, [])

    useEffect(() => {
        otherProps.retryQuiz()
    }, [])

    return (
        <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
                <h1>Ответьте на все вопросы</h1>
                {
                    !selector.loading || !selector.quiz ? <Loader /> : <QuizCondition />
                }
            </div>
        </div>
    )
}

export default Quiz