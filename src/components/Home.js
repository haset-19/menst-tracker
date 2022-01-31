import { React, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  async function handleLogOut() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="decorate">
        <div>
          {/* <h2 className="text-center mb-4">Profile</h2> */}
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong>
          {currentUser.email}
          {/* <Link to="update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link> */}
        </div>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      </div>
      <h3 className="w-100 text-center mb-4">
        Click in the box to pick a date
      </h3>
      <DatePicker
        selected={selectedDate}
        onChange={(da) => setSelectedDate(da)}
        isClearable
        showYearDropdown
        scrollableYearDropdown
      />
      <div>{selectedDate.toDateString()}</div>
    </>
  );
}
