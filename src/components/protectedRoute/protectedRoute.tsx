import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../types/types";

const ProtectedRoute = ({
  isLoggedIn,
  isLoading,
  children,
}: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      navigate("/", { replace: true });
    }
  }, [navigate, isLoggedIn, isLoading]);

  return <>{children}</>;
};

export default ProtectedRoute;
