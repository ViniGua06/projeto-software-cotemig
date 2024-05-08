import JWT from "jsonwebtoken";

class JsonWebToken {
  createToken = (payload: string) => {
    try {
      const token = JWT.sign({ payload }, "Senha_segura", {
        expiresIn: "3h",
      });

      return token;
    } catch (error) {
      console.log(error);
    }
  };
}

export default JsonWebToken;
