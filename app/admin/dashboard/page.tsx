 'use client';
 
 import { useProvidersContext } from '@/app/context/ProvidersContext';
 import Image from 'next/image';
 import { ShieldCheck, Trash2, Pencil, UserPlus, ToggleLeft, ToggleRight } from 'lucide-react';
 import { useEffect, useMemo, useState } from 'react';
 
 export default function AdminDashboard() {
   const { providers, stats, addProvider, deleteProvider, updateProvider, toggleVerification } = useProvidersContext();
   const [showAddModal, setShowAddModal] = useState(false);
   const [showEditFor, setShowEditFor] = useState<number | null>(null);
   const [form, setForm] = useState({
     name: '',
     service: 'Tailoring',
     location: '',
     price: 500,
     goalTitle: '',
     goalAmount: 8000,
     image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
     phone: '+919999999999',
     description: ''
   });
 
   useEffect(() => {
     if (showEditFor != null) {
       const p = providers.find((x) => x.id === showEditFor);
       if (p) {
         setForm({
           name: p.name || '',
           service: p.service || 'Tailoring',
           location: p.location || '',
           price: p.price || 0,
           goalTitle: p.goalTitle || '',
           goalAmount: p.goalAmount || 0,
           image: p.image || '',
           phone: p.phone || '',
           description: p.description || ''
         });
       }
     }
   }, [showEditFor, providers]);
 
   const verifiedCount = stats.verifiedCount;
   const pendingCount = stats.pendingCount;
 
   const onSaveNew = () => {
     addProvider({ ...form, rating: 4.8, reviews: 0, currentGoal: 0, verified: false, reviewsList: [] });
     setShowAddModal(false);
     setForm({ name: '', service: 'Tailoring', location: '', price: 500, goalTitle: '', goalAmount: 8000, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', phone: '+919999999999', description: '' });
   };
 
   const onSaveEdit = () => {
     if (showEditFor == null) return;
     updateProvider(showEditFor, { ...form });
     setShowEditFor(null);
   };
 
   return (
     <div className="min-h-screen bg-[#FDFBF7] py-12">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex items-center justify-between mb-8">
           <div>
             <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
               NGO Control Center
             </h1>
             <p className="text-sm text-gray-600">Manage workers, verification, and profiles</p>
           </div>
           <button
             type="button"
             onClick={() => setShowAddModal(true)}
             className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-700"
           >
             <UserPlus className="h-5 w-5" />
             + Register New Worker
           </button>
         </div>
 
         <div className="grid sm:grid-cols-3 gap-6 mb-10">
           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
             <p className="text-gray-600">Total Workers</p>
             <div className="text-2xl font-bold text-[#C08081]">{stats.total}</div>
           </div>
           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
             <p className="text-gray-600">Verified Count</p>
             <div className="text-2xl font-bold text-green-600">{verifiedCount}</div>
           </div>
           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
             <p className="text-gray-600">Pending Requests</p>
             <div className="text-2xl font-bold text-gray-700">{pendingCount}</div>
           </div>
         </div>
 
         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
           <div className="overflow-x-auto">
             <table className="min-w-full text-sm">
               <thead className="bg-gray-50 text-gray-600">
                 <tr>
                   <th className="px-4 py-3 text-left font-medium">Photo</th>
                   <th className="px-4 py-3 text-left font-medium">Name</th>
                   <th className="px-4 py-3 text-left font-medium">Role</th>
                   <th className="px-4 py-3 text-left font-medium">Location</th>
                   <th className="px-4 py-3 text-left font-medium">Verification</th>
                   <th className="px-4 py-3 text-left font-medium">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                 {providers.map((p) => (
                   <tr key={p.id} className="text-gray-900">
                     <td className="px-4 py-3">
                       <Image src={p.image} alt={p.name} width={48} height={48} className="rounded-full object-cover" />
                     </td>
                     <td className="px-4 py-3">{p.name}</td>
                     <td className="px-4 py-3">{p.service}</td>
                     <td className="px-4 py-3">{p.location}</td>
                     <td className="px-4 py-3">
                       <button
                         type="button"
                         onClick={() => toggleVerification(p.id)}
                         className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${p.verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                         title={p.verified ? 'Verified' : 'Not Verified'}
                       >
                         {p.verified ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                         {p.verified ? 'Verified' : 'Not Verified'}
                       </button>
                     </td>
                     <td className="px-4 py-3">
                       <div className="flex items-center gap-2">
                         <button
                           type="button"
                           onClick={() => setShowEditFor(p.id)}
                           className="rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-sm hover:bg-gray-50"
                         >
                           <Pencil className="h-4 w-4" />
                         </button>
                         <button
                           type="button"
                           onClick={() => {
                             if (confirm(`Delete ${p.name}?`)) deleteProvider(p.id);
                           }}
                           className="rounded-md border border-red-200 bg-white px-3 py-2 text-red-600 shadow-sm hover:bg-red-50"
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
 
       {showAddModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
           <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
             <h3 className="text-xl font-semibold mb-4" style={{ color: '#4A4A4A' }}>Register New Worker</h3>
             <div className="grid grid-cols-1 gap-3">
               <input className="border rounded-md p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
               <input className="border rounded-md p-2" placeholder="Role" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
               <input className="border rounded-md p-2" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
               <input className="border rounded-md p-2" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
               <input className="border rounded-md p-2" placeholder="Goal Title" value={form.goalTitle} onChange={(e) => setForm({ ...form, goalTitle: e.target.value })} />
               <input className="border rounded-md p-2" type="number" placeholder="Goal Amount" value={form.goalAmount} onChange={(e) => setForm({ ...form, goalAmount: Number(e.target.value) })} />
               <input className="border rounded-md p-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
               <input className="border rounded-md p-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
               <textarea className="border rounded-md p-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
             </div>
             <div className="mt-4 flex justify-end gap-2">
               <button type="button" onClick={() => setShowAddModal(false)} className="rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">Cancel</button>
               <button type="button" onClick={onSaveNew} className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Save</button>
             </div>
           </div>
         </div>
       )}
 
       {showEditFor !== null && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
           <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
             <h3 className="text-xl font-semibold mb-4" style={{ color: '#4A4A4A' }}>Edit Profile</h3>
             <div className="grid grid-cols-1 gap-3">
               <input className="border rounded-md p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
               <input className="border rounded-md p-2" placeholder="Role" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
               <input className="border rounded-md p-2" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
               <input className="border rounded-md p-2" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
               <input className="border rounded-md p-2" placeholder="Goal Title" value={form.goalTitle} onChange={(e) => setForm({ ...form, goalTitle: e.target.value })} />
               <input className="border rounded-md p-2" type="number" placeholder="Goal Amount" value={form.goalAmount} onChange={(e) => setForm({ ...form, goalAmount: Number(e.target.value) })} />
               <input className="border rounded-md p-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
               <input className="border rounded-md p-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
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
   );
 }
