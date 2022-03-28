export const logoutState = () => null

export const isAuthenticate = (state) => {
    return {
        isAuthenticated: !!state.auth.token
    }
}