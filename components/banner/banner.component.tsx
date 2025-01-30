import { JSX } from 'react';
import { DancingGoatBanner } from '../../lib/graphql/models/types';
import { toAbsoluteUrl } from '../../lib/helpers/url.helper';
import styles from './banner.module.scss';

interface BannerProps {
    item: DancingGoatBanner;
}

export function BannerComponent({ item }: BannerProps): JSX.Element {
    const backgroundImage = item.bannerBackgroundImage.items[0]?.imageFile?.path
        ? `url(${toAbsoluteUrl(item.bannerBackgroundImage.items[0].imageFile.path, 'graphql')})`
        : undefined;

    const style = backgroundImage ? { backgroundImage } : {};

    return (
        <div className={styles.root} style={style}>
            <h1 className={styles.heading}>{item.bannerHeaderText}</h1>
            <p className={styles.text}>{item.bannerText}</p>
        </div>
    );
}
