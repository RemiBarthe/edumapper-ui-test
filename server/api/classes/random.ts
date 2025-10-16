import { CLASSES, getRandomItem } from '../../data/mock';

export default defineEventHandler(() => {
  return getRandomItem(CLASSES);
});
