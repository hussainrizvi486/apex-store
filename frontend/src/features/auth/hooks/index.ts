import { useSelector } from "react-redux"
import { AuthState } from "../slices";
import { jwtDecode } from "jwt-decode";


const logout = () => { }
const useAuth = () => {
    const authState: AuthState = useSelector((state: { auth: AuthState }) => state?.auth);
    const isAuthenticated = authState.isAuthenticated

    if (!isAuthenticated || !authState.access_token) {
        return { isAuthenticated, user: null, logout }
    }

    const user = jwtDecode(authState.access_token);

    return { isAuthenticated, user, logout }
}
export { useAuth }