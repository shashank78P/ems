import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Protected from "./private/Protected";
import EmployeeListPage from "./pages/employee/page";
import CreateEmployee from "./pages/employee/create/page";
import UpdateEmployee from "./pages/employee/update/page";
import LogIn from "./pages/login/page";
import Dashboard from "./pages/dashboard/page";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="login" element={<LogIn />} />
        <Route
          path="/"
          element={
            <Protected>
              <Outlet />
            </Protected>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="employees" element={<EmployeeListPage />} />

          <Route path="employee/create" element={<CreateEmployee />} />

          <Route path="employee/:id" element={<UpdateEmployee />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
