import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { render } from "../utilities/testHelpers.ts";

import * as home from "./index.tsx";

describe("page", () => {
  describe("/", () => {
    it("should be made by fresh", async () => {
      const res = await render(home);

      expect(res).toContain("Made with Fresh");
    });
  });
});
