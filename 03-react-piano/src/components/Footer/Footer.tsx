import { FunctionComponent } from "react";
import "./style.css";

const Footer: FunctionComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <a href="https://github.com/ritatanght">Rita Tang</a>
      <br />
      {currentYear}
    </footer>
  );
};

export default Footer;
