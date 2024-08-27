import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";
import sekaraBanner from "../../assets/sekara-banner.png";
import { Logo } from "../../common/Logo";
import { PasswordInput } from "../../common/password-input";
import { useAppContext } from "../../context";
import { useRedirectOnAuth } from "../../hooks/useRedirectOnAuth";

export const SignUpPage = () => {
  useRedirectOnAuth({
    authRequired: false,
    redirectTo: "/",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/user/sign-up", {
        firstName,
        lastName,
        email,
        password,
      });
      const { data } = await api.post("/user/sign-in", {
        email,
        password,
      });
      alert("Sign up successful. Welcome!");
      setAuth(data);
      localStorage.setItem("auth", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      alert(`Failed to sign up: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-5 min-h-screen">
      <form
        onSubmit={handleSubmit}
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
            className="input"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className="input mt-2"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            className="input mt-2"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            placeholder="Password"
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            placeholder="Retype Password"
            className="mt-2"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          />
          <button
            disabled={loading || password !== retypePassword}
            type="submit"
            className="btn mt-5"
          >
            {loading ? "Signing up..." : "Sign Up"}
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
        </div>
      </form>
      <img
        src={sekaraBanner}
        alt="Sekara Banner"
        className="rounded-xl h-full object-cover hidden lg:flex"
      />
    </div>
  );
};
