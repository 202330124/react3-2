import { posts } from "./posts";

export default async function Page() {
    return (
        <ol>
            { posts.map((post) => (
                <li key = { post.slug }>
                    { post.title } / { post.content }
                </li>
            ))}
        </ol>
    );
}