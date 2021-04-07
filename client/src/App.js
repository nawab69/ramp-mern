import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import UserRoute from "./utils/user.routes";
import AdminRoute from "./utils/admin.routes";
import PaymentTable from "./components/PaymentTable";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import Users from "./components/Users";
import CreatePayment from "./components/CreatePayments";

function App() {
  return (
    <Router>
      <Toaster />
      <Switch>
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/register" exact component={RegisterScreen} />
        <UserRoute path="/dashboard" exact>
          <DashboardScreen>
            <PaymentTable />
          </DashboardScreen>
        </UserRoute>
        <AdminRoute path="/admin" exact>
          <AdminDashboardScreen></AdminDashboardScreen>
        </AdminRoute>
        <AdminRoute path="/admin/users" exact>
          <AdminDashboardScreen>
            <Users />
          </AdminDashboardScreen>
        </AdminRoute>
        <AdminRoute path="/admin/payments" exact>
          <AdminDashboardScreen>
            <PaymentTable />
          </AdminDashboardScreen>
        </AdminRoute>
        <AdminRoute path="/admin/payments/create/:email">
          <AdminDashboardScreen>
            <CreatePayment />
          </AdminDashboardScreen>
        </AdminRoute>
      </Switch>
    </Router>
  );
}

export default App;
