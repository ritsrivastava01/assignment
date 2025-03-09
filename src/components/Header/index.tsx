import logo from '@images/icons/pet-icon.svg';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="bg-blue-sky p-1 md:p-2 shadow-md drop-shadow-md" data-testid="header">
      <Image src={logo} alt="Pet Icon Logo" priority={true} />
    </div>
  );
};
export default Header;
