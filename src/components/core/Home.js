import React from "react";
import "./Home.css";

import productivity from "./productivity.jpg";
import brain from "./brain.jpg";
import deep_work from "./deep_work.jpg";
import focusvsdiffuse from "./focusvsdiffuse.png";

const Home = () => {
  return (
    <>
      <div class="row">
        <div class="col justify-content-center title">
          <p>Using Your Brain Efficiently: Focused Mode.</p>
          When you are concentrating on a certain topic or concept that you’re
          trying to learn, your brain is in focused mode. In this mode, your
          brain works with familiar ideas to understand a topic in detail. For
          example, you could be studying a chapter and trying to learn the
          vocabulary terms. Your brain is making connections between familiar
          ideas to make sense of the concept. This can be considered the heavy
          lifting mode.
        </div>
        <p></p>
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
          <img className="image" src={deep_work} />
        </div>
        <div class="col">
          <img className="image" src={focusvsdiffuse} />
        </div>
      </div>
    </>
  );
};

export default Home;
