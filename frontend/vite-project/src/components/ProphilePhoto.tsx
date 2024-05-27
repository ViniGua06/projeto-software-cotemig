import { useSelector } from "react-redux";
import u_default from "../assets/user_default.png";
import { select } from "../redux/user/slice";

interface IPfp {
  src?: string | null;
  height?: string;
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
          width: props.height ? "60px" : "100px",
          height: props.height ? props.height : "100px",
        }}
        src={user_pfp || u_default}
      />
    </>
  );
};
