import { api } from "../../api";

export const SignInActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
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
