import Home from "pages/home";
import Login from "./pages/login";
import Articles from "pages/articles";
import Register from "pages/register";
const routes = [
  {
    path: "/",
    name: "home",
    element: <Home />,
  },
  {
    path: "/articles",
    name: "articles",
    element: <Articles />,
  },
  {
    path: "login",
    name: "login",
    element: <Login />,
  },
  {
    path: "register",
    name: "register",
    element: <Register />,
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
