import './globals.css';

import { Open_Sans } from 'next/font/google';

import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';

const openSans = Open_Sans({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <Header />
         <Container>
            {children}
        </Container>
      <Footer/>  
        
      
      </body>
    </html>
  );
}
