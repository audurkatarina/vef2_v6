import Link from 'next/link';
import { ICharacter } from '../../types';
import s from './Person.module.scss';

type Props = {
  person?: ICharacter;
};

export function Person({ person }: Props): JSX.Element {
  return (
    <div className={s.person}>
      <h1>{person?.name}</h1>
      <div>
        <p>Birth year:</p>
        <p>{person?.birthYear}</p>
        <p>Eye color:</p>
        <p>{person?.eyeColor}</p>
        <p>Hair color:</p>
        <p>{person?.hairColor}</p>
        <p>Height:</p>
        <p>{person?.height} cm</p>
        <p>Mass:</p>
        <p>{person?.mass} kg</p>
      </div>
      <Link href="/characters">Back to characters</Link>
    </div>
  );
}
