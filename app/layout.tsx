import { JSX } from 'react';
import '../styles/global.scss';
import { ConsentManagerComponent } from '../components/consent-manager/consent-manager.component';

export interface INextJsRootData {
    children: React.ReactNode;
}

export default function RootLayout(data: INextJsRootData): JSX.Element {
    return (
        <html lang="en">
            <body>
                <main>{data.children}</main>
                <ConsentManagerComponent />
            </body>
        </html>
    );
}

export const metadata = {
    icons: {
        icon: '/img/favicon.svg'
    }
};
