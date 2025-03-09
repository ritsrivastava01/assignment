export const rawApiResponse = [
  {
    id: 1,
    dateAdded: '01-01-2020',
    name: 'Buddy',
    photoUrl: 'http://example.com/photo.jpg',
    species: 'Dog',
    available: true,
    birthYear: 2018,
  },
  {
    id: 2,
    dateAdded: '02-02-2021',
    name: 'Kitty',
    photoUrl: 'http://example.com/photo2.jpg',
    species: 'Cat',
    available: false,
    birthYear: 2019,
  },
];

export const apiResponse = [
  {
    id: 1,
    dateAdded: new Date('01-01-2020'),
    name: 'Buddy',
    photoUrl: 'http://example.com/photo.jpg',
    species: 'Dog',
    available: true,
    birthYear: 2018,
  },
  {
    id: 2,
    dateAdded: new Date('02-02-2021'),
    name: 'Kitty',
    photoUrl: 'http://example.com/photo2.jpg',
    species: 'Cat',
    available: false,
    birthYear: 2019,
  },
];
