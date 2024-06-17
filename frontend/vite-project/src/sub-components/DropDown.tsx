import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Modal } from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ativar, modalSelect } from "../redux/modal/slice";

interface IDropDown {
  display: boolean;
  setDisplay?: any;
}

export const DropDown = (props: IDropDown) => {
  const gearRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (gearRef.current && !gearRef.current.contains(event.target as Node)) {
      props.setDisplay(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const dispatch = useDispatch();
  return (
    <>
      <Drop display={props.display} ref={gearRef}>
        <ConfigList>
          <li onClick={() => dispatch(ativar("Editar Perfil"))}>
            Editar perfil
          </li>
        </ConfigList>
      </Drop>
    </>
  );
};

const Drop = styled.div<IDropDown>`
  width: 170px;
  margin-top: 75px;
  height: ;
  background: whitesmoke;
  position: absolute;
  display: ${(props) => (props.display ? "block" : "none")};
`;

const ConfigList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & > li {
    padding: 0.8rem;
    font-size: 1rem;
  }

  &>li: hover {
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;
