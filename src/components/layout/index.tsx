import NavBar from "../navbar";
import Footer from "../footer";

function Layout({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
