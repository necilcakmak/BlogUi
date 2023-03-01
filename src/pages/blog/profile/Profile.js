import React from "react";
import Input from "../../../components/Input";
import { useState, useEffect } from "react";
import { update, get } from "../../../api/globalServices";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import SelectInput from "../../../components/SelectInput";
import endPoints from "../../../EndPoints";

const Profile = () => {
  const { t } = useTranslation();
  const [profileInfo, setProfileInfo] = useState({});
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const initialValues = {
    FirstName: "",
    LastName: "",
    Gender: false,
    PasswordIsChange: false,
    OldPassword: "",
    Password: "",
    PasswordRepeat: "",
    ImageFile: null,
  };
  const [form, setForm] = useState(initialValues);

  const {
    FirstName,
    LastName,
    Gender,
    OldPassword,
    Password,
    PasswordRepeat,
    IsApproved,
  } = form;
  const genders = [
    { name: "Man", val: true },
    { name: "Woman", val: false },
  ];
  useEffect(() => {
    const profile = async () => {
      const response = await get(endPoints.GET_MYINFORMATİON);
      if (response.success) {
        setProfileInfo(response.data);
      } else {
        toast.error(response.message);
      }
    };
    profile();
  }, []);
  const onChangePassword = (e) => {
    const { name } = e.target;
    setIsPasswordChange(!isPasswordChange);
    if (isPasswordChange) {
      setErrors((previousError) => ({
        ...previousError,
        Password: undefined,
        PasswordRepeat: undefined,
      }));
    }

    setForm((previousForm) => ({
      ...previousForm,
      [name]: !isPasswordChange,
    }));
  };
  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let ImageFile = e.target.files[0];
      const objectUrl = URL.createObjectURL(ImageFile);
      setForm((previousForm) => ({
        ...previousForm,
        ImageFile,
      }));
      setProfileInfo((previousForm) => ({
        ...previousForm,
        imageSrc: objectUrl,
      }));
    }
  };
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
    const formData = new FormData();
    formData.append("FirstName", form.FirstName);
    formData.append("LastName", form.LastName);
    formData.append("Gender", form.Gender);
    formData.append("PasswordIsChange", form.PasswordIsChange);
    formData.append("OldPassword", form.OldPassword);
    formData.append("Password", form.Password);
    formData.append("PasswordRepeat", form.PasswordRepeat);
    formData.append("ImageFile", form.ImageFile);
    formData.append("ImageName", profileInfo.imageName);
    const response = await update(endPoints.UPDATE_PROFİLE, formData);
    setPendingApiCall(false);
    if (response.success === true) {
      toast.success(response.message);
    } else {
      if (response.validationErrors !== null) {
        setErrors(response.validationErrors);
      }
      toast.error(response.message);
    }
  };
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              height={200}
              src={profileInfo?.imageSrc}
              alt={profileInfo?.imageName}
            />
            <div className="card-body">
              <h5 className="card-title">
                {profileInfo?.firstName} {profileInfo?.lastName}
              </h5>
              <p className="card-text">{profileInfo?.email}</p>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                className="form-control form-control-sm"
                id="customFile"
                onChange={(e) => showPreview(e)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-4 ">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <Input
                  type="text"
                  placeholder={t("FirstName")}
                  name="FirstName"
                  error={errors.FirstName}
                  value={FirstName}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  type="text"
                  placeholder={t("LastName")}
                  name="LastName"
                  error={errors.LastName}
                  value={LastName}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="IsApproved"
                  value={profileInfo?.isApproved}
                  disabled={true}
                  id="isActiveChk"
                  onChange={(e) => onChange(e)}
                />
                <label className="form-check-label" for="isActiveChk">
                  Approved
                </label>
              </div>
              <div className="col-md-6">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={isPasswordChange}
                  name="PasswordIsChange"
                  id="passChk"
                  onChange={(e) => onChangePassword(e)}
                />
                <label className="form-check-label" for="passChk">
                  Password Change?
                </label>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-4">
                <Input
                  type="password"
                  placeholder={t("OldPassword")}
                  name="OldPassword"
                  error={errors.OldPassword}
                  value={OldPassword}
                  disable={!isPasswordChange}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="col-md-4">
                <Input
                  type="password"
                  placeholder={t("Password")}
                  name="Password"
                  error={errors.Password}
                  value={Password}
                  disable={!isPasswordChange}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="col-md-4">
                <Input
                  type="password"
                  placeholder={t("PasswordRepeat")}
                  name="PasswordRepeat"
                  disable={!isPasswordChange}
                  error={errors.PasswordRepeat}
                  value={PasswordRepeat}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-4">
                <SelectInput
                  label="Gender"
                  defaultOption="Select"
                  name="Gender"
                  value={Gender}
                  error={errors.Gender}
                  options={genders.map((g) => ({
                    value: g.val,
                    text: g.name,
                  }))}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="mt-5 text-left">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={pendingApiCall}
                onClick={(e) => onSubmit(e)}
              >
                {pendingApiCall && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
