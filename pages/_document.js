import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="ko">
			<Head>
				<meta name="description" content="SW CAMP" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link
					rel="icon"
					href="https://statics.goorm.io/images/gds/favi_goorm.svg"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
