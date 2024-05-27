import { useState } from "react";

interface IMenuHamb {
  id: string;
  id_element: string;
}

const MenuHamb = (props: IMenuHamb) => {
  const [clicado, setClicado] = useState(false);

  const click = () => {
    const two = document.getElementById(props.id_element);
    if (!clicado) {
      if (two) {
        two.style.height = "calc(100vh - 74.8px)";
        document.body.style.overflowY = "hidden";
        setClicado(true);
        console.log("Clicado");
      }
    } else {
      if (two) {
        two.style.height = "0vh";
        document.body.style.overflowY = "auto";
        setClicado(false);
      }
    }
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 30 30"
        id={props.id}
        onClick={click}
      >
        <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
      </svg>
    </>
  );
};

export default MenuHamb;