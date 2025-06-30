import Navbar from "./Navbar";

const Layout: React.FC<{children: React.ReactNode}> = (props) => {
   return (
      <>
         <Navbar />
         <main>{props.children}</main>
      </>
   );
}

export default Layout;
