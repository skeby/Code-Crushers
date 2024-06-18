import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";

const queryClientOptions = {
  defaultOptions: {
    queries: {
      // staleTime: 0,
      refetchOnWindowFocus: false,
    },
  },
};
export const queryClient = new QueryClient(queryClientOptions);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Toaster />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
