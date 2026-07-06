import { StatusPill, Button, HeroArt } from '@portfolio/ui';
import { hero } from '../../content/portfolio';
import styles from './sections.module.css';

export function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.wrap}>
        <div className={styles.heroGrid}>
          <div>
            <StatusPill className={styles.heroStatus}>{hero.status}</StatusPill>
            <h1 className={styles.heroH}>{hero.heading}</h1>
            <p className={styles.heroSub}>{hero.sub}</p>
            <div className={styles.heroMeta}>{hero.meta}</div>
            <div className={styles.btnRow}>
              <Button variant="primary" href="#builds">
                See the builds ↓
              </Button>
              <Button href="#">Download résumé</Button>
              <Button href="#contact">Get in touch</Button>
            </div>
          </div>
          <div className={styles.heroArtCol}>
            <HeroArt />
          </div>
        </div>
      </div>
    </section>
  );
}
