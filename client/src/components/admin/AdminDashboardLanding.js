import React from "react";
import ApprovalList from "./landingComponents/list";
import InfoCard from "./landingComponents/infoCard";

export default () => {
  return (
    <div>
      <h2>Landing</h2>
      <div className="col s3">
        <ApprovalList />
      </div>
      <div className="col s3">
        <InfoCard />
      </div>
      <div className="col s3">
        <ApprovalList />
      </div>
      <div className="col s3">
        <InfoCard />
      </div>
    </div>
  );
};
