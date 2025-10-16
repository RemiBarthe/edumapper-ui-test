export default defineEventHandler((event) => {
  const query = getQuery(event);
  const search = (query.search as string)?.toLowerCase() || '';

  // Mock data - replace with your actual database query
  const schools = [
    { id: 1, name: 'Lycée Gaston Berger', city: 'Lille', type: 'Lycée public' },
    { id: 2, name: 'Lycée Faidherbe', city: 'Lille', type: 'Lycée public' },
    { id: 3, name: 'Lycée Pasteur', city: 'Lille', type: 'Lycée public' },
    { id: 4, name: 'Lycée International Montebello', city: 'Lille', type: 'Lycée public' },
    { id: 5, name: 'Lycée Baggio', city: 'Lille', type: 'Lycée public' },
    { id: 6, name: 'Lycée Fénelon', city: 'Lille', type: 'Lycée privé' },
    { id: 7, name: 'Lycée Notre-Dame de la Paix', city: 'Lille', type: 'Lycée privé' },
    { id: 8, name: 'Lycée Henri Wallon', city: 'Valenciennes', type: 'Lycée public' },
    { id: 9, name: 'Lycée Voltaire', city: 'Paris', type: 'Lycée public' },
    { id: 10, name: 'Lycée Louis le Grand', city: 'Paris', type: 'Lycée public' }
  ];

  // Filter schools based on search query
  const filteredSchools = search
    ? schools.filter(
        (school) =>
          school.name.toLowerCase().includes(search) ||
          school.city.toLowerCase().includes(search) ||
          school.type.toLowerCase().includes(search)
      )
    : schools;

  return filteredSchools;
});
