import Image from "next/image";

export default async function Blog() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <h1>This is Blog Page</h1>
  );
}