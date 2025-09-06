
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/hooks/use-auth';
import { ThemeProvider } from '@/hooks/use-theme';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { LoginForm } from '@/components/auth/login-form';
import { ChatProvider } from '@/hooks/use-chat';
import { UserChatWidget } from '@/components/user/user-chat-widget';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Bicrypto - Trade Crypto like a pro',
  description: 'A realistic crypto trading simulation platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            <ChatProvider>
              {children}
              <Toaster />
              <LoginForm />
              <UserChatWidget />
            </ChatProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
