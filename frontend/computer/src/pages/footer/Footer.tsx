import React from "react";
import styles from "./footer.module.css";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function AboutUsPage() {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerMainContainer}>
        <div className={styles.footerMainContainerUpperSection}>
          <ul>
            <h4>Links</h4>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              {" "}
              <a href="/aboutUs">About us</a>
            </li>
            <li>
              {" "}
              <a href="/product">Products</a>
            </li>
            <li>
              {" "}
              <a href="/contactUs">Contact Us</a>
            </li>
          </ul>

          <div className={styles.socialMediaSection}>
            <h4>Social Media</h4>
            <a href="https://www.instagram.com/" target="_blank">
              <FaInstagram className={styles.socialMediaIcon} />
            </a>{" "}
            <a href="https://www.facebook.com/marco.f.hanna.1#" target="_blank">
              <FaFacebookSquare className={styles.socialMediaIcon} />
            </a>
            <a href="https://www.linkedin.com/" target="_blank">
              <FaLinkedin className={styles.socialMediaIcon} />
            </a>
          </div>
        </div>
        <div className={styles.footerMainContainerLowerSection}>
          <p>
            {" "}
            Now contact us on{" "}
            <a href="mailto:GMcomputerllc@yahoo.com">
              GMcomputerllc@yahoo.com
            </a>{" "}
            call us on <a href="tel:+15156812487">+15156812487</a> .
          </p>
          <p>All rights reserved. GMcomputer</p>
          <div className={styles.line}></div>
        </div>
      </div>
    </div>
  );
}
