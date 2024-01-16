import Home from "pages/home";
import Login from "./pages/login";
const routes = [
  {
    path: "/",
    name: "home",
    element: <Home />,
  },
  {
    path: "login",
    name: "login",
    element: <Login />,
  },
];

const authMap = (routes) =>
  routes.map((route) => {
    if (route?.children) {
      route.children = authMap(route.children);
    }
    return route;
  });
authMap(routes);
export default authMap(routes);
