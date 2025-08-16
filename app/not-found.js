import Link from 'next/link'

export default function NotFound() {
  return <div className="flex flex-col items-center justify-center h-screen">
      <h1>Not found - 404</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <div className="mt-4">
        <Link href="/">Click here to go back to the main page</Link>
      </div>
  </div>
}