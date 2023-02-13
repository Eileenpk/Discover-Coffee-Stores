import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import coffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?query=coffee&ll=40.827066881391445%2C-75.07435870807116&limit=6",
    options
  )
  const data = await response.json()
   // .catch((err) => console.error(err));
  return {
    props: { coffeeStores: data.results },
  };
}
export default function Home({ coffeeStores }) {
  const handleOnButtonClick = () => {
    console.log("hi you clicked the banner btn");
  };
  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnButtonClick}
        />

        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="woman drinking coffee"
          />
        </div>
        {coffeeStores.length > 0 && (
          <div>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => {
                const { name, imgUrl, fsq_id } = store;
                return (
                  <Card
                    key={fsq_id}
                    name={name}
                    imgUrl={imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
                    href={`/coffee-store/${fsq_id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
