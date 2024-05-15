import u_default from "../assets/user_default.png";

interface IPfp {
  src: string | null;
}

export const ProphilePhoto = (props: IPfp) => {
  return (
    <>
      <img
        style={{ borderRadius: "50%", cursor: "pointer" }}
        src={props.src || u_default}
        alt=""
      />
    </>
  );
};
