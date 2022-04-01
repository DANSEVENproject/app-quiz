export const logoutState = (state) => null

export const isAuthenticate = (state) => ({ isAuthenticated: !!state.auth.token })

export const quizCreate = (state) => ({ quiz: state.create.quiz })

export const quizListToProps = ({ quiz }) => {
    return {
        quizes: quiz.quizes,
        loading: quiz.loading
    }
}

export const quizProps = ({ quiz }) => {
    return {
        results: quiz.results,
        isFinished: quiz.isFinished,
        activeQuestion: quiz.activeQuestion,
        answerState: quiz.answerState,
        quiz: quiz.quiz,
        loading: quiz.loading
    }
}