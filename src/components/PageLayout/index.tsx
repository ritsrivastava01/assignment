import type { ReactNode } from 'react';

type PageLayoutProps = Readonly<{
  children?: ReactNode;
  className?: string;
}>;

export const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div
      className={`container relative mx-auto max-w-5xl px-6 py-4 md:px-8 min-h-[calc(100vh-160px)] ${className}`}
    >
      {children}
    </div>
  );
};
