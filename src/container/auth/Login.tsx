import { Fragment } from "react/jsx-runtime";
import logo from "../../assets/images/brand-logos/1.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginInfo } from "../../type/types";
import EyeSlash from "../../components/svg/EyeSlash";
import { useState } from "react";
import EyeOpen from "../../components/svg/EyeOpen";

const Login = () => {
  const navigate = useNavigate();
  const [passwordshow, setpasswordshow] = useState(false);
  const {
    handleSubmit: SubmitLogin,
    register: login_data,
    formState: { errors: error_login },
  } = useForm<LoginInfo>();

  const HandleSubmitLogin = (login_data: LoginInfo) => {
    console.log(login_data);
  };

  return (
    <Fragment>
      {/* right col */}
      <form
        onSubmit={SubmitLogin(HandleSubmitLogin)}
        className="w-screen sm:max-w-[480px] z-10 mt-[6.25rem] mb-[3.25rem] px-6 flex flex-col items-center gap-12"
      >
        {/* frame logo */}
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16 " src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-1">
            <div className="font-HelveticaNeue text-light_finance-textsub text-[2.5rem] font-bold leading-12 tracking-[-1.2px]">
              Sign In
            </div>
            <div className="font-HelveticaNeue text-light_finance-textsub text-xs font-light leading-4 tracking-[-0.12px]">
              365 people are online
            </div>
          </div>
        </div>
        {/* frame input */}
        {/* input field */}
        <div className="w-full flex flex-col gap-8">
          {/* email filed */}
          <div className="w-full flex flex-col gap-2 relative">
            <div
              className={`w-full h-[52px] px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${error_login.email ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
            >
              <div className="w-full justify-start items-start gap-2 flex">
                <input
                  className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                  placeholder="Your email"
                  {...login_data("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message:
                        "This email is incorrect. Please input your email",
                    },
                  })}
                />
              </div>
              <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
                <div
                  className={`${error_login.email ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                >
                  Email
                </div>
              </div>
            </div>
            {error_login.email &&
              typeof error_login.email?.message === "string" && (
                <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                  {error_login.email.message}
                </div>
              )}
          </div>
          {/* Password field*/}
          <div className="w-full flex flex-col gap-2 relative">
            <div
              className={`w-full h-[52px] px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${error_login.password?.type === "required" ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
            >
              <div className="w-full gap-2 flex items-center justify-between">
                <input
                  className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                  placeholder="Your password"
                  type={passwordshow ? "text" : "password"}
                  {...login_data("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}/,
                      message:
                        "At least 6 characters, 1 digit, 1 lowercase, 1 uppercase, 1 special character",
                    },
                  })}
                />
                {passwordshow ? (
                  <div
                    onClick={() => {
                      setpasswordshow(!passwordshow);
                    }}
                  >
                    <EyeSlash />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setpasswordshow(!passwordshow);
                    }}
                  >
                    <EyeOpen />
                  </div>
                )}
              </div>
              <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
                <div
                  className={`${error_login.email ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                >
                  Password
                </div>
              </div>
            </div>
            {error_login.password &&
              typeof error_login.password?.message === "string" && (
                <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                  {error_login.password.message}
                </div>
              )}
          </div>
          {/* checkbox */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-[2px]">
              <input
                className="m-1 border-[1.5px] border-light_finance-textbody checked:hover:bg-light_finance-textbody"
                type="checkbox"
              />
              <div className="text-light_finance-textbody text-sm font-normal font-HelveticaNeue leading-tight">
                Remember Me
              </div>
            </div>
            <div
              onClick={() => {
                navigate("/forgot-password");
              }}
              className="text-light_finance-textbody text-sm font-normal font-HelveticaNeue leading-tight cursor-pointer underline"
            >
              Forgot password
            </div>
          </div>
        </div>
        {/* frame button */}
        <div className="w-[280px] h-[100px] flex flex-col items-center gap-6">
          <button
            type="submit"
            className="w-[280px] px-3 py-4 bg-light_finance-primary rounded-[28px] shadow border-2 flex justify-center items-center "
          >
            <div className="text-light_finance-textbody text-base font-medium font-['Helvetica Neue'] leading-normal tracking-tight">
              Sign in
            </div>
          </button>
          <div className="flex items-center gap-[0.615rem]">
            <div className="text-light_finance-textbody text-sm font-normal font-['Be Vietnam'] leading-tight">
              Not a account ?
            </div>
            <div
              className="text-light_finance-textbody text-sm font-semibold font-['Be Vietnam'] underline leading-tight cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up now
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
