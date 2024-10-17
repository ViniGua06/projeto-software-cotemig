import { useParams } from "react-router-dom";

export const Invite = () => {
  const { token } = useParams();
  return (
    <>
      <h1>INVITE</h1>
    </>
  );
};
