import JWT from "jsonwebtoken";

class JsonWebToken {
  createToken = (id: number) => {
    try {
      const token = JWT.sign({ id: id }, "Senha_segura", {
        expiresIn: "3h",
      });

      return token;
    } catch (error) {
      console.log(error);
    }
  };
}

export default JsonWebToken;
