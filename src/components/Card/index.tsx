import Image from 'next/image';

type CardProps = Readonly<{
  name: string;
  photoUrl: string;
}>;
export function Card({ name, photoUrl }: CardProps) {
  return (
    <div className="flex items-center gap-5 flex-row lg:flex-col lg:gap-10">
      {/* <div className="flex flex-1 w-full gap-5 md:gap-10 lg:flex-col"> */}

      <div>
        <div className="items-center flex flex-[1_0_150px]">
          <Image
            src={photoUrl}
            alt={`Photo of ${name}`}
            className="object-center object-cover lg:rounded-3xl rounded-lg lg:aspect-square aspect-4/3 hover:shadow-lg hover:scale-105 transition-transform hover:cursor-pointer"
            height={210}
            width={210}
          />
        </div>
      </div>
      <div className="justify-between flex flex-col gap-5 w-full h-full">
        <div className="w-full">
          <h3 className="text-color-black truncate lg:text-2xl text-xl">{name}</h3>
        </div>

        <a
          href="#petDetail"
          className="hidden md:flex md:w-full lg:w-fit hover:shadow-lg bg-vibrant-blue text-white py-2 px-4 rounded-lg justify-center items-center min-w-32 text-2xl"
          aria-label={`View details about ${name}`}
        >
          View
        </a>
      </div>
    </div>
  );
}
