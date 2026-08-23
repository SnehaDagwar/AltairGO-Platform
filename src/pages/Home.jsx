import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/home/Hero.jsx';
import WhyAltairgo from '../components/home/WhyAltairgo.jsx';
import TourSelection from '../components/home/TourSelection.jsx';
import FAQ from '../components/home/FAQ.jsx';
import TravelInspiration from '../components/home/TravelInspiration.jsx';
import styles from './Home.module.css';

/**
 * Home Page (Landing Page)
 * Declarative orchestrator for AltairGO's flagship landing experience.
 */
export default function Home() {
  const navigate = useNavigate();

  const handlePlan = () => {
    navigate('/planner');
  };

  return (
    <main className={styles.homeWrapper}>
      <Hero onPlan={handlePlan} />
      <WhyAltairgo />
      <TourSelection />
      <FAQ />
      <TravelInspiration />
    </main>
  );
}
