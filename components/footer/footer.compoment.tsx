import Link from 'next/link';
import styles from './footer.module.scss';

export function FooterComponent() {
    return (
        <footer className={styles.root}>
            <Link className={styles.link} href="/privacy-policy">
                Privacy Policy
            </Link>
        </footer>
    );
}
