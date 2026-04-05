import React from 'react';
import { User, Bell, Shield, Globe, Save } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function SettingsView() {
  const { role } = useAppContext();

  const sections = [
    { 
      title: 'Profile Information', 
      icon: User,
      fields: [
        { label: 'Full Name', value: 'Alex Jhonson', type: 'text' },
        { label: 'Email Address', value: 'alex.j@example.com', type: 'email' },
      ]
    },
    { 
      title: 'Security', 
      icon: Shield,
      fields: [
        { label: 'Password', value: '********', type: 'password' },
        { label: 'Two-Factor Authentication', value: 'Enabled', type: 'toggle' },
      ]
    },
  ];

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-900 dark:bg-slate-700 rounded-xl text-white shadow-lg">
          <Globe size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Account Settings</h1>
          <p className="text-xs text-slate-500 font-medium">Manage your personal information and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="card p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-500/20 border-4 border-white dark:border-slate-800">
              AJ
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Alex Jhonson</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-6">{role} Account</p>
            <button className="w-full btn-primary py-3">Upload Photo</button>
          </div>

          <div className="card p-4 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <User size={18} /> Account
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
              <Bell size={18} /> Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
              <Shield size={18} /> Privacy
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="card overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <section.icon size={20} className="text-blue-600" />
                <h3 className="font-bold text-slate-900 dark:text-white">{section.title}</h3>
              </div>
              <div className="p-6 space-y-6">
                {section.fields.map((field) => (
                  <div key={field.label} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{field.label}</label>
                    <div className="sm:col-span-2 relative">
                      <input 
                        type={field.type} 
                        defaultValue={field.value}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-4">
            <button className="px-8 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">Cancel</button>
            <button className="px-8 py-3 btn-primary flex items-center gap-2">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
