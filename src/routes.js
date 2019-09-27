// @material-ui/icons
import People from "@material-ui/icons/People";
import DevicesOther from "@material-ui/icons/DevicesOther";
import Wc from "@material-ui/icons/Wc";
import SwapHoriz from "@material-ui/icons/SwapHoriz";
import LineStyle from "@material-ui/icons/LineStyle";
// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Users from "./views/Users/Users.jsx";
import CreateUser from "./views/Users/CreateUser.jsx";
import Visitors from "./views/Visitors/Visitors.jsx";
import EditVisitor from "./views/Visitors/EditVisitor.jsx";
import Items from "./views/Items/Items.jsx";
import EditItem from "./views/Items/EditItem";
import Records from "./views/Records/Records";
import Codes from "./views/Codes/Codes";

const dashboardRoutes = [
  {
    sidebar: true,
    path: "/usuarios",
    name: "Usuarios",
    icon: People,
    component: Users,
    layout: "/admin",
    permission: true
  },
  {
    sidebar: false,
    path: "/createuser",
    name: "Agregar Usuario",
    icon: People,
    component: CreateUser,
    layout: "/admin",
    permission: false
  },
  {
    sidebar: true,
    path: "/visitantes",
    name: "Visitantes",
    icon: Wc,
    component: Visitors,
    layout: "/admin",
    permission: false
  },
  {
    sidebar: false,
    path: "/editarvisitante/:id",
    name: "Editar Visitante",
    icon: Wc,
    component: EditVisitor,
    layout: "/admin",
    permission: false
  },
  {
    sidebar: true,
    path: "/Objetos",
    name: "Objetos",
    icon: DevicesOther,
    component: Items,
    layout: "/admin",
    permission: false
  },
  {
    sidebar: false,
    path: "/EditarObjeto/:id",
    name: "Editar Objeto",
    icon: DevicesOther,
    component: EditItem,
    layout: "/admin",
    permission: false
  },
  {
    sidebar: true,
    path: "/historial",
    name: "Historial",
    icon: SwapHoriz,
    component: Records,
    layout: "/admin",
    permission: false
  },
  {
    sidebar: true,
    path: "/generateCodes",
    name: "Generar codigos Qr",
    icon: LineStyle,
    component: Codes,
    layout: "/admin",
    permission: false
  },
];

export default dashboardRoutes;
