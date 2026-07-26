'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Portfolio = dynamic(() => import('@/components/portfolio'), {
  loading: () => <div className="flex items-center justify-center min-h-screen bg-ink">Loading...</div>,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <Portfolio />;
}
