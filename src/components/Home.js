import { React, useState, useEffect } from "react";
import { parseISO, format, fromUnixTime, getYear, getDay } from "date-fns";
import { Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Plan from "./Plan";
import "./Home.css";
import Image from "react-bootstrap/Image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import NavPage from "./NavPage";
import { daysToWeeks } from "date-fns/esm";

export default function Home(props) {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { currentUser, logout, userId } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date()); //for the date picker bse it need object
  //to render inside jsx,b/se react doesn't know how to display object. it should be array or strings etc
  const collectionRef = collection(db, "users");
  const [sucessMsg, setSuccessMsg] = useState("");
  const [getMsg, setGetMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
      const specifyDoc = doc(db, "users", userId);
      const docRef = await setDoc(specifyDoc, {
        cycleStart: selectedDate,
        userId: userId,
      });
      setSuccessMsg("You have saved your data successfully!");
      console.log("Document written with ID: ", docRef.id);
    } catch {
      setErrorMsg("Error in saving");
    }
  }
  useEffect(() => {
    console.log(currentUser);
    const fetchData = async () => {
      console.log("hjhhhhh");
      const snapshot = await getDocs(collectionRef);
      const datas = snapshot.docs;
      console.log("ahunimakkk ");
      // console.log(datFromDb);
      console.log(datas);
      console.log(currentUser.uid);
      if (datas.length !== 0) {
        let found = false;
        datas.forEach((doc) => {
          // console.log("each thing");
          // console.log(doc.data());
          console.log(doc.data().userId);
          if (doc.data().userId === currentUser.uid) {
            //if the user has userId in the db, then there is cycleStart also
            const dateVar = doc.data().cycleStart.toJSON();
            const date = fromUnixTime(dateVar.seconds);
            // console.log(date);
            // console.log(datFromDb);
            const dateFormatted = format(date, "MM/dd/yyyy");
            // console.log(dateFormatted);
            setGetMsg(`Your cyle start date is ${dateFormatted}`);
            props.setdateFromDb(dateFormatted);
            setSelectedDate(new Date(dateFormatted));
            found = true;
          }
        });
        if (!found) {
          setGetMsg("You haven't selected a date, please pick one.");
        }
      } else {
        console.log("not kksnapshots");
        // console.log(dateFromDb);
        setGetMsg("You haven't selected a date, please pick one.");
      }
    };
    fetchData();
  }, [sucessMsg]);

  async function updateDate() {
    const userDoc = doc(db, "users", userId);
    const newFields = { cycleStart: selectedDate };
    await updateDoc(userDoc, newFields);

    setGetMsg(`Your cyle start date is ${format(selectedDate, "MM/dd/yyyy")}`);
  }

  async function deletePro() {
    const userDoc = doc(db, "users", userId);
    await deleteDoc(userDoc);
    setGetMsg("You have successfully deleted your data.");
    navigate("/deleteMsg");
  }

  const handlePlan = function () {
    navigate("/plan");
  };

  return (
    <div
      className="try"
      // style={{
      //   backgroundImage:
      //     "url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')",
      // }}
    >
      <div>
        <NavPage />
        <Container>
          <Row className="text-end">
            <div>
              <Col>
                {error && <Alert variant="danger">{error}</Alert>}
                <div>
                  <strong>Email:</strong>
                  {currentUser.email}
                </div>
              </Col>
            </div>
          </Row>
          <Row>
            <Col className="me-4">
              <h3 className="mt-3">Facts</h3>
              <p>
                Several studies have investigated the relationship between
                behavioral changes and the menstrual cycle in female at a
                reproductive age.The brain and ovaries are constantly
                interacting to create hormone level changes over the course of
                each menstrual cycle. Different hormones dominate in different
                cycle phases and they influence mental and physical fitness.
                Understanding how hormone levels change during the menstrual
                cycle can help to better anticipate symptoms, adjust routines
                and optimize life.
              </p>

              <img
                src="https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg"
                alt="Getty Images"
                jsaction="load:XAeZkd;"
                jsname="HiaYvf"
                className="n3VNCb rounded-circle"
                data-noaft="1"
                style={{ width: 656.936, height: 495, margin: 0 }}
              ></img>
            </Col>
            <Col className="ms-4">
              <Row className="text-end">
                <Col>
                  <Button variant="link" onClick={handleLogOut}>
                    Log Out
                  </Button>
                </Col>
              </Row>
              <p>
                To get customized information, please make sure you choose your
                latest menstrual starting date.
              </p>
              {getMsg === "You haven't selected a date, please pick one." && (
                <div>
                  <Row>
                    <Col>
                      <h3 className="w-100 mb-4">{getMsg}</h3>
                    </Col>
                  </Row>
                  <Row>
                    <div className="mb-4">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(da) => setSelectedDate(da)}
                        // isClearable
                        showYearDropdown
                        scrollableYearDropdown
                      />
                    </div>
                  </Row>

                  <div className="mb-4">
                    The date you picked is {format(selectedDate, "MM/dd/yyyy")}.
                    Click the button to confirm. <br />
                    <Button
                      onClick={(e) => {
                        postNewDoc(e);
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              )}

              {props.datFromDb ? ( //if selectedDate is true or not empty, render selectedDate if you want, otherwise render the rest of the code after &&
                <div>
                  <Row className="mt-4">
                    <Col>
                      <h6>{getMsg}</h6>
                      <h6 className="mt-3">Change the date?</h6>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(da) => setSelectedDate(da)}
                        // isClearable
                        showYearDropdown
                        scrollableYearDropdown
                      />
                      <Button className="mt-2" onClick={updateDate}>
                        Update
                      </Button>
                      {props.datFromDb && (
                        <Alert variant="danger">
                          Your new date is {props.datFromDb}
                        </Alert>
                      )}
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <h6>Delete your date?</h6>
                      <Button className="mb-4" onClick={deletePro}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        Each week, hormone levels including estrogen and
                        progesterone changes.{" "}
                      </p>
                      <p>
                        Planning key events during the days and weeks a woman
                        possibly be more effective makes a difference. Most
                        women can think clearly, talk influencially and achieve
                        high results during a certain time of a month.
                      </p>
                      <p>
                        We can help you choose dates from a calendar, show
                        expected symptoms and recommended activities week by
                        week basis. You can benefit from making an informed
                        decision.
                      </p>
                      <Button
                        onClick={() => {
                          //
                          console.log("working");
                          handlePlan();
                        }}
                      >
                        Plan your events
                      </Button>
                    </Col>
                  </Row>
                </div>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
