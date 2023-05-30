import Nav from './auth/Nav'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        {/* @ts-expect-error Server Component */}
        <Nav />
      </div>
    </main>
  )
}
