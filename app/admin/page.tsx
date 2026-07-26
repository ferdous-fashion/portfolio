'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl">
        <h1 className="font-display text-4xl mb-2">Admin Dashboard</h1>
        <p className="text-gray-400 mb-8">Welcome, {user.email}</p>

        <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
          <h2 className="font-display text-2xl mb-6">Content Management</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition">
              <h3 className="font-display text-xl mb-2">Projects</h3>
              <p className="text-sm text-gray-400">Manage portfolio projects</p>
            </div>

            <div className="p-6 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition">
              <h3 className="font-display text-xl mb-2">Skills</h3>
              <p className="text-sm text-gray-400">Update your skills and expertise</p>
            </div>

            <div className="p-6 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition">
              <h3 className="font-display text-xl mb-2">Media</h3>
              <p className="text-sm text-gray-400">Manage images and files</p>
            </div>

            <div className="p-6 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition">
              <h3 className="font-display text-xl mb-2">Settings</h3>
              <p className="text-sm text-gray-400">Site configuration and metadata</p>
            </div>
          </div>

          <button
            onClick={async () => {
              const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
              );
              await supabase.auth.signOut();
              router.push('/admin/login');
            }}
            className="mt-8 px-6 py-2 bg-red text-ink font-display rounded hover:bg-opacity-90 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
