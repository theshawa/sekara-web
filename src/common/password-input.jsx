import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const PasswordInput = ({
  name,
  value = undefined,
  onChange = undefined,
  className = "",
  placeholder = "******",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <label
      className={`${className} flex items-center px-3 rounded-[6px] border border-slate-300 bg-slate-100 h-8 placeholder:text-slate-500 outline-none focus:border-slate-400`}
    >
      <input
        className="h-8 bg-transparent placeholder:text-slate-500 flex-1 mr-1"
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      <span
        title={showPassword ? "Hide Password" : "Show Password"}
        onClick={() => setShowPassword((osp) => !osp)}
        role="button"
        className="active:scale-95"
      >
        {showPassword ? (
          <EyeSlashIcon className="size-4 text-slate-400" />
        ) : (
          <EyeIcon className="size-4 text-slate-400" />
        )}
      </span>
    </label>
  );
};
