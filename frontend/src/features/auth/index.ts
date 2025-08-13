export const getAuthState = () => {
    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens") as string) : null;

    if (!tokens) {
        return null;
    }

    return {
        ...tokens,
        isAuthenticated: true
    };

};