import deepEqual from "deep-equal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiWithAuth } from "../api";
import { PasswordInput } from "../common/password-input";
import { useAppContext } from "../context";
import { USER_ROLES } from "../globals";
import { useHandleApiError } from "../hooks/useHandleApiError";
import { useRedirectOnAuth } from "../hooks/useRedirectOnAuth";

export const AccountPage = () => {
  useRedirectOnAuth({
    authRequired: true,
    redirectTo: "/sign-in",
  });
  const { auth, setAuth } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    firstName: "",
    lastName: "",
    description: "",
  });

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (!auth) return;

    setProfileFormData({
      firstName: auth.firstName,
      lastName: auth.lastName,
      description: auth.description,
    });
  }, [auth]);
  const handleError = useHandleApiError();

  const handleProfileFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiWithAuth().put("/user/update-profile", profileFormData);
      setAuth({ ...auth, ...profileFormData });
      alert("Profile updated successfully");
    } catch (err) {
      handleError(err, "update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiWithAuth().put("/user/update-password", passwordFormData);
      alert(
        "Password updated successfully! Please sign in again with your new password."
      );
      setAuth(null);
      localStorage.removeItem("auth");
    } catch (err) {
      handleError(err, "update password");
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    const promptRes = window.prompt(
      `Are you sure? If yes then, type "DELETE MY ACCOUNT" to confirm.`
    );
    if (promptRes !== "DELETE MY ACCOUNT") {
      setLoading(false);
      return;
    }
    try {
      alert("Your account deleted successfully! We are sorry to see you go.");
      await apiWithAuth().delete("/user");
      setAuth(null);
      localStorage.removeItem("auth");
    } catch (err) {
      handleError(err, "delete account");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col py-10 max-w-screen-sm mx-auto">
      <h1 className="mb-5">Your Account</h1>
      {auth && auth.role !== USER_ROLES.user ? (
        <p className="px-3 py-1 rounded-md font-medium text-white bg-emerald-700 w-max max-w-full">
          You are {auth.role === USER_ROLES.admin ? "the Admin" : "a ✍️ Writer"}
        </p>
      ) : (
        <p>
          You are still a viewer.{" "}
          <Link className="hover:underline font-bold" to={"/write"}>
            ✍️ Write
          </Link>{" "}
          an article to <i>be a writer</i>.
        </p>
      )}
      <div className="flex flex-col max-w-sm">
        <hr className="my-10 border-slate-300" />
        <h2 className="mb-5">Update Profile</h2>
        <form onSubmit={handleProfileFormSubmit}>
          <label className="field">
            <span>First Name</span>
            <input
              type="text"
              className="input"
              placeholder="Your first name"
              required
              value={profileFormData.firstName}
              onChange={(e) =>
                setProfileFormData((opd) => ({
                  ...opd,
                  firstName: e.target.value,
                }))
              }
            />
          </label>
          <label className="field">
            <span>Last Name</span>
            <input
              type="text"
              className="input"
              placeholder="Your last name"
              value={profileFormData.lastName}
              onChange={(e) =>
                setProfileFormData((opd) => ({
                  ...opd,
                  lastName: e.target.value,
                }))
              }
            />
          </label>
          <label className="field">
            <span>Description</span>
            <textarea
              type="text"
              className="input"
              placeholder="Description about you"
              value={profileFormData.description}
              onChange={(e) =>
                setProfileFormData((opd) => ({
                  ...opd,
                  description: e.target.value,
                }))
              }
            />
            {!profileFormData.description && (
              <p className="text-xs mt-2">
                Add a description to introduce yourself to the community.
              </p>
            )}
          </label>
          <button
            disabled={
              loading ||
              (auth &&
                deepEqual(profileFormData, {
                  firstName: auth.firstName,
                  lastName: auth.lastName,
                  description: auth.description,
                }))
            }
            type="submit"
            className="btn mt-2"
          >
            Save Changes
          </button>
        </form>
        <hr className="my-10 border-slate-300" />
        <form onSubmit={handlePasswordFormSubmit}>
          <h2 className="mb-5">Update Password</h2>
          <label className="field">
            <span>Current Password</span>
            <PasswordInput
              value={passwordFormData.currentPassword}
              onChange={(e) =>
                setPasswordFormData((opd) => ({
                  ...opd,
                  currentPassword: e.target.value,
                }))
              }
            />
          </label>
          <label className="field">
            <span>New Password</span>
            <PasswordInput
              value={passwordFormData.newPassword}
              onChange={(e) =>
                setPasswordFormData((opd) => ({
                  ...opd,
                  newPassword: e.target.value,
                }))
              }
            />
          </label>
          <button disabled={loading} type="submit" className="btn mt-2">
            Save Changes
          </button>
        </form>
        <hr className="my-10 border-slate-300" />
        <div>
          <h2 className="mb-5">Delete Account</h2>
          <p>
            All your articles and comments will be deleted. You won't be able to
            recover them.
          </p>
          <button
            onClick={deleteAccount}
            disabled={loading}
            className="btn danger mt-5"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};
