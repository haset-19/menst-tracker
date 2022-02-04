import { React, useEffect, useRef, useState } from "react";
import {
  Card,
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import NavPage from "./NavPage";

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
  const docId = "";
  const [changeTitle, setChangeTitle] = useState();

  const handleTitle = function (e) {
    setUserTitle(e.target.value);
  };

  const handleName = (e) => {
    setUserName(e.target.value);
  };

  async function handleLogOut() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  async function deletePro() {
    const userDoc = doc(db, "users", userId);
    await deleteDoc(userDoc);
  }

  async function updatePro() {
    const userDoc = doc(db, "users", userId);
    console.log(userId);
    const newFields = { title: "The title has changed" };
    await updateDoc(userDoc, newFields);
    setChangeTitle("The title has changed");
  }

  async function postNewDoc(e) {
    e.preventDefault();
    try {
      const specifyDoc = doc(db, "users", userId);
      const docRef = await setDoc(specifyDoc, {
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

  // async function postNewDoc(e) {
  //   e.preventDefault();
  //   try {
  //     const docRef = await addDoc(collectionRef, {
  //       title: userTitle,
  //       name: userName,
  //       userId: userId,
  //     });
  //     setUserTitle("");
  //     setUserName("");
  //     docId = docRef.id;
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

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

  // const updateCycles = async () => {};
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
    <div
    // className="try"
    // style={{ backgroundColor: "#FFD180" }}

    // style={{
    //   backgroundImage:
    //     "url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')",
    // }}
    >
      <div>
        <NavPage />
        <Container>
          <Row>
            <Col>
              <h3 className="mt-3">Facts</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Aliquam nulla facilisi cras fermentum. Et egestas quis ipsum
                suspendisse. Est sit amet facilisis magna etiam tempor orci.
                Senectus et netus et malesuada fames ac turpis. Morbi quis
                commodo odio aenean sed. Eu tincidunt tortor aliquam nulla.
                Blandit volutpat maecenas volutpat blandit aliquam etiam erat
                velit. Libero enim sed faucibus turpis in. Dolor sit amet
                consectetur adipiscing elit duis tristique sollicitudin.
                Tincidunt eget nullam non nisi est sit. Id ornare arcu odio ut
                sem nulla pharetra diam.
              </p>
              <img
                src="https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg"
                alt="Getty Images"
                jsaction="load:XAeZkd;"
                jsname="HiaYvf"
                className="n3VNCb"
                data-noaft="1"
                style={{ width: 656.936, height: 495, margin: 0 }}
              ></img>
            </Col>
            {/* <Row> */}
            {/* <NavPage />
        </Row> */}
            <Col>
              <Row className="text-end">
                <div>
                  <Col>
                    {/* <h2 className="text-center mb-4">Profile</h2> */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div>
                      {/* // className="mt-5 d-flex justify-content-left"> */}
                      <strong>Email:</strong>
                      {currentUser.email}
                    </div>
                    {/* <Link to="update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link> */}
                  </Col>
                </div>
              </Row>

              <Row className="text-end">
                <Col>
                  <Button variant="link" onClick={handleLogOut}>
                    Log Out
                  </Button>
                </Col>
              </Row>
              {/* <Row>
          <Col>
            <h2>{userId}</h2>
          </Col>
        </Row> */}

              <Col className="mb-4">
                <Form onSubmit={postNewDoc}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={userTitle}
                    onChange={handleTitle}
                  ></input>
                  <label>Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={handleName}
                  ></input>
                  <input type="submit" label="Submit"></input>
                </Form>
              </Col>
              <Row>
                <Col>
                  <h3 className="w-100 mb-4">
                    Click in the box to pick a date
                  </h3>
                </Col>
              </Row>
              <Row></Row>

              <div className="mb-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={(da) => setSelectedDate(da)}
                  // isClearable
                  showYearDropdown
                  scrollableYearDropdown
                />
              </div>

              <div className="mb-4">
                {" "}
                The date you picked is {selectedDate.toDateString()}. Click the
                button to confirm. <br />
                <Button>Confirm</Button>
              </div>

              <div>
                <h4>Do you want to see your profile? </h4>
                <Button onClick={getUserFiltered}>Show profile</Button>
                {mensStart ? (
                  <Alert variant="danger">Your Title is {mensStart}</Alert>
                ) : (
                  ""
                )}
              </div>
              <Row className="mt-4">
                <Col>
                  <Button onClick={updatePro}>Update Profile</Button>
                  {changeTitle ? (
                    <Alert variant="danger">Your Title is {changeTitle}</Alert>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <Button onClick={deletePro}>Delete Profile</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
