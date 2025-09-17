import { posts } from "../posts";

export default async function Posts({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if(!post) {
        return <h3>게시글을 찾을 수 없습니다.</h3>
    }
}