import React from "react";
import Navbar from "../Navbar/Navbar";

// IN layout it is just single component but in page content it is an array of two component because we have 2 fragments
const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>{children} </main>

      {/* <Footer /> */}
    </>
  );
};
export default Layout;
