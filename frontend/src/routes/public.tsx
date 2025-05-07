import { Route, Routes } from "react-router-dom";
import { DemoComponent } from "../demo/component";

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/demo" element={<DemoComponent />} />
        </Routes>
    )

}