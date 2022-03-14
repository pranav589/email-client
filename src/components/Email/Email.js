import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmail } from "../../features/emails/emailSlice";
import "./Email.css";

function Email({ email, showDetails }) {
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  const getFirstLetter = (name) => {
    const letter = name.charAt(0);
    return <span className="initials">{letter.toUpperCase()}</span>;
  };

  const dateTimeConvert = (date) => {
    const initial_date = new Date(date);
    const new_date = new Date(initial_date);
    const final_date = new_date.toLocaleDateString();
    const time = new_date.toString().split(" ");

    return (
      <div className="email__other">
        {final_date} {time[4]}{" "}
        <span className={`${isFav ? "red" : ""}`}>Favorite</span>
      </div>
    );
  };

  const getEmailResult = () => {
    dispatch(getEmail(email.id));
    showDetails(email);
  };

  const favs = useSelector((state) => state.favs);

  useEffect(() => {
    favs.favs.map((item) =>
      item.id === email?.id ? setIsFav(true) : setIsFav(false)
    );
  }, [favs]);

  return (
    <div className="email__container" onClick={getEmailResult}>
      <section className="email__avatar">
        {getFirstLetter(email?.from?.name)}
      </section>
      <section className="email__details">
        <div className="email__from">
          <span>From: </span> {email?.from?.name} {email?.from?.email}
        </div>
        <div className="email__sub">
          <span>Subject: </span> {email.subject}
        </div>
        <div className="email__shortDesc">{email.short_description}</div>
        {dateTimeConvert(email.date)}
      </section>
    </div>
  );
}

export default Email;
