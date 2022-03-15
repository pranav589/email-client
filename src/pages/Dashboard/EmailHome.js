import React, { useEffect, useState } from "react";
import moment from "moment";
import "./EmailHome.css";
import {
  getEmails,
  getEmailDataWithId,
} from "../../services/emailHome.service";
import ShowIfPropTrue from "../../utils/ShowIfPropTrue";

export default function EmailHome() {
  const [userEmails, setUserEmails] = useState([]);
  const [showDetailedEmail, setShowDetailedEmail] = useState(false);
  const [detailedEmailMeta, setDetailedEmailMeta] = useState({});
  const [currentEmailDetails, setCurrentEmailDetails] = useState([]);
  const [userEmailsCount, setUserEmailsCount] = useState([]);

  const [fav, setFav] = useState(false);

  useEffect(() => {
    getEmails().then((resp) => {
      resp.list.forEach((item) => {
        item.isRead = false;
        item.isFav = false;
      });
      setUserEmails(resp.list);

      setUserEmailsCount(resp.total);
    });
  }, []);

  function emailCardClickHandler(data) {
    getEmailDataWithId({ id: data.id }).then((resp) => {
      setCurrentEmailDetails(resp);
      setShowDetailedEmail(true);

      let _userEmails = [...userEmails];
      _userEmails[
        _userEmails.findIndex((item) => item.id === data.id)
      ].isRead = true;
      setUserEmails(_userEmails);
    });
  }

  function onlyShowUnread() {
    let _userEmails = [...userEmails];
    setUserEmails(_userEmails.filter((item) => item.isRead === false));
    setUserEmailsCount(
      _userEmails.filter((item) => item.isRead === false).length
    );
  }

  const handleFav = (data) => {
    setFav(true);
    let _userEmails = [...userEmails];
    _userEmails[
      _userEmails.findIndex((item) => item.id === data.id)
    ].isFav = true;
    setUserEmails(_userEmails);
  };

  const onlyShowFav = () => {
    let _userEmails = [...userEmails];
    setUserEmails(_userEmails.filter((item) => item.isFav === true));
    setUserEmailsCount(
      _userEmails.filter((item) => item.isFav === true).length
    );
  };

  return (
    <>
      <div className={"pageWrapper"}>
        <ShowIfPropTrue prop={showDetailedEmail}>
          <div className={"detailedEmailWrapper"}>
            <> {JSON.stringify(detailedEmailMeta["from"])}</>
            <div className="email__detailsHeader">
              <div className="user-avatar">
                <span className="initials">{"D"}</span>
              </div>
              <div>
                <div>
                  From :{" "}
                  <b>
                    {"Dummy Name"} {"<" + "dummyEmail@google.com" + ">"}{" "}
                  </b>
                </div>
                <div>
                  {moment(detailedEmailMeta.date).format("DD/MM/YYYY HH:MM")}
                </div>
              </div>
              <button
                className="fav__button"
                onClick={() => handleFav(currentEmailDetails)}
              >
                {fav ? "Added" : "Add as Favorite"}
              </button>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: currentEmailDetails.body }}
            />
          </div>
        </ShowIfPropTrue>
        <div className={"emailCardWrapper"}>
          <>
            <div className="filters">
              <div>
                Filter by:
                <button className="buttonStyle" onClick={onlyShowUnread}>
                  Unread
                </button>
                <button className="buttonStyle">Read</button>
                <button className="buttonStyle" onClick={onlyShowFav}>
                  Favourite
                </button>
              </div>
              <div>{"Showing " + userEmailsCount + " emails."}</div>
            </div>
            {userEmails.map((item) => {
              return (
                <div
                  className={
                    "emailCard" +
                    (showDetailedEmail === true ? " halfScreenView" : "") +
                    (item.isRead === true ? " readEmail" : "")
                  }
                  onClick={() => {
                    emailCardClickHandler(item);
                  }}
                  key={item.id}
                >
                  <div className="user-avatar">
                    <span className="initials">{item.from.name.charAt(0)}</span>
                  </div>
                  <div className="email__detail">
                    <div>
                      From :{" "}
                      <b>
                        {item.from.name} {"<" + item.from.email + ">"}{" "}
                      </b>
                    </div>
                    <div>
                      Subject <b> : {item.subject} </b>
                    </div>
                    <div>{item.short_description}</div>
                    <div>{moment(item.date).format("DD/MM/YYYY HH:MM")}</div>
                  </div>
                </div>
              );
            })}
          </>
        </div>
      </div>
    </>
  );
}
