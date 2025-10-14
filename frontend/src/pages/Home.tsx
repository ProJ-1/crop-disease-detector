// src/pages/Home.tsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import TabsSection from '../components/TabsSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TabsSection />
    </div>
  );
};

export default Home;