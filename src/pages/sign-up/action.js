import { api } from "../../api";

export const SignUpActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const email = formData.get("email");
  const password = formData.get("password");
  const retypePassword = formData.get("retype-password");

  if (password !== retypePassword) {
    return {
      success: false,
      reason: "Passwords do not match",
    };
  }

  try {
    await api.post("/user/sign-up", {
      firstName,
      lastName,
      email,
      password,
    });
    const res = await api.post("/user/sign-in", {
      email,
      password,
    });
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    if (error.response?.data?.message) {
      return {
        success: false,
        reason: error.response.data.message,
      };
    }
    return {
      success: false,
      reason: "An unknown error occurred",
    };
  }
};
