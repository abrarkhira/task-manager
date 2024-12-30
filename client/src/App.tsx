import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import { ToastContainer } from "react-toastify";
import ViewTasks from "./pages/Tasks/ViewTasks";

const App = () => (
  <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tasks" element={<ViewTasks />} />
      </Routes>
    </Router>
  </>
);

export default App;
