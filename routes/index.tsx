import ActivityFeed from "../components/ActivityFeed/index.tsx";

import Photos from "../components/Photos/index.tsx";
import Layout from "../components/layouts/Layout.tsx";
import { MASTODON_FEED, PIXELFED_FEED } from "../_config.ts";
import fetchFeed from "../services/FeedFetcher.ts";

export const handler = {
  async GET(_, ctx) {
    const mastodon = await fetchFeed(MASTODON_FEED);
    const pixelfed = await fetchFeed(PIXELFED_FEED);

    return ctx.render({ mastodon, pixelfed });
  },
};

export default function Home({ data }) {
  return (
    <Layout>
      <ActivityFeed feed={data.mastodon} />
      <div className="about">
        <h2>hi.</h2>
        <p>
          I'm Sebastian,<br />
          a programmer living in{" "}
          <strong>Amsterdam</strong>, in the Netherlands, where I work as a{" "}
          <span class="job">Software&nbsp;Engineer</span> at&nbsp;<a
            href="https://redhat.com"
            style={{
              color: "#cc0000",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Red&nbsp;Hat&nbsp;Inc.
          </a>.
        </p>
        <p>
          I also write code for fun and tinker with electronics, music and other
          shananigans.
        </p>
      </div>
      <div className="photos">
        <Photos feed={data.pixelfed} />
      </div>
    </Layout>
  );
}
