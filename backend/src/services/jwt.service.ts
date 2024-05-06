import JWT from "jsonwebtoken";

class JsonWebToken {
  createToken = (props: number | string) => {
    try {
      const token = JWT.sign({ props: props }, "Senha_segura", {
        expiresIn: "3h",
      });

      return token;
    } catch (error) {
      console.log(error);
    }
  };
}

export default JsonWebToken;
