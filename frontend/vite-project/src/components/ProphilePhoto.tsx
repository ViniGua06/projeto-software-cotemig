import { useSelector } from "react-redux";
import u_default from "../assets/user_default.png";

import { ReactNode } from "react";
import { select } from "../redux/user/slice";

interface IPfp {
  src?: string | null;
  onClick?: () => void;
}

export const ProphilePhoto = (props: IPfp) => {
  const { user_pfp } = useSelector(select);
  return (
    <>
      <img
        onClick={props.onClick}
        style={{
          borderRadius: "50%",
          cursor: "pointer",
          width: "100px",
          height: "100px",
        }}
        src={user_pfp || u_default}
      />
    </>
  );
};
