import React, { useEffect, useState } from "react";
import Email from "../../components/Email/Email";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { getEmails, reset } from "../../features/emails/emailSlice";
import EmailDetails from "../EmailDetails/EmailDetails";
import Filtering from "../../components/Filtering/Filtering";

function Dashboard() {
  const [isShowDetail, setisShowDetail] = useState(false);
  const dispatch = useDispatch();
  const [emailData, setEmailData] = useState({});
  const { emails, isLoading, isError, message } = useSelector(
    (state) => state.emails
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getEmails());
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const showDetails = (data) => {
    setisShowDetail(true);
    setEmailData(data);
  };

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  return (
    <div className="dashboard">
      <Filtering />
      {isShowDetail ? (
        <div className="dashboard__moreDetails">
          <div>
            {emails?.list?.map((email) => (
              <Email
                email={email}
                showDetails={showDetails}
                isShowDetail={isShowDetail}
                key={email?.id}
              />
            ))}
          </div>
          <div>
            <EmailDetails isShowDetail={isShowDetail} emailData={emailData} />
          </div>
        </div>
      ) : (
        <div>
          {emails?.list?.map((email) => (
            <Email
              email={email}
              showDetails={showDetails}
              isShowDetail={isShowDetail}
              key={email?.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
