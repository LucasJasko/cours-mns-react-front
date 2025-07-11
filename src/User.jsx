import { useState } from "react";

export default function User({ id, user, users, setUsers, tel, country }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedtName, setEditedName] = useState(user);
  const [editedPhone, setEditedPhone] = useState(tel || "");
  const [editedCountry, setEditedCountry] = useState(country || "");

  function deleteUser(id) {
    const updatedUsers = users.filter((item, i) => i !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }

  function handleEditToggle() {
    if (isEditing) {
      setEditedName(user);
      setEditedPhone(tel || "");
    }
    setIsEditing(!isEditing);
  }

  function handleSave() {
    const updatedUsers = users.map((item, i) => {
      if (i == id) {
        return {
          name: editedtName.trim(),
          tel: editedPhone.trim(),
          country: editedCountry.trim(),
        };
      }
      return item;
    });

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsEditing(false);
  }

  return (
    <li className="user-item">
      {isEditing ? (
        <div className="user-edit-form">
          <input type="text" value={editedtName} onChange={(e) => setEditedName(e.target.value)} placeholder="Nom" autoFocus />
          <input type="tel" value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} placeholder="Telephone" autoFocus />
          <input type="text" value={editedCountry} onChange={(e) => setEditedCountry(e.target.value)} placeholder="Pays" autoFocus />
          <div className="edit-button">
            <button onClick={handleSave} className="save-btn">
              Sauvegarder
            </button>
            <button onClick={handleEditToggle} className="cancel-btn">
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <div className="user-display">
          <div className="infos">
            {user && <p>Utilisateur: {user}</p>}
            {country && <p>Pays: {country}</p>}
            {tel && <p>Tel: {tel}</p>}
          </div>
          <div className="actions">
            <button onClick={handleEditToggle} className="edit-btn">
              Editer
            </button>
            <button onClick={() => deleteUser(id)} className="delete-btn">
              Supprimer
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
