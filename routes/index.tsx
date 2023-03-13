import ActivityFeed from "../components/ActivityFeed/index.tsx";
import LastFM from "../components/LastFM/index.tsx";
import Photos from "../components/Photos/index.tsx";
import Layout from "../components/layouts/Layout.tsx";
import config from "../_config.ts";
import fetchFeed from "../services/FeedFetcher.ts";
import { tw } from "twind";

export const handler = {
  async GET(_, ctx) {
    const mastodon = await fetchFeed(config.feeds.mastodon);
    const pixelfed = await fetchFeed(config.feeds.pixelfed);
    const lastfm = await fetchFeed(config.feeds.lastfm);

    return ctx.render({ mastodon, pixelfed, lastfm });
  },
};

export default function Home({ data }) {
  return (
    <Layout>
      <div
        className={tw(
          "grid md:grid-cols-2 sm:grid-cols-1 gap-4 place-content-start",
        )}
      >
        <div className={tw("photos space-y-9 mr-9")}>
          <div>
            <h2>hi.</h2>
            <p>
              I'm Sebastian,<br />
              a programmer living in{" "}
              <strong>Amsterdam</strong>, in the Netherlands,<br />
              where I work as a <span class="job">Software&nbsp;Engineer</span>
              {" "}
              at&nbsp;<a
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
              I also write code for fun and tinker with electronics, music and
              other shananigans.
            </p>
          </div>
          <Photos feed={data.pixelfed} />
          <LastFM feed={data.lastfm} />
        </div>
        <div className={tw("max-w-md")}>
          <ActivityFeed feed={data.mastodon} />
        </div>
      </div>
    </Layout>
  );
}
