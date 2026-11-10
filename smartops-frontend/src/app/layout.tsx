import { AuthProvider } from '../components/auth/AuthProvider';
import TopProgressBar from '../components/ui/TopProgressBar';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <TopProgressBar></TopProgressBar>
                <AuthProvider> {children}</AuthProvider>
            </body>
        </html>
    );
}