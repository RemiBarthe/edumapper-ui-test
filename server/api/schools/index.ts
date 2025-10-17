import { SCHOOLS } from '../../data/mock';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const search = (query.search as string)?.toLowerCase() || '';

  if (!search) {
    return SCHOOLS;
  }

  return SCHOOLS.filter(
    (school) =>
      school.name.toLowerCase().includes(search) ||
      school.city.toLowerCase().includes(search) ||
      school.type.toLowerCase().includes(search)
  );
});
