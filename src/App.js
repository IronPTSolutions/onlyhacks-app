import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/misc/Navbar";
import ProtectedRoute from "./components/misc/ProtectedRoute";
import HomeScreen from "./screens/Home/HomeScreen";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import UserDetailScreen from "./screens/Users/UserDetailScreen";
import UsersFormScreen from "./screens/Users/UsersFormScreen";
import UsersScreen from "./screens/Users/UsersScreen";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersScreen />} />
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
    </div>
  );
}

export default App;
