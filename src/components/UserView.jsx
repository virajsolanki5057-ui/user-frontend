import React from "react";
import { X } from "lucide-react";

const UserView = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white shadow-lg overflow-hidden">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">User Information</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-400">
              User ID
            </label>
            <p className="text-gray-900 font-medium">{user.id}</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400">
              Full Name
            </label>
            <p className="text-gray-900 font-medium">{user.name}</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400">
              Email Address
            </label>
            <p className="text-gray-900 font-medium">{user.email}</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400">
              Address
            </label>
            <p className="text-gray-900 font-medium">{user.address || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
