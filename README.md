# GOORM SW CAMP

## :desktop_computer: Environment Support

-   `node`: 18.17.1
-   `npm`: >= 8.15.0

<br/>

## :package: Quick Start

### 1. GDS 세팅

[gds docs](https://gds.goorm.io/?path=/story/readme--page#-install)

### 2. 세팅 및 실행

```shell
# git-flow 설치 (ubuntu)
$ apt-get install git-flow

# git-flow 설치 (mac)
$ brew install git-flow-avh

# git-flow init
$ git flow init -d

# 패키지 설치 및 실행
$ npm install
$ npm run dev
```

<br/>

## :information_desk_person: Info

> ref. [노션 개발 위키](https://www.notion.so/goorm/LMS-SWCAMP-ebfcc7c0b7ca4fbf86820556efc7bad4)

### 1. 브랜치 전략

> git flow 브랜치 전략에 의거함.

**릴리즈**

```shell
$ git flow release start -F [날짜]-[index]
$ git flow release finish -Fp [날짜]-[index]

# ex. git flow release start -F 20230815-1
```

-   첫번째 commit
    -   hotfix -> main merge
    -   그냥 그대로 저장
-   두번째 commit
    -   tag 생성 commit
    -   commit message: `release/[날짜]-[index]`
-   세번째 commit
    -   main -> develop merge
    -   그냥 그대로 저장

**핫픽스**

```shell
$ git flow hotfix start -F [날짜]-[index]
$ git flow hotfix finish -Fp [날짜]-[index]

# ex. git flow hotfix start -F 20230815-2
```

-   같은 날 release 브랜치가 이미 따져 있었으면, release 브랜치 index+1
-   commit message는 release와 동일

### 2. 디렉토리 구조

> 구조를 설명하기 위해 중요하지 않는 파일은 생략해서 나타냄

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

### 3. 환경 변수 설정

-   `.env.example` 파일을 참고하여 각자 개발 환경에 `.env` 파일을 생성 후, [개발 문서 - .env](https://www.notion.so/goorm/LMS-SWCAMP-ebfcc7c0b7ca4fbf86820556efc7bad4?pvs=4#100a18f3692e48e9a430ba230a97a7d0) 참고하여 값 추가
