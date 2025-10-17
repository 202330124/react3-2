# 202330124 이태규

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