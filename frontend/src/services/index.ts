import { toast } from "@/components/ui/use-toast";
import axiosClient from "./axiosClient";
import { AxiosResponse } from "axios";

export const apiCall = async (
  body: any,
  path: string,
  method: string,
  extraHeaders?: any,
  params?: any
) => {
  try {
    const client = await axiosClient();
    let res: AxiosResponse | null = null;

    if (extraHeaders) {
      client.defaults.headers.common = {
        ...client.defaults.headers.common,
        ...extraHeaders,
      };
    }

    switch (method) {
      case "post":
        res = await client.post(path, body, { params });
        break;
      case "get":
        res = await client.get(path, { params });
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    if (!res) {
      throw new Error("Empty response from server");
    }

    const responseData: any = res.data;
    if (
      responseData.error === undefined &&
      res.status >= 200 &&
      res.status <= 299
    ) {
      //   message.destroy();
      if (method !== "get") {
        toast({
          title: responseData.message,
          duration: 2000,
        });
      }
      return responseData;
    } else {
      const errorMessage =
        `${responseData.error ?? ""} ${responseData.message}` ||
        "Something went wrong!";
      if (method !== "get") {
        toast({
          title: errorMessage,
          duration: 6000,
          variant: "destructive",
        });
        // message.error(errorMessage, 6);
      }
      return responseData;
    }
  } catch (error: any) {
    const errorMessage = error.message
      ? error.message
      : "Something went wrong!";
    // message.destroy();
    toast({
      title: errorMessage,
      duration: 6000,
      variant: "destructive",
    });
    console.log("log");
    // message.error(errorMessage, 6);
    return false;
  }
};
