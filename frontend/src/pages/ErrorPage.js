import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();

  let title = "Error Occured!";
  let message = "Somthing Went Wrong.";
  
  if (error.status === 500) {
    title = 'Error Fetched'
    message = error.data.message;
  }
  if (error.status === 404) {
    title = "Not Found!";
    message = `Could not find resource or page.`;
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>{message}</PageContent>
    </>
  );
}

export default ErrorPage;
