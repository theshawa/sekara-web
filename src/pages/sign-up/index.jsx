import { useEffect } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import sekaraBanner from "../../assets/sekara-banner.png";
import { Logo } from "../../common/Logo";
import { PasswordInput } from "../../common/password-input";
import { useAppContext } from "../../context";
import { useRedirectOnAuth } from "../../hooks/useRedirectOnAuth";

export const SignUpPage = () => {
  const actionData = useActionData();
  const { setAuth } = useAppContext();
  useRedirectOnAuth({
    authRequired: false,
    redirectTo: "/",
  });

  useEffect(() => {
    if (!actionData) return;
    if (actionData.success) {
      setAuth({ ...actionData.data });
      localStorage.setItem("auth", JSON.stringify(actionData.data));
    }
  }, [actionData, setAuth]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-5 min-h-screen">
      <Form
        action="/sign-up"
        method="POST"
        className="flex flex-col pt-6 md:px-20 pb-[10vh] lg:pt-[6vh]"
      >
        <Logo withLink className="text-slate-300 w-24 flex-shrink-0" />
        <img
          src={sekaraBanner}
          alt="Seakara Banner"
          className="rounded-xl lg:h-full lg:aspect-auto aspect-video object-cover mt-6 lg:hidden"
        />
        <h1 className="mt-6 font-extrabold">Welcome</h1>
        <p className="mt-2">A Community is waiting for you...</p>
        <div className="flex flex-col max-w-xs mt-8">
          <input
            type="text"
            name="first-name"
            className="input"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="last-name"
            className="input mt-2"
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            className="input mt-2"
            placeholder="Email"
            required
            name="email"
          />
          <PasswordInput
            placeholder="Password"
            name="password"
            className="mt-2"
          />
          <PasswordInput
            placeholder="Retype Password"
            name="retype-password"
            className="mt-2"
          />
          <button type="submit" className="btn mt-5">
            Sign up
          </button>
          <p className="mt-4">
            Already a member?{" "}
            <Link
              to={"/sign-in"}
              className="font-bold underline hover:text-slate-950"
            >
              Sign in
            </Link>
          </p>
          {actionData && !actionData.success && (
            <p className="text-red-600 font-semibold px-4 py-2 rounded-lg bg-red-50 w-max max-w-full border border-red-100 mt-10">
              Error: {actionData.reason}!
            </p>
          )}
        </div>
      </Form>
      <img
        src={sekaraBanner}
        alt="Sekara Banner"
        className="rounded-xl h-full object-cover hidden lg:flex"
      />
    </div>
  );
};
