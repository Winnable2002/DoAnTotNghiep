'use client';

import React from 'react';
import Herosection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import DiscoverSection from './DiscoverSection';
import CallToActionSection from './CallToActionSection';
import FooterSection from './FooterSection';

const Landing = () => {
  return (
    <main>
      <Herosection />
      <FeaturesSection />
      <DiscoverSection />
      <CallToActionSection />
      <FooterSection />
    </main>
  );
};

export default Landing;
