
import LayoutContainer from '@/components/layout-container';
import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_Gothic } from 'next/font/google';

const notoSansGothic = Noto_Sans_Gothic({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Cavendish Online Checkout',
  description: 'Cavendish online checkout page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSansGothic.className}>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </body>
    </html>
  );
}
