import JWT, { Jwt } from "jsonwebtoken";

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

  decodePayload = (token: Jwt) => {
    JWT.verify(token.toString(), "Senha_Segura", (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Failed to authenticate token." });
      }
    });
  };
}

export default JsonWebToken;
