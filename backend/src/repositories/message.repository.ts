import { AppDataSource } from "../database/data-source";
import { Message } from "../database/entity/Message";

export class MessageRepository {
  insertMessage = async (message: Message) => {
    const repo = AppDataSource.getRepository(Message);

    const insertedMessage = await repo.insert(message);

    if (!insertedMessage.identifiers[0].id) {
      throw new Error("Message not inserted");
    }

    console.log(insertedMessage);
  };

  selectMessagesByChurchId = (church_id: number) => {
    const repo = AppDataSource.getRepository(Message);

    const messages = repo.find({
      where: {
        church_id: church_id,
      },
    });

    return messages;
  };
}
