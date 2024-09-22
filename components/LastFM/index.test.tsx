import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { render } from "../../utilities/testHelpers.ts";

import LastFM from "./index.tsx";

describe("LastFM", () => {
  describe("/", () => {
    it("should be made by fresh", async () => {
      const track = "Turnover by Fugazi";
      const image = "/api/image/1726962606097.png";
      const res = await render(
        <LastFM
          feed={{
            entries: [{
              description: { value: track },
              content: {
                value: '<img src="' + image + '" />',
              },
            }],
          }}
        />,
      );

      expect(res).toContain(track);
      expect(res).toContain("img");
    });
  });
});
