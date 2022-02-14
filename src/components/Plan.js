import React, { useState } from "react";
import NavPage from "./NavPage";
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
import { format, getDate } from "date-fns";
import { Button, Row, Col, Container } from "react-bootstrap";

export default function Plan({ datFromDb }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const collectionRef = collection(db, "phases");
  const [symp, setSymptoms] = useState();
  const [recommendations, setRecommendations] = useState();
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);

  const handlePlans = () => {
    const fullMonth = 30;
    const datePicked = format(selectedDate, "dd");
    console.log(datePicked);
    // console.log(datFromDb);
    const dbDate = getDate(new Date(datFromDb));
    console.log(dbDate);
    const sevenAdded = (dbDate + 7) % fullMonth;
    const fourteenAdded = (dbDate + 14) % fullMonth;
    const twentyoneAdded = (dbDate + 21) % fullMonth;
    const twentyeightAdded = (dbDate + 29) % fullMonth;

    const helperFun = async (week) => {
      setLoading(true);

      const coming = await getDocs(collectionRef);
      coming.docs.forEach((doc) => {
        if (doc.id === week) {
          console.log(`hi from ${week}`);
          setSymptoms(doc.data().Symptoms);
          console.log(doc.data().Symptoms);
          setRecommendations(doc.data().Recommendations);
          setLoading(false);
        }
      });
    };

    if (datePicked >= dbDate && datePicked < sevenAdded) {
      console.log("the first week");
      helperFun("firstWeek");
      setFirst(true);
      setSecond(false);
      setThird(false);
      setFourth(false);
    } else if (datePicked >= sevenAdded && datePicked < fourteenAdded) {
      console.log("second week");
      helperFun("secondWeek");
      setSecond(true);
      setFirst(false);
      setThird(false);
      setFourth(false);
    } else if (datePicked >= fourteenAdded && datePicked < twentyoneAdded) {
      console.log("third week");
      helperFun("thirdWeek");
      setThird(true);
      setFirst(false);
      setSecond(false);

      setFourth(false);
    } else if (datePicked >= twentyoneAdded && datePicked <= twentyeightAdded) {
      console.log("fourth week");
      helperFun("fourthWeek");
      setFourth(true);
      setFirst(false);
      setSecond(false);
      setThird(false);
    }
  };

  const handleSymptoms = () => {
    console.log("reaching here");
    return (
      !loading && (
        <div>
          <h4>Symptoms</h4>
          <ul>
            {symp.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </div>
      )
    );
  };

  const handleRecommendations = () => {
    console.log(!loading);
    return (
      !loading && (
        <div>
          <h4>Recommendations</h4>
          <ul>
            {recommendations.map((item) => {
              console.log(item);
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </div>
      )
    );
  };
  return (
    <div>
      <NavPage />
      <Container>
        <Row>
          <Col>
            <div className="text-start m-4">
              <p>
                Calendar notes can really make a difference, so consider
                tracking your cycle to make the most of each month!  A woman’s
                menstrual cycle is divided into four phases: • menstrual phase •
                follicular phase • ovulation phase and luteal phase.
              </p>

              <p>
                You can pick a date from the month and understand the symptoms
                you might be expecting based on your menstrual start date; and
                also explore recommended activities. Take the most out of the
                days.{" "}
              </p>
            </div>

            <div className="text-center">
              <Row>
                <div className="mb-4 mt-4">
                  <h5>Are you ready to explore?</h5>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(da) => setSelectedDate(da)}
                    // isClearable
                    showYearDropdown
                    scrollableYearDropdown
                  />
                </div>
              </Row>
              <Button
                onClick={() => {
                  handlePlans();
                  // handleSymptoms();
                }}
              >
                Let's do it!
              </Button>
              {/* {!loading && (
          <ul>
            {console.log(!loading)}
            {symp.map((item) => {
              console.log(item);
              return <li key={item}>{item}</li>;
            })}
          </ul>
        )} */}
            </div>
          </Col>
          <Col>
            <Row>
              <Col>{handleSymptoms()}</Col>
              <Col>
                {first && (
                  <img
                    style={{ height: 500, width: 300 }}
                    src="/images/startweek.png"
                    alt="1week"
                  ></img>
                )}
                {second && (
                  <img
                    className="mt-4"
                    style={{ height: 500, width: 300 }}
                    src="/images/effective.png"
                    alt="2week"
                  ></img>
                )}
                {third && <img src="/images/2week.png" alt="3week"></img>}
                {fourth && (
                  <img
                    style={{ height: 600, width: 400 }}
                    src="/images/4relax.png"
                    alt="4week"
                  ></img>
                )}
              </Col>
            </Row>
            <Row>
              <Col>{handleRecommendations()}</Col>
              <Col>
                {second && (
                  <img
                    style={{ height: 500, width: 300 }}
                    src="/images/2week.png"
                    alt="2week"
                  ></img>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
