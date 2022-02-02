import { React, useEffect, useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [error, setError] = useState();
  const { currentUser, logout, userId } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const collectionRef = collection(db, "users");
  const [userTitle, setUserTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [mensStart, setMensStart] = useState("");
  const { clack } = useRef();
  const [da, setDa] = useState();

  const handleTitle = function (e) {
    setUserTitle(e.target.value);
  };

  const handleName = (e) => {
    setUserName(e.target.value);
  };

  // const handleCycles = (e) => {
  //   setMensStart(e.t)
  // }
  async function handleLogOut() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  async function postNewDoc(e) {
    e.preventDefault();
    try {
      const docRef = await addDoc(collectionRef, {
        title: userTitle,
        name: userName,
        userId: userId,
      });
      setUserTitle("");
      setUserName("");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // const getUserFiltered = async () => {
  //   try {
  //     const snapshot = await collectionRef.doc(userId).get();
  //     const data = snapshot.data();
  //     setDa(data.title);
  //   } catch {
  //     console.log("Errorsssss");
  //   }
  // };

  const getUserFiltered = async () => {
    // try {
    const snapshot = await getDocs(collectionRef);
    snapshot.forEach((doc) => {
      if (doc.data().userId === userId) {
        setMensStart(doc.data().title);
      }
    });
  };

  const updateCycles = async () => {};
  // console.log(snapshot.data());

  //   snapshot.data.forEach((user) => {
  //     if (user.userId === userId) {
  //       setMensStart(user.name);
  //       // if (user.docId === userId) {

  //       // }
  //     }
  //   });
  // } catch {
  //   console.log(error);
  // }

  //   getUserFiltered();
  // }, []);

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
          <h2>{userId}</h2>
        </div>
      </div>
      <h3 className="w-100 text-center mb-4">
        Click in the box to pick a date
      </h3>

      <Form onSubmit={postNewDoc}>
        <label>Title</label>
        <input type="text" value={userTitle} onChange={handleTitle}></input>
        <label>Name</label>
        <input type="text" value={userName} onChange={handleName}></input>
        <input type="submit" label="Submit"></input>
      </Form>

      <DatePicker
        selected={selectedDate}
        onChange={(da) => setSelectedDate(da)}
        isClearable
        showYearDropdown
        scrollableYearDropdown
      />
      <div>{selectedDate.toDateString()}</div>

      <button onClick={getUserFiltered}>Show profile</button>
      <h1>{mensStart}</h1>
      {/* {document.getElementById("click").addEventListener("click", here)} */}
    </>
  );
}
