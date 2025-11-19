import Blog2Com from "./Blog2Com";
import Blog2Com2 from "./components/Blog2Com2";
import Blog2RootCom from "../../components/Blog2RootCom";

export default function Blog2Page() {
    return (
        <>
            <main className="p-4">
                <h1 className="text-3xl font-semibold mb-4">Blog2 Page</h1>
                <p className="text-lg">
                    This is the Blog2 page styled with Tailwind CSS.
                </p>
                <button type="button" className="btn btn-primary">Primary</button>
                <button type="button" className="btn btn-secondary">Secondary</button>
                <button type="button" className="btn btn-success">Success</button>
                <button type="button" className="btn btn-danger">Danger</button>
                <button type="button" className="btn btn-warning">Warning</button>
                <button type="button" className="btn btn-info">Info</button>
                <button type="button" className="btn btn-light">Light</button>
                <button type="button" className="btn btn-dark">Dark</button>

                <button type="button" className="btn btn-link">Link</button>
                <br/><br/>
                <Blog2Com />
                <Blog2Com2 />
                <Blog2RootCom />
            </main>
        </>
    );
}