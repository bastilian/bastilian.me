import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
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
}
