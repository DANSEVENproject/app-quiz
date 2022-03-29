export const logoutState = (state) => null

export const isAuthenticate = (state) => {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export const quizListToProps = ({ quiz }) => {
    return {
        quizes: quiz.quizes,
        loading: quiz.loading
    }
}