import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed left-1/2 top-0 z-50 w-full max-w-[480px] -translate-x-1/2 bg-white/80 px-[24px]">
      <div className="flex h-[50px] items-center justify-between">
        <Link href="/" aria-label="홈으로 이동" className="flex items-center">
          <Image src="/assets/Logo.svg" alt="Nook 로고" width={100} height={25} priority />
        </Link>
      </div>
    </header>
  );
};

export default Header;
