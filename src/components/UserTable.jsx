import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { createUser, deleteUser, fetchUsers, updateUser } from "../api/userApi";
import Loader from "./Loader";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import UserForm from "./UserForm";
import UserView from "./UserView";

const ITEMS_PER_PAGE = 5;

const getUserList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.users)) return response.users;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetchUsers();
        setUsers(getUserList(response));
      } catch (err) {
        setError(err?.message || "Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.address?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / ITEMS_PER_PAGE),
  );
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSubmit = async (formData) => {
    try {
      setError("");
      if (selectedUser?.id) {
        await updateUser(selectedUser.id, formData);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, ...formData } : user,
          ),
        );
      } else {
        const response = await createUser(formData);
        const createdUser = response?.user || response?.data || response;
        if (createdUser?.id) {
          setUsers((prevUsers) => [createdUser, ...prevUsers]);
        } else {
          const refreshedUsers = await fetchUsers();
          setUsers(getUserList(refreshedUsers));
        }
      }
      setSelectedUser(null);
      setShowForm(false);
      setCurrentPage(1);
    } catch (err) {
      setError(err?.message || "Failed to save user.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setViewUser((prevUser) => (prevUser?.id === id ? null : prevUser));
      setDeleteTarget(null);
    } catch (err) {
      setError(err?.message || "Failed to delete user.");
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setShowForm(false);
  };

  const handleAskDelete = (user) => {
    setDeleteTarget(user);
  };

  const handleCloseDeleteModal = () => {
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-5 sm:px-4 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Users List
              </h2>
              <p className="text-sm text-slate-500">
                Browse, search, edit, and remove records.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:items-center">
              <SearchBar value={searchTerm} onChange={handleSearch} />
              <button
                type="button"
                onClick={handleAddUser}
                className="w-full rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
              >
                Add User
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-180 w-full bg-white text-left">
                  <thead className="bg-slate-100 text-sm tracking-wide text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Address</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.length ? (
                      paginatedUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-t border-slate-200 text-slate-700 transition hover:bg-slate-50"
                        >
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {user.name}
                          </td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">{user.address || "N/A"}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => setViewUser(user)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-blue-600 transition hover:bg-blue-50"
                              >
                                <Eye size={15} strokeWidth={2.2} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleEditUser(user)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-green-600 transition hover:bg-green-50"
                              >
                                <Pencil size={15} strokeWidth={2.2} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAskDelete(user)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-red-600 transition hover:bg-red-50"
                              >
                                <Trash2 size={15} strokeWidth={2.2} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-4 py-10 text-center text-slate-500"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-center sm:justify-end">
                <Pagination
                  totalItems={filteredUsers.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
            <UserForm
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              onSubmit={handleSubmit}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl sm:p-6 text-center">
            <h3 className="text-xl font-bold text-slate-900">Delete User?</h3>
            <p className="mt-2 text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-bold">{deleteTarget.name}</span>?
            </p>
            <div className="mt-6 flex gap-3 justify-center">
              <button
                onClick={handleCloseDeleteModal}
                className="px-6 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteTarget.id)}
                className="px-6 py-2 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <UserView user={viewUser} onClose={() => setViewUser(null)} />
    </div>
  );
};

export default UserTable;
