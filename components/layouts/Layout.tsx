import { asset, Head } from "$fresh/runtime.ts";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

export default ({ children, ...props }) => (
  <div id="container" className="container mx-auto w-3/5 space-y-8">
    <Header className="w-full pt-8" />

    <div className="w-full">
      {children}
    </div>

    <Footer className="w-full content-center text-center space-y-4 pb-8" />
  </div>
);
