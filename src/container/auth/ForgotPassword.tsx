import { Fragment } from "react/jsx-runtime";
import logo from "../../assets/images/brand-logos/1.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setLoadingFalse, setLoadingTrue } from "../../redux/commonReducer";
import { toast } from "react-toastify";
import Loader from "../../components/common/loader/loader";
import api from "../../API/axios";
import axios from "axios";
import AuthSubmitBtn from "../../components/common/button/AuthSubmitBtn";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.rootReducer.commonReducer.isloading,
  );
  const {
    handleSubmit: SubmitForgotPassword,
    register: changePwdData,
    formState: { errors },
  } = useForm<{ email: string }>();

  const HandleForgotPassword = async (changePwdData: { email: string }) => {
    try {
      dispatch(setLoadingTrue());
      const response = await await api.post("/forgot", changePwdData);
      if (response && response.status === 200) {
        const data = await response?.data;
        navigate(`/verify-code?email=${changePwdData.email}&signup=false`);
        toast.success(data.message);
      }
    } catch (error) {
      if (
        axios.isAxiosError<
          {
            message: string;
            data: [];
          },
          Record<string, unknown>
        >(error)
      ) {
        toast.warning(
          error.response?.data.message || "Send OTP unsuccessfully.",
        );
      } else {
        toast.error("An error occurred!");
      }
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      {/* right col */}
      <form
        onSubmit={SubmitForgotPassword(HandleForgotPassword)}
        className="w-screen sm:max-w-[480px] z-10 mt-[6.25rem] mb-[3.25rem] px-6 flex flex-col items-center gap-12"
      >
        {/* frame logo */}
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16 " src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 font-HelveticaNeue text-light_finance-textsub text-[2.5rem] font-bold leading-12 tracking-[-1.2px]">
              Forgot Password
            </div>
            <div className="h-12 font-HelveticaNeue text-base font-normal leading-4 tracking-[-0.12px] text-center">
              Please enter your email address to request a password reset
            </div>
          </div>
        </div>
        {/* frame input */}
        {/* input field */}
        <div className="w-full flex flex-col gap-2">
          {/* email filed */}
          <div className="w-full flex flex-col gap-2 relative">
            <div
              className={`w-full h-[52px] px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${errors.email ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
            >
              <div className="w-full justify-start items-start gap-2 flex">
                <input
                  className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                  placeholder="Your email"
                  {...changePwdData("email", {
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
                <div className="text-light_finance-textsub text-xs font-normal font-HelveticaNeue leading-none tracking-tight">
                  Email
                </div>
              </div>
            </div>
          </div>
          {errors.email && typeof errors.email?.message === "string" && (
            <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
              {errors.email.message}
            </div>
          )}
        </div>

        {/* frame button */}
        <div className="w-[280px] h-[100px] flex flex-col items-center ">
          <button type="submit">
            <AuthSubmitBtn name="Send" />
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default ForgotPassword;