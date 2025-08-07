import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
