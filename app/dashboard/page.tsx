 'use client';
 
 import { useEffect, useState } from 'react';
import { Wallet, ClipboardList, Star, Target, Sparkles, ShieldAlert, PhoneCall, MapPin, MessageCircle, Menu, LogOut } from 'lucide-react';
 import Image from 'next/image';
 import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useToast } from '@/src/context/ToastContext';
 import Link from 'next/link';
import EmptyState from '@/app/components/EmptyState';
 
export default function Dashboard() {
  const { user, logout } = useAuth();
   const router = useRouter();
  const { show } = useToast();
   useEffect(() => {
     if (!user || user.role !== 'worker') {
       router.push('/login');
     }
   }, [user, router]);
 const [earnings, setEarnings] = useState(450);
  const [jobsCompleted, setJobsCompleted] = useState(12);
  const [rating] = useState(4.8);
   const [goalCurrent, setGoalCurrent] = useState(5200);
   const goalTotal = 8000;
   const [pulse, setPulse] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [jobType, setJobType] = useState('Stitching');
  const [showConfetti, setShowConfetti] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
 const [skillPoints, setSkillPoints] = useState(0);
 const pointsKey = user?.phone ? `skill_points_${user.phone}` : 'skill_points';
 const [showSOSModal, setShowSOSModal] = useState(false);
 const [sosToast, setSosToast] = useState(false);
 const [sosToastMsg, setSosToastMsg] = useState('');
 const [fakeCall, setFakeCall] = useState(false);
 const hour = new Date().getHours();
 const greeting =
   hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
 const firstName = user?.name ? user.name.split(' ')[0] : 'Sunita';
 const responseTime = 12;
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Anjali S.', date: '2 days ago', rating: 5, text: 'The blouse fitting was perfect! Very professional.', reply: '', replying: false, draft: '' },
    { id: 2, name: 'Rahul K.', date: '1 week ago', rating: 4, text: 'Good work, but delivery was slightly delayed.', reply: '', replying: false, draft: '' },
    { id: 3, name: 'Sneha M.', date: '2 weeks ago', rating: 5, text: 'Loved the design suggestions. Will book again.', reply: '', replying: false, draft: '' },
  ]);
 
   const percent = Math.min(100, Math.round((goalCurrent / goalTotal) * 100));
 
 const fireConfetti = async () => {
   setPulse(true);
   setShowConfetti(true);
   setTimeout(() => {
     setPulse(false);
     setShowConfetti(false);
   }, 1000);
 };
 
  const openLogModal = () => {
    setAmount('');
    setJobType('Stitching');
    setShowModal(true);
  };
 
  const submitLog = async () => {
    const amt = parseInt(amount.replace(/[^\d]/g, ''), 10);
    if (!amt || amt <= 0) return;
    setEarnings((e) => e + amt);
    setJobsCompleted((c) => c + 1);
    setGoalCurrent((g) => Math.min(goalTotal, g + amt));
    await fireConfetti();
    show(`💰 ₹${amt} added to your goal!`, 'success');
    setShowModal(false);
  };
 
 useEffect(() => {
   try {
     const saved = localStorage.getItem(pointsKey);
     setSkillPoints(saved ? parseInt(saved, 10) || 0 : 0);
   } catch {
     setSkillPoints(0);
   }
 }, [pointsKey]);
 
 const shareLiveLocation = () => {
   const done = () => {
     setSosToastMsg('Location sent to HCF Admin Team! Tracking started.');
     setSosToast(true);
     setTimeout(() => setSosToast(false), 3000);
     setShowSOSModal(false);
   };
   try {
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
         () => done(),
         () => done(),
         { enableHighAccuracy: true, timeout: 5000 }
       );
     } else {
       done();
     }
   } catch {
     done();
   }
 };
 
 const callPolice = () => {
   try {
     window.location.href = 'tel:100';
   } catch {}
 };
 
 const triggerFakeCall = () => {
   setFakeCall(true);
   setShowSOSModal(false);
   setTimeout(() => setFakeCall(false), 5000);
 };
 
const [isOpen, setIsOpen] = useState(false);
const doLogout = () => {
  try {
    logout();
    (typeof window !== 'undefined') && localStorage.setItem('isLoggedIn', 'false');
  } catch {}
  router.push('/');
};

   return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <button
        type="button"
        className="md:hidden fixed top-20 left-4 z-50 rounded-md bg-white/80 backdrop-blur px-3 py-2 border border-stone-300 text-[#4A4A4A]"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open sidebar menu"
      >
        <Menu className="h-6 w-6" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto shadow-lg md:shadow-none`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-stone-200">
            <div className="font-semibold text-[#4A4A4A]">Menu</div>
          </div>
          <div className="flex-1 p-4 space-y-3">
            <Link href="/dashboard" className="block rounded-lg px-3 py-2 text-[#4A4A4A] hover:bg-gray-50">Dashboard</Link>
            <Link href="/learn" className="block rounded-lg px-3 py-2 text-[#4A4A4A] hover:bg-gray-50">Learn & Grow</Link>
          </div>
          <div className="p-4 border-t border-stone-200 mt-auto">
            <button
              type="button"
              onClick={doLogout}
              className="w-full inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="rounded-2xl bg-gradient-to-r from-[#C08081] to-[#F59E0B] text-white p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Image
                src="/providers/Sunita_Devi.jpg"
                alt={`Profile photo of ${firstName}`}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-2 border-white object-cover shadow-md"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {greeting}, {firstName}! ☀️
                </h1>
                <p className="text-sm sm:text-base text-white/90">
                  You are making great progress today.
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col md:flex-row items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
                <Sparkles className="h-4 w-4 text-yellow-200" />
                <span>Skill Points: <span className="font-semibold">{skillPoints}</span></span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
                <Sparkles className="h-4 w-4 text-green-200" />
                <span>Response Time: <span className="font-semibold">{responseTime} mins</span></span>
              </div>
            </div>
          </div>
        </div>
 
        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#4A4A4A] mb-4">Recent Bookings</h2>
          <div className="rounded-2xl bg-white border border-stone-200 shadow-sm">
            {bookings.length === 0 ? (
              <EmptyState message="No active jobs" />
            ) : (
              <div className="divide-y divide-gray-200">
                {bookings.map((b, idx) => (
                  <div key={idx} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-gray-900">{b.title}</div>
                      <div className="text-sm text-gray-600">{b.date}</div>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{b.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-600">Quick Add</div>
              <div className="text-xl font-bold text-[#4A4A4A]">Log Cash Job</div>
              <p className="text-sm text-gray-500 mt-1">Add earnings fast and update your goal.</p>
            </div>
            <button
              type="button"
              onClick={openLogModal}
              className="inline-flex items-center gap-2 rounded-full bg-[#8F9E8B] px-5 py-3 text-white font-semibold shadow hover:opacity-90 transition-all"
            >
              <Sparkles className="h-5 w-5" />
              Add Entry
            </button>
          </div>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md p-6 border border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Wallet className="h-7 w-7 text-orange-600" />
              </div>
              <span className="text-sm text-gray-600">Logged Earnings (This Month)</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">₹{earnings}</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md p-6 border border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ClipboardList className="h-7 w-7 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Jobs Completed</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{jobsCompleted}</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md p-6 border border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="h-7 w-7 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-600">Rating</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{rating}</div>
          </div>
        </div>
 
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white border border-stone-200 shadow-sm px-4 py-3">
              <div className="text-xs text-gray-600">Skill Points</div>
              <div className="text-2xl font-bold text-[#C08081]">{skillPoints}</div>
            </div>
            <div className="rounded-xl bg-white border border-stone-200 shadow-sm px-4 py-3">
              <div className="text-xs text-gray-600">Response Time</div>
              <div className="text-2xl font-bold text-[#8F9E8B]">{responseTime}m</div>
            </div>
          </div>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-[#4A4A4A] hover:bg-[#F6EAEA]"
          >
            🚀 Learn & Grow
          </Link>
        </div>
        <p className="text-sm text-gray-600 mb-8">
          Received a payment via WhatsApp or Cash? Log it here to track your goal progress.
        </p>
 
        <div className={`bg-white rounded-2xl shadow-lg border border-stone-200 p-6 ${pulse ? 'animate-pulse' : ''}`}>
           <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
             <div className="flex items-center gap-3">
               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                 <Target className="h-6 w-6 text-orange-600" />
               </div>
               <div>
                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                   My Dream Goal: New Sewing Machine
                 </h2>
                <p className="text-sm text-gray-600">
                  Only ₹{Math.max(0, goalTotal - goalCurrent).toLocaleString()} more to go! You can do it!
                </p>
               </div>
             </div>
             <Image
               src="https://images.unsplash.com/photo-1511556261102-67b9b3ccb3e3?q=80&w=200&auto=format&fit=crop"
               alt="Sewing machine"
              width={160}
              height={120}
              className="rounded-md object-cover"
             />
           </div>
 
           <div className="mb-3 flex flex-col md:flex-row items-center justify-between gap-2">
             <div className="text-lg font-semibold text-gray-800">₹{goalCurrent.toLocaleString()} / ₹{goalTotal.toLocaleString()}</div>
             <div className="text-lg font-bold text-green-700">{percent}%</div>
           </div>
          <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
             <div
              className="h-full bg-gradient-to-r from-green-600 to-yellow-400 rounded-full transition-all"
               style={{ width: `${percent}%` }}
             />
           </div>
         </div>
        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#4A4A4A] mb-4">What Customers Are Saying 💬</h2>
          <div className="space-y-4">
            {reviews.map((r, idx) => (
              <div key={r.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-stone-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-semibold text-gray-900">{r.name}</div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < r.rating ? 'text-yellow-500 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{r.date}</div>
                </div>
                <div className="mt-2 text-[#4A4A4A]">{r.text}</div>
                {r.reply && (
                  <div className="mt-3 rounded-lg bg-stone-50 border border-stone-200 p-3">
                    <div className="text-sm text-gray-600 mb-1">You replied:</div>
                    <div className="text-sm text-gray-900">{r.reply}</div>
                  </div>
                )}
                {!r.reply && !r.replying && (
                  <button
                    type="button"
                    onClick={() => {
                      const next = [...reviews];
                      next[idx] = { ...r, replying: true };
                      setReviews(next);
                    }}
                    className="mt-4 inline-flex items-center gap-2 text-[#C08081] hover:underline underline-offset-4"
                  >
                    ↩️ Reply
                  </button>
                )}
                {!r.reply && r.replying && (
                  <div className="mt-4 space-y-3">
                    <textarea
                      value={r.draft}
                      onChange={(e) => {
                        const next = [...reviews];
                        next[idx] = { ...r, draft: e.target.value };
                        setReviews(next);
                      }}
                      placeholder="Write your reply..."
                      className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:ring-2 focus:ring-[#8F9E8B] focus:border-transparent"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const next = [...reviews];
                          next[idx] = { ...r, reply: r.draft.trim(), replying: false };
                          setReviews(next);
                          show('✅ Reply sent to customer!', 'success');
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-[#8F9E8B] px-5 py-2 text-white font-semibold hover:opacity-90"
                      >
                        Post Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white shadow-sm flex items-center justify-between">
            <div>
              <div className="text-lg font-bold">Want more bookings? Share your profile on WhatsApp!</div>
              <div className="text-sm text-white/90 mt-1">Growth Tip</div>
            </div>
            <button
              type="button"
              onClick={async () => {
                try {
                  const url = typeof window !== 'undefined' ? `${window.location.origin}/profile` : '/profile';
                  await navigator.clipboard.writeText(url);
                } catch {}
                show('Link copied to clipboard! 🔗', 'success');
              }}
              className="inline-flex items-center gap-2 rounded-full bg-white text-green-600 px-5 py-3 font-semibold shadow hover:bg-gray-50"
            >
              <MessageCircle className="h-5 w-5" />
              Share Now
            </button>
          </div>
        </div>
       </div>
 
      
 
      {showModal && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
         <div className="w-full max-w-md rounded-xl bg-white shadow-2xl border border-gray-200">
           <div className="border-b border-gray-200 p-4">
             <h3 className="text-lg font-semibold text-gray-900">Log a New Cash Job</h3>
           </div>
           <div className="p-4 space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">How much did you earn?</label>
               <input
                 type="text"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 placeholder="₹200"
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">What was the job?</label>
               <select
                 value={jobType}
                 onChange={(e) => setJobType(e.target.value)}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
               >
                 <option>Stitching</option>
                 <option>Alteration</option>
                 <option>Cooking</option>
                 <option>Other</option>
               </select>
             </div>
           </div>
           <div className="flex items-center justify-end gap-2 border-t border-gray-200 p-4">
             <button
               type="button"
               onClick={() => setShowModal(false)}
               className="rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
             >
               Cancel
             </button>
             <button
               type="button"
               onClick={submitLog}
               className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
             >
               Add to My Goal
             </button>
           </div>
         </div>
       </div>
      )}

     {showSOSModal && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
         <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200">
           <div className="p-5 border-b border-gray-200">
             <h3 className="text-xl font-semibold text-gray-900">Are you feeling unsafe?</h3>
             <p className="text-sm text-gray-600 mt-1">Choose an action below</p>
           </div>
           <div className="p-5 space-y-3">
             <button
               type="button"
               onClick={shareLiveLocation}
               className="w-full inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-white font-semibold hover:bg-red-700"
             >
               <MapPin className="h-5 w-5" />
               Share Live Location with Admin
             </button>
             <button
               type="button"
               onClick={callPolice}
               className="w-full inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-white font-semibold hover:bg-black"
             >
               <PhoneCall className="h-5 w-5" />
               Call Police (100)
             </button>
             <button
               type="button"
               onClick={triggerFakeCall}
               className="w-full inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-gray-900 border border-gray-300 hover:bg-gray-50"
             >
               <PhoneCall className="h-5 w-5 text-green-600" />
               Fake Call
             </button>
           </div>
           <div className="p-4 border-t border-gray-200 flex justify-end">
             <button
               type="button"
               onClick={() => setShowSOSModal(false)}
               className="rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
             >
               Close
             </button>
           </div>
         </div>
       </div>
     )}
 
     {sosToast && (
       <div className="fixed bottom-6 inset-x-0 flex justify-center px-4 z-50">
         <div className="flex items-center gap-2 rounded-full bg-green-600 text-white px-5 py-3 shadow-lg">
           <Sparkles className="h-5 w-5" />
           <span className="font-semibold">{sosToastMsg}</span>
         </div>
       </div>
     )}
 
     {fakeCall && (
       <div className="pointer-events-none fixed inset-0 z-40">
         <div className="absolute top-4 right-4 rounded-xl bg-white border border-gray-200 shadow-lg px-4 py-3 flex items-center gap-2 animate-pulse">
           <PhoneCall className="h-6 w-6 text-green-600" />
           <span className="font-semibold text-gray-900">Incoming Call…</span>
         </div>
       </div>
     )}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-40">
          <div className="absolute top-10 left-10 text-pink-500">
            <Sparkles className="h-8 w-8" />
          </div>
          <div className="absolute top-20 right-16 text-yellow-500">
            <Sparkles className="h-10 w-10" />
          </div>
          <div className="absolute bottom-24 left-1/3 text-green-500">
            <Sparkles className="h-8 w-8" />
          </div>
          <div className="absolute bottom-12 right-1/4 text-blue-500">
            <Sparkles className="h-9 w-9" />
          </div>
        </div>
      )}
     </div>
   );
 }
