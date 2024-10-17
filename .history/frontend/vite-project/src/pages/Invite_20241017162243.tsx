import { useParams } from "react-router-dom";
import url from "../assets/urlBackend";

export const Invite = () => {
  const { token } = useParams();

  const getChurch = async () => {
    const res = await fetch(`${url}/enterchurch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  };
  return (
    <>
      <h1>INVITE</h1>
    </>
  );
};
