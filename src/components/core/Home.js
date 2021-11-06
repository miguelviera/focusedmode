import React from "react";
import "./Home.css";

import productivity from "./productivity.jpg";
import brain from "./brain.jpg";
import newfocus from "./newfocus.png";
import focusvsdiffuse from "./focusvsdiffuse.png";

const Home = () => {
  return (
    <>
      <div class="row">
        <div class="col justify-content-center title">
          <h3>Using Your Brain Efficiently: Focused Mode.</h3>
          <p>When you are concentrating on a certain topic or concept that you’re
          trying to learn, your brain is in focused mode. In this mode, your
          brain works with familiar ideas to understand a topic in detail. For
          example, you could be studying a chapter and trying to learn the
          vocabulary terms. Your brain is making connections between familiar
          ideas to make sense of the concept. This can be considered the heavy
          lifting mode. FocusedMode is a productivity React App that helps you stay focused when working or studying by using a to-do list, the Pomodoro technique, and a visualization chart to keep track of your progress.</p>
        </div>
      </div>
      <br />
      <div class="row text-center">
        <div class="col">
          <img className="image" src={productivity} />
        </div>
        <div class="col">
          <img className="image" src={brain} />
        </div>
        <div class="w-100"></div>
        <br />
        <div class="col">
          <img className="image" src={newfocus} />
        </div>
        <div class="col">
          <img className="image" src={focusvsdiffuse} />
        </div>
      </div>
      
    </>
  );
};

export default Home;
