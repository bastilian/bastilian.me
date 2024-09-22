import type { JSX, VNode } from "preact";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

type LayoutProps = {
  children: VNode;
};

export default ({ children }: LayoutProps): JSX.Element => (
  <div id="container" className="container mx-auto w-3/5 space-y-8">
    <Header className="w-full pt-8" />

    <div className="w-full">
      {children}
    </div>

    <Footer className="w-full content-center text-center space-y-4 pb-8" />
  </div>
);
