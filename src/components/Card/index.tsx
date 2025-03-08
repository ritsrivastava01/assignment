import Image from 'next/image';

import styles from './index.module.css';

type CardProps = Readonly<{
  name: string;
  photoUrl: string;
}>;
export function Card({ name, photoUrl }: CardProps) {
  return (
    <div className="flex items-center justify-between  gap-10 flex-col md:items-start">
      <div className="flex flex-1 w-full gap-5 md:gap-10 lg:flex-col">
        <div className="items-center flex flex-[1_0_150px]">
          <Image
            src={photoUrl}
            alt={`Photo of ${name}`}
            className="object-center object-cover lg:rounded-3xl rounded-lg  lg:aspect-square aspect-4/3  hover:shadow-lg hover:scale-105 transition-transform hover:cursor-pointer"
            height={210}
            width={210}
          />
        </div>
        <div className="m-[0_auto_0_0] flex justify-self-start flex-col w-full justify-center">
          <h3 className="text-color-black truncate lg:text-2xl text-xl">{name}</h3>
        </div>
      </div>
      <a
        href="#petDetail"
        className={`${styles.cta} hidden  md:flex md:w-full lg:w-auto  hover:shadow-lg bg-vibrant-blue text-white`}
        aria-label={`View details about ${name}`}
      >
        View
      </a>
    </div>
  );
}
