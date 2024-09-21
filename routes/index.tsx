import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { hash, log } from "../utilities/helpers.ts";

import ActivityFeed from "../components/ActivityFeed/index.tsx";
import LastFM from "../components/LastFM/index.tsx";
import Photos from "../components/Photos/index.tsx";
import Layout from "../components/layouts/Layout.tsx";
import config from "../_config.ts";
import fetchFeed from "../services/FeedFetcher.ts";

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    const configFeeds = Object.entries(config.feeds);

    if (configFeeds.length > 0) {
      const feeds = {};

      for (const [feedKey, feedUrl] of configFeeds) {
        log(`Fetching feed for ${feedKey} from ${feedUrl}...`);

        feeds[feedKey] = await fetchFeed(feedUrl);
      }

      return ctx.render({ ...feeds });
    } else {
      log("No feeds found");

      return ctx.render();
    }
  },
};

export default function Home({ data }) {
  return (
    <Layout>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 place-content-start">
        <div className="photos space-y-9 mr-9">
          <div>
            <h2>hi.</h2>
            <p>
              I'm <strong>Sebastian</strong>,<br />
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
          {data.pixelfed && <Photos feed={data.pixelfed} />}
          {data.lastfm && <LastFM feed={data.lastfm} />}
        </div>
        <div className="max-w-md">
          {data.mastodon && <ActivityFeed feed={data.mastodon} />}
        </div>
      </div>
    </Layout>
  );
}
