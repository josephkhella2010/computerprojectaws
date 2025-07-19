import React from "react";
import styles from "../aboutUs.module.css";
import type { ActivityType } from "../../../helps/interfaces";

export default function AboutUsActiveSectionPage() {
  const activityArr: ActivityType[] = [
    {
      url: "https://amplify-computer-deployment.s3.amazonaws.com/foto/aboutUs/activeOne.jpg",
      header: "Buy",
      text: "We buy products directly from consumers for immediate (cash) money.",
    },
    {
      url: "https://amplify-computer-deployment.s3.amazonaws.com/foto/aboutUs/activeTwo.jpg",
      header: "Sell",
      text: "We sell these products in our stores and on our webshops. Products are sold with warranty and service.",
    },
    {
      url: "https://amplify-computer-deployment.s3.amazonaws.com/foto/aboutUs/activeThree.jpg",
      header: "Buyback (Pawn)",
      text: "Temporary financial solutions for customers: pawn your item for immediate (cash) money and buy it back later with interest.",
    },
    {
      url: "https://amplify-computer-deployment.s3.amazonaws.com/foto/aboutUs/activeFour.jpeg",
      header: "Trade-in",
      text: "Buy a product from our store, sell your old one and pay a little extra. Also that is possible!",
    },
  ];
  return (
    <div className={styles.aboutUsActivityContainer}>
      <h1>Our activities</h1>
      <div className={styles.aboutUsActivitySection}>
        {activityArr &&
          activityArr.map((activity, index) => {
            return (
              <div key={index} className={styles.aboutUsActivityContent}>
                <img src={activity.url} alt="not found" />
                <h4>{activity.header}</h4>
                <p>{activity.text}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
