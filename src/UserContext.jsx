import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({
  users: [],
  loading: true,
  addUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
  clearUser: () => {},
  userCount: 0,
});

export function userProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        setUsers(Array.isArray(parsedUsers) ? parsedUsers : []);
      }
    } catch (error) {
      console.error("Erreur lors du chargement dses utilisateur: ", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem("users", JSON.stringify(users));
      } catch (error) {
        console.error("Erreur lors de le sauvegarde: ", error);
      }
    }
  }, [users, loading]);

  const addUser = (userData) => {
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name: userData.name.trim(),
      tel: userData.tel?.trim() || "",
      country: userData.country || "",
      createdAt: new Date().toISOString(),
    };
    const updatedUSers = [...users, newUser];
    setUsers(updatedUSers);
    localStorage.setItem("users", JSON.stringify(updatedUSers));
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const updateUser = (userId, userData) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            ...userData,
            updatedAt: new Date().toISOString(),
          }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const clearUsers = () => {
    setUsers([]);
  };

  const contextValue = {
    users,
    loading,
    addUser,
    deleteUser,
    updateUser,
    clearUsers,
    userCount: users.length,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers doit être utilisé dans un UserProvider");
  return context;
}

export function useUser(userId) {
  const { users } = useContext(UserContext);
  if (!users) throw new Error("useUser doit être utilisé dans un Users Provider");
  return {
    userFind: users.find((user) => user.id === userId) || {},
    userId,
  };
}
