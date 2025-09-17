# 202330124 이태규

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