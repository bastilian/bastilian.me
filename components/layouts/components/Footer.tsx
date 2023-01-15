const Footer = () => {
  return (
    <footer>
      <p>
        &copy; 2023 Sebastian Gräßl
      </p>
      <p className="made-with">
        <a href="https://fresh.deno.dev">
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge-dark.svg"
            alt="Made with Fresh"
          />
        </a>
        <br />{" "}
        <a
          href="https://github.com/bastilian/bastilian.me"
          className="source-link"
        >
          <i class="fa fa-github"></i>
        </a>
      </p>
    </footer>
  );
};

export default Footer;
