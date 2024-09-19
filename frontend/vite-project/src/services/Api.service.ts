import { useDispatch, useSelector } from "react-redux";
import url from "../assets/urlBackend";
import { fetchUser, logout, userSelect } from "../redux/user/slice";
import { useNavigate } from "react-router-dom";
import { ativar } from "../redux/modal/slice";

const ApiService = () => {
  const { user_id, token, user_pfp } = useSelector(userSelect);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const testToken = async () => {
    try {
      const response = await fetch(`${url}/testToken`, {
        method: "POST",
        headers: {
          "x-acess-token": token,
        },
        body: JSON.stringify({
          test: "Teste",
        }),
      });

      if (response.status == 403) {
        dispatch(ativar("Not Allowed"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfilePhoto = async () => {
    try {
      const response = await fetch(`${url}/photo/${user_id}`, {
        headers: {
          "x-acess-token": token,
        },
      });

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      if (response.status != 404) {
        return imageUrl;
      }

      return null;
    } catch (error) {
      console.error("Erro ao buscar a foto de perfil:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${url}/user/${user_id}`);

      const data = await response.json();

      const photo = await fetchProfilePhoto();

      console.log("DATA", data);

      if (response.status == 403) {
        dispatch(ativar("Not Allowed"));
      } else {
        dispatch(
          fetchUser({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            password: data.user.password,
            photo: photo,
            token: token,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { testToken, fetchUserInfo };
};

export default ApiService;
