import { useParams } from "react-router-dom";
import url from "../assets/urlBackend";
import { useSelector } from "react-redux";
import { userSelect } from "../redux/user/slice";

export const Invite = () => {
  const { token } = useParams();
  const { user_id } = useSelector(userSelect);

  const getChurch = async () => {
    const res = await fetch(`${url}/enterchurch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user_id, token: token }),
    });

    const data = await res.json();

    alert(data.message);
  };
  return (
    <>
      <h1>INVITE</h1>
    </>
  );
};
