import { JSX } from 'react';
import '../styles/global.scss';

export interface INextJsRootData {
    children: React.ReactNode;
}

export default function RootLayout(data: INextJsRootData): JSX.Element {
    return (
        <html lang="en">
            <body>
                <main>{data.children}</main>
            </body>
        </html>
    );
}

export const metadata = {
    icons: {
        icon: '/img/favicon.svg'
    }
};
