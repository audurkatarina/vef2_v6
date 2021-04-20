import Link from 'next/link';
import { IFilm } from '../../types';

import s from './Film.module.scss';

type Props = {
  film?: IFilm;
};

export function Film({ film }: Props): JSX.Element {
  return (
    <section className={s.film}>
      <h2 className={s.film__title}>
        Episode {film?.episodeID}: {film?.title}
      </h2>
      <div className={s.film__list}>
        <pre className={s.film__listItem}>
          <p className={s.film__openingCrawl}>{film?.openingCrawl}</p>
        </pre>
        <div className={s.film__listItem}>
          <h3>
            Characters
          </h3>
          <div className={s.film__char__list}>
            {
              film?.characterConnection?.characters.map((c, key) => {
                return (
                  <div key={key} className={s.film__char__listItem}> 
                    <Link href={`/characters/${c?.id}`}>{c?.name}</Link>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
      <hr className={s.film__line}/>
    </section>
  );
}
