import NavBar from "../navbar";
import Footer from "../footer";
import { ThemeProvider } from "../ThemeProvider/theme-provider";
import { Toaster } from "../ui/toaster";

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
