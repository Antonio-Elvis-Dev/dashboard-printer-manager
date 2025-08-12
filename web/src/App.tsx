import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { ThemeProvider } from "./components/theme/theme-provider";
import { AppProvider } from "./contexts/AppContext";
import { Toaster } from "sonner";
import {  RouterProvider } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./contexts/auth-context";
import { router } from "./routes";

export function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="printer-pulse-theme">
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <AuthProvider>
              <RouterProvider router={router}/>
            </AuthProvider>
          </TooltipProvider>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}


