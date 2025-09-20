import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [accepted, setAccepted] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    fatherName: "",
    age: "",
    gender: "",
  });

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.slice(0, 5).map((emp, index) => ({
          id: index + 1,
          memberId: "M" + (index + 1).toString().padStart(3, "0"),
          firstName: emp.name.split(" ")[0] || "",
          lastName: emp.name.split(" ")[1] || "",
          email: emp.email,
          mobile: "9876543210",
          dob: "1995-01-01",
          fatherName: "N/A",
          age: "25",
          gender: "Male",
          applicationNo: "APP" + (index + 1).toString().padStart(3, "0"),
          paymentStatus: "Pending",
          status: "Active",
          applicationDate: new Date().toLocaleDateString(),
          loginActivity: "Never",
        }));
        setMembers(formatted);
      });
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update Member
  const handleAddOrUpdate = () => {
    const { firstName, lastName, email, mobile, dob, fatherName, age, gender } =
      formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !dob ||
      !fatherName ||
      !age ||
      !gender ||
      !accepted
    ) {
      toast.error("All fields are required and T&C must be accepted!");
      return;
    }

    if (formData.id) {
      const updatedList = members.map((m) =>
        m.id === formData.id ? { ...formData } : m
      );
      setMembers(updatedList);
      toast.info("Member Updated!");
    } else {
      const newMember = {
        ...formData,
        id: members.length + 1,
        memberId: "M" + (members.length + 1).toString().padStart(3, "0"),
        applicationNo: "APP" + (members.length + 1).toString().padStart(3, "0"),
        paymentStatus: "Pending",
        status: "Active",
        applicationDate: new Date().toLocaleDateString(),
        loginActivity: "Never",
      };
      setMembers([...members, newMember]);
      toast.success("Member Added Successfully!");
    }

    setFormData({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      dob: "",
      fatherName: "",
      age: "",
      gender: "",
    });
    setAccepted(false);
    setShowForm(false);
  };

  const handleUpdate = (id) => {
    const member = members.find((m) => m.id === id);
    if (member) {
      setFormData(member);
      setShowForm(true);
      setAccepted(true);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const updatedList = members.filter((m) => m.id !== deleteId);
    setMembers(updatedList);
    setDeleteId(null);
    setShowDeleteConfirm(false);
    toast.error("Member Deleted!");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar${isOpen ? " open" : ""}`}>
        <button className="menu-btn" onClick={toggleMenu}>
          ☰
        </button>
        <ul className="menu-list">
          <li>🏠 Home</li>
          <li>📊 Reports</li>
          <li>📐 Layout</li>
          <li>⚙️ Settings</li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Employee Data</h1>
          <button className="btn add" onClick={() => setShowForm(true)}>
            + Add
          </button>
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th> ID</th>
                <th>Name</th>
                <th>Application No</th>
                <th>Payment Status</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Status</th>
                <th>Application Date</th>
                <th>Login Activity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={i}>
                  <td>{m.memberId}</td>
                  <td>
                    {m.firstName} {m.lastName}
                  </td>
                  <td>{m.applicationNo}</td>
                  <td>{m.paymentStatus}</td>
                  <td>{m.mobile}</td>
                  <td>{m.email}</td>
                  <td>{m.status}</td>
                  <td>{m.applicationDate}</td>
                  <td>{m.loginActivity}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn update"
                        onClick={() => handleUpdate(m.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn delete"
                        onClick={() => handleDelete(m.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>

      {/* Add / Update Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{formData.id ? "Update Member" : "Add New Member"}</h2>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="number"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            <input
              type="text"
              name="fatherName"
              placeholder="Father's Name"
              value={formData.fatherName}
              onChange={handleChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <div className="terms">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span>Accept Terms & Conditions</span>
            </div>
            <div className="modal-actions">
              <button className="btn add" onClick={handleAddOrUpdate}>
                {formData.id ? "Update" : "Add"}
              </button>
              <button className="btn delete" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete?</h3>
            <div className="modal-actions">
              <button className="btn delete" onClick={confirmDelete}>
                Yes
              </button>
              <button
                className="btn update"
                onClick={() => setShowDeleteConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;