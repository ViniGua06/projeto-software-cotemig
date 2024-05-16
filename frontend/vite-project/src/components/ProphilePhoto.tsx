import u_default from "../assets/user_default.png";

import { ReactNode } from "react";

interface IPfp {
  src?: string | null;
}

export const ProphilePhoto = ({ ...rest }, props: IPfp) => {
  return (
    <>
      <img
        {...rest}
        style={{ borderRadius: "50%", cursor: "pointer" }}
        src={props.src || u_default}
        alt=""
      />
    </>
  );
};
