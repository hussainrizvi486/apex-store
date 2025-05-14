import React from "react"
import { useSelector } from "react-redux"
import { AuthState } from "../slices";

const useAuth = () => {

    const authState: AuthState = useSelector((state) => state?.auth);

    // const [isLoading, setIsLoading] = React.useState(true);
    console.log(authState)



    const [isAuthenticated, setIsAuthenticated] = React.useState(authState.isAuthenticated);

    const user = authState?.user;

    // return
    return { isAuthenticated, user }
}
export { useAuth }