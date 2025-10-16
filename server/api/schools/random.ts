import { SCHOOLS, getRandomItem } from '../../data/mock';

export default defineEventHandler(() => {
  return getRandomItem(SCHOOLS);
});
