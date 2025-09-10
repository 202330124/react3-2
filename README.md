# 202330124 이태규

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