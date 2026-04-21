import React, { useState, useEffect } from "react";
import { User, Mail, MapPin, UserPlus, Save, X } from "lucide-react";

const UserForm = ({ selectedUser, onSubmit, onClose }) => {
  const initialFormState = {
    name: "",
    email: "",
    address: "",
  };

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (selectedUser) {
      setForm(selectedUser);
    } else {
      setForm(initialFormState);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="relative w-full bg-white">
      <button
        onClick={onClose}
        type="button"
        className="absolute -top-2 -right-2 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
        aria-label="Close"
      >
        <X size={20} strokeWidth={2.5} />
      </button>

      <div className="flex items-center gap-2 mb-8 pr-6">
        <div
          className={`p-2 rounded-lg ${selectedUser ? "bg-blue-100" : "bg-green-100"}`}
        >
          {selectedUser ? (
            <Save className="text-blue-600" size={20} />
          ) : (
            <UserPlus className="text-green-600" size={20} />
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          {selectedUser ? "Edit Profile" : "New User"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="relative z-0 w-full mb-6 group flex items-center gap-3">
          <User className="text-gray-400 mt-2" size={18} />
          <div className="relative flex-1">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Full Name
            </label>
          </div>
        </div>

        <div className="relative z-0 w-full mb-6 group flex items-center gap-3">
          <Mail className="text-gray-400 mt-2" size={18} />
          <div className="relative flex-1">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
        </div>

        <div className="relative z-0 w-full mb-10 group flex items-center gap-3">
          <MapPin className="text-gray-400 mt-2" size={18} />
          <div className="relative flex-1">
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Address
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg text-sm px-5 py-3 shadow-lg active:scale-[0.98] transition-transform"
        >
          {selectedUser ? <Save size={18} /> : <UserPlus size={18} />}
          {selectedUser ? "Save Changes" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
