export const getAuthState = () => {
    return localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens") || "") : null;
}