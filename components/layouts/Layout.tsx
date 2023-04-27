import { asset, Head } from "$fresh/runtime.ts";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { tw } from "twind";

export default ({ children, ...props }) => (
  <html>
    <Head>
      <meta charSet="utf-8" />
      <title>Sebastian Gräßl</title>
      <link href={asset("css/fork-awesome.min.css")} rel="stylesheet" />
      <link href={asset("main.css")} rel="stylesheet" />
      <link rel="me" href="https://mastodon.social/@bastilian" />
      <link
        rel="shortcut icon"
        type="image/jpg"
        href={asset("images/favicon.png")}
      />
    </Head>
    <body>
      <div id="container" className={tw("container mx-auto w-3/5 space-y-8")}>
        <Header className={tw("w-full pt-8")} />

        <div className={tw("w-full")}>
          {children}
        </div>

        <Footer
          className={tw("w-full content-center text-center space-y-4 pb-8")}
        />
      </div>
    </body>
  </html>
);
