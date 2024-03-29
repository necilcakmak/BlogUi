import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./i18n";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "contexts/modalContext";
import Navbar from "pages/layout/navbar";
import { AuthProvider } from "contexts/authContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ModalProvider>
        <Navbar />
        <App />
        <ToastContainer />
      </ModalProvider>
    </AuthProvider>
  </BrowserRouter>
);
