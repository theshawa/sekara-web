import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../../common/Logo";
import { useAppContext } from "../../../context";
import { useIsAdmin } from "../../../hooks/useIsAdmin";

export const Header = () => {
  const { auth, setAuth } = useAppContext();
  const navigate = useNavigate();

  const isAdmin = useIsAdmin();

  return (
    <>
      <header
        className={`sticky top-0 ${
          isAdmin ? "h-[90px]" : "h-[60px]"
        }  flex flex-col z-[1000] max-w-screen-xl mx-auto px-5`}
      >
        <div
          className={`flex items-center justify-between bg-slate-50/90 backdrop-blur-sm z-50 ${
            isAdmin ? "h-[50px]" : "h-[60px]"
          }`}
        >
          <Logo className="text-slate-950 w-[80px] mr-5" withLink />
          <nav className="flex items-center space-x-5 md:space-x-8 overflow-auto w-max max-w-full ml-auto">
            {auth ? (
              <>
                <Link to="/app/bookmarks" className="link">
                  Bookmarks
                </Link>
                {/* <Link to="/app/account" className="link">
                  Account
                </Link> */}
                <Link to={`/app/user/${auth._id}`} className="link">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    // Sign out logic
                    setAuth(null);
                    localStorage.removeItem("auth");
                    navigate("/sign-in");
                  }}
                  className="link"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/sign-in" className="link">
                Sign in
              </Link>
            )}
            <Link to="/app/write">
              <button className="btn flex items-center space-x-1.5">
                <svg
                  width="11"
                  height="12"
                  viewBox="0 0 11 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.60678 0.961657C8.06021 0.508224 8.79541 0.508224 9.24885 0.961657L10.5384 2.25122C10.9918 2.70466 10.9918 3.43982 10.5384 3.89329L9.48711 4.94456C9.44178 4.98992 9.36825 4.98992 9.32291 4.94456L6.55551 2.17716C6.51015 2.13179 6.51015 2.05829 6.55548 2.01292L7.60678 0.961657Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M5.90275 2.66565C5.94808 2.62032 6.02162 2.62032 6.06695 2.66565L8.83438 5.43309C8.87971 5.47842 8.87971 5.55192 8.83438 5.59729L5.25195 9.17972L3.22325 11.2084C3.11438 11.3173 2.96672 11.3784 2.81275 11.3784H0.237682C0.173582 11.3784 0.121582 11.3265 0.121582 11.2623V8.68729C0.121582 8.53332 0.182749 8.38565 0.291615 8.27675L2.32032 6.24809L5.90275 2.66565Z"
                    fill="#E2E8F0"
                  />
                </svg>
                <span>Write</span>
              </button>
            </Link>
          </nav>
        </div>
        {isAdmin && (
          <nav className="w-max mx-auto max-w-full h-[25px] bg-slate-950/90 backdrop-blur-sm mt-[5px] flex items-center space-x-5 overflow-auto px-5 rounded-md text-sm font-medium text-slate-300 uppercase">
            <span className="font-bold flex-shrink-0">ADMIN Ops:</span>
            <Link
              to="/app/admin/topics"
              className="flex-shrink-0 hover:underline active:scale-95"
            >
              Manage Topics
            </Link>
            <Link
              to="/app/admin/users"
              className="flex-shrink-0 hover:underline active:scale-95"
            >
              Manage Users
            </Link>
          </nav>
        )}
      </header>
    </>
  );
};
