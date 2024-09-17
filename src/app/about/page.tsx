import React from 'react';
import Title from '@/components/Title';
import Overview from './_components/Overview';
import SpaceDesign from './_components/SpaceDesign';

export default function AboutPage() {
  return (
    <main className="">
      <Title title="About Us" href="/about" isMainPage={false} />
      <Overview />
      <SpaceDesign />
    </main>
  );
}
