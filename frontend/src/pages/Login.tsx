import { useAppDispatch, useAppSelector } from "@/state/store";
import { UserLoginFields, UserLoginSchema } from "@/static/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const methods = useForm<UserLoginFields>({
    resolver: zodResolver(UserLoginSchema),
  });
  const { handleSubmit, register } = methods;
  return <div>Login</div>;
};

export default Login;
