import { SCHOOLS } from '../../data/mock';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const search = (query.search as string)?.toLowerCase() || '';

  if (!search) {
    return SCHOOLS;
  }

  // Filter schools based on search query
  return SCHOOLS.filter(
    (school) =>
      school.name.toLowerCase().includes(search) ||
      school.city.toLowerCase().includes(search) ||
      school.type.toLowerCase().includes(search)
  );
});
