import './globals.css'
import Navbar from '@/components/nav/Navbar'
import ContextProvider from '@/context/user'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ContextProvider>
          <Navbar />
          { children }
        </ContextProvider>
      </body>
    </html>
  )
}
