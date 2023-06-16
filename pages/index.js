import Head from "next/head";

import styles from "@/styles/Home.module.scss";

export default function Home() {
	return (
		<>
			<Head>
				<title>SW CAMP HOME</title>
			</Head>
			<main className={styles.container}>
				<h1>메인페이지</h1>
			</main>
		</>
	);
}
