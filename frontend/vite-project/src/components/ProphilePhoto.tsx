import u_default from "../assets/user_default.png";

import { ReactNode } from "react";

interface IPfp {
  src?: string | null;
  onClick?: () => void;
}

export const ProphilePhoto = (props: IPfp) => {
  return (
    <>
      <img
        onClick={props.onClick}
        style={{ borderRadius: "50%", cursor: "pointer" }}
        src={props.src || u_default}
      />
    </>
  );
};
