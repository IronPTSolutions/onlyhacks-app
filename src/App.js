import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/misc/Navbar";
import ProtectedRoute from "./components/misc/ProtectedRoute";
import UnprotectedRoute from "./components/misc/UnprotectedRoute copy";
import { useAuthContext } from "./contexts/AuthContext";
import HomeScreen from "./screens/Home/HomeScreen";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import UserDetailScreen from "./screens/Users/UserDetailScreen";
import UsersFormScreen from "./screens/Users/UsersFormScreen";
import UsersScreen from "./screens/Users/UsersScreen";

function App() {
  const { isAuthFetched } = useAuthContext()
  return (
    <div className="App">
      <NavBar />
      {isAuthFetched ? (
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={
            <UnprotectedRoute>
              <Login />
            </UnprotectedRoute>
          }
          />
          <Route path="/users"
            element={
              <ProtectedRoute>
                <UsersScreen />
              </ProtectedRoute>
          }
          />
          {/* <Route path="/users/create" element={<UsersFormScreen />} /> */}
          <Route path="/users/edit/:id" element={<UsersFormScreen edit />} />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <UserDetailScreen />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
