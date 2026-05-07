import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateApp from "./pages/CreateApp";
import DynamicApp from "./pages/DynamicApp";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateApp />
            </ProtectedRoute>
          }
        />

        <Route
          path="/app/:id"
          element={
            <ProtectedRoute>
              <DynamicApp />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;