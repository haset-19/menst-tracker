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
import { Button, Row, Col } from "react-bootstrap";

export default function Plan({ datFromDb }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const collectionRef = collection(db, "phases");
  const [symp, setSymptoms] = useState();
  const [recommendations, setRecommendations] = useState();
  const [loading, setLoading] = useState(true);

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
    } else if (datePicked >= sevenAdded && datePicked < fourteenAdded) {
      console.log("second week");
      helperFun("secondWeek");
    } else if (datePicked >= fourteenAdded && datePicked < twentyoneAdded) {
      console.log("third week");
      helperFun("thirdWeek");
    } else if (datePicked >= twentyoneAdded && datePicked <= twentyeightAdded) {
      console.log("fourth week");
      helperFun("fourthWeek");
    }
  };

  const handleSymptoms = () => {
    console.log("reaching here");
    return (
      !loading && (
        <ul>
          {symp.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      )
    );
  };

  const handleRecommendations = () => {
    console.log(!loading);
    return (
      !loading && (
        <ul>
          {recommendations.map((item) => {
            console.log(item);
            return <li key={item}>{item}</li>;
          })}
        </ul>
      )
    );
  };
  return (
    <div>
      <NavPage />
      <div className="text-center">
        <Row>
          <div className="mb-4 mt-4">
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
          Confirm
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
        {handleSymptoms()}
        {handleRecommendations()}
      </div>
    </div>
  );
}
