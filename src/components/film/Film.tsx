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
      <p>{film?.openingCrawl}</p>
      <h3>
        Characters
      </h3>
      <div>
        {
          film?.characterConnection?.characters.map((c, key) => (
            <Link href={`/characters/${c?.id}`} key={key}>{c?.name}</Link>
          ))
        }
      </div>
    </section>
  );
}
