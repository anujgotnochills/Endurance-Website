import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, Plus, Edit3, Save, X, Star, Upload } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  quote: string;
  image_url: string;
  rating: number;
  display_order: number;
}

const emptyTestimonial: Omit<Testimonial, 'id'> = {
  client_name: '', company: '', quote: '', image_url: '', rating: 5, display_order: 0,
};

export default function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>(emptyTestimonial);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    const { data, error } = await supabase.from('testimonials').select('*').order('display_order');
    if (!error && data) setItems(data);
    setLoading(false);
  }

  async function handleAdd() {
    await supabase.from('testimonials').insert({ ...formData, display_order: items.length });
    setFormData(emptyTestimonial);
    setShowAddForm(false);
    fetchItems();
  }

  async function handleUpdate(id: string) {
    await supabase.from('testimonials').update(formData).eq('id', id);
    setEditingId(null);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this testimonial?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    fetchItems();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from('asset endurance').upload(`testimonials/${fileName}`, file);
    if (error) { alert('Upload failed'); setUploading(false); return; }
    const { data: { publicUrl } } = await supabase.storage.from('asset endurance').getPublicUrl(`testimonials/${fileName}`);
    setFormData(prev => ({ ...prev, image_url: publicUrl }));
    setUploading(false);
  }

  function startEdit(item: Testimonial) {
    setEditingId(item.id);
    setFormData({ client_name: item.client_name, company: item.company, quote: item.quote, image_url: item.image_url, rating: item.rating, display_order: item.display_order });
  }

  const LIMIT = 5;
  const isLimitReached = items.length >= LIMIT;

  const FormFields = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input value={formData.client_name} onChange={e => setFormData(p => ({ ...p, client_name: e.target.value }))} placeholder="Client Name" className="px-3 py-2.5 bg-[#111] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500" />
        <input value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} placeholder="Company" className="px-3 py-2.5 bg-[#111] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500" />
      </div>
      <textarea value={formData.quote} onChange={e => setFormData(p => ({ ...p, quote: e.target.value }))} placeholder="Testimonial quote..." rows={3} className="w-full px-3 py-2.5 bg-[#111] border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none" />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map(n => (
            <button key={n} type="button" onClick={() => setFormData(p => ({ ...p, rating: n }))} className="p-0.5" disabled={isLimitReached && !editingId}>
              <Star size={18} className={n <= formData.rating ? 'text-purple-500 fill-purple-500' : 'text-gray-600'} />
            </button>
          ))}
        </div>
        <label className={`px-4 py-2 bg-[#222] border border-gray-700 rounded-xl text-gray-300 text-xs font-medium transition-all flex items-center gap-1.5 ${isLimitReached && !editingId ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-purple-500'}`}>
          <Upload size={14} /> {uploading ? 'Uploading...' : 'Photo'}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading || (isLimitReached && !editingId)} />
        </label>
        {formData.image_url && <img src={formData.image_url} className="w-8 h-8 rounded-full object-cover" />}
      </div>
    </div>
  );

  if (loading) return <div className="text-gray-400 p-8">Loading testimonials...</div>;

  return (
    <div className="space-y-6">
      {/* Items counter */}
      <div className="flex items-center justify-between px-2">
        <span className="text-gray-500 text-sm font-medium">Current: {items.length} / {LIMIT}</span>
        {isLimitReached && <span className="text-purple-500 text-xs font-bold animate-pulse">Limit Reached</span>}
      </div>

      {/* Add New */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
        {showAddForm ? (
          <div className="space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2"><Plus size={18} /> New Testimonial</h3>
            <FormFields />
            <div className="flex gap-2">
              <button 
                onClick={handleAdd} 
                disabled={isLimitReached}
                className="px-5 py-2 bg-purple-500 disabled:bg-gray-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm flex items-center gap-1.5"
              >
                <Save size={14} /> Save
              </button>
              <button onClick={() => { setShowAddForm(false); setFormData(emptyTestimonial); }} className="px-5 py-2 bg-gray-700 text-white rounded-xl text-sm flex items-center gap-1.5"><X size={14} /> Cancel</button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => !isLimitReached && setShowAddForm(true)} 
            disabled={isLimitReached}
            className={`w-full py-3 border-2 border-dashed rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-medium ${isLimitReached ? 'border-gray-800 text-gray-600 grayscale' : 'border-gray-700 text-gray-400 hover:text-purple-500 hover:border-purple-500/50'}`}
          >
            <Plus size={18} /> {isLimitReached ? 'Limit Reached (Max 5)' : 'Add New Testimonial'}
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all">
            {editingId === item.id ? (
              <div className="space-y-4">
                <FormFields />
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(item.id)} className="px-5 py-2 bg-purple-500 text-white font-bold rounded-xl text-sm flex items-center gap-1.5"><Save size={14} /> Update</button>
                  <button onClick={() => setEditingId(null)} className="px-5 py-2 bg-gray-700 text-white rounded-xl text-sm flex items-center gap-1.5"><X size={14} /> Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                {item.image_url && <img src={item.image_url} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-bold text-sm">{item.client_name}</h4>
                    <span className="text-purple-500 text-xs">{item.company}</span>
                    <div className="flex gap-0.5 ml-auto">
                      {Array.from({ length: item.rating }).map((_, i) => <Star key={i} size={12} className="text-purple-500 fill-purple-500" />)}
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => startEdit(item)} className="w-8 h-8 bg-[#222] rounded-lg flex items-center justify-center text-gray-400 hover:text-purple-500 transition-colors"><Edit3 size={14} /></button>
                  <button onClick={() => handleDelete(item.id)} className="w-8 h-8 bg-[#222] rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
