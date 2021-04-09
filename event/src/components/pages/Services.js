import React, { useEffect, useState } from "react";
import data from "../../Assets/SliderData";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import "./Services.css";
import axios from "axios";
export default function Services() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getEvent = async () => {
      try {
        const { data } = await axios.get("api/auth/event");
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getEvent();
  }, []);
  const [current, setCurrent] = useState(0);

  // const [imgSrc, setImgSrc] = useState("");
  // const [title, setTitle] = useState("");
  // const [desc, setDesc] = useState("");
  const length = data.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(data) || data.length <= 0) {
    return null;
  }

  if (isLoading) {
    return <h1>.........loading</h1>;
  }

  return (
    <div className="body">
      <AiFillCaretLeft className="left-arrow" onClick={prevSlide} />
      <AiFillCaretRight className="right-arrow" onClick={nextSlide} />
      <div className="containerservices">
        {events.map((event, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <div className="cardservices">
                  <div className="imgBx">
                    <img src={event.imgSrc} alt="" />
                  </div>
                  <div className="contentservices">
                    <h2>{event.title}</h2>
                    <p>{event.desc}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
