import React from "react";
import "./styles.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className="footer">
      <h2 className="logo" onClick={topFunction}>
        CryptoTracker<span>.</span>
      </h2>
      <div className="social-links">
        <a href="mailto:pravinshivajipatil37@gmail.com" target="_blank" rel="noopener noreferrer">
          <EmailIcon className="social-link" fontSize="small" />
        </a>

        <a href="https://www.linkedin.com/in/pravin-patil-528922216/" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon className="social-link" fontSize="small" />
        </a>

        <a href="https://github.com/pravin8007" target="_blank" rel="noopener noreferrer">
          <GitHubIcon className="social-link" fontSize="small" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
