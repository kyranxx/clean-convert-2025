import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function CreditsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { credits: true }
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-content-dark">Credits</h1>
        <p className="text-content-light mt-2">
          Purchase credits to convert more images
        </p>
      </div>

      {/* Current Balance */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h2 className="text-xl font-medium text-content-dark mb-4">Current Balance</h2>
        <div>
          <p className="text-4xl font-semibold text-primary">
            {user?.credits ?? 0}
          </p>
          <p className="text-content-light mt-1">Available credits</p>
        </div>
      </div>

      {/* Credit Packages - Placeholder */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h2 className="text-xl font-medium text-content-dark mb-6">Credit Packages</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { credits: 10, price: '$5', popular: false },
            { credits: 50, price: '$20', popular: true },
            { credits: 100, price: '$35', popular: false },
          ].map((pkg, i) => (
            <div 
              key={i}
              className={`relative p-6 rounded-lg border-2 transition-all
                ${pkg.popular 
                  ? 'border-accent bg-accent/5 shadow-md' 
                  : 'border-background hover:border-accent/50'}`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              )}
              <div className="text-center space-y-4">
                <div>
                  <p className="text-2xl font-semibold text-content-dark">
                    {pkg.credits} Credits
                  </p>
                  <p className="text-xl text-content mt-1">
                    {pkg.price}
                  </p>
                </div>
                <button 
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors
                    ${pkg.popular 
                      ? 'bg-accent text-white hover:bg-accent/90' 
                      : 'bg-background hover:bg-background-dark text-content'}`}
                  disabled
                >
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-content-light text-center mt-8">
          Credit purchase functionality will be available soon
        </p>
      </div>
    </div>
  );
}
