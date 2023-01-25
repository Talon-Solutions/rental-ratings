import './globals.css'
import Navbar from '@/components/nav/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
