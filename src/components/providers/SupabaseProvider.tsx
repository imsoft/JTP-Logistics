'use client';

import { useEffect, useState } from 'react';
import { loadDataFromSupabase } from '@/store/useAppStore';

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        await loadDataFromSupabase();
      } catch (error) {
        console.error('Error loading data from Supabase:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-sm text-muted-foreground">Loading data...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
