import logo from '@images/icons/pet-icon.svg';
import Image from 'next/image';

export const Header = () => {
  return (
    <div className="bg-blue-sky p-4 md:p-5 shadow-md">
      <Image src={logo} alt="Logo" />
    </div>
  );
};
