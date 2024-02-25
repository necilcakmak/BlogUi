import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ApiService from "services/apiService";
import { loginModel } from "interfaces/login";
import endPoints from "EndPoints";
import Input from "components/input";
import { RegisterModel } from "interfaces/registerModel";
import { Button } from "components/button";

interface RegisterError {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  passwordRepeat?: string;
  hata?: string;
}

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<RegisterError>({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [calendarValue, setCalendarValue] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    passwordRepeat: "",
    gender: true,
    birthDate: "",
    email: "",
  });

  const {
    email,
    password,
    passwordRepeat,
    firstName,
    lastName,
    userName,
    gender,
    birthDate,
  } = form;
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
    setPendingApiCall(true);
    const response = await ApiService.post<RegisterModel>(
      endPoints.REGISTER_URL,
      form
    );

    setPendingApiCall(false);
    if (response.success === true) {
      toast.success(response.message);
      navigate("/login");
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
          <h3 className="text-center">{t("RegisterPage")}</h3>
          <form>
            <Input
              type="text"
              placeholder={t("firstName")}
              name="firstName"
              error={errors.firstName}
              value={firstName}
              onChange={(e) => onChange(e)}
            />
            <Input
              type="text"
              placeholder={t("lastName")}
              name="lastName"
              error={errors.lastName}
              value={lastName}
              onChange={(e) => onChange(e)}
            />
            <Input
              type="text"
              placeholder={t("userName")}
              name="userName"
              error={errors.userName}
              value={userName}
              onChange={(e) => onChange(e)}
            />
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
            <Input
              type="password"
              placeholder={t("password")}
              name="passwordRepeat"
              error={errors.passwordRepeat}
              value={passwordRepeat}
              onChange={(e) => onChange(e)}
              minLength="3"
            />
            {errors.hata && (
              <div className="alert alert-danger">{errors.hata}</div>
            )}
          </form>
          <div className="mt-2">
            <Button
              cls="primary"
              type="submit"
              pendingApiCall={pendingApiCall}
              text={t("Register")}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => onSubmit(e)}
            />
            <div style={{ float: "right" }}>
              <Link className="btn btn-primary" to="/login">
                {t("Login")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
