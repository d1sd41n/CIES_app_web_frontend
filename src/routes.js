// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import People from "@material-ui/icons/People";
import Person from "@material-ui/icons/Person";
import DevicesOther from "@material-ui/icons/DevicesOther";
import Wc from "@material-ui/icons/Wc";
import SwapHoriz from "@material-ui/icons/SwapHoriz";
// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Users from "./views/Users/Users.jsx";
import CreateUser from "./views/Users/CreateUser.jsx";
import Visitors from "./views/Visitors/Visitors.jsx";
import EditVisitor from "./views/Visitors/EditVisitor.jsx";
import Items from "./views/Items/Items.jsx";
import EditItem from "./views/Items/EditItem";
import Records from "./views/Records/Records";

const dashboardRoutes = [
  // {
  //   sidebar: true,
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin"
  // },
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
    path: "/visitantes",
    name: "Visitantes",
    icon: Wc,
    component: Visitors,
    layout: "/admin"
  },
  {
    sidebar: false,
    path: "/editarvisitante/:id",
    name: "Editar Visitante",
    icon: Wc,
    component: EditVisitor,
    layout: "/admin"
  },
  {
    sidebar: true,
    path: "/Objetos",
    name: "Objetos",
    icon: DevicesOther,
    component: Items,
    layout: "/admin"
  },
  {
    sidebar: false,
    path: "/EditarObjeto/:id",
    name: "Editar Objeto",
    icon: DevicesOther,
    component: EditItem,
    layout: "/admin"
  },
  {
    sidebar: true,
    path: "/historial",
    name: "Historial",
    icon: SwapHoriz,
    component: Records,
    layout: "/admin"
  },
];

export default dashboardRoutes;
