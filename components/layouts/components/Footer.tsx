import type { JSX } from "preact";

const Footer = (props: JSX.HTMLAttributes<HTMLElement> = {}): JSX.Element => (
  <footer {...props}>
    <p>
      &copy; 2023 Sebastian Gräßl |{" "}
      <a
        href="https://github.com/bastilian/bastilian.me"
        className="source-link"
      >
        <i class="fa fa-github"></i>
      </a>
    </p>
    <p>
      <a href="https://fresh.deno.dev">
        <img
          width="197"
          height="37"
          src="https://fresh.deno.dev/fresh-badge-dark.svg"
          alt="Made with Fresh"
          className="inline-block"
        />
      </a>
    </p>
  </footer>
);

export default Footer;
