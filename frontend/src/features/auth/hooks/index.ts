import React from "react"
import { useSelector } from "react-redux"
import { AuthState } from "../slices";

const useAuth = () => {
    const authState: AuthState = useSelector((state: { auth: AuthState }) => state?.auth);
    const [isAuthenticated, setIsAuthenticated] = React.useState(authState.isAuthenticated);
    const user = authState?.user;

    return { isAuthenticated, user }
}
export { useAuth }