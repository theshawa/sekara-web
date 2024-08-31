import { useCallback, useEffect, useState } from "react";
import { apiWithAuth } from "../../api";
import { useAppContext } from "../../context";
import { useHandleApiError } from "../../hooks/useHandleApiError";
import { useOnlyForAdmin } from "../../hooks/useOnlyForAdmin";
import { LoadingSpinner } from "../../layout/loading-screen";
import { formatDate } from "../../utils";

const UserRow = ({ user, refresh }) => {
  const [deactivating, setDeactivating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [makingAdmin, setMakingAdmin] = useState(false);
  const handleError = useHandleApiError();
  const { setAuth } = useAppContext();

  const deactivate = async () => {
    setDeactivating(true);
    try {
      await apiWithAuth().post(`/user/deactivate/${user._id}`);
      refresh();
    } catch (error) {
      handleError(error, "deactivate user");
    } finally {
      setDeactivating(false);
    }
  };

  const deleteUser = async () => {
    setDeleting(true);
    try {
      const yes = confirm("Are you sure you want to delete this user?");
      if (!yes) {
        setDeleting(false);
        return;
      }
      await apiWithAuth().delete(`/user/${user._id}`);
      refresh();
    } catch (error) {
      handleError(error, "delete user");
    } finally {
      setDeleting(false);
    }
  };

  const makeAdmin = async () => {
    setMakingAdmin(true);
    try {
      const yes = confirm(
        "Are you sure you want to make this user an admin? This action is irreversible."
      );
      if (!yes) {
        setMakingAdmin(false);
        return;
      }
      await apiWithAuth().post(`/user/make-admin/${user._id}`);
      setAuth(null);
      localStorage.removeItem("auth");
    } catch (error) {
      handleError(error, "make admin");
    } finally {
      setMakingAdmin(false);
    }
  };

  return (
    <tr>
      <td scope="col" className="px-6 py-3">
        {user.firstName} {user.lastName}
      </td>
      <td scope="col" className="px-6 py-3">
        {user.role}
      </td>
      <td scope="col" className="px-6 py-3">
        {user.description}
      </td>
      <td scope="col" className="px-6 py-3">
        {formatDate(new Date(user.createdAt))}
      </td>
      <td scope="col" className="px-6 py-3">
        {user.deactivated ? "Yes" : "No"}
      </td>
      <td scope="col" className="px-6 py-3 flex space-x-2">
        <button
          onClick={deactivate}
          disabled={deactivating}
          className="action-btn"
        >
          {deactivating
            ? "Deactivating..."
            : user.deactivated
            ? "Activate"
            : "Deactivate"}
        </button>
        <button onClick={deleteUser} disabled={deleting} className="action-btn">
          {deleting ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={makeAdmin}
          disabled={makingAdmin}
          className="action-btn"
        >
          {makingAdmin ? "Making Admin..." : "Make Admin"}
        </button>
      </td>
    </tr>
  );
};

export const AdminUsersPage = () => {
  useOnlyForAdmin();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleError = useHandleApiError();

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiWithAuth().get("/user");
      setUsers(data);
    } catch (error) {
      handleError(error, "load users");
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  useEffect(() => {
    loadUsers();
    // const interval = setInterval(loadTopics, 60 * 1000);
    // return () => clearInterval(interval);
  }, [loadUsers]);
  return (
    <div className="flex flex-col mt-10">
      <h1 className="mb-5">Manage Users</h1>
      <div className="flex mb-10 space-x-5 items-center">
        <button className="action-btn" disabled={loading} onClick={loadUsers}>
          Refresh
        </button>
      </div>

      <div className="relative overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-slate-600">
          <thead className="text-xs text-slate-700 uppercase bg-slate-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Joined At
              </th>
              <th scope="col" className="px-6 py-3">
                Deactivated
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-100">
            {users.map((user) => (
              <UserRow key={user._id} user={user} refresh={loadUsers} />
            ))}
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="mx-auto mt-10">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
