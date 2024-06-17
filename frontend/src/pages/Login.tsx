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
import { APP_NAME, AUTH_TOKEN, loginTabs } from "@/static";
import Logo from "@/components/Logo";
import { useAppDispatch } from "@/state/store";
import { UserLoginFields, UserLoginSchema } from "@/static/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { setUser } from "@/state/slices/authSlice";
import { Role, User } from "@/types";
// import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import useAuthenticationStatus from "@/hooks/useAuthenticationStatus";
import { useMutation } from "@tanstack/react-query";
import { apiCall } from "@/services";
import { paths } from "@/services/static";

const Login = () => {
  const { mutate: login, isPending } = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      apiCall(data, paths.teacher.login, "post"),
    onSuccess: (data) => {
      // console.log(data);
      // if (data?.status === "success") {
      // console.log(data);
      const { token, teacher } = data;
      const {
        _id,
        firstName,
        lastName,
        email,
        role,
        department,
        createdExams,
      } = teacher;
      // const user = jwtDecode(token);
      console.log(teacher);
      localStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
      dispatch(
        setUser({
          id: _id,
          firstName,
          lastName,
          email,
          role,
          department,
          createdExams,
        })
      );
      toast({
        title: "Login successful",
        duration: 2000,
      });
      // }
    },
  });
  useAuthenticationStatus({ pageType: "public" });
  const dispatch = useAppDispatch();
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
    let user: User<Role>;
    // Simulate API call
    if (id === "student-login-form") {
      // // Call student login API
      user = {
        id: 1,
        email: "akinsanyaadeyinka4166@gmail.com",
        firstName: "Adeyinka",
        lastName: "Akinsanya",
        // status: "paid",
        role: "Student",
        // matricNumber: "21CG029820",
      };
      dispatch(setUser(user));
    } else if (id === "teacher-login-form") {
      login({
        password: data.password,
        email: data.username,
      });
      // user = {
      //   id: 1,
      //   email: "akinsanyaadeyinka4166@gmail.com",
      //   firstName: "Adeyinka",
      //   lastName: "Akinsanya",
      //   // status: "free",
      //   role: "Teacher",
      //   registrationNumber: "21CG029820",
      // };
    }
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
          {loginTabs.map((tab, i) => (
            <TabsTrigger key={i} value={tab.toLowerCase()}>
              {tab}
            </TabsTrigger>
          ))}
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
                                  type="password"
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
                  loading={isPending}
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
