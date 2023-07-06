import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

function ErrorPage() {
  const data = useRouteError();

  let title = "Error Occured!";
  let message = "Somthing Went Wrong.";
  
  if (data.status === 400) {
    message = "Could not fetch events.";
  }
  if (data.status === 404) {
    title = "Error Find!";
    message = `The page you are looking for doesn't exist.`;
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>{message}</PageContent>
    </>
  );
}

export default ErrorPage;
