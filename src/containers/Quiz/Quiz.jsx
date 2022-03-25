import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '@components-active/ActiveQuiz'
import FinishedQuiz from '@components-finish/FinishedQuiz'
import Loader from '@components-ui/Loader/Loader'
import {connect} from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '@actions/quiz'
class Quiz extends Component {
    componentDidMount() {  
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        !this.props.loading || !this.props.quiz
                          ? <Loader />
                          : this.props.isFinished
                            ? <FinishedQuiz 
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.props.retryQuiz}
                            />
                            : <ActiveQuiz
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            onAnswerClick={this.props.quizAnswerClick}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                            />  
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps({quiz}) {
    return {
        results: quiz.results,
        isFinished: quiz.isFinished,
        activeQuestion: quiz.activeQuestion,
        answerState: quiz.answerState,
        quiz: quiz.quiz,
        loading: quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz)