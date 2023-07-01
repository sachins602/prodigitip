import NavBar from "../navbar";
import Footer from "../footer";
import { ThemeProvider } from "../ThemeProvider/theme-provider";

function Layout({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NavBar />
      {children}
      <Footer />
    </ThemeProvider>
  );
}

export default Layout;
