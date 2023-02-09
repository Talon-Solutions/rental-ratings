import './globals.css'
import Navbar from '@/components/nav/Navbar'
import ContextProvider from '@/context/user'
import Footer from '@/components/footer/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head />
      <body>
        <ContextProvider>
          <Navbar />
          {children}
          <Footer />
        </ContextProvider>
      </body>
    </html>
  )
}
