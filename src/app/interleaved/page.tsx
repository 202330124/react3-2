// interleaved/page.tsx (Server Component)

import ClientLayout from "../components/ClientLayout";
import ServerContent from "../components/ServerComponent";

export default function Page() {
    return (
        <ClientLayout>
            <ServerContent />
        </ClientLayout>
    );
}