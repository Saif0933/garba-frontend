import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import {
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Ban,
  Trash2,
  Eye,
  UserCheck,
  ShieldAlert,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const { users, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter((u) => {
    if (statusFilter !== 'All' && u.status !== statusFilter) return false;
    if (cityFilter !== 'All' && u.city !== cityFilter) return false;
    if (
      search &&
      !u.name.toLowerCase().includes(search.toLowerCase()) &&
      !u.email.toLowerCase().includes(search.toLowerCase()) &&
      !u.city.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleAction = (action: string, userName: string) => {
    showToast(`User Action: ${action}`, `${action} executed for ${userName}`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-heading">
            User Directory & 18+ Verification
          </h1>
          <p className="text-xs text-slate-400">
            Audit, verify identity photos, and manage account statuses.
          </p>
        </div>

        <div className="text-xs font-bold text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          Total Users: <strong className="text-purple-400">{users.length}</strong>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, city..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 text-xs text-white border border-slate-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 rounded-xl bg-slate-950 text-xs text-slate-300 border border-slate-800"
        >
          <option value="All">All Statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="banned">Banned</option>
        </select>

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="p-2 rounded-xl bg-slate-950 text-xs text-slate-300 border border-slate-800"
        >
          <option value="All">All Cities</option>
          <option value="Ranchi">Ranchi</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi NCR">Delhi NCR</option>
        </select>
      </div>

      {/* Users Data Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">City / Area</th>
                <th className="p-4">Age / DOB</th>
                <th className="p-4">Skill (Garba / Dandiya)</th>
                <th className="p-4">Verification</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-purple-500"
                    />
                    <div>
                      <div className="font-bold text-white flex items-center gap-1">
                        <span>{user.name}</span>
                        {user.isPremium && <span className="text-[10px] text-amber-400">★</span>}
                      </div>
                      <span className="text-[11px] text-slate-500">{user.email}</span>
                    </div>
                  </td>

                  <td className="p-4 font-medium">
                    <div>{user.city}</div>
                    <span className="text-[10px] text-slate-500">{user.area}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-white">{user.age} yrs</span>
                    <span className="text-[10px] text-emerald-400 block font-semibold">18+ Verified</span>
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-purple-300">{user.garbaLevel}</div>
                    <span className="text-[10px] text-slate-400">Dandiya: {user.dandiyaLevel}</span>
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        user.status === 'active'
                          ? 'bg-emerald-900/60 text-emerald-300'
                          : user.status === 'suspended'
                          ? 'bg-amber-900/60 text-amber-300'
                          : 'bg-rose-900/60 text-rose-300'
                      }`}
                    >
                      {user.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="View Profile Snapshot"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleAction('Verify Badge', user.name)}
                        className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800"
                        title="Verify"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleAction('Suspend 24h', user.name)}
                        className="p-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-400 border border-amber-800"
                        title="Suspend"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleAction('Permanent Ban', user.name)}
                        className="p-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-800"
                        title="Ban User"
                      >
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Inspector Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full text-white space-y-4 shadow-2xl">
            <div className="flex items-center gap-4 pb-3 border-b border-slate-800">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500"
              />
              <div>
                <h3 className="font-bold text-lg">{selectedUser.name}, {selectedUser.age}</h3>
                <span className="text-xs text-slate-400">{selectedUser.email}</span>
                <span className="text-[11px] text-purple-400 block">{selectedUser.city} · {selectedUser.area}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p><strong>Bio:</strong> "{selectedUser.bio}"</p>
              <p><strong>Skill Levels:</strong> Garba: {selectedUser.garbaLevel} · Dandiya: {selectedUser.dandiyaLevel}</p>
              <p><strong>Looking For:</strong> {selectedUser.lookingFor.join(', ')}</p>
              <p><strong>Preferred Gender:</strong> {selectedUser.preferredGender} ({selectedUser.preferredAgeMin}-{selectedUser.preferredAgeMax} yrs)</p>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-700 text-white"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
