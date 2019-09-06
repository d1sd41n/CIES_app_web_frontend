// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import People from "@material-ui/icons/People";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Users from "views/Users/Users.jsx";
import CreateUser from "views/Users/CreateUser.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";

const dashboardRoutes = [
  {
    sidebar: true,
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    sidebar: true,
    path: "/usuarios",
    name: "Usuarios",
    icon: People,
    component: Users,
    layout: "/admin"
  },
  {
    sidebar: false,
    path: "/createuser",
    name: "Agregar Usuario",
    icon: People,
    component: CreateUser,
    layout: "/admin"
  },
  {
    sidebar: true,
    path: "/profile",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    sidebar: true,
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    sidebar: true,
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
];

export default dashboardRoutes;
