'use client';

import { useState } from 'react';
import { User, Search, Briefcase } from 'lucide-react';
import Link from 'next/link';
 import { useAuth } from '@/app/context/AuthContext';
 import { useEffect } from 'react';
 import { useRouter } from 'next/navigation';

export default function Register() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      if (user.role === 'worker') {
        router.push('/dashboard');
      } else if (user.role === 'customer') {
        router.push('/');
      } else if (user.role === 'admin') {
        router.push('/admin');
      }
    }
  }, [user, router]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customer, setCustomer] = useState({ name: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submitCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const usersRaw = localStorage.getItem('users');
      const users = usersRaw ? JSON.parse(usersRaw) : {};
      users[customer.phone] = {
        role: 'customer',
        name: customer.name,
        phone: customer.phone,
        password: customer.password,
      };
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'customer');
      localStorage.setItem('currentUser', JSON.stringify({
        role: 'customer',
        name: customer.name,
        phone: customer.phone,
        email: '',
      }));
      setLoading(false);
      window.location.href = '/';
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
            Join the SkillSakhi Community
          </h1>
          <p className="text-lg text-gray-600">Choose how you want to participate</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <User className="h-7 w-7 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">I want to Hire</h2>
                <p className="text-gray-600">Find trusted local talent for your home needs.</p>
              </div>
            </div>

            {!showCustomerForm ? (
              <button
                type="button"
                onClick={() => setShowCustomerForm(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-white font-semibold shadow hover:bg-orange-600 transition"
              >
                <Search className="h-5 w-5" />
                Register as Customer
              </button>
            ) : (
              <form onSubmit={submitCustomer} className="mt-4 space-y-3">
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Full Name"
                  required
                />
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                  required
                />
                <input
                  type="password"
                  value={customer.password}
                  onChange={(e) => setCustomer({ ...customer, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Password"
                  required
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-700 transition"
                >
                  {loading ? 'Registering...' : 'Register & Continue'}
                </button>
              </form>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Briefcase className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">I want to Earn</h2>
                <p className="text-gray-600">Offer your skills and start earning today.</p>
              </div>
            </div>

            <Link
              href="/register/provider"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              Register as Sakhi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
