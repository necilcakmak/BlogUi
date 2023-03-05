import React, { Fragment } from "react";
import Input from "../../../components/Input";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import { UserService } from "../../../services/UserService";

const Profile = () => {
  const { t } = useTranslation();
  const userService = new UserService();
  const [imageForm, setImageForm] = useState({});
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const initProfileData = {
    age: 0,
    createdDate: "",
    email: "",
    firstName: "",
    gender: false,
    imageName: "",
    imageSrc: "",
    isActive: false,
    isApproved: false,
    lastName: "",
    roleName: "",
    updatedDate: "",
    userName: "",
    userSetting: { newBlog: false, receiveMail: false },
  };
  const [profileInfo, setProfileInfo] = useState(initProfileData);
  const initPasswordData = {
    oldPassword: "",
    password: "",
    passwordRepeat: "",
    passwordIsChange: false,
  };
  const [passwordData, setPasswordData] = useState(initPasswordData);
  useEffect(() => {
    const profile = async () => {
      const response = await userService.getMyInformation();
      if (response.success) {
        setProfileInfo(response.data);
      } else {
        toast.error(response.message);
      }
    };
    profile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = (e) => {
    const { name, value, checked } = e.target;
    setErrors((previousError) => ({
      ...previousError,
      [name]: undefined,
    }));
    if (name === "newBlog") {
      setProfileInfo((previousForm) => ({
        ...previousForm,
        userSetting: { newBlog: checked },
      }));
    }
    setProfileInfo((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const onChangePassword = (e) => {
    const { name, value, checked } = e.target;
    if (name === "passwordIsChange") {
      setPasswordData((previousForm) => ({
        ...previousForm,

        passwordIsChange: checked,
      }));
    } else {
      setPasswordData((previousForm) => ({
        ...previousForm,
        [name]: value,
      }));
    }
    if (passwordData.passwordIsChange) {
      setErrors({
        oldPassword: undefined,
        password: undefined,
        passwordRepeat: undefined,
      });
    }
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const objectUrl = URL.createObjectURL(imageFile);
      setImageForm(imageFile);
      setProfileInfo((previousForm) => ({
        ...previousForm,
        imageSrc: objectUrl,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setPendingApiCall(true);
    const formData = new FormData();
    formData.append("FirstName", profileInfo.firstName);
    formData.append("LastName", profileInfo.lastName);
    formData.append("Gender", profileInfo.gender);
    formData.append("NewBlog", profileInfo.userSetting.newBlog);
    formData.append("PasswordIsChange", passwordData.passwordIsChange);
    formData.append("OldPassword", passwordData.oldPassword);
    formData.append("Password", passwordData.password);
    formData.append("PasswordRepeat", passwordData.passwordRepeat);
    formData.append("ImageFile", imageForm);
    const response = await userService.updateMyProfile(formData);
    setPendingApiCall(false);
    debugger;
    if (response.success === true) {
      toast.success(response.message);
    } else {
      if (response.validationErrors !== null) {
        setErrors(response.validationErrors);
      }
      toast.error(response.message);
    }
  };
  const PassDiv = () => (
    <Fragment>
      <div className="row mt-2">
        <div className="col-md-4">
          <Input
            type="password"
            placeholder={t("OldPassword")}
            name="oldPassword"
            error={errors.oldPassword}
            value={passwordData?.oldPassword}
            disable={!passwordData?.passwordIsChange}
            onChange={(e) => onChangePassword(e)}
          />
        </div>
        <div className="col-md-4">
          <Input
            type="password"
            placeholder={t("Password")}
            name="password"
            error={errors.password}
            value={passwordData?.password}
            disable={!passwordData?.passwordIsChange}
            onChange={(e) => onChangePassword(e)}
          />
        </div>
        <div className="col-md-4">
          <Input
            type="password"
            placeholder={t("PasswordRepeat")}
            name="passwordRepeat"
            disable={!passwordData?.passwordIsChange}
            error={errors.passwordRepeat}
            value={passwordData?.passwordRepeat}
            onChange={(e) => onChangePassword(e)}
          />
        </div>
      </div>
    </Fragment>
  );

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
              <p className="card-text">
                {profileInfo?.email}
                <span
                  className={
                    "badge " +
                    (profileInfo?.isApproved
                      ? "badge-success bg-success"
                      : "badge-danger bg-danger")
                  }
                >
                  {profileInfo?.isApproved ? "Approved" : "Unapproved"}
                </span>
              </p>
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
                  name="firstName"
                  error={errors.firstName}
                  value={profileInfo?.firstName}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  type="text"
                  placeholder={t("LastName")}
                  name="lastName"
                  error={errors.lastName}
                  value={profileInfo?.lastName}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={passwordData?.passwordIsChange}
                  name="passwordIsChange"
                  id="passChk"
                  onChange={(e) => onChangePassword(e)}
                />
                <label className="form-check-label" htmlFor="passChk">
                  Password Change?
                </label>
              </div>
            </div>
            {passwordData?.passwordIsChange ? PassDiv() : ""}

            <div className="mt-5 text-left">
              <Button
                cls="primary"
                type="submit"
                pending={pendingApiCall}
                onClick={(e) => onSubmit(e)}
                txt="Save Profile"
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">New Post</h4>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="newPostCheck"
                name="newBlog"
                checked={profileInfo?.userSetting?.newBlog}
                onChange={(e) => onChange(e)}
              />
              <label className="form-check-label" htmlFor="newPostCheck">
                {profileInfo?.userSetting?.newBlog ? t("Yes") : t("No")}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
