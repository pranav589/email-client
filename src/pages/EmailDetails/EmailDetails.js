import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmail, reset } from "../../features/emails/emailSlice";
import "./EmailDetails.css";
import { addToFav } from "../../features/favorites/favSlice";

function EmailDetails({ emailData }) {
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const { email, isLoading, isError, message } = useSelector(
    (state) => state.emails
  );
  const favs = useSelector((state) => state.favs);
  const dateTimeConvert = (date) => {
    const initial_date = new Date(date);
    const new_date = new Date(initial_date);
    const final_date = new_date.toLocaleDateString();
    const time = new_date.toString().split(" ");

    return (
      <div className="email__other">
        {final_date} {time[4]}
      </div>
    );
  };

  const handleFavorite = (emailData) => {
    dispatch(addToFav(emailData));
  };

  useEffect(() => {
    favs.favs.map((item) =>
      item.id === email?.id ? setIsFav(true) : setIsFav(false)
    );
  }, [favs]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="email__container emailDetail">
        <div className="emailDetail__container">
          <section className="email__avatar">
            <span className="initials">F</span>
          </section>
          <section className="email__details">
            <div className="email__from emailDetail__from">
              {emailData?.from?.name}
            </div>
            {dateTimeConvert(emailData?.date)}
          </section>
          <button
            className="emailDetail__button"
            onClick={() => handleFavorite(emailData)}
          >
            {isFav ? "Remove as Favorite" : "Mark as Favorite"}
          </button>
        </div>
        <div className="emailDetail__body">
          <p>{email?.body}</p>
        </div>
      </div>
    </div>
  );
}

export default EmailDetails;
