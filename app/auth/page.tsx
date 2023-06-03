import Nav from "./Nav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        {/* @ts-expect-error Server Component */}
        <Nav />
    </main>
  )
}
