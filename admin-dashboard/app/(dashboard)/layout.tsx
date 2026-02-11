import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { Toaster } from '@/components/ui/toaster';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Temporarily disabled for debugging
  // if (!session) {
  //   redirect('/login');
  // }

  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={session?.user} />
        <main className="flex-1 overflow-y-auto bg-zinc-900 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
