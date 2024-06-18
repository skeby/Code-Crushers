import Logo from "@/components/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  let title, description;
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      description = "The page you are looking for does not exist.";
    } else if (error.status === 401) {
      description = "You are not authorized to view this page.";
    } else if (error.status === 501) {
      description = "Looks like our API is down. Please contact support.";
    }
  } else {
    title = "An error occurred";
    description = "Please try again later.";
  }
  return (
    <div className="max-h-screen p-5 sm:p-0 h-screen flex flex-col items-center justify-center">
      <Card className="sm:w-[500px] w-full h-full items-center justify-center sm:h-auto transition-all sm:block flex-col text-center flex duration-500">
        <CardHeader className="items-center justify-center">
          <Logo size="lg" />
        </CardHeader>
        <CardContent className="flex gap-y-3 flex-col">
          <CardTitle>
            {isRouteErrorResponse(error) && (
              <p className="mb-2">{error.status}</p>
            )}
            <p>{isRouteErrorResponse(error) ? error.statusText : title}</p>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
          <Link to={"/"} className="hover:underline">
            Click to go Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
