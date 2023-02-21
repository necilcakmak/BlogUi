import React, { useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import { post } from "../../api/globalServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import EndPoints from "../../EndPoints";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [form, setForm] = useState({
    Password: "",
    Email: "",
  });

  const { Email, Password } = form;
  const onChange = (e) => {
    const { name, value } = e.target;
    setErrors((previousError) => ({
      ...previousError,
      [name]: undefined,
    }));
    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const cred = {
      Email,
      Password,
    };
    setPendingApiCall(true);
    const response = await post(EndPoints.LOGIN_URL, cred);
    setPendingApiCall(false);
    if (response.success === true) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success(response.message);

      setIsLoggedIn(true);
      setUser(response.data.user);
      if (response.data.user.roleName === "admin") {
        navigate("/admin");
      }
      navigate("/");
    } else {
      if (response.validationErrors !== null) {
        setErrors(response.validationErrors);
      }
      toast.error(response.message);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-md-center">
        <div className="col-sm-5">
          <h3 className="text-center">{t("LoginPage")}</h3>
          <form onSubmit={(e) => onSubmit(e)}>
            <Input
              type="text"
              placeholder={t("Email")}
              name="Email"
              error={errors.Email}
              value={Email}
              onChange={(e) => onChange(e)}
            />
            <Input
              type="password"
              placeholder={t("Password")}
              name="Password"
              error={errors.Password}
              value={Password}
              onChange={(e) => onChange(e)}
              minLength="3"
            />
            {errors.Hata && (
              <div className="alert alert-danger">{errors.Hata}</div>
            )}
            <button
              className="btn btn-primary"
              type="submit"
              disabled={pendingApiCall}
            >
              {pendingApiCall && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {t("Login")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
