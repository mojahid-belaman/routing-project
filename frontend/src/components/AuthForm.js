import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParam] = useSearchParams();
  const data = useActionData();
  const navigation = useNavigation();

  const isLogin = searchParam.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <Form method="post" className={classes.form}>
        {data && (data.errors || data.message) && (
          <h3 style={{ textAlign: "center", color: 'red'}}>{data.errors?.credentials || data?.message}</h3>
        )}
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
          {data && data.errors && (
            <span style={{ color: "red" }}>{data.errors.email}</span>
          )}
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
          {data && data.errors && (
            <span style={{ color: "red" }}>{data.errors.password}</span>
          )}
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
