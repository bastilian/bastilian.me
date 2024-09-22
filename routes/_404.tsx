import { UnknownPageProps } from "$fresh/server.ts";
import Layout from "../components/layouts/Layout.tsx";

type Data = { hello: string };
type State = { root: string };

export default function NotFoundPage(
  { data, state, url }: UnknownPageProps<Data | undefined, State>,
) {
  // Checks that we have the correct type for state
  state.root satisfies string;

  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <h1>404 not found: {url.pathname}</h1>
        <p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/p11gNG1KXUA?si=5CZEtA0tXgBpuhjZ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          >
          </iframe>
        </p>
      </div>
    </Layout>
  );
}
