import { Strategies } from './types';
import { compareScorecards } from './compareScorecards';
import { findNextFalsey } from './findNextFalsey';

const ranks = (data: any[], sortItems: any[], strategem: Strategies) => {
  const tiedRanks = [];
  let assignableRanks: number[] = [];
  for (let index = 0; index < data.length - 1; index++) {
    const isTied = compareScorecards(
      data[index],
      data[index + 1],
      sortItems.map((sortItem) => sortItem.field)
    );
    tiedRanks.push(isTied);
  } //End of for scorecard of data loop
  tiedRanks.push(false); // don't forget about our last person, we care even though no one else does.

  //     generate rankings as array
  //     append data with rankings
  let counter = 0;
  let rank;

  switch (strategem) {
    // Modified - 1334
    case 'modified':
      assignableRanks = tiedRanks.map((bool, index, list) => {
        if (bool) {
          rank = findNextFalsey(index + 1, list);

          return rank;
        } else return index + 1;
      });
      break;

    //Dense - 1223
    case 'dense':
      for (let i = 0; i < tiedRanks.length; i++) {
        rank = i + 1;
        assignableRanks.push(rank + counter);
        if (tiedRanks[i]) counter--;
      }

      break;

    case 'ordinal':
      for (let index = 0; index < tiedRanks.length; index++) {
        assignableRanks.push(index + 1);
      }
      break;

    // Fractional - 1 | 2.5 | 2.5 | 4
    case 'fractional':
      for (let index = 0; index < tiedRanks.length; index++) {
        let rank = index + 1;
        if (tiedRanks[index]) {
          const nextUntiedRank = findNextFalsey(index + 1, tiedRanks);

          const avg = (nextUntiedRank - (index + 1)) / 2 + 1;
          rank = index + avg;
        } else if (tiedRanks[index - 1]) {
          rank = assignableRanks[index - 1];
        }

        assignableRanks.push(rank);
      }
      break;

    // Standard || undefined - 1224
    default:
      assignableRanks = [1];
      for (let index = 1; index < tiedRanks.length; index++) {
        rank = index + 1;
        if (tiedRanks[index - 1]) {
          rank = assignableRanks[index - 1];
        }
        assignableRanks.push(rank);
      }
      break;
  }

  return assignableRanks;
};

export default ranks;
