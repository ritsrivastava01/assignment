'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SpeciesEnum } from '@/schemas/pets';

const Filters = () => {
  const speciesOptions = Object.values(SpeciesEnum.enum);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpecies = event.target.value;

    const params = Object.fromEntries(searchParams.entries());

    if (selectedSpecies === 'all') {
      delete params.species;
    } else {
      params.species = selectedSpecies;
    }

    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    router.push(`${pathname}?${queryString}`);
  };

  const toggleSort = () => {
    const params = Object.fromEntries(searchParams.entries());

    if (params.sort === 'latestAdded') {
      delete params.sort;
    } else {
      params.sort = 'latestAdded';
    }

    return {
      pathname,
      query: params,
    };
  };

  return (
    <div className="flex gap-4 flex-col md:flex-row align-center md:items-center">
      <span className="text-black text-2xl font-bold hidden md:block">Quick Filter:</span>
      <div className="border-2 flex-1 lg:flex-none border-gray rounded-full px-4 hover:border-vibrant-blue">
        <select
          id="species-select"
          data-testid="species-select"
          className="min-w-32 w-full py-4"
          onChange={handleSpeciesChange}
          value={searchParams.get('species') ?? 'all'}
          aria-label="Select Pet Species"
        >
          <option value="all" id="all-pets">
            All Pets
          </option>
          {speciesOptions.map(species => (
            <option key={species} value={species} id={species}>
              {species}
            </option>
          ))}
        </select>
      </div>

      <Link
        data-testid="sort-latest-added"
        aria-label="Sort by latest added pets"
        href={toggleSort()}
        className="flex flex-1 justify-center border-2 border-vibrant-blue rounded-full text-vibrant-blue items-center p-4 text-base text-center lg:flex-none hover:bg-vibrant-blue hover:text-white"
      >
        Latest Added
      </Link>
    </div>
  );
};

export default Filters;
