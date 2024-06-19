import { useSelector } from "react-redux";
import url from "../assets/urlBackend";
import { userSelect } from "../redux/user/slice";

const ChurchService = () => {
  const { user_id, token } = useSelector(userSelect);
  const getChurchesByUser = async () => {
    try {
      const response = await fetch(`${url}/churches/${user_id}`, {
        method: "GET",
        headers: { "x-acess-token": token },
      });
      console.log("Token", token);
      const churches = await response.json();

      const churchesWithPhotos = await Promise.all(
        churches.map(async (church: any) => {
          const photoResponse = await fetch(
            `${url}/church/photo/${church.id}`,
            {
              headers: {
                "x-acess-token": token,
              },
            }
          );
          const photoBlob = await photoResponse.blob();

          church.photo = URL.createObjectURL(photoBlob);

          return church;
        })
      );

      return churchesWithPhotos;
    } catch (error) {
      console.log(error);
    }
  };

  const enterChurch = async (code: string) => {
    try {
      const response = await fetch(`${url}/enterchurch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          code: code,
        }),
      });

      const data = await response.json();

      if (response.status == 200) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { getChurchesByUser, enterChurch };
};

export default ChurchService;
