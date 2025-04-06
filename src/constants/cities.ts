export interface City {
    value: string;
    label: {
      en: string;
      es: string;
    };
  }
  
  export const CITY_LIST: City[] = [
    {
      value: 'London',
      label: {
        en: 'London',
        es: 'Londres',
      },
    },
    {
      value: 'Toronto',
      label: {
        en: 'Toronto',
        es: 'Toronto',
      },
    },
    {
      value: 'Singapore',
      label: {
        en: 'Singapore',
        es: 'Singapur',
      },
    },
  ];
  