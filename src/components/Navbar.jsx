import logo from "../assets/img/LOGO_GobiernoMexico.png";
import foto1 from "../assets/img/cenidet.png";
import foto2 from "../assets/img/LOGO_SEP.png";
import foto3 from "../assets/img/TecNM_logo.png";

const Navbar = () => {
  return (
    <div className="navbar-mio">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="image-navbar mx-4" />
        <img src={foto2} alt="Logo" className="image-navbar mx-2" />
        <img src={foto3} alt="Logo" className="image-navbar mx-2" />
        <div className="logo-text" style={{ marginLeft: "20%" }}>MRefactoring</div>
      </div>
      
      <div className="navbar-images">
        <img src={foto1} className="image-navbar-end" alt="Foto 1" />
      </div>
    </div>
  );
};

export default Navbar;
