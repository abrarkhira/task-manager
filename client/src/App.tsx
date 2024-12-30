import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import { ToastContainer } from "react-toastify";
import ViewTasks from "./pages/Tasks/ViewTasks";
import "./App.css";

const isAuthenticated = (): boolean => {
  return localStorage.getItem("authToken") !== null;
};

// PrivateRoute Component
type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};
const App = () => (
  <main>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <ViewTasks />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </main>
);

export default App;
