import { useSelector } from "react-redux";
import styled from "styled-components";
import { select } from "../../redux/user/slice";

import user_default from "../../assets/user_default.png";

const PfpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const USerImg = styled.img`
  box-shadow: 0 0 20px black;
  width: 15%;
  border-radius: 50%;
`;

export const ChangePfpForm = () => {
  const { user_pfp } = useSelector(select);
  return (
    <>
      <PfpForm>
        <USerImg src={user_pfp ? user_pfp : user_default}></USerImg>
      </PfpForm>
    </>
  );
};
