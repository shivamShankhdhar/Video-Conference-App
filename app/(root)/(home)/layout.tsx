import NavBar from '@/components/ui/NavBar';
import SideBar from '@/components/ui/SideBar';
import React, { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode; }) => {
  return (
    <main className='relative'>
      <NavBar />
      <div className="flex pt-20">
        <SideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6  max-md:pb-14 sm:px-14">
          <div className="w-full">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout