import React, { useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { Calendar } from "primereact/calendar";
import { object, string } from "yup";

const Register = () => {
  const authService = new AuthService();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [calendarValue, setCalendarValue] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    gender: true,
    birthDate: "",
    email: "",
  });

  const { email, password, firstName, lastName, userName, gender, birthDate } =
    form;
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
    firstName: string()
      .required("zorunlu alan")
      .min(3, "En az 3 karakter olmalı")
      .max(50, "En fazla 50 karakter olabilir"),
    lastName: string()
      .required("zorunlu alan")
      .min(2, "En az 2 karakter olmalı")
      .max(50, "En fazla 50 karakter olabilir"),
      userName: string()
      .required("zorunlu alan")
      .min(5, "En az 2 karakter olmalı")
      .max(50, "En fazla 50 karakter olabilir"),
    email: string()
      .required("E-Posta zorunludur!")
      .email("Geçersiz mail formatı")
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
    setPendingApiCall(true);
    const response = await authService.register(form);

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
          <form onSubmit={(e) => onSubmit(e)}>
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
            <div className="form-group">
              <Calendar
                showIcon
                showButtonBar
                value={birthDate}
                name="birthDate"
                onChange={(e) => onChange(e)}
              ></Calendar>
            </div>

            <div style={{ flexDirection: "row" }}>
              <div className="form-group">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="manRadio"
                  value={true}
                  defaultChecked
                  onClick={(e) => onChange(e)}
                />
                <label className="form-check-label" htmlFor="manRadio">
                  Man
                </label>
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="womanRadio"
                  value={false}
                  onClick={(e) => onChange(e)}
                />
                <label className="form-check-label" htmlFor="womanRadio">
                  Woman
                </label>
              </div>
            </div>

            {errors.Hata && (
              <div className="alert alert-danger">{errors.hata}</div>
            )}
          </form>
          <div className="mt-2">
            <Button
              cls="primary"
              type="submit"
              pendingApiCall={pendingApiCall}
              txt={t("Register")}
              onClick={(e) => onSubmit(e)}
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
