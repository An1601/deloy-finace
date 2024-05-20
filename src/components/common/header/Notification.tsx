import NotiHeader from "../../svg/NotiHeader";
import faqIcon from "../../../assets/icon/FAQIcon.svg";
import useWindowWidth from "../../hook/UseWindowWidth";
import AuthSubmitBtn from "../button/AuthSubmitBtn";
import NotificationList from "../../../container/dashboards/Notification/NotificationList";

function Notification() {
  const windowWidth = useWindowWidth();

  return (
    <div className="flex gap-3 items-center">
      <div className="header-element notifications-dropdown header-notification hs-dropdown ti-dropdown [--placement:bottom-right] rtl:[--placement:bottom-left]">
        <button
          id="dropdown-notification"
          type="button"
          className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs"
        >
          <NotiHeader />
        </button>
        {windowWidth > 480 && (
          <div
            className="relative sm:!w-[380px] sm:!h-[650px] sm:overflow-y-auto !rounded-lg main-header-dropdown !-mt-3 !p-0 hs-dropdown-menu ti-dropdown-menu bg-white !w-[22rem] border-0 border-defaultborder hidden !m-0"
            aria-labelledby="dropdown-notification"
          >
            <div className="sm:!w-[380px] sm:!h-[650px] sm:overflow-y-auto">
              <div className="ti-dropdown-header !m-0 !p-4 !bg-transparent flex justify-between items-center">
                <span className="font-HelveticaNeue font-bold text-2xl leading-8 text-center text-light_finance-textbody">
                  Notifications
                </span>
                <span className="px-2 py-1 bg-[#FFE4DE] font-HelveticaNeue font-medium text-xs leading-4 tracking-tight text-light_finance-secondary">
                  {" "}
                  5 Unread
                </span>
              </div>
              <div className="w-full">
                <NotificationList />
              </div>
            </div>
            <div className={`absolute bottom-6 w-full flex justify-center `}>
              <AuthSubmitBtn name="View all" />
            </div>
          </div>
        )}
      </div>
      <div className="header-element header-notification hs-dropdown ti-dropdown [--placement:bottom-right] rtl:[--placement:bottom-left]">
        <button
          type="button"
          className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs"
        >
          <img src={faqIcon} />
        </button>
      </div>
    </div>
  );
}

export default Notification;