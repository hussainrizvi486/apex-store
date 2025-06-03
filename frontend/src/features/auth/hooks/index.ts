import { useSelector } from "react-redux"
import { AuthState } from "../slices";


const logout = () => { }
const useAuth = () => {
    const authState: AuthState = useSelector((state: { auth: AuthState }) => state?.auth);
    // const [isAuthenticated, setIsAuthenticated] = React.useState(authState.isAuthenticated);
    const isAuthenticated = authState.isAuthenticated
    const user = authState?.user;

    return { isAuthenticated, user, logout }
}
export { useAuth }