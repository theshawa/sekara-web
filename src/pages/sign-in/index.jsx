import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";
import sekaraBanner from "../../assets/landing-bg.webp";
import { Logo } from "../../common/Logo";
import { PasswordInput } from "../../common/password-input";
import { useAppContext } from "../../context";
import { useHandleApiError } from "../../hooks/useHandleApiError";
import { useRedirectOnAuth } from "../../hooks/useRedirectOnAuth";

export const SignInPage = () => {
  useRedirectOnAuth({
    authRequired: false,
    redirectTo: "/app",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleError = useHandleApiError();

  const { setAuth } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/user/sign-in", {
        email,
        password,
      });
      setAuth(data.user);
      localStorage.setItem("auth", data.token);
    } catch (error) {
      handleError(error, "sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen gap-5 my-auto p-5 w-full max-w-screen-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col pt-6 md:px-20 pb-[10vh] lg:pt-[6vh]"
      >
        <Logo withLink className="text-slate-300 w-24 flex-shrink-0" />
        <img
          src={sekaraBanner}
          alt="Sekara Banner"
          className="rounded-xl lg:h-full lg:aspect-auto aspect-video  object-cover mt-6 lg:hidden"
        />
        <h1 className="mt-6 font-extrabold">Welcome Back</h1>
        <p className="mt-2">A lot happened...</p>
        <div className="flex flex-col max-w-xs mt-8">
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            placeholder="Password"
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} type="submit" className="btn mt-5">
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <p className="mt-4">
            Not a member yet?{" "}
            <Link
              to={"/sign-up"}
              className="font-bold underline hover:text-slate-950"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
      <img
        src={sekaraBanner}
        alt="Sekara Banner"
        className="rounded-xl h-auto aspect-square object-cover hidden lg:flex"
      />
    </div>
  );
};
