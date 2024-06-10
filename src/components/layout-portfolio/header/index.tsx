import { Button, Flex } from "antd";

import "./index.scss";
import { FaAlignRight } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="header">
      <div className={menu ? "nav-menu " : "nav-menu none"}>
        <ul>
          <li>
            <a href="#hero">Home</a>
          </li>
          <li>
            <a href="#resume">Services</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li> 
        </ul>
      </div>
      <Flex className="container nav" justify="space-between" align="center">
        <a href="/" className="logo">
          Asilbek <span>.</span>
        </a>
        <ul>
          <li>
            <a href="#hero">Home</a>
          </li>
          <li>
            <a href="#resume">Services</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <Button>Hire me</Button>
          </li>
          <FaAlignRight onClick={handleMenu} className="menu-icon" />
        </ul>
      </Flex>
    </div>
  );
};

export default Header;
