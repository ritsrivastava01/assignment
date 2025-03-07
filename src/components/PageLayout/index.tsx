import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const PageLayout = ({ children }: Readonly<Props>) => {
  return (
    <div className="container relative mx-auto max-w-7xl px-6 py-4 md:px-8 min-h-[calc(100vh-160px)]">
      {children}
    </div>
  );
};
