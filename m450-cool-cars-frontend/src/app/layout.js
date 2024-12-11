import './globals.css';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Cool Cars App",
    description: "Manage your cool car collection easily",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-gray-100 dark:bg-gray-900`}>
        <header className="bg-blue-500 text-white py-4 text-center">
            <h1 className="text-2xl font-bold">Cool Cars App 🚗</h1>
        </header>
        <main>{children}</main></body>
        </html>
    );
}
