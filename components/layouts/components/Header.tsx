import { asset } from "$fresh/runtime.ts";
import Image from "../../Image.tsx";

const Header = (props) => (
  <header
    {...props}
  >
    <div
      className="flex vcard"
      itemScope
      itemType="http://schema.org/Person"
    >
      <div className="flex-none mr-4 image">
        <a href="/">
          <img
            alt="Sebastian Gräßl"
            src={asset("images/logo.png")}
          />
        </a>
      </div>
      <div className="flex-auto">
        <p className="vcard-names">
          <h1 className="vcard-fullname" itemProp="name">
            Sebastian Gräßl
          </h1>
          <span className="aka">
            aka.{" "}
            <span className="vcard-username" itemProp="additionalName">
              bastilian
            </span>
          </span>
        </p>

        <div className="social-accounts">
          <ul>
            <li className="inline-block mr-2">
              <a rel="me" href="https://github.com/bastilian">
                <i class="fa fa-github"></i>{" "}
                <span className="social-link">
                  https://github.com/bastilian
                </span>
              </a>
            </li>

            <li className="inline-block mr-2">
              <a rel="me" href="https://soundcloud.com/bastilian">
                <i class="fa fa-soundcloud"></i>
                <span className="social-link">
                  https://soundcloud.com/bastilian
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
