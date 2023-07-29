import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storeExpirDate = localStorage.getItem("expiration");
  const expirDate = new Date(storeExpirDate);
  const dateNow = new Date();
  const duration = expirDate.getTime() - dateNow.getTime();
  return duration;
}

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) return "EXPIRED";
  return token;
};

export function tokenDuration() {
  const getTokenExpir = localStorage.getItem("expiration");
  const tokenExpi = new Date(getTokenExpir).getMilliseconds();
  const dateNowMilli = new Date().getMilliseconds();
  return tokenExpi - dateNowMilli;
}

export function tokenLoader() {
  return getToken();
}

export function checkAuthLoader() {
  const token = getToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}