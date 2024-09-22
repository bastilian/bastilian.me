import type { JSX } from "preact";
import { asset, Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";

const App = ({ Component }: PageProps): JSX.Element => (
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
      <Component />
    </body>
  </html>
);

export default App;
