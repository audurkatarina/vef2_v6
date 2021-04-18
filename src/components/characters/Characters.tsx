import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import s from './Characters.module.scss';
import { Button } from '../button/Button';
import { IAllPeople, ICharacter, ICharactersAnswerGQL } from '../../types';

type Props = {
  peopleResponse?: IAllPeople | null;
};

/**
 * Hjálpar týpa ef við erum að filtera burt hugsanleg null gildi:
 *
 * const items: T = itemsWithPossiblyNull
 *  .map((item) => {
 *    if (!item) {
 *      return null;
 *    }
 *    return item;
 *  })
 *  .filter((Boolean as unknown) as ExcludesFalse);
 * items verður Array<T> en ekki Array<T | null>
 */
type ExcludesFalse = <T>(x: T | null | undefined | false) => x is T;

export function Characters({ peopleResponse }: Props): JSX.Element {
  // TODO meðhöndla loading state, ekki þarf sérstaklega að villu state
  const [loading, setLoading] = useState<boolean>(false);

  // TODO setja grunngögn sem koma frá server
  const [characters, setCharacters] = useState<Array<ICharacter>>( peopleResponse?.people ?? []);

  const [nextPage, setNextPage] = useState<string | null>(peopleResponse?.pageInfo?.endCursor ?? null);

  const fetchMore = async (): Promise<void> => {
    // TODO sækja gögn frá /pages/api/characters.ts (gegnum /api/characters), ef það eru fleiri
    // (sjá pageInfo.hasNextPage) með cursor úr pageInfo.endCursor
    setLoading(true);
    let json;
    const url = `/api/characters?after=${nextPage}`;
    try {
      const result = await fetch(url);
      json = await result.json();
      const answer: ICharactersAnswerGQL = json;
      setCharacters([...characters, ...answer?.allPeople?.people ?? []]);
      if(answer?.allPeople?.pageInfo?.hasNextPage) {
        setNextPage(answer?.allPeople?.pageInfo?.endCursor ?? null);
      } else {
        setNextPage(null);
      }
    } catch (e) {
      console.error('Gat ekki sótt gögn', e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={s.characters}>
      <ul className={s.characters__list}>
        {characters.map((char, i) => (
          <li key={i}>
            <Link href={`/characters/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>

      <Button disabled={loading} onClick={fetchMore}>Fetch more</Button>
    </section>
  );
}
