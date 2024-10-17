import JWT, { Jwt } from "jsonwebtoken";

class JsonWebToken {
  createToken = async (payload: string) => {
    try {
      const token = await JWT.sign({ payload }, "Senha_segura", {
        expiresIn: "3h",
      });

      return token;
    } catch (error) {
      console.log(error);
    }
  };

  decodePayload = async (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      JWT.verify(token.toString(), "Senha_segura", (err, decoded) => {
        if (err) {
          console.log("Erro ao decodificar o token:", err);
          reject(false);
        } else {
          console.log("Payload", decoded);
          resolve(decoded);
        }
      });
    });
  };
}

export default JsonWebToken;
