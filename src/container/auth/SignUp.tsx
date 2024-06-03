import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "@assets/images/brand-logos/1.png";
import { SignUpInfo } from "@type/types";
import { AppDispatch } from "@redux/store";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import Loader from "@components/common/loader/loader";
import api from "@api/axios";
import AuthSubmitBtn from "@components/common/button/AuthSubmitBtn";
import InputField from "@components/common/input";
import { useTranslation } from "react-i18next";
import { useLoading } from "@redux/useSelector";

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useLoading();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<SignUpInfo>();

  const handleSignUp = async (data: SignUpInfo) => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.post("/register", data);
      if (response.status === 200) {
        navigate(`/verify-code?email=${data.email}&signup=true`);
        toast.success(response.data.message || t("signup.messageSuccess"));
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : t("signup.messageError");
      toast.error(message);
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="w-screen sm:max-w-[480px] z-10 my-[3.25rem] lg:my-10 px-6 flex flex-col justify-center items-center gap-12"
      >
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16" src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-1">
            <div className="font-HelveticaNeue text-light_finance-textsub text-[2.5rem] font-bold leading-12 tracking-[-1.2px]">
              {t("signup.signUp")}
            </div>
            <div className="font-HelveticaNeue text-light_finance-textsub text-xs font-light leading-4 tracking-[-0.12px]">
              {t("signup.descriptionSignUp")}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-10">
            <InputField
              label={t("signup.name")}
              placeholder={t("signup.yourName")}
              register={register("name", {
                required: t("signup.requireName"),
              })}
              error={errors.name}
            />
            <InputField
              label={t("signup.phone")}
              placeholder={t("signup.yourPhone")}
              register={register("phone", {
                required: t("signup.requirePhone"),
              })}
              error={errors.phone}
            />
            <InputField
              label={t("signup.email")}
              placeholder={t("signup.yourEmail")}
              type="email"
              register={register("email", {
                required: t("signup.requireEmail"),
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: t("signup.messageEmail"),
                },
              })}
              error={errors.email}
            />
            <InputField
              label={t("signup.date")}
              placeholder={t("signup.yourDate")}
              type="date"
              register={register("date_of_birth", {
                required: t("signup.requireDate"),
              })}
              error={errors.date_of_birth}
            />
            <InputField
              label={t("signup.address")}
              placeholder={t("signup.yourAddress")}
              register={register("address", {
                required: t("signup.requireAddress"),
              })}
              error={errors.address}
            />
            <InputField
              label={t("signup.password")}
              placeholder={t("signup.yourPassword")}
              type={showPassword1 ? "text" : "password"}
              isPassword
              showPassword={showPassword1}
              toggleShowPassword={() => setShowPassword1(!showPassword1)}
              register={register("password", {
                required: t("signup.requirePassword"),
                pattern: {
                  value:
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}/,
                  message: t("login.messagePassword"),
                },
              })}
              error={errors.password}
            />
            <InputField
              label={t("signup.confirmPassword")}
              placeholder={t("signup.yourConfirmPassword")}
              type={showPassword2 ? "text" : "password"}
              isPassword
              showPassword={showPassword2}
              toggleShowPassword={() => setShowPassword2(!showPassword2)}
              register={register("password_confirmation", {
                required: t("signup.requireComfirm"),
                validate: (value) =>
                  value === getValues("password") || t("signup.matchPassword"),
              })}
              error={errors.password_confirmation}
            />
          </div>
          <div className="w-full flex items-center gap-[2px]">
            <input
              className={`m-1 border-[1.5px] ${errors.policy_agreement ? "border-red" : "border-light_finance-textbody"} checked:hover:bg-light_finance-textbody`}
              type="checkbox"
              {...register("policy_agreement", { required: true })}
            />
            <div>{t("signup.agree")}</div>
          </div>
        </div>
        <div className="w-[280px] h-[100px] flex flex-col items-center gap-6">
          <button type="submit">
            <AuthSubmitBtn name={t("signup.signUp")} />
          </button>
          <AuthSubmitBtn type="submit" name="Sign Up" />
          <div className="flex items-center gap-[0.615rem]">
            <div className="text-light_finance-textbody text-sm font-normal font-['Be Vietnam'] leading-tight">
              {t("signup.already")}
            </div>
            <div
              className="text-light_finance-textbody text-sm font-semibold font-['Be Vietnam'] underline leading-tight cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              {t("signup.signIn")}
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default SignUp;
