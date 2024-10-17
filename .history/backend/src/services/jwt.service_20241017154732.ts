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

  decodePayload = async (token: string): Promise<string> => {
    await JWT.verify(token.toString(), "Senha_segura", (err, decoded) => {
      if (err) {
        console.log("OIKNAI", err);
        return false;
      }

      console.log("PAyload", decoded);
      return decoded;
    });

    return;
  };
}

export default JsonWebToken;
