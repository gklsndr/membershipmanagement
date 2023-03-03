import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Autorickshaw Driver's Union (R) CITU</title>
        <meta name="description" content="Autorickshaw Driver's Union" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={"image-container"}>
        <Image
          className="image"
          src="/images/kau-logo.png"
          alt="Autorickshaw Driver's Union (R) CITU"
          fill
        />
          {/* <Image src={path} layout="fill" className={"image"} /> */}
        </div>

        <div className={styles.grid}>
          <a href="/admin/register" className={styles.card}>
            <h2>New Member Registration</h2>
            <p>ಹೊಸ ಸದಸ್ಯರ ನೋಂದಣಿ</p>
          </a>

          <a href="" className={styles.card}>
            <h2>Membership Renewal</h2>
            <p>ನಿಮ್ಮ ಸದಸ್ಯತ್ವವನ್ನು ನವೀಕರಿಸಿ</p>
          </a>

          <a href="" className={styles.card}>
            <h2>About</h2>
            <p>ನಮ್ಮ ಬಗ್ಗೆ</p>
          </a>

          {/* <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Feedback &rarr;</h2>
            <p>We would love to hear from you.</p>
          </a> */}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
