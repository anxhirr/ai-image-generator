import Header from '@/components/Header'
import ClientProvider from '@/components/ClientProvider'
import PromptInput from '@/components/PromptInput'

import '../styles/globals.css'

export const metadata = {
  title: 'Ai Generated Images Gallery',
  description: 'Generated by anxhirr',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <ClientProvider>
          <Header />

          <PromptInput />

          {children}
        </ClientProvider>
      </body>
    </html>
  )
}
