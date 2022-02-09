import React from "react";
import { Link } from "react-router-dom";

export default function DeleteMsg() {
  return (
    <div>
      <h6 className="mt-2 text-center" style={{ color: "red" }}>
        You have successfully deleted your data. Go back to home page.
      </h6>
      <div className="text-center">
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}
