import { BAC_TYPES, getRandomItem } from '../../data/mock';

export default defineEventHandler(() => {
  return getRandomItem(BAC_TYPES);
});
