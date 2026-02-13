'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle, AlertCircle, FileText, MessageSquare } from 'lucide-react';

interface ContentField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'textarea';
  section: string;
}

export default function ContentPage() {
  const [fields, setFields] = useState<ContentField[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      if (data.success) {
        setFields(data.content);
        setHasChanges(false);
      } else {
        setStatus({ type: 'error', message: 'Failed to load content' });
      }
    } catch (err) {
      console.error('Failed to load content:', err);
      setStatus({ type: 'error', message: 'Network error' });
    }
    setLoading(false);
  };

  const updateField = (id: string, value: string) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, value } : f));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Content saved successfully! Changes will appear on the homepage.' });
        setHasChanges(false);
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to save content' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
        <span className="text-zinc-400 text-lg">Loading homepage content...</span>
      </div>
    );
  }

  // Group fields by section
  const sections = fields.reduce((acc, field) => {
    if (!acc[field.section]) acc[field.section] = [];
    acc[field.section].push(field);
    return acc;
  }, {} as Record<string, ContentField[]>);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Edit Website Content</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Make changes below, then click Save to update your live website.
        </p>
      </div>

      {/* Status */}
      {status && (
        <div className={`flex items-center gap-3 mb-6 p-4 rounded-lg border ${
          status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
        }`}>
          {status.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          )}
          <span className={`text-sm font-medium ${status.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
            {status.message}
          </span>
        </div>
      )}

      {/* Save Button (Sticky) */}
      {hasChanges && (
        <div className="sticky top-0 z-10 mb-6 p-4 bg-sky-600 rounded-lg shadow-xl shadow-sky-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Unsaved changes</p>
                <p className="text-sky-100/70 text-xs">Save to update your live website</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-white text-sky-700 text-sm font-bold rounded-md hover:bg-sky-50 transition-colors disabled:opacity-50 shadow-lg"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div className="space-y-8">
        {Object.entries(sections).map(([sectionName, sectionFields]) => (
          <div key={sectionName} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <MessageSquare className="w-5 h-5 text-sky-500" />
              <h2 className="text-white font-semibold text-lg">{sectionName}</h2>
            </div>

            <div className="space-y-4">
              {sectionFields.map(field => (
                <div key={field.id} className="space-y-2">
                  <label className="text-zinc-400 text-sm font-medium">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={field.value}
                      onChange={(e) => updateField(field.id, e.target.value)}
                      rows={3}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-3 text-white text-sm leading-relaxed focus:outline-none focus:border-sky-500 transition-colors resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => updateField(field.id, e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Save Button */}
      {hasChanges && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-sky-500 text-white text-sm font-bold rounded-lg hover:bg-sky-400 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
}
