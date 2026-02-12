 'use client';
 
 import { useState } from 'react';
 import Image from 'next/image';
 import { Loader2 } from 'lucide-react';
 import { useRouter } from 'next/navigation';
 import { useAuth } from '@/app/context/AuthContext';
import { useToast } from '@/src/context/ToastContext';
 
 export default function Login() {
   const router = useRouter();
   const { login } = useAuth();
  const { show } = useToast();
   const [phone, setPhone] = useState('');
   const [sending, setSending] = useState(false);
   const [otpStep, setOtpStep] = useState(false);
   const [otp, setOtp] = useState('');
   const [error, setError] = useState('');
 
   const sendOtp = () => {
     if (!phone) return;
     setSending(true);
     setTimeout(() => {
       setSending(false);
       setOtpStep(true);
     }, 1000);
   };
 
   const verify = async () => {
     setError('');
     if (!otp) return;
     const res = await login(phone, otp);
     if (!('success' in res) || !res.success) {
       setError('Invalid credentials');
      show('❌ Incorrect OTP. Please try again.', 'error');
       return;
     }
    try {
      const raw = localStorage.getItem('currentUser');
      if (raw) {
        const cu = JSON.parse(raw);
        if (cu?.name) {
          show(`✅ Successfully logged in as ${cu.name}`, 'success');
        }
      }
    } catch {}
     if (res.role === 'worker') router.push('/dashboard');
     else if (res.role === 'admin') router.push('/admin');
     else router.push('/');
   };
 
   return (
     <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
       <div className="grid md:grid-cols-2 gap-0">
         <div className="relative hidden md:block">
           <Image
             src="https://images.unsplash.com/photo-1511556261102-67b9b3ccb3e3?q=80&w=1000&auto=format&fit=crop"
             alt="Women working"
             fill
             className="object-cover"
             sizes="(max-width: 768px) 0vw, 50vw"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20" />
           <div className="absolute bottom-10 left-10">
             <div className="text-3xl font-bold text-white">SkillSakhi</div>
             <div className="mt-2 text-white/90 text-lg">Empowering Women Through Skills</div>
           </div>
         </div>
 
         <div className="flex items-center justify-center px-6 py-12">
           <div className="w/full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
             <div className="text-2xl font-bold text-gray-900 mb-6">Login</div>
             {!otpStep ? (
               <div className="space-y-4">
                 <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                 <input
                   type="tel"
                   value={phone}
                   onChange={(e) => setPhone(e.target.value)}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                   placeholder="+91 98765 43210"
                 />
                 <button
                   type="button"
                   onClick={sendOtp}
                   className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 text-white rounded-lg font-semibold px-4 py-3 hover:bg-orange-600 transition"
                 >
                   {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                   <span>Send OTP</span>
                 </button>
               </div>
             ) : (
               <div className="space-y-4">
                 <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                 <input
                   type="text"
                   value={otp}
                   onChange={(e) => setOtp(e.target.value)}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                   placeholder="123456"
                 />
                 {error && <div className="text-sm font-semibold text-red-600">{error}</div>}
                 <button
                   type="button"
                   onClick={verify}
                   className="w-full inline-flex items-center justify-center bg-blue-600 text-white rounded-lg font-semibold px-4 py-3 hover:bg-blue-700 transition"
                 >
                   Verify
                 </button>
               </div>
             )}
           </div>
         </div>
       </div>
     </div>
   );
 }
