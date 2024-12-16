import { useSelector } from "react-redux";
import u_default from "../assets/user_default.png";
import { userSelect } from "../redux/user/slice";
import styled from "styled-components";

interface IPfp {
  src?: string | null;
  height?: string;
  onClick?: () => void;
  margin?: string;
}

export const ProphilePhoto = (props: IPfp) => {
  const { user_pfp } = useSelector(userSelect);
  return (
    <>
      <Imagem
        onClick={props.onClick}
        src={user_pfp || u_default}
      />
    </>
  );
};

const Imagem = styled.img`
  border-radius: 50%;
  cursor: pointer;
  width: 60px;
  height: 100px;
  margin: 1rem 0 2rem 0;
`;
