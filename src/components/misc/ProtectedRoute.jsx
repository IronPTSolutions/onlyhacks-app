import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../store/AccessTokenStore";
import { useAuthContext } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const token = getAccessToken()
  const { user } = useAuthContext()

  console.log(user)
  if (!token && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute