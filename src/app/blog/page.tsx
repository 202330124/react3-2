import Image from 'next/image'

export default function Page() {
    return (
        <>
            <Image
                className="dark:invert"
                src="/nextjs.png"
                alt="Picture of the author"
                width={30}
                height={30}
            />
        </>
    )
}