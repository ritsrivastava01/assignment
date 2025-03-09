'use client';
import { SpeciesEnum } from '@/schemas/pets';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Filters = () => {
  const speciesOptions = Object.values(SpeciesEnum.enum);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpecies = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (selectedSpecies === 'all') {
      params.delete('species');
    } else {
      params.set('species', selectedSpecies);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 flex-col md:flex-row align-center">
      <div className="border-2 flex-1 lg:flex-none border-gray rounded-full px-4">
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
        aria-label="Sort by latest added"
        href={{
          pathname,
          query: { ...Object.fromEntries(searchParams), sort: 'latestAdded' },
        }}
        className="flex flex-1 justify-center border-2 border-vibrant-blue rounded-full text-vibrant-blue items-center p-4 text-base text-center lg:flex-none"
      >
        Latest Added
      </Link>
    </div>
  );
};

export default Filters;
