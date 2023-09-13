/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Home.css";
import Cart from "../Cart/Cart";

const Home = () => {
  const [allActors, setAllActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [remaining, setRemaining] = useState (0);
  const [totalCost, setTotalCost] = useState (0);

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setAllActors(data));
  }, []);

  const handleSelectActors = (actor) => {

        const isExist = selectedActors.find(item => item.id == actor.id);
        
        let count = actor.salary;

        if (isExist){
            return alert ('Already Booked')
        }
        else{

            selectedActors.forEach((item) =>{
                count = count + item.salary;
            })
            const totalRemaining = 50000 - count;
            
            if (count > 50000) {
               return alert ('TK ses r hobena');
            }
           else {
            setTotalCost(count);
            setRemaining(totalRemaining);
            setSelectedActors([...selectedActors, actor])
           }
        }
  };
//   console.log(selectedActors);


//   console.log(allActors);
  return (
    <div className="container">
      <div className="home-container">
        <div className="card-container">
          {allActors.map((actor) => (
            <div  key = {actor.id} className="card">
              <div className="card-img">
                <img
                  className="photo"
                  src={actor.image
                  }
                  alt=""
                />
              </div>
              <h2>{actor.name}</h2>
              
                <p>
                  <small>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Accusamus, temporibus.
                  </small>
                </p>
                <div className="info">
                  <p>salary : $ {actor.salary
                                }</p>
                  <p>{actor.role}</p>
                </div>
                <button onClick={() => handleSelectActors(actor)} className="card-btn">Select</button>
            </div>
          ))}
        </div>
        <div className="cart">
         <Cart selectedActors = {selectedActors} remaining = {remaining}
         totalCost = {totalCost}
         ></Cart>
        </div>
      </div>
    </div>
  );
};

export default Home;
