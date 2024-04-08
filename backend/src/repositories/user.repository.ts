import { AppDataSource } from "../database/data-source";
import { User } from "../database/entity/User";

const database = AppDataSource.getRepository("user");

class UserRepository {
  getUserById = async (id: number) => {
    try {
      const user = await database.findOne({
        where: {
          id: id,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  insertUser = async (user: User) => {
    try {
      if (
        user.name != "" &&
        user.email != "" &&
        user.password != "" &&
        user.name &&
        user.email &&
        user.password
      ) {
        const insertedUser = await database.insert({
          name: user.name,
          email: user.email,
          password: user.password,
        });

        return insertedUser.identifiers[0].id;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

export default UserRepository;
