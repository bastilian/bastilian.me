import { asset } from "$fresh/runtime.ts";

const Header = () => (
  <div className="header-container">
    <header className="vcard" itemScope itemType="http://schema.org/Person">
      <div className="image">
        <a href="/">
          <img
            alt="Sebastian Gräßl"
            src={asset("images/bastilian_sebastian_graessl.jpg")}
            className="vcard-avatar"
            itemProp="image"
          />
        </a>
      </div>
      <div className="main-info">
        <div className="vcard-names">
          <h1 className="vcard-fullname" itemProp="name">
            <a href="./about">Sebastian Gräßl</a>
          </h1>
          <span className="aka">
            aka.{" "}
            <span className="vcard-username" itemProp="additionalName">
              bastilian
            </span>
          </span>
        </div>
      </div>

      <div className="social-accounts">
        <ul>
          <li>
            <a rel="me" href="https://soundcloud.com/bastilian">
              <i class="fa fa-soundcloud"></i>
              <span className="social-link">
                https://soundcloud.com/bastilian
              </span>
            </a>
          </li>
          <li>
            <a rel="me" href="https://mastodon.social/@bastilian">
              <i class="fa fa-mastodon"></i>{" "}
              <span className="social-link">
                https://mastodon.social/@bastilian
              </span>
            </a>
          </li>
          <li>
            <a rel="me" href="https://github.com/bastilian">
              <i class="fa fa-github"></i>{" "}
              <span className="social-link">https://github.com/bastilian</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  </div>
);

export default Header;
