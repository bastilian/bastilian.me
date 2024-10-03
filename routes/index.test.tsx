import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import {
  mockFetch,
  mockGlobalFetch,
  resetFetch,
  resetGlobalFetch,
} from "@c4spar/mock-fetch";
import { render } from "../utilities/testHelpers.ts";

import * as home from "./index.tsx";

describe("page", () => {
  mockGlobalFetch();

  describe("/", () => {
    it("should be made by fresh", async () => {
      const res = await render(home, {
        appConfig: {
          feeds: {
            mastodon: "https://mastodon.social/users/bastilian.rss",
          },
        },
      });

      expect(res).toContain("Made with Fresh");
    });

    it("should show feeds if any are provided", async () => {
      const feed = await Deno.readTextFile("./_fixtures/bastilian.rss");

      mockFetch("https://mastodon.social/users/bastilian.rss", {
        body: feed,
      });
      mockFetch("https://mastodon.social/users/bastilian1.rss", {
        body: feed,
      });
      mockFetch("https://mastodon.social/users/bastilian2.rss", {
        body: feed,
      });
      const res = await render(home, {
        appConfig: {
          feeds: {
            mastodon: "https://mastodon.social/users/bastilian.rss",
            pixelfed: "https://mastodon.social/users/bastilian1.rss",
            lastfm: "https://mastodon.social/users/bastilian2.rss",
          },
        },
      });

      expect(res).toContain("Activity Feed");
      expect(res).toContain("Photos");
      expect(res).toContain("Recently listened");

      resetFetch();
    });
  });

  resetGlobalFetch();
});
