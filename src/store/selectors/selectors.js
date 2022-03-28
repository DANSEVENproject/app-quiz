export const logoutState = () => null

export const isAuthenticated = (state) => {
    return {
        isAuthenticated: !!state.auth.token
    }
}