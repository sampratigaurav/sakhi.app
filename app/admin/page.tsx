 'use client';
 
import { useServiceContext } from '@/app/context/ServiceContext';
 import Image from 'next/image';
 import { Pencil, Trash2 } from 'lucide-react';
 import { useEffect, useMemo, useState } from 'react';
import AdminGuard from '@/app/components/auth/AdminGuard';
 
 export default function SuperAdminPage() {
   const { providers, toggleVerification, deleteProvider, updateProvider, addProvider } = useServiceContext();
   const [showEditFor, setShowEditFor] = useState<number | null>(null);
   const [form, setForm] = useState({
     image: '',
     name: '',
     service: 'Tailoring',
     price: 0,
     location: '',
     goalTitle: '',
     goalAmount: 0,
     phone: '',
     description: ''
   });
 
   useEffect(() => {
     if (showEditFor != null) {
       const p = providers.find((x) => x.id === showEditFor);
       if (p) {
         setForm({
           image: p.image || '',
           name: p.name || '',
           service: p.service || 'Tailoring',
           price: p.price || 0,
           location: p.location || '',
           goalTitle: p.goalTitle || '',
           goalAmount: p.goalAmount || 0,
           phone: p.phone || '',
           description: p.description || ''
         });
       }
     }
   }, [showEditFor, providers]);
 
   const stats = useMemo(() => {
     const total = providers.length;
     const verified = providers.filter((p) => p.verified).length;
     return { total, verified };
   }, [providers]);
 
   const roleColor = (role: string) => {
     const map: Record<string, string> = {
       Tailoring: 'bg-blue-100 text-blue-700',
       Beauty: 'bg-pink-100 text-pink-700',
       Mehendi: 'bg-orange-100 text-orange-700',
       Cooking: 'bg-amber-100 text-amber-700',
       Nanny: 'bg-purple-100 text-purple-700',
       Care: 'bg-teal-100 text-teal-700'
     };
     return map[role] || 'bg-gray-100 text-gray-700';
   };
 
   const fakeEmail = (name: string) => {
     const slug = name.toLowerCase().replace(/[^a-z]+/g, '.').replace(/\.+/g, '.').replace(/^\.+|\.+$/g, '');
     return `${slug}@sakhi.work`;
   };
 
   const onSaveEdit = () => {
     if (showEditFor == null) return;
     updateProvider(showEditFor, { ...form });
     setShowEditFor(null);
   };
 
  return (
    <AdminGuard>
    <div className="min-h-screen bg-[#FDFBF7] py-12">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
           <div>
             <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
               Admin Control Center 🛡️
             </h1>
             <p className="text-sm text-gray-600">Full control over workers and verification</p>
           </div>
         </div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
             <p className="text-gray-600">Total Workers</p>
             <div className="text-2xl font-bold text-[#C08081]">{stats.total}</div>
           </div>
           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
             <p className="text-gray-600">Verified</p>
             <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
           </div>
         </div>
 
         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="overflow-x-auto w-full border rounded-xl">
             <table className="min-w-full text-sm">
               <thead className="bg-gray-50 text-gray-600">
                 <tr>
                   <th className="px-4 py-3 text-left font-medium">User</th>
                   <th className="px-4 py-3 text-left font-medium">Role</th>
                   <th className="px-4 py-3 text-left font-medium">Stats</th>
                   <th className="px-4 py-3 text-left font-medium">Status</th>
                   <th className="px-4 py-3 text-left font-medium">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                 {providers.map((p) => (
                   <tr key={p.id} className="text-gray-900">
                     <td className="px-4 py-3">
                       <div className="flex items-center gap-3">
                         <Image src={p.image} alt={p.name} width={40} height={40} className="rounded-full object-cover" />
                         <div>
                           <div className="font-semibold">{p.name}</div>
                           <div className="text-xs text-gray-500">{fakeEmail(p.name)}</div>
                         </div>
                       </div>
                     </td>
                     <td className="px-4 py-3">
                       <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${roleColor(p.service)}`}>
                         {p.service}
                       </span>
                     </td>
                     <td className="px-4 py-3">
                       <div className="text-xs text-gray-700">⭐ {p.rating ?? 0} • {p.reviews ?? 0} reviews</div>
                     </td>
                     <td className="px-4 py-3">
                       <label className="inline-flex items-center cursor-pointer">
                         <input
                           type="checkbox"
                           checked={!!p.verified}
                           onChange={() => toggleVerification(p.id)}
                           className="sr-only peer"
                         />
                         <div className="w-10 h-5 bg-gray-200 rounded-full relative peer-checked:bg-green-500 transition-colors">
                           <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${p.verified ? 'translate-x-5' : ''}`} />
                         </div>
                         <span className="ml-2 text-xs text-gray-600">{p.verified ? 'Verified' : 'Not Verified'}</span>
                       </label>
                     </td>
                     <td className="px-4 py-3">
                       <div className="flex items-center gap-2">
                         <button
                           type="button"
                           onClick={() => setShowEditFor(p.id)}
                           className="rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-sm hover:bg-gray-50"
                           title="Edit"
                           aria-label={`Edit ${p.name}`}
                         >
                           <Pencil className="h-4 w-4" />
                         </button>
                         <button
                           type="button"
                           onClick={() => {
                             if (confirm(`Are you sure you want to remove ${p.name} permanently?`)) deleteProvider(p.id);
                           }}
                           className="rounded-md border border-red-200 bg-white px-3 py-2 text-red-600 shadow-sm hover:bg-red-50"
                           title="Delete"
                           aria-label={`Delete ${p.name}`}
                         >
                           <Trash2 className="h-4 w-4" />
                         </button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>
 
       {showEditFor !== null && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
           <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
             <h3 className="text-xl font-semibold mb-4" style={{ color: '#4A4A4A' }}>Edit Profile</h3>
             <div className="grid grid-cols-1 gap-3">
               <input className="border rounded-md p-2" placeholder="Photo URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
               <input className="border rounded-md p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
               <input className="border rounded-md p-2" placeholder="Role" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
               <input className="border rounded-md p-2" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
               <input className="border rounded-md p-2" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
               <input className="border rounded-md p-2" placeholder="Micro-Goal Title" value={form.goalTitle} onChange={(e) => setForm({ ...form, goalTitle: e.target.value })} />
               <input className="border rounded-md p-2" type="number" placeholder="Micro-Goal Target Amount" value={form.goalAmount} onChange={(e) => setForm({ ...form, goalAmount: Number(e.target.value) })} />
               <input className="border rounded-md p-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
               <textarea className="border rounded-md p-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
             </div>
             <div className="mt-4 flex justify-end gap-2">
               <button type="button" onClick={() => setShowEditFor(null)} className="rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">Cancel</button>
               <button type="button" onClick={onSaveEdit} className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">Save Changes</button>
             </div>
           </div>
         </div>
       )}
    </div>
    </AdminGuard>
   );
 }
