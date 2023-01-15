import { asset, Head } from "$fresh/runtime.ts";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

export default ({ children }) => (
  <html>
    <Head>
      <meta charSet="utf-8" />
      <title>Sebastian Gräßl</title>
      <link href={asset("css/fork-awesome.min.css")} rel="stylesheet" />
      <link href={asset("main.css")} rel="stylesheet" />
      <link rel="me" href="https://mastodon.social/@bastilian" />
    </Head>
    <body>
      <div id="container">
        <Header />
        <section id="main">
          {children}
        </section>
        <Footer />
        <div class="cr cr-top cr-right cr-sticky cr-blue">alpha</div>
      </div>
    </body>
  </html>
);
