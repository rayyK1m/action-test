# GOORM SW CAMP

## :desktop_computer: Environment Support

-   `node` : >=16

## :package: Quick Start

#### GDS 세팅

[gds docs](https://gds.goorm.io/?path=/story/readme--page#-install)

#### 세팅 및 실행

```shell
# git-flow 설치 (ubuntu)
$ apt-get install git-flow
# git-flow 설치 (mac)
$ brew install git-flow-avh
# 패키지 설치 및 실행
$ npm install
$ npm run dev
```

## Info

-   [개발 wiki](https://www.notion.so/goorm/LMS-SWCAMP-ebfcc7c0b7ca4fbf86820556efc7bad4)

## 디렉토리 구조

구조를 설명하기 위해 중요하지 않는 파일은 생략해서 나타냄

```
📦swcamp-site
 ┣ 📂.git
 ┣ 📂.husky
 ┣ 📂_templates [hygen template]
 ┣ 📂components [비즈니스 로직 없이 UI 로직만 담은 공통 컴포넌트]
 ┣ 📂constants [공통 상수]
 ┃ ┣ 📜db.js [db 값과 연결되는 상수들 관리, 이를 통해 유지 보수와 타입 유추가 용이]
 ┃ ┣ 📜common.js [이외에 공통적으로 사용되는 상수들]
 ┃ ┗ ...
 ┣ 📂hooks [custom hooks, react-query 에서 사용될 쿼리 훅은 따로 query-hooks로 분리]
 ┣ 📂node_modules
 ┣ 📂pages
 ┃ ┣ 📂 api [BFF API 라우트 - 구분은 query-hooks와 동일하게 DB 스키마(resources) 기준]
 ┃ ┣ ... [page directory에 맞는 각 페이지들]
 ┃ ┣ 📜_app.jsx
 ┃ ┣ 📜_document.jsx
 ┃ ┣ 📜_error.js [프론트 에러 처리 파일]
 ┃ ┗ 📜index.jsx
 ┣ 📂public [정적 리소스]
 ┣ 📂query-hooks [react-query에서 사용할 커스텀 쿼리 훅으로, DB 스키마(resources) 별로 나누어서 관리하는 것을 우선]
 ┃ ┗ ...
 ┣ 📂server [BFF 서버 코드]
 ┃ ┣ 📂controllers [BFF API가 호출하는 로직, DB 스키마(resources) 별로 나뉘며 데이터 포맷팅 등은 일반적으로 이곳에서 처리]
 ┃ ┣ 📂libs [컨트롤러가 호출하는 로직이 담겨있으며, 각 폴더에서 관심사에 따라 실제 서버로 요청을 보냄]
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂error
 ┃ ┃ ┣ 📂types
 ┃ ┃ ┗ 📜common.js
 ┣ 📂styles
 ┣ 📂utils [클라이언트에서 활용하는 공통 utils]
 ┃ ┗ 📜index.js
 ┣ 📂view [components에 포함되지 않은, 페이지를 그리기 위한 비즈니스 로직이 담긴 컴포넌트가 위치]
 ┃ ┣ ... [기본적으로 page directory 구조와 동일한 위치에 해당 페이지를 그리기 위한 컴포넌트가 위치]
 ┃ ┣ 📂components [비즈니스 로직이 담겨있고, 각 페이지 간 공통으로 사용하는 컴포넌트가 위치]
 ┣ 📜.env
 ┣ 📜.env.example [.env에 환경변수를 추가할 때는 .env.example도 함께 업데이트 필요]
 ┣ 📜middleware.js
 ┣ 📜next.config.js
 ┗ 📜package.json
```
