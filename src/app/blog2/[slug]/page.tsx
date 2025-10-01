// app/blog/[slug]/page.tsx
// blog2의 동적 라우트로 각 포스트의 slug에 대응하는 페이지를 렌더링합니다.
// 이 라우트는 `generateParams`를 사용하지 않으므로 빌드 타임이 아닌 런타임에
// `params`가 전달됩니다. App Router에서는 `params`가 Promise로 전달될 수 있으니
// 안전하게 사용하려면 `await params`로 값을 해제해야 합니다.

import { posts } from "../posts";

export default async function PostPage({
    params,
}: {
    // 런타임에서 전달되는 params는 Promise 형태일 수 있습니다.
    params: Promise<{ slug: string }>;
}) {
    // params를 await하여 실제 { slug } 값을 얻습니다.
    // (generateStaticParams가 없는 경우 런타임에서 슬러그를 해석하기 때문)
    const { slug } = await params; // generateStaticParams가 없으므로 런타임에서 처리
    const post = posts.find((p) => p.slug === slug);

    // 포스트를 찾지 못하면 간단한 404 메시지를 반환합니다.
    // 실제 프로젝트에서는 Next.js의 notFound()를 호출하거나
    // 커스텀 404 컴포넌트를 렌더링하는 편이 좋습니다.
    if(!post) {
        return <h1>포스트를 찾을 수 없습니다.</h1>;
    }

    return (
        <article>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </article>
    );
}