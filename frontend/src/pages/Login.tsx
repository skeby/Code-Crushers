import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { APP_NAME, USER, loginTabs } from "@/static";
import Logo from "@/components/Logo";
import { useAppDispatch } from "@/state/store";
import { UserLoginFields, UserLoginSchema } from "@/static/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { setUser } from "@/state/slices/authSlice";
import { User } from "@/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<UserLoginFields>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<UserLoginFields> = (data, e) => {
    const { id } = e?.target;
    let user: User<"Student"> | User<"Teacher">;
    // Simulate API call
    const { dismiss } = toast({
      title: "Logging in...",
    });
    setTimeout(() => {
      if (id === "student-login-form") {
        // Call student login API
        user = {
          id: 1,
          email: "akinsanyaadeyinka4166@gmail.com",
          firstName: "Adeyinka",
          lastName: "Akinsanya",
          status: "paid",
          type: "Student",
          matricNumber: "21CG029820",
        };
      } else if (id === "teacher-login-form") {
        user = {
          id: 1,
          email: "akinsanyaadeyinka4166@gmail.com",
          firstName: "Adeyinka",
          lastName: "Akinsanya",
          status: "free",
          type: "Teacher",
          registrationNumber: "21CG029820",
        };
      }
      console.log(data);
      dispatch(setUser(user));
      dismiss();
      toast({
        title: "Login successful",
      });
      navigate("/");
      localStorage.setItem(USER, JSON.stringify(user));
    }, 2000);
  };
  return (
    <div className="max-h-screen p-5 sm:p-0 h-screen flex flex-col gap-y-4 items-center justify-center">
      <div className="self-start sm:self-auto">
        <Logo />
      </div>
      <Tabs
        defaultValue="student"
        className="sm:w-[500px] w-full h-full sm:h-auto transition-all sm:block flex-col flex duration-500"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="teacher">Teacher</TabsTrigger>
        </TabsList>
        {loginTabs.map((tab, i) => (
          <TabsContent key={i} value={tab.toLowerCase()} className="flex-grow">
            <Card className="w-full h-full sm:h-auto flex flex-col sm:block">
              <CardHeader>
                <CardTitle>{tab} Login</CardTitle>
                <CardDescription>Login to {APP_NAME}</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    id={`${tab.toLowerCase()}-login-form`}
                  >
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {tab === "Student" ? "Matric" : "Registration"}{" "}
                                Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={`Enter your ${
                                    tab === "Student"
                                      ? "matric"
                                      : "registration"
                                  } number`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex-grow items-end sm:items-center">
                <Button
                  type="submit"
                  className="w-full"
                  form={`${tab.toLowerCase()}-login-form`}
                >
                  Login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Login;