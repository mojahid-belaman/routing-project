import { useEffect } from "react";
import { json, redirect, useNavigate, useSearchParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const mode =
      searchParam.get("mode") === "login" ||
      searchParam.get("mode") === "signup";
    if (!mode) {
      navigate("?mode=login");
    }
  }, [searchParam, navigate]);
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const data = await request.formData();
  const mode = new URL(request.url).searchParams.get("mode");
  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  localStorage.setItem("token", resData.token);
  return redirect("/");
}
