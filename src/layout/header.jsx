import { Link } from "react-router-dom";
import { Logo } from "../common/Logo";

export const Header = () => {
  return (
    <header className="sticky top-0 h-[60px] flex items-center justify-between">
      <Logo className="text-slate-950 w-[80px]" withLink />
      <nav className="flex items-center space-x-8 flex-1 ml-5 overflow-auto justify-end">
        <Link to="/about" className="link">
          About Us
        </Link>
        <Link to="/write">
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
    </header>
  );
};
