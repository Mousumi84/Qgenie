import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const token = localStorage.getItem("studentToken") || localStorage.getItem("teacherToken");

    console.log("ProtectedRoute: token =", token);

    return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;