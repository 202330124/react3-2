# 202330124 이태규

## 25년 11월 19일 강의
> 내용 정리

**1. Tailwind CSS**
<br/>

- Tailwind CSS는 사용자 정의 디자인을 구축하기 위한 저수준 유틸리티 클래스를 제공하는 유틸리티 우선 CSS 프레임워크입니다.
- Tailwind CSS 설치:
    ```js
    npm install -D tailwindcss @tailwindcss/postcss
    ```
- postcss.config.mjs 파일에 PostCSS 플러그인을 추가합니다.
    ```js
    export default {
        plugins: {
            '@tailwindcss/postcss': {},
        },
    }
    ```
- 전역 CSS 파일에서 Tailwind 가져오기:
    ```css
    @import 'tailwindcss';
    ```
<br/>

**3. Global(전역) CSS**
<br/>

- 전역 CSS를 사용하여 응용 프로그램 전체에 스타일을 적용할 수 있습니다.
- app/global.css 파일을 만들고 루트 레이아웃을 가져와 애플리케이션의 모든 경로에 스타일을 적용합니다.
⚠️ RootLayout은 앞에서 작성한 것과 동일합니다.
⚠️ global.css만 수정해보세요.

⚠️ 정리하면 다음과 같습니다.
1. 전역적으로 한번만 적용되어야하는 스타일은 global.css에 선언해서 사용합니다. 예를 들어 Tailwind의 기본 스타일(tailwindcss)을 global에 import합니다.
2. 대부분의 컴포넌트 스타일은 Tailwind로 처리합니다.
3. Tailwind로 처리하기 어려운 특정 컴포넌트에 한해서 CSS Modules로 커스텀 스타일을 만들어 사용합니다.
<br/>

**4. 외부 스타일시트**
<br/>

- 외부 패키지로 제공되는 스타일시트는 app 디렉토리의 컴포넌트를 포함하여, 어느 곳에 서나 import해서 사용할 수 있습니다.
⚠️ src 디렉토리를 사용하는 경우라면 src 디렉토리의 어느 곳에서나 사용할 수 있다는 의미입니다.

⚠️ Bootstrap 실습(외부 스타일 시트)
- 부트 스트랩 설치:
    ```js
    npm install bootstrap@5.3.8
    ```
<br/>

**5. 순서 지정 및 병합**
<br/>

- Next.js는 프로덕션 빌드 중에 스타일시트를 자동으로 청크(병합)하여 CSS를 최적화합니다.
- CSS의 순서는 코드에서 스타일을 가져오는 순서에 따라 다릅니다.
- 예를 들어, <BaseButton>이 page.module.css보다 먼저 import 되기 때문에 base-button.module.css가 page.module.css보다 먼저 요청됩니다.
<br/>

**6. Recommendations(권장 사항)**
- ESLint의 sort-imports와 같이 import 순서를 자동 정렬하는 Lint나 포맷터를 비활성화 합니다.
- CSS 분할(cssChunking) 방식을 제어하려면 next.config.js의 cssChunking 옵션을 사용합니다.

<hr/>

## 25년 11월 12일 강의
> 내용 정리

**3. 스트리밍**
<br/>

- 경고(Warning): 아래 내용은 애플리케이션에서 cacheComponents config 옵션이 활성화되어 있다고 가정합니다. 이 플래그는 Next.js 15 Canary에서 도입되었습니다. ⚠️ Next.js의 별칭은 latest와 canary 두가지가 있습니다. latest는 현재 가장 최신 안정 버전, canary는 안정화 작전의 최신 개발 버전을 의미합니다.
- 서버 컴포넌트에서 async/await를 사용하는 경우 Next.js는 동적 렌더링을 선택합니다.
- 즉, 모든 사용자 요청에 대해 서버에서 데이터를 가져와서 렌더링 합니다.
- 데이터 요청 속도가 느린 경우, 모든 데이터를 가져올 때까지 전체 경로의 렌더링이 차단됩니다.
- 초기 로드 시간과 사용자 경험을 개선하려면 스트리밍을 사용하여 페이지의 HTML을 더 작은 단위의 블록으로 나누고, 점진적으로 서버에서 클라이언트로 해당 블록을 전송할 수 있습니다.
<br/>

**3. 스트리밍 > 3-1. loading.tsx를 사용하는 방법**
<br/>

- 애플리케이션에서 스트리밍을 구현하는 방법은 두가지가 있습니다.
    1. loading.tsx 파일로 페이지 감싸기
    2. <Suspense>로 컴포넌트를 감싸기

3-1. loading.tsx를 사용하는 방법
- 데이터를 가져오는 동안 전체 페이지를 스트리밍하려면, page와 같은 디렉토리에 loading.tsx 파일을 생성합니다.
- 예를 들어, app/blog/page.tsx를 스트리밍하려면, app/blog 디렉토리 안에 loading.tsx 파일을 추가하면 됩니다.

**3. 스트리밍 > 3-2. <Suspense>를 사용하는 방법**
<br/>

3-2. <Suspense>를 사용하는 방법
- <Suspense>는 page의 어떤 부분을 스트리밍할지 더욱 세부적으로 설정할 수 있습니다.
- 예를 들어, <Suspense> 경계를 벗어나는 모든 페이지 콘텐츠를 즉시 표시하고, 경계 안에 있는 블로그 게시물 목록을 스트리밍할 수 있습니다.
<br/>

3-3. 의미 있는 로딩 상태 만들기
- 즉시 로딩 상태는 탐색(접속) 후 사용자에게 즉시 표시되는 대체 UI입니다.
⚠️ 즉시 로딩 상태(instant loading state)란 loading.tsx 파일을 추가하여 폴더 내에 로딩 상태를 생성하는 것을 의미합니다.

- 최상의 사용자 경험을 위해 앱의 응답을 사용자가 쉽게 이해할 수 있도록 의미 있는 로딩 상태를 디자인하는 것이 좋습니다.
- 예를 들어, 스켈레톤과 스피너를 사용하거나, 커버 사진, 제목 등 향후 화면에 표시되는 작지만 의미 있는 요소를 사용할 수 있습니다.
<br/>

**4. 예제 > 4-1. 순차적 데이터 fetch**
<br/>

4-1. 순차적 데이터 fetch
- 트리 구조 내 중첩된 컴포넌트 각각이 자체 데이터를 가져올 때 중복 요청이 제거되지 않으면 순차적 데이터 가져오기가 발생하며, 이로 인해 응답 시간이 길어집니다.
- 한번의 fetch가 다른 하나의 fetch 결과에 따라 달라지는 경우 이 패턴이 필요할 수 있습니다.
- 예를 들어, <Playlists> 컴포넌트는 <Artist> 컴포넌트가 데이터 fetch를 완료한 후에 데이터 fetch를 시작합니다.
- 그 이유는 <Playlists>가 artistID prop에 따라 달라지기 때문입니다.
- 사용자 경험을 개선하려면 React <Suspense>를 사용하여 데이터를 가져오는 동안 fallback을 표시해야합니다.
- 이렇게 하면 스트리밍이 활성화되고 순차적인 데이터 요청으로 인해 전체 경로가 차단되는 것을 막을 수 있습니다.
<br/>

**문서 코드 수정 및 lib 생성**
<br/>

- page에서 Suspense, getArtist, getArtistPlayLists를 import 합니다.
<br/>

- getArtist(username)을 생성합니다.
    - username으로 users 조회 -> 첫 결과를 반환(id, name), 없으면 예외를 발생합니다.
- getArtistPlaylists(artistID)를 생성합니다.
    - artistId(userId)로 albums 조회 -> [{id, name}, ...] 배열을 반환합니다.
- Next.js 서버 환경에서 fetch를 사용하므로 page.tsx에서 await / 비동기 호출로 바로 사용 가능합니다.
<br/>

- URL 세그먼트는 /artist/Bret와 같이 호출합니다.
- Link도 레이아웃에 추가해줍니다. RootLayout과 PageLayout 모두 생성해보세요.

**4. 예제 > 4-2. 병렬 데이터 fetch**
<br>

4-2. 병렬 데이터 fetch
- 경로 내의 데이터 요청이 동시에 발생할 때 병렬 데이터 가져오기가 발생합니다.
- 기본적으로 레이아웃과 페이지는 병렬로 렌더링 됩니다. 따라서 각 세그먼트는 가능한 한 빨리 데이터 fetch를 시작합니다.
- 그러나 컴포넌트 내부에서 여러개의 async/await 요청이 다른 요청 뒤에 배치되는 경우 순차적으로 처리될 수 있습니다.
- 예를 들어, getAlbums는 getArtist가 확인될 때까지 차단됩니다.
- 데이터를 사용하는 컴포넌트 외부에서 요청을 정의하고 Promise.allSettled 등을 사용하여 함께 해결함으로써 요청을 병렬로 시작할 수 있습니다.
<br/>

**4. 예제 > 4-3. 데이터 사전 로딩**
<br/>

4-3. 데이터 사전 로딩
- 차단 요청 전에 사전 로드(preload)하는 유틸리티 함수를 만들어서, 데이터를 사전 로드할 수 있습니다.
- <Item>은 checkIsAvailable


<hr/>

## 25년 11월 5일 강의
> 내용 정리

**1. 데이터 가져오기(Fetching Data)**
<br>

[알아두면 좋은 정보]
- fetch 응답은 기본적으로 캐싱되지 않습니다.
- 그러나 Next.js는 라우팅 페이지를 미리 렌더링하고, 성능 향상을 위해 출력은 캐싱됩니다.
- 동적 렌더링을 사용하려면 { cache: 'no-store' } 옵션을 사용합니다. ⚠️ fetch API 참고
- 개발 중에는 가시성과 디버깅을 개선하기 위해 fetch 호출을 기록할 수 있습니다. ⚠️ logging API 참고
<br>

[2. ORM 또는 데이터베이스를 사용]
- 서버 컴포넌트는 서버에서 렌더링 되기 때문에 ORM이나 데이터베이스 클라이언트를 사용해서 안전하게 데이터베이스 쿼리를 실행할 수 있습니다.
- 컴포넌트를 비동기 함수로 변환하고 호출을 기다리면 됩니다.

**1-2. 클라이언트 컴포넌트**
<br>

1-2. 클라이언트 컴포넌트
- 클라이언트 컴포넌트에서 데이터를 fetch하는 방법은 두가지가 있습니다.
    1. React의 use Hook
    2. SWR 또는 React 쿼리와 같은 통신 라이브러리

[1. use Hook을 사용한 스트리밍 데이터]
- React의 use Hook을 사용하여 서버에서 클라이언트로 데이터를 스트리밍합니다.
- 서버 컴포넌트에서 데이터를 먼저 fetch하고, 그 결과(promise)를 클라이언트 컴포넌트에 prop으로 전달합니다.
- ⚠️ 서버 컴포넌트는 async가 가능하기 때문에 await fetch()도 사용 가능합니다.
- ⚠️ 하지만 클라이언트 컴포넌트에서는 async가 불가능하기 때문에 직접 fetch가 불가능합니다. (렌더링 중 fetch 금지)

**Fetch의 이해**
<br/>

- 실습한 코드에서 fetch(url).then((res) => res.json()) 이라는 부분이 있습니다.
- 이 부분에 대해서 좀 더 이해하고 넘어가도록 하겠습니다.

fetch(url)
- fetch() 함수는 브라우저의 Fetch API로, HTTP 요청을 보낼 때 사용합니다.
- 기본적으로 GET 방식으로 요청을 수행합니다.
- 첫 번째 인자로 요청(request)할 URL, 두 번째 인자로 요청 옵션을 전달합니다.
- 옵션은 method, headers, body 등이 있습니다.
- Promise<Response> 객체를 반환합니다.
- 응답이 도착하면 then()을 통해 결과를 처리합니다.
- HTTP 상태 코드가 4xx / 5xx 이어도 Promise는 reject(오류)되지 않습니다.
- 네트워크 에러(통신 오류)가 아니라면 무조건 resolve가 됩니다. 
- 따라서 404, 500 등의 오류를 처리하려면 예외처리가 별도로 필요합니다.
<br/>

1. Promise의 기본 구조
    - new Promise()를 호출하면 Promise 객체가 생성됩니다.
    - 생성자의 인자로 callback 함수가 들어가는데, 이 call back은 두 개의 매개변수를 받습니다.
        - resolve: 작업이 성공했을 때 호출하는 함수
        - reject: 작업이 실패했을 때 호출하는 함수

2. resolve()의 기능
    - resolve(value)는 Promise의 상태를 "fullfilled(이행됨)"으로 바꾸고, 그 값(value)을 .then()으로 전달합니다.
    - 예에서는 resolve('완료'!)를 호출한 순간, promise의 상태는 "fullfilled"로 바뀌고 result로 '완료!'가 전달됩니다.

3. 자주 혼동하는 부분
    - resolve는 Promise 안에서 자동으로 전달되는 함수입니다.
    - 직접 정의하는 게 아니라 new Promise 내부 callback의 첫번째 매개변수로 주어집니다.
    - 다음 코드는 잘못된 예시를 보여줍니다.

4. 이미 존재하는 Promise를 resolve하는 경우
    - 경우에 따라서 새 Promise를 만들지 않고, 이미 존재하는 값을 "즉시 이행된 Promise"로 감싸고 싶을 때가 있습니다.
    - 이런 경우 Promise.resolve()를 사용합니다.
    - 이것은 new Promise((resolve) => resolve('이미 완료된 값'))와 같은 의미입니다.
<br/>

💡 .then((res) => ...)
- fetch()가 반환한 Promise 객체가 then() 메서드를 가지고 있습니다.
- Promise 객체가 resolve(성공)되면 .then()의 callback 함수가 실행됩니다.
- 여기서 res는 서버에서 반환된 Promise 객체입니다.
- Promise 객체는 status, header, body 등 HTTP 응답 전체를 포함합니다.
<br/>

💡 res.json()
- res.json()은 이 Response 객체의 본문(body)을 JSON으로 파싱하는 비동기 함수입니다.
- 내부적으로 문자열 형태의 Response body를 읽고, JSON.parse()를 수행하여 자바스크립트 객체로 변환합니다.
- 이 함수로 Promise를 반환하기 때문에 다시 then() 체이닝을 통해 파싱된 데이터를 사용할 수 있습니다.
- 파싱이 완료되면 resolve(성공)되고, 파싱에 실패(유효하지 않은 JSON)하면 reject(거부)됩니다.
<br/>

**Suspense Component란 무엇인가?**
- 비동기 작업 중에 UI의 일부를 일시적으로 대체 UI(fallback)로 보여주어 사용자 경험을 향상시키는 React 기능입니다. (예: 데이터 로딩, 컴포넌트 동적 임포트)
<br/>

[Suspense의 핵심 기능]
- 비동기 작업이 완료될 때까지 해당 컴포넌트 트리 렌더링을 일시 중지합니다.
- 작업이 완료되면 실제 UI로 자동 전환합니다.
- 비동기 로딩 중 보여줄 fallback UI(로딩 인디케이터 등)를 지정할 수 있습니다.
- import 하여 사용합니다. ```import { Suspense } from 'react'```

- Suspense 내부에 여러 개의 컴포넌트가 있을 경우, 내부 컴포넌트 중 하나라도 로딩 중이면 fallback UI가 표시되고, 모든 작업이 완료되면 한번에 실제 UI가 노출됩니다.
- 이 기능을 활용하면 여러 비동기 컴포넌트를 독립적으로 대기하거나, 병렬 로딩 상태를 효과적으로 관리할 수 있습니다.

**Promise<...>란 무엇인가?**
<br/>

- Next.js 15.1부터 주요 내부 API들이 비동기(Promise 기반) 구조로 변경되었습니다.
- 내부 API(예: params, searchParams, headers, cookies)가 즉시 사용 가능한 값이 아니라 비동기적으로 처리되며 Promise를 반환하게 됩니다.
- 즉 Promise<...>는 비동기 연산의 결과를 나타내는 객체 타입으로, 연산이 즉시 완료되지 않고 미래의 어느 시점에서 결과가 결정될 때 이를 표현한다는 의미입니다.
- Promise<{ id: string }>는 미래에 { id: string } 객체를 반환하겠다는 약속입니다.
- 즉, 서버 컴포넌트로부터 Promise<{ id: string }> 객체를 받았다면, 클라이언트 컴포넌트에서는 use Hook을 사용해서 개별 데이터에 접근합니다.

**서버 컴포넌트에서 getPosts() 함수를 사용**
<br/>

[데이터의 전체적인 흐름]
1. blog에 접속하면 getPosts 라이브러리를 호출하여 fetch 정보를 전달 합니다.
2. getPosts는 받은 정보를 이용하여 fetch 데이터를 가져온 후 json 형태로 blog에 return 합니다.
3. blog는 getPosts로부터 받은 데이터를 Posts 컴포넌트에 props로 전달합니다.
4. 이때 blog는 Posts로부터 데이터를 받을 때까지 Suspense로 fallback UI를 실행합니다.
5. Posts 컴포넌트는 받은 props를 use Hook을 사용하여 데이터를 저장합니다.
6. 저장된 데이터는 map 함수를 사용하여 list를 만들고 그 결과를 blog로 return 합니다.
7. list를 받으면 blog는 fallback UI 실행을 중지하고 즉시 list를 렌더링합니다.
<br/>

**1-4. 커뮤니티 라이브러리(서드파티(third-party) 라이브러리 및 도구)**
<br/>

- 클라이언트 컴포넌트의 fetch data는 SWR 또는 React Query와 같은 커뮤니티 라이브러리를 사용할 수 있습니다.
    - SWR(Stale-While-Revalidate): Vercel에서 만든 라이브러리로, 먼저 캐시된(stale / 오래된) 데이터를 빠르게 보여준 후, 백그라운드에서 최신 데이터(revalidate)를 다시 가져옵니다. 그리고 최신 데이터가 도착하면 자동으로 화면을 업데이트합니다.

- 이런 라이브러리는 캐싱, 스트리밍 및 기타 기능에 대한 자체적인 의미(semantics)를 가지고 있습니다. 예를 들어 SWR을 사용한 예제는 다음과 같습니다.
<br/>

**제네릭(T)을 사용하여 반환 값의 타입을 명시적으로 지정**
<br/>

- 이 경우 반환 타입을 타입스크립트가 추론합니다. fetch(url).then((r) => r.json())의 결과는 일반적으로 Promise<any> 또는 Promise<unknown>로 추론됩니다.
- 문제는 any나 unknown으로 추론될 경우, 이 함수를 사용하는 쪽에서는 데이터의 실제 구조(r.name, r.id 등)를 알 수 없기 때문에, 사용할 때마다 타입을 명시하거나 별도의 타입 가드를 사용해야 합니다.
- 결과적으로 타입 안정성이 낮아져 런타임 오류의 가능성이 높아집니다.
- 이를 해결하기 위해서 TypeScript에서는 Generic을 제공합니다.
<br/>

**2. 중복된 요청 제거 및 데이터 캐시**
<br/>

- 중복된 fetch 요청을 제거하는 한가지 방법은 요청 메모이제이션(request memoization)을 사용하는 것입니다.
    - ⚠️ 즉, 같은 데이터를 여러번 요청하지 않게 하려면, '요청 메모이제이션(request memoization)'을 사용할 수 있다는 의미입니다.
- 이 메커니즘(요청 메모이제이션)을 사용하면, 하나의 렌더링 과정(single render pass) 안에서 같은 URL과 옵션을 가진 GET 또는 HEAD 방식의 fetch 호출들은 하나의 요청으로 결합된다.
    - ⚠️ 즉, 렌더링 중에 같은 주소와 설정으로 여러번 fetch()를 호출하더라도, Next.js는 그런것들을 하나의 네트워크 요청으로 통합해서 처리한다는 의미입니다.
- 이 작업은 자동으로 수행되며, fetch에서 Abort 신호를 전달하여 작업을 취소(opt out)할 수 있습니다.
- 요청 메모이제이션은 요청의 수명에 따라 범위가 지정됩니다.
- Next.js의 데이터 캐시를 사용하여 fetch 중복을 제거할 수도 있습니다. 예를 들어, fetch 옵션에서 cache: 'force-cache'를 설정합니다.
- 데이터 캐시를 사용하면 현재 렌더 패스와 수신 요청에서 데이터를 공유할 수 있습니다.
- ⚠️ 예제의 테스트를 정상적으로 테스트하기 위해서는 2가지 패키지가 필요합니다.
    - Drizzle-orm: SQL 데이터베이스를 위한 TypeScript 기반 ORM
    - better-sqlite3: Node.js 환경에서 SQLite 기반

**3. 스트리밍**
<br/>

- 경고(Warning): 아래

<hr/>

## 25년 10월 29일 강의
> 내용 정리

**Context provider의 실행 과정 리뷰**
1. Context 생성 (theme-provider.tsx)
    - createContext(...)로 Context 객체를 만듭니다.
    - : 초기값(default value)은 provider가 없을 때 사용할 fallback값 입니다. (여기선 theme: 'light', toggleTheme: () => {}).
    - 이 파일 내부에서 ThemeProvider 컴포넌트를 정의합니다.
    - useState로 theme 상태를 관리(예: 'light' 'dark').
    - toggleTheme 함수는 setTheme 을 호출해 상태를 변경.
    - useEffect로 상태 변경 시 document.documentElement.dataset.theme에 값을 기록. (전역 스타일 적용 용도)
    - ThemeContext.Provider에 value={{ theme, toggleTheme }}를 넣고 children을 감싸 줍니다.
    - [요약] 상태(state)와 상태를 바꾸는 함수(toggle)를 만든 뒤 Provider의 value로 내려 줍니다. 상태는 Provider 내부에 보관됩니다.

2. Provider 배치 (RootLayout)
    - RootLayout에서 Theme Provider로 루트(또는 필요한 하위 트리)를 감싸줍니다.
    - ex) <ThemeProvider><html>...{children}...</html> </ThemeProvider>
    - 이렇게 하면 Provider 하위에 렌더링 되는 모든 컴포넌트들이 ThemeContext에 접근할 수 있다.
    - children은 RootLayout으로 전달된 자식 컴포넌트들을 의미하고, Provider가 그들을 감 싸므로 자식들이 Context에 접근 가능해 지게 됩니다.

3. Consumer 사용 (theme-status.tsx)
    - ThemeStatus는 'use client'로 클라이언트 컴포넌트이며, useContext(ThemeContext)를 사용해 value를 읽어 들입니다.
    - : const { theme, toggleTheme } = useContext (ThemeContext)
    - UI에서는 theme 값을 표시하고, 버튼 클릭 시 toggleTheme()을 호출 합니다.

💡 동작 순서(버튼 클릭 시 흐름)
1. 사용자가 ThemeStatus의 버튼 클릭.
2. toggleTheme() 호출. (ThemeStatus가 Provider의 함수를 호출)
3. Provider 내부의 setTheme이 실행되어 theme 상태가 변경.
4. 상태 변경으로 Provider와 그 하위 컴포넌트들이 리렌더링되어 theme 값이 최신으로 반영됨.
5. useEffect가 실행되어 document.documentElement.dataset. theme 값도 갱신. (글로벌 스타일 반영)


**Context provider 순서도 형식으로 정리**
<br/>
⚠️ Theme Context의 동작 흐름을 순서도 형식으로 정리한 것입니다. 각 단계에 대응하는 파일/위치를 괄호 안에 표기했습니다.

1. 앱 시작 / RootLayout 렌더
    - RootLayout이 렌더되고 ThemeProvider로 children을 감쌈. (파일: layout.tsx→ ThemeProvider 사용)
    
2. Context 생성 (초기화)
    - ThemeContext = createContext(...)가 정의되어 있음(기본값 제공). (파일: src/components/theme-provider.tsx)

3. Provider 인스턴스 생성
    - Theme Provider 컴포넌트가 실행되어 내부 state(theme, setTheme) 생성(useState).
    - Provider의 value={ theme, toggleTheme }로 설정. (파일: src/components/theme-provider.tsx)

4. 하위 트리 렌더링
    - Provider로 감싼 children(페이지/컴포넌트)이 렌더됨. 이 하위 트리는 Context에 접근 가능. (파일: layout.tsx → children)

5. Consumer 사용: ThemeStatus 렌더
    - ThemeStatus가 렌더되어 useContext(ThemeContext)로 { theme, toggleTheme }를 가져옴. (파일: src/components/theme-status.tsx)

6. 사용자 상호작용: 버튼 클릭
    - 사용자가 ThemeStatus의 버튼을 클릭하면 toggleTheme() 호출. (파일: theme-status.tsx 클릭→ Theme Provider의 toggleTheme 실행)

7. 상태 변경 내부 처리
    - ThemeProvider의 toggleTheme가 setTheme을 호출하여 theme 상태를 변경(예: 'light' → 'dark'). (파일: theme-provider.tsx)

8. 부수효과 실행 (useEffect)
    - theme 변경으로 Theme Provider의 useEffect가 실행되어, document.documentElement.dataset.theme = theme 로 설정. (파일: theme-provider.tsx useEffect)

9. 리렌더링 전파
    - state 변경으로 Provider와 그 하위 Consumer들이 최신 value를 받아 리렌더링됨.
    - ThemeStatus는 새 theme 값을 받아 UI(아이콘/텍스트)를 갱신함.

10. 결과: 레이아웃/스타일 반영
<br/>

⚠️ data-theme 속성 변경을 바탕으로 CSS([data-theme="dark"] 등)가 적용되면 실제 시각적 테마 변경이 화면에 반영됨. (파일: 전역 CSS 또는 별도 스타일 파일)
<br/>

3-6. 외부(서드 파티) component
⚠️ 실습은 뒤에서 합니다. 여기서는 이론에만 집중해 주세요.
- client 전용 기능에 의존하는 외부 component를 사용하는 경우, 해당 component를
- client component에 래핑하여 예상대로 작동하는지 확인할 수 있습니다.
- 예를 들어, <Carousel >은 acme-carousel 패키지에서 를 가져올 수 있습니다.
- 이 component는 useState를 사용하지만 “use client” 지시문은 없습니다.<br/>
⚠️ “use client” 지시문 없이 어떻게 사용할 수 있을까요?
- client component 내에서 <Carousel >을 사용하면 예상대로 작동합니다.

**외부(서드 파티) component 실습**
<br/>

⚠️ acme-carousel의 주요 옵션 및 기능은 다음과 같습니다.
- 자동 전환(autoplay)
- 반응형(responsive)
- 지원터치/스와이프 제어(touch/swipe)
- 가상화(virtualization) 및 지연 로딩(lazy loading)
- 접근성(accessibility) 기능
- 고급 애니메이션 및 3D 효과 등
<br/>
💡 자세한 설명은 https://www.npmjs.com/package/acme-carousel 에서 확인할 수 있습니다.<br/>
💡 Autoplay Carousel을 적용하려면 어떻게 해야 하는지 확인해 보세요.<br/>

3-7. 환경 변수 노출 예방
- JavaScript 모듈은 server 및 client component 모듈 간에 공유될 수 있습니다.
- 이 말의 의미는 실수로 server 전용 코드를 client로 가져올 수도 있습니다.
- 예를 들어 다음 함수를 살펴보겠습니다.

<hr/>

## 25년 10월 22일 강의
> 내용 정리

3-4. server 및 client component 인터리빙
⚠️ 인터리빙(Interleaving)은 일반적으로 여러 데이터 블록이나 비트를 섞어서 전송하거나 처리하여 오류 발생 시 영향을 최소화하는 기술입니다.
⚠️ 특히 데이터 통신에서 버스트 오류(연속적인 오류)를 줄이고 오류 정정 코드를 효과적으로 사용하기 위해 사용됩니다.
⚠️ 프로그래밍이나 문서에서는 server 컴포넌트와 client 컴포넌트가 섞여서(Interleaved) 동작하는 것을 의미합니다.
- server component를 client component에 prop을 통해 전달할 수 있습니다.
- 이를 통해 client component 내에서 server에서 렌더링된 UI를 시각적으로 중첩할 수 있습니다.
- <ClientComponent>에 공간(slot)을 만들고 children을 끼워넣는 패턴이 일반적입니다.
- 예를 들어, client의 state를 사용하여 표시 여부를 전환(toggle)하는 <Modal> component 안에 server에서 데이터를 가져오는 <Cart> component가 있습니다.
- 그 다음 부모 server component(예: <Page>) 안에 <Modal>의 자식으로 <Cart>를 전달할 수 있습니다.
    - Modal을 불러오는 곳이 Page이기 때문에 Page가 parent가 되는 것입니다.
- 이 패턴에서는 모든 server component(props 포함)가 server에서 미리 렌더링됩니다.
- 생성된 RSC 페이로드에는 component 트리 내에서 client component가 렌더링되어야하는 위치에 대한 참조가 포함됩니다.

**server 및 client component interleaving 실습**
<br>

⚠️ 동작 과정
1. Next.js는 먼저 ServerContent를 서버에서 렌더링 -> HTML로 변환
2. 이 HTML을 ClientLayout의 { children } 자리에 "끼워 넣음"
3. 그 다음 클라이언트에서는 ClientLayout만 hydration(즉, JS 연결)
4. 결국 서버 데이터는 이미 들어와있고, 버튼이나 이벤트 등은 클라이언트 컴포넌트에서 처리가 가능해집니다.
    - 이렇게 둘이 섞여(interleaved) 있는 패턴이 되는 것입니다.

**Context란 무엇인가?**
<br/>

[Context의 주요 특징]
- ⚠️ 전역 상태 관리
    - Context를 사용하면 애플리케이션 전체에서 공유해야하는 데이터를 중앙 집중적으로 관리할 수 있습니다. (예: 사용자 정보, 테마 설정 등)

- ⚠️ props drilling 문제 해결
    - 컴포넌트 트리가 깊어질수록 props를 계속 전달해야하는 번거로움을 줄여줍니다.
    - Context를 사용하면 필요한 컴포넌트에서 바로 데이터를 가져올 수 있으므로, 코드의 가독성을 높이고 유지 보수를 용이하게 합니다.

- ⚠️ React 컴포넌트에서 사용
    - Context는 React에서 제공하는 기능이기 때문에, Next.js에서도 React 컴포넌트를 사용하여 구현합니다.

3-5. Context Provider (컨텍스트 제공자)
- React Context는 일반적으로 아래 테마처럼 전역 상태를 공유하는데 사용됩니다.
- 그러나 server component에서는 React Context가 지원되지 않습니다.
- Context를 사용하려면 children을 허용하는 client component로 만들어야합니다.

⚠️ 알아두면 좋은 정보
- Provider component를 트리에서 가능한 한 깊숙이 렌더링해야합니다.
- ThemeProvider가 전체 <html> 문서 대신 { children }만 래핑하는 방식을 주목하세요.
- 이렇게 하면 Next.js가 server component의 정적 부분을 더 쉽게 최적화할 수 있습니다.

**Context provider 실습 코드 설명**
<br/>

Context 생성 코드 설명 (theme-provider.tsx) - client 컴포넌트

- context를 사용하면 props를 사용하지 않고도 전역적으로 사용할 theme, 언어 설정, 로 그인 정보 등을 하위 컴포넌트에 전달할 수 있습니다.

- createContext()는 React 컴포넌트 트리 전체에 값을 공유할 수 있도록 하는 역할을 합니다.

- createContext(...)로 Context 객체를 생성하여, Theme state를 공유 합니다. lines5 ~

- <{-}> 부분은 타입 부분입니다. line6, 7
    - theme: 'light' 또는 'dark' 중 하나이고,
    - toggleTheme: 아무 인자도 받지 않고, 반환값도 없는 함수라는 것을 의미합니다.  

- #기본값(default value)은 provider가 없을 때 사용할 fallback value입니다. line9, 10
    - React에서는 createContext()를 호출할 때 기본값이 반드시 있어야 합니다.
    - 보통은 실제 동작하지 않는 빈 함수(() => {})를 기본으로 넣어둡니다.
    - 실제 동작은 Theme Provider 컴포넌트에서 설정하게 됩니다.
    - theme: 'light', toggleTheme: () => {}

- 다음 파일 내부에서 Theme Provider 컴포넌트를 정의합니다. line13 ~

- useState로 theme 상태를 관리합니다. line18
    - line 6에서도 나왔던 <'light' | 'dark'>은 TypeScript의 "유니온 타입(Union Type)" 이며, 초기값은 light라는 것을 의미 합니다.

💡 TypeScript의 유니온 타입(Union Type) 이란?
- ' | '(파이프)로 여러 타입을 연결해서 "이 값은 각각의 타입 중 하나가 될 수 있다" 는 것을 지정합니다.

- 코드에서 문자열 리터럴 유니온 타입의 경우, state 값으로 'light' 또는 'dark'만 설정할 수 있어 코드 자동완성과 타입 안정성이 향상됩니다.

- 다음은 useEffect Hook을 사용해서 테마(Theme)를 HTML 문서 전체에 적용하는 아주 전 형적인 패턴입니다. line 20~24

- useEffect Hook은 컴포넌트가 렌더링된 후 부수 효과(side effect) 를 실행하기 위한 함수입니다.

- if문의 조건절은 "현재 실행 환경이 브라우저인지 확인하는 부분입니다. line 21
    - 서버 사이드 렌더링 (SSR) 단계에서는 window 객체가 없습니다.
    - 만약 서버에서 window를 참조하면 오류가 발생합니다. (ReferenceError: window is not defined)
    - ⚠️ 따라서 typeof window!== 'undefined'은 "클라이언트(브라우저) 환경일 때만 실행 하라"는 뜻입니다.

- line 22는 다음과 같은 의미입니다.
    - document.documentElement는 HTML 문서의 <html> 요소를 가리킵니다.
    - .dataset.theme = theme은 <html> 태그에 data-theme 속성을 추가하는 코드입니다.
    - ⚠️ 만일 theme state 값이 "dark"라면 다음과 같이 HTML을 반환합니다. <html data-theme="dark">

- useEffect의 두 번째 인자 [theme] 는 의존성 배열(dependency array) 입니다. line 24
    - theme 값이 변경될 때마다 useEffect 안의 코드가 다시 실행됩니다.
    - ⚠️ 즉, 테마가 바뀔 때마다 HTML의 data-theme 속성도 업데이트됩니다.

- 이 방법을 사용할 경우 CSS에서 속성을 조건으로 스타일을 다르게 지정할 수 있습니다.

- 여기서 html[data-theme='light']는 속성 선택자(Attribute Selector)로 CSS에서 클래스(.class)나 아이디(#id)처럼 요소를 선택하는 또 다른 방법 입니다.

- 속성 선택자는 class를 여러 개 붙이는 경우보다 스타일 충돌을 줄일 수 있습니다.

```css
html[data-theme='light'] {
    background-color: white;
    color: black;
}

html[data-theme='dark'] {
    background-color: black;
    color: white;
}
```

- theme state를 3항 연산자를 사용해서 토글하여 setTheme함수를 이용해서, toggleTheme에 저장합니다. line26

- ThemeContext.Provider는 무엇일까요?
    - createContext 함수를 호출하면, React는 Context 객체 하나를 만들어줍니다.
    - 이 객체 안에는 여러가지 속성이 있는데, 대표적인 것이 다음 두 가지가 입니다.
    - ThemeContext.Provider, ThemeContext.Consumer입니다.
    - 즉, Provider createContext()를 호출하면 자동으로 생성되는 React 컴포넌트입니다. line28

- 따라서 ThemeContext. Provider 컴포넌트에 현재 theme state와 함께 toggleTheme 함수 도 함께 props로 전달합니다. line 28
    - ⚠️ 즉, 하위 컴포넌트에서는 현재 theme state를 알 수 없기 때문에 버튼 쪽으로 toggleTheme 함수와 함께 theme state를 함께 전달하는 것입니다.

테마 토글버튼 코드 설명 (theme-status.tsx) - client 컴포넌트

- ThemeContext를 사용하기 위해서 theme-provider import합니다. line 4

- useContext 함수를 이용해서 ThemeContext에서 전달 받은 theme와 toggleTheme를 추출 합니다. line 7

- 클릭 이벤트가 발생하면 추출된 toggleTheme함수를 실행되고, 버튼 내의 삼항 연산자를 사용하여 버튼의 모양을 교체해 줍니다. line 10 ~ line 11

⚠️ aria-label 속성 : 텍스트가 없거나 불분명할 때, 화면 남독기 등 보조 기술이 버튼의 역할을 설명하도록 접근성 이름을 제공합니다.
⚠️ aria: Accessible Rich Internet Applications(접근 가능한 풍부한 인터넷 애플리케이션)의 약자

RootLayout 수정 코드 설명 - server 컴포넌트

- ThemeProvider와 ThemeStatus(버튼) 사용을 위해 import를 추가 합니다. line 2, 3

```javascript
import Themeprovider from "@/components/theme-provider";
import ThemeStatus from "@/components/theme-status";
```

- ThemeStatus는 출력을 원하는 곳에 삽입합니다.
    - ThemeProvider는 <html>..</html>을 감싸 줍니다.
    - ⚠️ 문서의 설명으로는 {children}을 감싸면 최적화 할 수 있다고 되어 있지만 우리의 경우에는 동작하지 않습니다.
    - ⚠️ 왜냐하면 우리는 css의 속성 선택자로 html을 사용했기 때문입니다.

- 하지만 <body> <ThemeProvider>...</Theme Provider></body>처럼 감싸도, <body>를 감싸 도 그리고 <html>을 감싸도 동작하는 이유는 무엇일까요?
    - ⚠️ RootLayout 컴포넌트의 return 내부를 보면 일반 html처럼 보이지만 실제로 Next.js 에서는 <html>과 <body>도 React의 JSX 엘리먼트로 렌더링 됩니다.
    - ⚠️ 즉, 렌더링 트리 상으로는 다르게 보여도, useEffect에서 직접 DOM을 조작하기 때 문에 결과적으로 똑같이 보이는 것입니다.

<hr/>

## 25년 10월 17일 강의(보강)
> 내용 정리

**Introduction**
<br/>

- 기본적으로 layout과 page는 server component 입니다.
- server에서 데이터를 가져와 UI의 일부를 렌더링할 수 있고, 선택적으로 결과를 cache한 후 client로 스트리밍할 수 있습니다.
- 상호작용이나 브라우저 API가 필요한 경우 client component를 사용하여 기능을 계층화할 수 있습니다.
- 이번 장에서는(5장) Next.js에서 server 및 client component가 작동되는 방식과 이를 사용하는 시기를 설명하고, 애플리케이션에서 이 컴포넌트를 사용하는 방법에 대한 예제를 소개합니다.

**1. server 및 client component를 언제 사용해야 되나요?**
<br/>

- client 환경과 server 환경은 서로 다른 기능을 가지고 있습니다.
- server 및 client component를 사용하면 사용하는 사례에 따라 각각의 환경에서 필요한 로직을 실행할 수 있습니다.
- 다음과 같은 항목이 필요한 경우에는 client component를 사용합니다.
    - state 및 event handler | 예) onClick, onChange
    - Lifecycle logic | 예) useEffect
    - 브라우저 전용 API | 예) localStorage, window, Navigator, geolocation 등
    - 사용자 정의 Hook

- 다음과 같은 항목이 필요한 경우에는 server component를 사용합니다.
    - 서버의 데이터베이스 혹은 API에서 data를 가져오는 경우 사용합니다.
    - API key, token 및 기타 보안 데이터를 client에 노출하지 않고 사용합니다.
    - 브라우저로 전송되는 JavaScript의 양을 줄이고 싶을 때 사용합니다.
    - 콘텐츠가 포함된 첫 번째 페인트(First Contentful Paint-FCP)를 개선하고, 콘텐츠를 client에 점진적으로 스트리밍합니다.

<br/>

- 예를 들어, <Page> component는 게시물에 대한 데이터를 가져와서, client 측 상호 작용을 처리하는 <LinkButton>에 props로 전달하는 server component 입니다.
    - ⚠️ 그리고, @/ui/like-button은 client component이기 때문에 use client를 사용하고 있습니다.

```javascript
import LikeButton from '@/app/ui/like-button'
import { getPost } from '@/lib/data'

export default async function Page({ param }: { params: { id: string } }) {
    const post = await getPost(params.id)

    return (
        <div>
            <main>
                <h1>{ post.title }</h1>
                { /* ... */ }
                <LikeButton likes = { post.likes } />
            </main>
        </div>
    );
}
```

```javascript
'use client'

import { useState } from 'react'

export default function LikeButton({ likes }: { likes: number }) {
    // ...
}
```

**문서의 코드를 완성해봅시다. slug page**
<br/>

- 완성된 코드는 다음과 같습니다.
- getPost 컴포넌트는 별도로 구현하지 않고, 슬러그에 포함된 id 값을 비교해서 직접 가져옵니다.

```javascript
import LikeButton from '@/ui/like-button'
// 문서의 import { getPost } from '@/lib/data' 대신 데이터만 직접 가져옵니다.
import { posts } from '@/lib/data'
import { notFound } from 'next/navigation'

// 문서에서는 다음 구문을 풀어서 작성했지만 한 줄로 하는 것이 더 명확해 보입니다.
// export default async function PostPage({ params }: { params: Pormise<{ id: string }> }) { ... }

export default async function PostPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    // posts에서 슬러그에 해당하는 포스트를 찾습니다.
    // getPost 대신 직접 posts 배열에서 찾습니다.
    const post = posts.find((p) => p.id === id);

    if(!post) {
        notFound();
    }

    return (
        <div>
            <main>
                <h1>{ post.title }</h1>
                { /* ... */ }
                <LikeButton likes = { post.likes } />
            </main>
        </div>
    )
}
```

**문서의 코드를 완성해봅시다. LikeButton 컴포넌트**
<br/>

```javascript
'use client'

import { useState } from 'react'

export default function LikeButton({ likes }: { likes: number }) {
    // Optimistic Updates(낙관적 업데이트)
    // 클라이언트 전용 컴포넌트 - 초기 likes 값을 받아 로컬에서 즉시 반영합니다.
    // 서버에 저장하지 않고, 단순히 UI 상에서 좋아요 수를 증가시키는 역할을 합니다.
    
    const [count, setCount] = useState<number>(likes ?? 0)
    const [isLiking, setIsLiking] = useState(false)

    const handleClick = async() => {
        // 낙관적 업데이트
        setIsLiking(true)
        setCount((c) => c + 1)

        // 실제 저장 로직(API 호출 등)이 있다면 이곳에서 호출할 수 있습니다.
        // 예: await fetch('/api/likes', { methos: 'POST', body: JSON.stringify({ id }) })

        // 예제에서는 짧은 지연 후 버튼 상태만 해제합니다.
        setTimeout(() => setIsLiking(false), 300)
    }

    return (
        <button onClick={ handleClick } disabled={ isLiking } aria-pressed={ false }>
            { count }
        </button>
    )
}
```

**문서의 코드를 완성해 봅시다. Optimistic Update**
<br/>

[Optimistic Update(낙관적 업데이트)]
- 사용자에 의해서 이벤트(예: 좋아요 버튼 클릭)가 발생하면, 서버 응답을 기다리지 않고 클라이언트(브라우저)의 UI를 즉시 변경(업데이트)합니다.
- 서버에 보낸 요청의 성공을 낙관(optimistic)한다고 가정해서 먼저 화면에 변화를 보여 줍니다.
- 서버에서 응답이 없으면, UI를 원래 상태로 되돌립니다.(rollback)
- 네트워크 지연 동안에도 앱이 "빠르게 반응"하도록 느끼게 하는 것이 목적입니다.

**문서의 코드를 완성해 봅시다. Pessimistic Update**
<br/>

[Pessimistic Update(비관적 업데이트)]
- 이벤트가 발생하면 먼저 서버에 요청을 보내고, 서버에서 성공 응답을 받은 후에 클라이언트의 UI를 업데이트 합니다.

(장점)
- 서버의 응답을 기반으로 하기 때문에 데이터의 일관성이 보장됩니다.
- 오류가 발생할 가능성이 낮고, 잘못된 정보가 표시될 염려가 없습니다.

(단점)
- 사용자는 서버의 응답을 기다려야 하므로

**2. Next.js에서 server와 client component는 어떻게 작동합니까?**
<br/>

2-1. server component의 작동
- server에서 Next.js는 React의 API를 사용하여 렌더링을 조정합니다

<br/>

RSC 페이로드에는 다음 내용이 포함됩니다.
- server component의 렌더링 결과
- client component가 렌더링될 위치 및 해당 JavaScript 파일 참조를 위한 자리 표시자(Placeholder)
- server component에서 client component로 전달되는 모든 props

2-2. client component의 작동(첫 번째 load)
1. HTML은 사용자에게 경로(라우팅 페이지)의 비대화형 미리보기를 즉시 보여주는데 사용됩니다.
2. RSC 페이로드는 client와 server component 트리를 조정하는데 사용됩니다.
3. JavaScript는 client component를 hydration하고, 애플리케이션을 대화형으로 만드는데 사용됩니다.

⚠️ Hydration이란 무엇인가?
- Hydration은 이벤트 핸들러를 DOM에 연결하여 정적 HTML을 인터렉티브하게 만드는 React의 프로세스입니다.

<br/>

2-3. 후속 네비게이션
후속 탐색을 할 때:
- RSC 페이로드는 즉시 탐색할 수 있도록 prefetch 및 cache 됩니다.
- client component는 server에서 렌더링된 HTML 없이 전적으로 client에서 렌더링됩니다.

**3. Example**
<br/>

3-1. client component 사용
- 파일의 맨 위, 즉 import문 위에 'use client' 지시문을 추가하여 client component를 생성할 수 있습니다.
- 'use client'는 server와 client 모듈 트리 사이의 경계를 선언하는데 사용됩니다.
- 파일에 'use client'로 표시되면 해당 파일의 모든 import와 자식 component는 client 번들의 일부로 간주됩니다.
- 즉, client를 대상으로 하는 모든 component에 이 지시문을 추가할 필요가 없습니다.
<br/>

⚠️ 문서의 코드는 /api/ui/counter.tsx를 작성했지만, src 디렉토리를 사용하는 경우는 다음과 같이 관리하는 것이 일반적입니다.
- src/app/ 아래에는 라우팅페이지만 작성하고 관리합니다.
- 기타 사용자 정의 component나 library는 src/ 아래에 작성하고 관리합니다.

⚠️ [실습1] 따라서 이번 실습 코드는 src/components 디렉토리를 만들고 Counter 컴포넌트를 작성합니다.
```javascript
'use client'

import { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <p>{ count } likes</p>
            <button onClick={ () => setCount(count + 1) }>Click me</button>
        </div>
    )
}
```

- Counter 컴포넌트를 작성하는 이유는 사용할 목적이 있기 때문입니다. 다음은 대표적인 컴포넌트의 사용 목적입니다.
    - 다른 컴포넌트의 완성을 위해 사용합니다.
    - 라우팅 페이지에서 렌더링을 위해 사용합니다.

⚠️ [실습2] 라우팅 페이지를 만들고, Counter 컴포넌트를 호출할 수 있도록 작성합니다.
⚠️ [실습3] 테스트의 편의를 위해 앞서 실습한 slug page(like-button) 및 counter page의 링크를 모든 라우팅 페이지에서 확인할 수 있도록 코드를 작성합니다.

<br/>

3-2. JS bundle 크기 줄이기
- client JavaScript 번들의 크기를 줄이려면 UI의 큰 부분을 client component로 표시하는 대신 특정 대화형 component에 'use client'를 추가합니다.

- 예를 들어, 다음 예제의 <Layout> component는 로고와 탐색 링크와 같은 정적 요소가 대부분이지만 대화형 검색창이 포함되어 있습니다.
- <Search />는 대화형이기 때문에 client component가 되야 하지만, 나머지 layout은 server component로 유지될 수 있습니다.

<br/>

3-3. server에서 client component로 데이터 전달
- props를 사용하면 server component에서 client component로 데이터를 전달할 수 있습니다.

⚠️ 앞에서 작성한 PostPage(/[id]/page.tsx) server component는 line 28에서 client component인 LikeButton으로 like props를 전달하고 있는 것을 확인할 수 있습니다.

- 다른 방법으로는 use Hook을 사용하여 server component에서 client component로 데이터를 스트리밍할 수도 있습니다. 예제를 참조하세요. #Fetching Data에서 소개합니다.

💡 알아두면 좋은 정보: client component에 전달되는 Props는 React로 직렬화가 가능해야 합니다.
<br/>

⚠️ 직렬화(Serialization)란 무엇인가?
- 일번적으로는 메모리에 있는 복잡한 데이터를 바이트의 연속 형태로 변환하는 과정을 말합니다.
- 즉, 자바스크립트의 객체나 배열처럼 구조가 있는 데이터를 파일로 저장하거나, 네트워크로 전송하기 쉽게 만드는 과정입니다.
- React나 Next.js 같은 프레임워크는 컴포넌트의 상태나 트리 구조를 서버에서 직렬화하여 클라이언트로 전송하고, 클라이언트에서 역직렬화 하는 과정을 자주 수행합니다.

<hr/>

## 25년 10월 1일 강의
> 내용 정리

**1-4. Client-side transitions(클라이언트 측 전환)**
<br/>

- 일반적으로 서버 렌더링 페이지로 이동하면 전체 페이지가 로드됩니다.
    - 이로 인해 state가 삭제되고, 스크롤 위치가 재설정되며, 상호작용이 차단됩니다.

- Next.js는 <Link> 컴포넌트를 사용하는 클라이언트 측 전환을 통해 이를 방지합니다. 페이지를 다시 로딩하는 대신 다음과 같은 방법으로 콘텐츠를 동적으로 업데이트합니다.
- ⚠️ 공유 레이아웃과 UI를 유지합니다.
- ⚠️ 현재 페이지를 미리 가져온(prefetching) 로딩 상태 또는 사용 가능한 경우 세 페에지로 바꿉니다.

- 클라이언트 측 전환은 서버에서 렌더링된 앱을 클라이언트에서 렌더링된 앱처럼 느껴지게 하는 요소입니다.
- 또한 프리페칭 및 스트리밍과 함께 사용하면 동적 경로에서도 빠른 전환이 가능합니다.

**2. 전환을 느리게 만드는 요인은 무엇일까요?**
<br/>

- Next.js는 최적화를 통해 네비게이션 속도가 빠르고 반응성이 뛰어납니다.
- 하지만 특정 조건에서는 전환 속도가 여전히 느릴 수 있습니다.
- 다음은 몇가지 일반적인 원인과 사용자 경험을 개선하는 방법입니다.

**2-1. 동적 경로 없는 loading.tsx**
<br/>

- 동적 경로로 이동할 때 클라이언트는 결과를 표시하기 전에 서버의 응답을 기다려야 합니다.
    - 이로 인해 사용자는 앱이 응답하지 않는다는 인상을 받을 수 있습니다.

- 부분 프리페칭을 활성화하고, 즉시 네비게이션을 트리거하고, 경로가 렌더링되는 동안 로딩 UI를 표시하려면 동적 경로에 loading.tsx를 추가하는 것이 좋습니다.

- ⚠️ 알아두면 좋은 정보: 개발 모드에서 Next.js 개발자 도구(Devtools)를 사용하여 경로가 정적인지 동적인지 확인할 수 있습니다.

**2-2. 동적 세그먼트 없는 generateStaticParams**
<br/>

- 동적 세그먼트는 사전 렌더링될 수 있지만, generateStaticParams가 누락되어 사전 렌더링되지 않은 경우, 해당 경로는 요청 시점에 동적 렌더링으로 대체됩니다.
- generateStaticParams를 추가하여 빌드 시점에 경로가 정적으로 생성되도록 합니다.

**# await이 없어도 async를 붙여 두는 이유**
<br/>

- Next.js 13+의 App Router에서 page.tsx 같은 Server Component는 비동기 렌더링을 전제로 하고 있습니다.
- 즉, page.tsx 안에서 데이터를 fetch하는 경우가 많기 때문에 async를 기본으로 붙여도 전혀 문제가 없습니다.

1. 일관성 유지: 같은 프로젝트 안에서 어떤 페이지는 async, 어떤 페이지는 일반 function이면 혼란스러울 수 있습니다.
    - Next.js 공식 문서도 대부분 async function으로 예시를 작성합니다.

2. 확장성: 지금은 더미 데이터(posts, find(...))를 쓰지만, 나중에 DB나 API에서 데이터를 가져올 때 await fetch(...) 같은 코드가 들어갈 수 있기 때문에, 미리 async를 붙여 두면 수정할 필요가 없습니다.

3. React Server Component 호환성: Server Component는 Promise를 반환할 수 있어야 하고, Next.js는 내부적으로 async 함수 패턴에 맞춰 최적화된 렌더링 파이프라인을 갖고 있어서 async가 붙어 있어도 불필요한 오버헤드가 거의 없습니다.

**2-3. 느린 네트워크**
<br/>

- 네트워크가 느리거나 불안정한 경우, 사용자가 링크를 클릭하기 전에 프리페칭이 완료되지 않을 수 있습니다.
- 이것은 정적 경로와 동적 경로 모두에 영향을 미칠 수 있습니다.
- 이 경우, loading.tsx 파일이 아직 프리페칭되지 않았기 때문에 즉시 표시되지 않을 수 있습니다.
- 체감 성능을 개선하기 위해 useLinkStatus Hook을 사용하여 전환이 진행되는 동안 사용자에게 인라인 시각적 피드백을 표시할 수 있습니다. (예: 링크의 스피너 또는 텍스트 글리머)

**2-4. 프리페칭 비활성화**
- <Link> 컴포넌트에서 prefetch prop을 false로 설정하여 프리페치를 사용하지 않도록 선택할 수 있습니다.
- 이는 대량의 링크 목록(예: 무한 스크롤 테이블)을 렌더링할 때 불필요한 리소스 사용을 방지하는데 유용합니다.
- 그러나 프리페칭을 비활성화하면 다음과 같은 단점이 있습니다.
    - ⚠️ 정적 라우팅은 사용자가 링크를 클릭할 때만 가져옵니다.
    - ⚠️ 동적 라우팅은 클라이언트가 해당 경로로 이동하기 전에 서버에서 먼저 렌더링 되어야 합니다.

**2-5. Hydration이 완료되지 않음**
- <Link>는 클라이언트 컴포넌트이기 때문에 라우팅 페이지를 프리페치하기 전에 하이드레이션해야 합니다.
- 초기 방문 시 대용량 자바스크립트 번들로 인해 하이드레이션이 지연되어 프리페칭이 바로 시작되지 않을 수 있습니다.

- React는 선택적 Hydration을 통해 이를 완화하며, 다음과 같은 방법으로 이를 더욱 개선할 수 있습니다.
    - ⚠️ @next/bundle-analyzer 플러그인을 사용하면 대규모 종속성을 제거하여, 번들 크기를 식별하고 줄일 수 있습니다.

<hr/>

## 25년 9월 24일 강의
> 내용 정리

**# searchParams란?**
<br/>

- URL의 쿼리 문자열(Query String)을 읽는 방법입니다.
- 예시 URL: /products?category=shoes&page=2
- 여기서 category=shoes, page=2가 search parameters입니다.
- searchParams는 컴포넌트의 props로 전달되며, 내부적으로는 URLSearchParams 처럼 작동합니다.

**# 왜 "동적 렌더링"이 되는가?**
<br/>

- Next.js에서 페이지는 크게 정적(static) 또는 동적(dynamic)으로 렌더링될 수 있습니다.
- searchParams는 요청이 들어와야만 값을 알 수 있기 때문에, Next.js는 이 페이지를 정적으로 미리 생성할 수 없고, 요청이 올 때마다 새로 렌더링해야 합니다.
- 따라서 해당 페이지는 자동으로 동적 렌더링(dynamic rendering)으로 처리됩니다.

**# [slug]의 이해**
<br/>

- 데이터 소스가 크다면 .find는 0(n)이므로 DB 쿼리로 바꿔야 합니다.
    - 0(n)은 알고리즘의 시간 복잡도가 입력 데이터의 크기 n에 비례하여 시간이나 메모리 사용량이 선형적으로 증가하는 것을 의미합니다.

- 앞의 코드에서는 Promise<...>를 사용하지 않아도 오류 없이 동작했습니다.
- 하지만 params가 동기식처럼 보이지만 사실은 비동기식이라는 것을 좀 더 명학히 하기 위해 사용합니다. 코드의 가독성이 좋습니다.
- 또 한가지 Promise를 명시해주면 await를 깜빡했을때 TypeScript가 이를 잡아줍니다.
- 결론적으로 오류와 상관없이 Promise 사용을 권장합니다.

**7. Linking between pages(페이지간 연결)**
<br/>

- <Link> 컴포넌트를 사용하여 경로 사이를 탐색할 수 있습니다.
- <Link>는 HTML <a> 태그를 확장하여 prefetching 및 client-side navigation 기능을 제공하는 Next.js의 기본 제공 컴포넌트입니다.
    - Prefetching은 사용자가 해당 경로로 이동하기 전에 백그라운드에서 해당 경로를 loading 하는 프로세스입니다.
- 예를 들어, 블로그 글 목록을 생성하려면 next/link에서 <Link>를 가져와서 컴포넌트에 href prop을 전달합니다.

**Introduction**
<br/>

- Next.js에서 경로는 기본적으로 서버에서 렌더링 됩니다.
- 즉, 클라이언트는 새 경로를 표시하기 전에 서버의 응답을 기다려야 하는 경우가 많습니다.
- Next.js에는 prefetching, streaming 그리고 client-side transitions(클라이언트 사이드 전환) 기능이 기본 제공되어 네비게이션 속도가 빠르고 반응성이 뛰어납니다.
- 이번 장에서는 Next.js에서 네비게이션이 작동하는 방식, 동적 라우트와 느린 네트워크에 맞게 네비게이션을 최적화하는 방법을 설명합니다.

**1. How navigation works(네비게이션 작동 방식)**
<br/>

- Next.js에서 네비게이션이 어떻게 작동하는지 이해하려면 다음 개념에 익숙해지는 것이 좋습니다.
    - Server Rendering(서버 렌더링)
    - Prefetching(프리페칭)
    - Streaming(스트리밍)
    - Client-side transitinos(클라이언트 측 전환)

**1-1. Server Rendering(서버 렌더링)**
<br/>

- Next.js에서 레이아웃과 페이지는 기본적으로 React 서버 컴포넌트입니다.
- 초기 네비게이션 및 후속 네비게이션 할 때, 서버 컴포넌트 페이로드는 클라이언트로 전송되기 전에 서버에서 생성됩니다.
- 서버 렌더링에는 발생 시점에 따라 두가지 유형이 있습니다.
- ⚠️ 정적 렌더링(또는 사전 렌더링)은 빌드 시점이나 재검증 중에 발생하며, 결과는 캐시(cache)됩니다.
- ⚠️ 동적 렌더링은 클라이언트 요청에 대한 응답으로 요청 시점에 발생합니다.
- 서버 렌더링의 단점은 클라이언트가 새 경로를 표시하기 전에 서버의 응답을 기다려야 한다는 것입니다.
- Next.js는 사용자가 방문할 가능성이 높은 경로를 미리 가져 오고(prefetching), 클라이언트 측 전환(client-side transition)을 수행하여 지연 문제를 해결합니다.

**1-2. Prefetching(프리페칭: 미리 가져오기)**
<br/>

- 프리페칭은 사용자가 해당 경로로 이동하기 전에 백그라운드에서 해당 경로를 로드하는 프로세스입니다.
- 사용자가 링크를 클릭하기 전에 다음 경로를 렌더링하는 데 필요한 데이터가 클라이언트 측에 이미 준비되어 있기 때문에 애플리케이션에서 경로 간 이동이 즉각적으로 느껴집니다.
- Next.js는 <Link> 컴포넌트와 연결된 경로를 자동으로 사용자 뷰포트에 미리 가져옵니다.
- <a> 태그를 사용하면 프리페칭을 하지 않습니다.
- 미리 가져오는 경로의 양은 정적 경로인지 동적 경로인지에 따라 달라집니다.
- ⚠️ 정적 경로: 전체 경로가 프리페치됩니다.
- ⚠️ 동적 경로: 프리페치를 건너뛰거나, loading.tsx가 있는 경우 경로가 부분적으로 프리페칭됩니다.
- Next.js는 동적 라우팅을 건너뛰거나 부분적으로 프리페칭하는 방법으로 사용자가 방문하지 않을 수도 있는 경로에 대한 서버의 불필요한 작업을 방지합니다.
- 그러나 네비게이션 전에 서버 응답을 기다리면 사용자에게 앱이 응답하지 않는다는 인상을 줄 수도 있습니다.
- 동적 경로에 대한 네비게이션 환경을 개선하려면 스트리밍을 사용할 수 있습니다.

**1-3. Streaming(스트리밍)**
<br/>

- 스트리밍을 사용하면 서버가 전체 경로가 렌더링될 때까지 기다리지 않고, 동적 경로의 일부가 준비되는 즉시 클라이언트에 전송할 수 있습니다.
- 즉, 페이지의 일부가 아직 로드 중이더라도 사용자는 더 빨리 콘텐츠를 볼 수 있습니다.
- 동적 경로의 경우, 부분적으로 미리 가져올 수 있다는 뜻입니다. 즉, 공유 레이아웃과 로딩 스켈레톤을 미리 요청할 수 있습니다.
- Next.js는 백그라운드에서 page.tsx 콘텐츠를 <Suspense> 경계로 자동 래핑합니다.
- 미리 가져온 대체 UI는 경로가 로드되는 동안 표시되고, 준비가 되면 실제 콘텐츠로 대체됩니다.

<hr/>

## 25년 9월 17일 강의
> 내용 정리

**git checkout vs git switch 차이**
<br/>

- 그런데 왜 checkout은 그대로 남아있나?
    - 파일 복원 등 이미 commit된 파일을 조작할 수 있기 때문입니다.
    - 특히 git checkout [커밋 해시] 명령으로 특정 commit으로 이동할 수 있습니다.

- 새 branch를 만드는 명령은 다음 3가지 입니다.
- 단 <u>branch 명령은 이동할 수 없습니다</u>.
- 또한 <u>switch와 checkout</u>은 branch를 만들기만 할 수는 없고, <u>만들고 바로 이동</u>합니다.

- 참고로 branch 명령은 branch의 생성, 삭제, 확인 등을 할 때 사용합니다.
- 이미 작성한 코드를 보전하고 싶을 때는 branch를 이용해 보세요.

**1. Creating a page 페이지 만들기**
- Next.js는 <u>파일 시스템 기반 라우팅</u>을 사용하기 때문에 <u>폴더와 파일을 사용하여 경로를 정의</u>할 수 있습니다.
- 이번 장에서는 <u>레이아웃과 페이지를 만들고 서로 연결하는 방법</u>을 설명합니다.

- page는 <u>특정 경로에서 렌더링되는 UI</u>입니다.
- page를 생성하려면 <u>app 디렉터리에 page파일을 추가</u>하고, React 컴포넌트를 <u>default export</u>합니다. 예를 들어, 인덱스 page(/)를 생성하려면 다음과 같이합니다.

**4. Nesting layouts(중첩 레이아웃)**
- 기본적으로 폴더 계층 구조의 레이아웃도 중첩되어 있습니다.

**5. Creating a dynamic segment(동적 세그먼트 만들기)**
- 동적 세그먼트를 사용하면 데이터에서 생성된 경로를 만들 수 있습니다.
- 예를 들어, 각 blog 게시물에 대한 경로를 직접 만드는 대신, 동적 세그먼트를 만들어 블로그 게시물 데이터를 기반으로 경로를 생성할 수 있습니다.
- 동적 세그먼트를 생성하려면 세그먼트(폴더) 이름을 대괄호로 묶습니다. (예: [segmentName])

**6. Rendering with search params(검색 매개변수를 사용한 렌더링)**
- 서버 컴포넌트 page에서는 searchParams prop을 사용하여 검색 매개변수에 엑세스할 수 있습니다.
- searchParams를 사용하면 해당 페이지는 동적 렌더링(dynamic rendering)으로 처리됩니다.
- 왜냐하면 URL의 쿼리 파라미터(search parameter)를 읽기 위해 요청(request)이 필요하기 때문입니다.
- 클라이언트 컴포넌트는 useSearchParams Hook을 사용하여 검색 매개변수를 읽을 수 있습니다.
- 정적 렌더링과 동적 렌더링에서 useSearchParams를 사용하는 방법에 대해 자세히 알아 보세요.

**searchParams란?**
- URL의 쿼리 문자열(Query String)을 읽는 방법입니다.
- 예시 URL: /products?category=shoes&page=2

**문서의 코드를 복사하면 오류가 나옵니다.**
- @/lib/posts와 @/ui/post를 작성하지 않았기 때문에 오류가 발생합니다.
- 다음과 같이 수정해 주세요.
    ```javascript
    export default function Page() {
        return (
            <ul>
                <li>Post 1</li>
                <li>Post 2</li>
                <li>Post 3</li>
            </ul>
        )
    }
    ```
- 문서에서 별도의 library를 사용한 것은 <u>blog 폴더 하나에는 하나의 URL 세그먼트만 존재</u>하지만, <u>많은 양의 post를 각기 다른 주소로 호출하기 위한 동적 라우팅인 [slug]를 설명</u>하기 위해서 입니다.
- 우선 blog의 page에서는 list를 바로 뿌려주고, [slug]는 dummy data를 이용해서 테스트 하겠습니다.

**[slug]의 이해**
- 코드 작성이 완료되면 /blog/[slug]로 접속해 봅니다.
- 여기서 [slug]는 nextjs, routing, ssr-ssg, dynamic-routes에 해당합니다.

- 동작은 정상적으로 되지만 한가지 오류가 발생합니다.
- 이 오류는 Next.js App Router에서 <u>params가 비동기(async) 객체처럼 다뤄지는 경우 발생</u>합니다.
- Next.js 14.2 이후로 params와 searchParams는 내부적으로 <u>Promise 기반 객체일 수</u> 있어서, 바로 쓰면 안되고 <u>await하거나 props의 구조 분해에서 미리 await해야</u> 합니다.
- 현재 실습 중인 버전은 15.x 이기 때문에 오류가 발생하는 것입니다.

<hr/>

## 25년 9월 10일 강의
> 내용 정리

**용어 정의**
<br/>

- 이 장부터 이후에 사용될 몇가지 용어에 대한 설명입니다.

- 원문에는 route라는 단어가 자주 등장하고, 사전적 의미로는 "경로"입니다.
- route(라우트)는 "경로"를 의미하고, routing(라우팅)은 "경로를 찾아가는 과정"을 의미합니다.
- 그런데 path도 "경로"로 번역하기 때문에 구별을 위해 대부분 routing(라우팅)으로 번역했습니다.
- directory와 folder는 특별한 구분없이 나옵니다.

- 최상위 폴더의 경우 directory로 하위 폴더는 folder로 쓰는 경우가 많지만 꼭 그렇지는 않습니다.
- directory와 folder는 OS에 따라 구분되는 용어이기때문에 같은 의미로 이해하면 됩니다.
- segment는 routing과 관련이 있는 directory의 별칭 정도로 이해하면 됩니다.

**1. Folder and file conventions(폴더 및 파일 규칙)**
<br/>

[최상위 폴더] Top-level folders
- 최상위 폴더는 애플리케이션의 <u>코드와 정적 자산을 구성</u>하는데 사용됩니다.
    - App: 앱 라우터
    - pages: 페이지 라우터
    - public: 제공될 정적 리소스
    - 선택적 애플리케이션 소스 폴더

- 최상위 파일은 <u>애플리케이션 구성, 종속성 관리, 미들웨어 실행, 모니터링 도구 통합, 환경 변수 정의</u>에 사용됩니다. ⚠️ 다음 파일이 프로젝트 생성과 동시에 모두 생성되는 것은 아닙니다.

[라우팅 파일] Routing Files
[중첩 라우팅] Nested routes
[동적 라우팅] Dynamic routes
[라우팅 그룹 및 비공개 폴더] Route Groups and private folders
[병렬 및 차단 라우팅] Parallel and Intercepted Routes

**Open Graph Protocol**
<br/>

- 웹사이트나 페이스북, 인스타그램, X(트위터), 카카오톡 등에 링크를 전달할 때 '미리보기'를 생성하는 프로토콜입니다.
- Open Graph Protocol이 대표적인 프로토콜입니다.
- 페이스북이 주도하는 표준화 규칙으로 대부분의 SNS 플랫폼에서 활용되고 있습니다.
- 모든 플랫폼이 동일한 방식으로 오픈 그래프를 처리하는 것은 아닙니다.
- 웹페이지의 메타 태그에 선언합니다.

**2. Organizing your project(프로젝트 구성하기)**
- Next.js는 프로젝트 <u>파일을 어떻게 구성하고 어디에 배치할지에 대한 제약이 없습니다.</u>
- 하지만 프로젝트 구성에 <u>도움이 되는 몇가지 기능을 제공</u>합니다.
<br/>

[component의 계층 구조] Component hierarchy
- 특수 파일에 정의된 component는 <u>특정 계층 구조로 렌더링</u>됩니다.
    - layout.js
    - template.js
    - error.js(React 오류 경계)
    - loading.js(리액트 서스펜스 경계)
    - not-found.js(React 오류 경계)
    - page.js 또는 중첩 layout.js

- component는 중첩된 라우팅에서 재귀적으로 렌더링됩니다.
- 즉, 라우팅 세그먼트의 component는 <u>부모 세그먼트의 component 내부에 중첩</u>됩니다.

[코로케이션] Colocation: <u>파일 및 폴더를 기능별로 그룹화</u>하여 프로젝트의 구조를 명확하게 정의.
- app 디렉토리에서 <u>중첩된 폴더는 라우팅 구조를 정의</u>합니다.
- <u>각 폴더는 URL 경로</u>의 해당 세그먼트에 맵핑되는 라우팅 세그먼트를 나타냅니다.
- 그러나 라우팅 구조가 폴더를 통해 정의되더라도 라우팅 세그먼트에 <u>page.js 또는 route.js 파일이 추가 될때까지</u> 라우팅 폴더에는 공개적으로 액세스할 수 없습니다.
- 즉, 프로젝트 파일을 app 디렉토리의 라우팅 세그먼트 내에 안전하게 배치하여 <u>실수로 라우팅 되지 않도록 할 수</u> 있습니다.
- 알아두면 좋아요: 프로젝트 파일을 app 폴더에 함께 저장할 수는 있지만 꼭 그럴 필요는 없습니다. <u>원한다면 app 디렉토리 외부에 보관할 수도 있습니다.</u>

[비공개 폴더] private folders
- 비공개 폴더는 <u>폴더 앞에 밑줄을 붙여서</u> 만들 수 있습니다. _folderName
- 이것은 해당 폴더가 비공개로 구현되는 세부 사항이기때문에 라우팅 시스템에서 고려되어서는 안되며, 따라서 <u>해당 폴더와 모든 하위 폴더가 라우팅에서 제외됨</u>을 나타냅니다.

- app 디렉토리의 파일은 <u>기본적으로 안전하게 코로케이션</u> 될 수 있으므로, <u>코로케이션에 비공개 폴더는 불필요</u>합니다. 하지만 <u>다음과 같은 경우에는 유용</u>할 수 있습니다.
    - <u>UI 로직과 라우팅 로직을 분리</u>합니다.
    - 프로젝트와 Next.js 생태계 전반에서 <u>내부 파일을 일관되게 구성</u>합니다.
    - 코드 편집기에서 <u>파일을 정렬하고 그룹화</u>합니다.
    - 향후 Next.js 파일 규칙과 관련된 잠재적인 <u>이름 충돌을 방지</u>합니다.
    - ⚠️ 알아두면 좋은 정보:
        - 프레임워크 규칙은 아니지만, 동일한 <u>밑줄 패턴을 사용하여 비공개 폴더 외부의 파일을 "비공개"로 표시</u>하는 것도 고려할 수 있습니다.
        - 폴더 이름 앞에 <u>%5F(밑줄로 URL 인코딩된 형태)를 접두사로 붙여</u> 밑줄로 시작하는 URL 세그먼트를 만들 수 있습니다. %5FfolderName # 아스키 코드의 URL-encoding
        - 비공개 폴더를 사용하지 않는 경우, <u>예상치 못한 이름 충돌을 방지</u>하기 위해 Next.js의 <u>특수 파일 규칙</u>을 아는 것이 좋습니다.

[라우팅 그룹] Route groups
- 폴더를 <u>괄호로 묶어 라우팅 그룹</u>을 만들 수 있습니다.(folderName)
- 이것은 해당 폴더가 <u>구성 목적으로 사용되는 것을 의미</u>하며, <u>라우터의 URL 경로에 포함되지 않아야</u> 합니다.
- 라우팅 그룹은 다음과 같은 경우에 유용합니다.
    - ⚠️ <u>사이트 섹션, 목적 또는 팀별로 라우트를 구성</u>합니다.
        - 예: 마케팅 페이지, 관리 페이지 등.
    - ⚠️ 동일한 라우팅 세그먼트 수준에서 중첩 레이아웃 활성화:
        - <u>공통 세그먼트 안에 여러 개의 루트 레이아웃을 포함하여 여러 개의 중첩 레이아웃 만들기</u>
        - <u>공통 세그먼트의 라우팅 하위 그룹에 레이아웃 추가</u>

[src 디렉토리]
- Next.js는 애플리케이션 코드(app 포함)를 <u>옵션으로 선택하는 src 폴더 내에 저장</u>할 수 있도록 지원합니다.
- 이를 통해 <u>애플리케이션 코드</u>와 주로 프로젝트 루트에 위치하는 <u>프로젝트 설정 파일을 분리</u>할 수 있습니다.

**3. 예제(Examples)**
- 이번 섹션에서는 <u>일반적인 프로젝트의 전력에 대한 간략한 개요</u>를 설명합니다.
- 핵심 요점은 <u>자신과 팀에 적합한 전략을 선택</u>하고, <u>프로젝트 전반에 걸쳐 일관성을 유지</u>하는 것입니다.
- 알아두면 좋습니다.
    - 아래 예제에서는 <u>components와 lib 폴더를 일반화도니 플레이스 홀더로 사용</u>하고 있습니다.
    - 이름 지정은 프레임워크에서 <u>특별한 의미가 있는 것은 아니며</u>, 프로젝트에서 UI, utils, hooks, styles 등과 같은 다른 폴더명을 사용할 수 있습니다.

**layout의 기본 구성**
- app/layout.tsx -> 프로젝트 전체를 감싸는 루트 레이아웃
- children -> 라우트 전환 시 해당 페이지나 하위 레이아웃이 들어오는 자리
- metadata -> SEO 정보(title, description 등)를 Next.js가 자동으로 <head>에 삽입
- app/(group)/layout.tsx -> 특정 그룹/폴더 전용 레이아웃

<hr/>

## 25년 9월 3일 강의
> 내용 정리

**IDE 플러그인**
<br/>

Next.js에는 사용자 정의 TypeScript 플러그인과 유형 검사기가 포함되어 있으며, VSCode와 다른 코드 편집기에서 고급 유형 검사 및 자동 완성에 사용할 수 있습니다. <br/><br/>
VS Code에서 플러그인을 활성화하는 방법은 다음과 같습니다.

1. 명령 팔레트 열기(Ctrl + Shift + P)
2. "TypeScript: TypeScript 버전 선택" 검색
3. "작업 공간 버전 사용" 선택

**자동 생성되는 항목**
<br/>

- 강의에서는 프로젝트를 자동으로 생성해서 사용합니다.
- 다음은 프로젝트를 자동 생성할 때 자동으로 생성되는 항목입니다.
    - package.json 파일에 scripts 자동 추가 / public 디렉토리
    - TypeScript 사용(선택): tsconfig.json 파일 생성
    - Eslint 설정(선택): eslintrc.json 대신 eslint.config.mjs 파일 생성
    - Tailwind CSS 사용(선택)
    - src 디렉토리 사용(선택)
    - App Router(선택), app / layout.tsx 파일 및 app / page.tsx
    - Turbopack 사용(선택)
    - import alias 사용(선택): tsconfig.json에 "paths" 자동 생성
    - ⚠️ 수동으로 프로젝트를 생성할 때 추가적으로 해야 하는 작업을 자동으로 처리해줍니다.

**Core Web Vitals**
<br/>

- LCP(Largest Contentful Paint): 뷰포트 내에서 <u>가장 큰 페이지 요소</u>(큰 텍스트 블록, 이미지 또는 비디오)를 표시하는데 걸리는 시간.
    - 뷰포트: 웹페이지 사용자가 별도의 <u>스크롤 동작 없이 볼 수 있는 영역</u>
- FID(First Input Delay): 사용자가 웹페이지와의 상호작용을 시도하는 첫번째 순간부터 웹페이지가 응답하는 시간.
- CLS(Cumulative Layout Shift): 방문자에게 <u>컨텐츠가 얼마나 불안정한 지 측정한 값</u>입니다.
페이지에서 갑자기 발생하는 레이아웃의 변경이 얼마나 일어나는 지를 측정합니다.
즉, 레이아웃 이동(layout shift) 빈도를 측정합니다.

**실습에 사용할 프로젝트 생성**
<br/>

- 공식 문서에는 기본 패키지 관리자를 pnpm을 사용합니다.
- 원하는 패키지 관리자 탭을 클릭하면 명령을 확일할 수 있습니다.
- pnpm과 관련한 내용은 뒤에서 설명합니다.
- 다음 명령으로 프로젝트를 생성합니다.
    - ```npx create-next-app@latest```
- 명령을 실행하면 다음과 같은 8개의 선택 항목이 나옵니다.

**.eslintrc.json vs eslint.config.mjs**
<br/>

- JSON은 주석, 변수, 조건문 등을 쓸 수 없기 때문에 복잡한 설정이 어렵습니다. (JavaScript Object Notation)
- <u>mjs는 ESLint가 새롭게 도입</u>한 방식으로, ESM(ECMAScript 모듈) 형식입니다.
- 확장자 .mjs는 "module JavaScript"를 의미합니다.
- <u>ESLint v9 이상에서 공식 권장</u> 방식입니다.
- 조건문, 변수, 동적 로딩 등 코드처럼 유연한 설정이 가능합니다.
- 다른 설정 파일을 <u>import 해서 재사용</u>을 할 수 있습니다.
- 프로젝트 규모가 커질수록 유지보수에 유리합니다.

**Next.js와 eslint.config.mjs**
<br/>

- Next.js 14 이후로는 ESLint 9와의 호환성을 고려해 <u>최신 권장 방식</u>인 <u>eslint.config.mjs를 사용</u>하는 쪽으로 전환되고 있습니다.
- ⚠️ .eslintrc.json도 여전히 지원되므로, 필요한 경우 수동으로 만들거나 마이그레이션해서 사용할 수 있습니다.
- 마이그레이션 도구는 아직 공식적으로 제공되지는 않지만, 직접 옮기려면 다음처럼 하면 됩니다.

```json
// .eslintrc.json
{
    "extends": "next",
    "rules": {
        "no-console": "warn"
    }
}
```
```javascript
// eslint.config.mjs
import next from 'eslint-config-next';

export default [
    next(),
    {
        rules: {
            'no-console': 'warn',
        },
    },
];
```

**pnpm**
<br/>

- pnpm은 Perfomant(효율적인) npm의 약자로 <u>고성능 Node 패키지 매니저</u>입니다.
- npm, yarn과 같은 목적의 패키지 관리자이지만, <u>디스크 공간 낭비, 복잡한 의존성 관리, 느린 설치 속도 문제 개선</u>을 위해 개발되었습니다.
- 대표적인 특징은 다음과 같습니다.
1. 하드 링크(Hard Link) 기반의 효율적인 저장 공간 사용: 패키지를 한번만 설치하여 글로벌 저장소에 저장하고, 각 프로젝트의 node_modules 디렉토리에는 설치된 패키지에 대한 하드 링크(또는 심볼릭 링크)가 생성됩니다.
2. 빠른 패키지 설치 속도(Perfomant): <u>이미 설치된 패키지</u>는 다시 다운로드하지 않고 <u>재사용</u>하므로, <u>초기 설치</u>뿐만 아니라 <u>종속성 설치 및 업데이트</u> 할 때도 더 빠른 속도를 경험할 수 있습니다.
3. 엄격하고 효율적인 종속성 관리
4. 다른 패키지 매니저의 비효율성 개선

**Hard link vs Symbolic link(Soft link)**
- ⚠️ pnpm의 특징 중에 하드 링크를 사용해서 <u>디스크 공간을 효율적으로 사용</u>할 수 있다고 합니다. 탐색기에서 npm과 pnpm 프로젝트의 <u>node_module의 용량을 확인</u>해보세요.
- ⚠️ 왜 효율적이라 한 것일까요?

하드 링크(Hard link)
- 우리가 "파일"이라고 부르는 것은 <u>두 부분으로 나뉘어</u> 있습니다.
    1. Directory Entry: <u>파일 이름과 해당 inode 번호를 매핑 정보</u>가 있는 특수한 파일.
    2. inode: 파일 또는 디렉토리에 대한 <u>모든 메타데이터를 저장</u>하는 구조체.(권한, 소유자, 크기, <u>데이터 블럭 위치</u> 등 )

심볼릭 링크(Soft link)
- inode를 공유하지 않고 <u>경로 문자열을 저장해 두는 특수 파일</u>입니다.
- 따라서 심볼릭 링크를 열면 내부에 적힌 <u>"경로"를 따라가서 원본 파일을 찾습니다.</u>
- <u>원본이 삭제되면 심볼릭 링크</u>는 끊어진 경로가 되므로 <u>더 이상 사용할 수 없습니다.</u>
- <u>윈도우의 바로 가기</u> 파일과 비슷하게 생각할 수 있습니다.

<hr/>