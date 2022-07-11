import PrivateRoute from "./components/PrivateRoute";
import Articles from "./pages/blog/article/Articles";
import Home from "./pages/blog/Home";
import Login from "./pages/blog/Login";
import Profile from "./pages/blog/profile/Profile";
import BlogLayout from "./pages/blog/BlogLayout";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import Users from "./pages/admin/Users";

const routes = [
  {
    path: "/",
    name: "home",
    element: <BlogLayout />,
    children: [
      {
        index: true,
        name: "index",
        element: <Home />,
      },
      {
        path: "articles",
        name: "articles",
        element: <Articles />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        name: "notfound",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin",
    element: (

        <AdminLayout />
   
    ),
    children: [
      {
        index: true,
        name: "index",
        element: <AdminHome />,
      },
      {
        path: "users",
        name: "users",
        element: <Users />,
      },
      {
        path: "*",
        name: "notfound",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "login",
    name: "login",
    element: <Login />,
  },
  {
    path: "*",
    name: "notfound",
    element: <NotFound />,
  },
];

const authMap = (routes) =>
  routes.map((route) => {
    if (route?.profile) {
      route.element = <PrivateRoute>{route.element}</PrivateRoute>;
    }
    if (route?.children) {
      route.children = authMap(route.children);
    }
    return route;
  });
authMap(routes);
export default authMap(routes);
