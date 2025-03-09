import Image from 'next/image';
import Link from 'next/link';

type CardProps = Readonly<{
  name: string;
  photoUrl: string;
  dateAdded?: Date;
  species?: string;
  available?: boolean;
}>;

const Card = ({ name, photoUrl, dateAdded, species, available }: CardProps) => {
  return (
    <div className="flex md:justify-between items-center md:items-start basis-1/3 md:gap-4 gap-2 md:flex-col flex-row ">
      <div className="flex-[0_1_150px]">
        <Image
          priority={true}
          data-testid="image"
          src={photoUrl}
          alt={`Photo of ${name}`}
          className="object-center object-cover md:rounded-2xl rounded-lg aspect-4/3 hover:drop-shadow-lg hover:scale-105 transition-transform hover:cursor-pointer"
          height={400}
          width={400}
        />
      </div>
      <div className="gap-1 flex flex-col">
        <h3 className="text-color-black truncate md:text-2xl text-xl w-full" data-testid="name">
          <span aria-label="pet name">{`${name} `}</span>
          <span className="text-lg text-dark-gray" aria-label="pet species">
            {species && `(${species})`}
          </span>
        </h3>

        {dateAdded && (
          <span data-testid="date" aria-label="pet added date">
            Date Added: <time dateTime={dateAdded.toISOString()}>{formatDate(dateAdded)}</time>
          </span>
        )}
        <span data-testid="availability" aria-label="pet is available for adoption">
          {`Available: `}
          <strong className={`${available ? 'text-green-tea' : 'text-red-700'}`}>
            {available ? 'Yes' : 'No'}
          </strong>
        </span>
      </div>
      <Link
        data-testid="view-details"
        href="#petDetail"
        className="hidden md:flex md:w-full lg:w-fit hover:drop-shadow-lg bg-vibrant-blue text-white py-2 px-4 rounded-lg justify-center items-center min-w-32 text-2xl"
        aria-label={`View details about ${name}`}
      >
        View
      </Link>
    </div>
  );
};

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat(undefined, options).format(date);
}

export default Card;
