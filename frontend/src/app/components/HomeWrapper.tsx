'use client';
import dynamic from 'next/dynamic';

// Dynamically import your HomePage
const HomePage = dynamic(() => import('./HomePage'), { ssr: false });

export default function HomeWrapper() {
  return <HomePage />;
}
