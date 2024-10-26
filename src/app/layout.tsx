import { desc } from 'drizzle-orm';
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export const metadata = {
  title: 'CGM App',
  description: 'Aplikasi Web Perum Cipta Graha Mandiri',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className={poppins.className}>
      <body>
        {children}
      </body>
    </html>
  )
}