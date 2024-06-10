import { Fragment } from "react";
import Typewriter from "typewriter-effect";

import { Flex } from "antd";
import "./index.scss";

const HomePage = () => {
  return (
    <Fragment>
      <Flex className="hero hero-container">
        <h1 className="hero-title">
          <Typewriter
            options={{
              strings: [
                "Create the portfolio of your dreams!!!",
                "Achieve your goals  with us !!!",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <h2 className="hero-desc">
          You may use this website to make your private portfolio.It is so easy
          with us.If you want to start now, you can get 20% discount price for
          your portfolio.In this portfolio , you can download your CV that is so
          vital for you to apply a job.
        </h2>
        <div className="hero-btn-group">
          <a href="#contact">Contact with me</a>
          <a href="resume">My resume</a>
        </div>
      </Flex>
    </Fragment>
  );
};

export default HomePage;
