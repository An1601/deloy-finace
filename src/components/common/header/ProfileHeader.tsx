import { useNavigate } from "react-router-dom";
import ava from "@assets/images/profile/avatar.jpeg";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import api from "@api/axios";
import { toast } from "react-toastify";
import Loader from "../loader/loader";
import { handle_logout } from "@redux/userReducers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import ProfileLink from "./ProfileLink";
import useWindowWidth from "../../hook/useWindowWidth";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { fetchProfileData } from "@redux/userThunks";
import { useUser, useLoading } from "@redux/useSelector";

function ProfileHeader() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useLoading();
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();

  const user = useUser();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(setLoadingTrue());
      const response = await api.post("/logout");
      dispatch(setLoadingFalse());
      if (response && response.status === 200) {
        navigate("/signin");
        dispatch(handle_logout());
      } else {
        const error = await response?.data;
        toast.warning(error.message || t("header.messWarning"));
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        toast.error(t("header.messError"));
      }
    }
  };
  if (isLoading) return <Loader />;

  return (
    <div className="header-element hs-dropdown ti-dropdown md:min-w-[163px]">
      <div className="flex items-center gap-4">
        <button
          id="dropdown-profile"
          type="button"
          className="hs-dropdown-toggle !shadow-none !border-0 !shadow-transparent "
        >
          <img
            className="inline-block rounded-full max-w-[35px]"
            src={ava}
            width="35"
            height="35"
          />
        </button>
        <div className="flex sm:hidden md:flex dropdown-profile flex-col">
          <div className="font-normal leading-4 !text-light_finance-textsub block text-[0.6875rem] ">
            {t("header.goodMorning")}
          </div>
          <div className="font-bold  !text-light_finance-textbody text-base tracking-tighter">
            {user?.name}
          </div>
        </div>
      </div>
      {windowWidth > 480 && (
        <div
          className="hs-dropdown-menu ti-dropdown-menu !-mt-3 border-0 w-[11rem] !p-0 border-defaultborder hidden main-header-dropdown  pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
          aria-labelledby="dropdown-profile"
        >
          <ul className="text-defaulttextcolor font-medium dark:text-[#8C9097] dark:text-white/50">
            <ProfileLink
              to="/profile"
              icon="ti-user-circle"
              label={t("header.profile")}
            />
            <ProfileLink
              to="#"
              icon="ti-inbox"
              label={t("header.inbox")}
              badge="25"
            />
            <ProfileLink
              to="#"
              icon="ti-clipboard-check"
              label={t("header.taskManager")}
            />
            <ProfileLink
              to="#"
              icon="ti-adjustments-horizontal"
              label={t("header.setting")}
            />
            <ProfileLink to="#" icon="ti-wallet" label={t("header.bal")} />
            <ProfileLink to="#" icon="ti-headset" label={t("header.support")} />
            <li
              onClick={handleLogout}
              className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex cursor-pointer"
            >
              <i className="ti ti-logout text-[1.125rem] me-2 opacity-[0.7]"></i>
              {t("header.logout")}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
