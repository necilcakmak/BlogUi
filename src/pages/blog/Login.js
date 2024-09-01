import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "components/Button";
import { AuthService } from "services/AuthService";
import Input from "components/Input";
import { object, string } from "yup";

const Login = () => {
  const authService = new AuthService();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [form, setForm] = useState({
    password: "",
    email: "",
  });

  const { email, password } = form;
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
  let validationSchema = object({
    email: string()
      .required("E-Posta zorunludur!")
      .min(5, "En az 5 karakter olmalı")
      .max(50, "En fazla 50 karakter olabilir"),
    password: string()
      .required("Parola zorunludur")
      .min(5, "En az 5 karakter olmalı")
      .max(50, "En fazla 50 karakter olabilir"),
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(form, { abortEarly: false });
    } catch (error) {
      let newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      toast.error("Bilgileri kontrol ediniz.");
      return;
    }
    const cred = {
      email,
      password,
    };
    setPendingApiCall(true);
    const response = await authService.login(cred);
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
      if (response.validationErrors !== undefined) {
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
          <form>
            <Input
              type="text"
              placeholder={t("Email")}
              name="email"
              error={errors.email}
              value={email}
              onChange={(e) => onChange(e)}
            />
            <Input
              type="password"
              placeholder={t("password")}
              name="password"
              error={errors.password}
              value={password}
              onChange={(e) => onChange(e)}
              minLength="3"
            />
            {errors.Hata && (
              <div className="alert alert-danger">{errors.hata}</div>
            )}
          </form>
          <div className="mt-2">
            <Button
              cls="primary"
              type="submit"
              pendingApiCall={pendingApiCall}
              txt={t("Login")}
              onClick={(e) => onSubmit(e)}
            />
            <div style={{ float: "right" }}>
              <Link className="btn btn-primary" to="/register">
                {t("Register")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
