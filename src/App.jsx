import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [reversStatus, setReversStatus] = useState(false);
  const goodsCopy = [...visibleGoods];

  const compareGoods = (good1, good2, query) => {
    let firstValue = good1;
    let secondValue = good2;

    if (reversStatus) {
      firstValue = good2;
      secondValue = good1;
    }

    if (query === SORT_BY_ALPHABET)
      return firstValue.localeCompare(secondValue);

    return firstValue.length - secondValue.length;
  };

  const sortByAlphabet = () => {
    setVisibleGoods(
      goodsCopy.sort((good1, good2) => {
        return compareGoods(good1, good2, SORT_BY_ALPHABET);
      }),
    );
    setSortField(SORT_BY_ALPHABET);
  };

  const sortByLength = () => {
    setVisibleGoods(
      goodsCopy.sort((good1, good2) => {
        return compareGoods(good1, good2, SORT_BY_LENGTH);
      }),
    );
    setSortField(SORT_BY_LENGTH);
  };

  const reverseGoods = () => {
    setVisibleGoods(goodsCopy.reverse());
    setReversStatus(isReverse => !isReverse);
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setReversStatus(false);
    setSortField('');
  };

  const getButtonClass = field => (sortField !== field ? 'is-light' : '');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByAlphabet}
          className={`button is-info ${getButtonClass(SORT_BY_ALPHABET)}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={`button is-success ${getButtonClass(SORT_BY_LENGTH)}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGoods}
          className={`button is-warning ${!reversStatus ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {(reversStatus || sortField) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
