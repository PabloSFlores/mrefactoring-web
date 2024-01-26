import { Menubar } from "primereact/menubar";
import logos from "../assets/img/Group 2.png";
import cenidet from "../assets/img/cenidet.png";
import educacion from "../assets/img/LOGO_SEP.png";
import Tec from "../assets/img/TecNM_logo.png";
import gobierno from "../assets/img/LOGO_GobiernoMexico.png";
import React from "react";

const Navbar = () => {
  const start = (
    <>
      <img alt="logo" src={gobierno} height="40" className="mr-3" />
      <img alt="logo" src={educacion} height="40" className="mr-3" />
      <img alt="logo" src={Tec} height="50" className="mr-5" />
    </>
  );

  const end = <img alt="logo" src={cenidet} height="40" className="mr-2" />;

  const items = [
    {
      label:  <h2 className="navbar-label">MRefactoring Web</h2>
    },
  ];

  return (
    <>
    <Menubar model={items} start={start} end={end} className="sticky-navbar" />
    <br/>
    </>
  );
};

export default Navbar;
