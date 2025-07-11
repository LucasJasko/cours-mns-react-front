import { useState } from "react";
import { useUsers } from "./UserContext";

function form() {
  const { addUser, loading } = useUsers();
  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    country: "",
  });
}
