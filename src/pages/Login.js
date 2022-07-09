import React, { useState } from "react";
import alertify from "alertifyjs";
import Input from "../components/Input";
import { post } from "../api/globalServices";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
    const response = await post("auth/login", cred);
    setPendingApiCall(false);
    if (response.success === true) {
      localStorage.setItem("token", response.data.token);
      alertify.success(response.message);
      navigate("/");
    } else {
      if (response.validationErrors !== null) {
        setErrors(response.validationErrors);
      }
      alertify.error(response.message);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-md-center">
        <div className="col-sm-5">
          <h3 className="text-center">Login</h3>
          <form onSubmit={(e) => onSubmit(e)}>
            <Input
              type="text"
              placeholder="E-Mail"
              name="Email"
              error={errors.Email}
              value={Email}
              onChange={(e) => onChange(e)}
            />
            <Input
              type="password"
              placeholder="Password"
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
