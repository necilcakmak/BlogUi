import PrivateRoute from "./components/PrivateRoute";
import Articles from "./pages/blog/article/Articles";
import Home from "./pages/blog/Home";
import Login from "./pages/blog/Login";
import Profile from "./pages/blog/profile/Profile";
import BlogLayout from "./pages/blog/BlogLayout";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import ArticleDetail from "./pages/blog/article/ArticleDetail";
import Register from "./pages/blog/Register";
import Users from "./pages/admin/Users";
import AArticles from "./pages/admin/Articles";

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
        path: "article/:id",
        name: "articleDetail",
        element: <ArticleDetail />,
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
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
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
        path: "articles",
        name: "articles",
        element: <AArticles />,
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
    path: "register",
    name: "register",
    element: <Register />,
  },
  {
    path: "*",
    name: "notfound",
    element: <NotFound />,
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
