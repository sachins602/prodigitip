import NavBar from "../navbar";
import Footer from "../footer";
import { Toaster } from "../ui/toaster";
import { ThemeProvider } from "../ThemeProvider/theme-provider";

function Layout({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NavBar />
      {children}
      <Footer />
      <Toaster />
    </ThemeProvider>
  );
}

export default Layout;
