import React from "react";
import Input from "../../../components/Input";
import { useState, useEffect } from "react";
import { post, update, get } from "../../../api/globalServices";
import defuser from "../../../assets/defuser.jpg";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Profile = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    Gender: false,
    PasswordIsChange: false,
    OldPassword: "",
    Password: "",
    PasswordRepeat: "",
    IsActive: false,
  });
  const [profileInfo, setProfileInfo] = useState({});

  const {
    FirstName,
    LastName,
    Gender,
    PasswordIsChange,
    OldPassword,
    Password,
    PasswordRepeat,
    IsActive,
  } = form;
  useEffect(() => {
    const profile = async () => {
      const response = await get("user/getmyinformation");
      if (response.success) {
        setProfileInfo(response.data);
      } else {
        toast.error(response.message);
      }
    };
    profile();
  },[]);
  const onChangeImage = (e) => {
    const { files } = e.target;
    setImage(files[0]);
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
  const onImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    const response = await post("user/updateuserimage", formData);
    setPendingApiCall(false);
    if (response.success === true) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await update("user/UpdateMyInformation", form);
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
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" width="150px" src={defuser} />
            <span className="font-weight-bold">{profileInfo?.firstName}</span>
            <span className="text-black-50">{profileInfo?.email}</span>
            <div class="d-flex justify-content-center">
              <div class="btn btn-primary btn-rounded">
                <label class="form-label text-white m-1" for="customFile2">
                  Choose file
                </label>
                <input
                  type="file"
                  class="form-control d-none"
                  id="customFile2"
                  onChange={(e) => onChangeImage(e)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 border-right">
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
              <div className="col-md-12">
                <label className="labels">Education</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="education"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label className="labels">Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="country"
                />
              </div>
              <div className="col-md-6">
                <label className="labels">State/Region</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="state"
                />
              </div>
            </div>
            <div className="mt-5 text-center">
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
