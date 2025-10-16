export const useSchool = () => {
  const school = useState<{
    name: string;
    city: string;
    type: string;
    classe?: string | null;
    bac?: string | null;
    specialities?: string[];
  } | null>('school', () => null);

  const setSchool = (data: {
    name: string;
    city: string;
    type: string;
    classe?: string | null;
    bac?: string | null;
    specialities?: string[];
  }) => {
    school.value = data;
  };

  return {
    school,
    setSchool
  };
};
