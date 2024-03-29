import React, { ChangeEvent, useState } from "react";
import Input from "../components/input";
import { Button } from "../components/button";
import { useTranslation } from "react-i18next";
import endPoints from "EndPoints";
import { Link, useNavigate } from "react-router-dom";
import { AccessToken } from "interfaces/accessToken";
import { toast } from "react-toastify";
import ApiService from "services/apiService";
import { useAuth } from "contexts/authContext";

interface LoginError {
  email?: string;
  password?: string;
  hata?: string;
}
const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [errors, setErrors] = useState<LoginError>({});
  const navigate = useNavigate();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [form, setForm] = useState({
    password: "",
    email: "",
  });

  const { email, password } = form;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const cred = {
      email,
      password,
    };
    setPendingApiCall(true);
    const response = await ApiService.post<AccessToken>(
      endPoints.LOGIN_URL,
      cred
    );

    if (response.success === true) {
      localStorage.setItem("token", response.data.token || "");
      localStorage.setItem("user", JSON.stringify(response.data?.user));
      login(response.data.user);
      toast.success(response.message);
      navigate("/");
    } else {
      if (response.validationErrors !== undefined) {
        setErrors(response.validationErrors as LoginError);
      }
      toast.error(response.message);
    }
    setPendingApiCall(false);
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-md-center">
        <div className="col-sm-5">
          <h3 className="text-center">login page</h3>
          <form>
            <Input
              type="text"
              placeholder={t("Email")}
              name="email"
              error={errors.email}
              value={email}
              minLength="3"
              onChange={(e) => onChange(e)}
            />
            <Input
              type="password"
              placeholder={t("Password")}
              name="password"
              error={errors.password}
              value={password}
              onChange={(e) => onChange(e)}
              minLength="3"
            />
            {errors.hata && (
              <div className="alert alert-danger">{errors.hata}</div>
            )}
          </form>
          <div className="mt-2">
            <Button
              cls="btn btn-primary"
              type="submit"
              disabled={pendingApiCall}
              text={t("Login")}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => onSubmit(e)}
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
