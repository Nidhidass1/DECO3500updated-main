'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const LocationPage = () => {

  return (
    <div className="flex flex-col flex-grow items-center">
      <div className='w-full text-3xl font-semibold text-white text-center'>RESIST</div>
      <div className="w-full text-2xl font-semibold max-w-md mt-14">
        Welcome back DECO3500!
      </div>
      <div className="w-full font-bold text-4xl max-w-md mt-8">
        Quote of the day!
      </div>
      {/* Location List */}
      <div className="w-full max-w-md mt-8 flex justify-center">
        <Link href={'https://www.facebook.com/photo/?fbid=910971304411016&set=a.302898885218264&__cft__[0]=AZVa2W644V3i_m5M4DIcH9EWbsOBOCCR0yej14MavtCBF1zULDfTdS0mF7gEjORI0Mv9o8NtC31YBclKhtDquhEuF76PgegB7CtaUY8OVSrld442lspaE2JjaXT1iTx59iIoXV6GX_ej7vi_oygjthj9_x8rkNZDkGic-bFsrrOuMw&__tn__=EH-R'}>
          <Image src={'/banner.jpg'} width={300} height={300} alt='https://www.facebook.com/photo/?fbid=910971304411016&set=a.302898885218264&__cft__[0]=AZVa2W644V3i_m5M4DIcH9EWbsOBOCCR0yej14MavtCBF1zULDfTdS0mF7gEjORI0Mv9o8NtC31YBclKhtDquhEuF76PgegB7CtaUY8OVSrld442lspaE2JjaXT1iTx59iIoXV6GX_ej7vi_oygjthj9_x8rkNZDkGic-bFsrrOuMw&__tn__=EH-R' />

        </Link>
      </div>


      <div className="w-full max-w-md mt-8">
        <Link href={'/stats'} className='bg-blue-400 text-white text-2xl px-5 py-2 rounded-full'>Achievements</Link>
      </div>
    </div>
  );
};

export default LocationPage;