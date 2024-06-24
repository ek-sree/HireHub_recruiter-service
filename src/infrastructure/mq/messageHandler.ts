import RabbitMQClient from './client';
import { adminController } from '../../interfaces/controller/adminController';

export default class MessageHandler {
    static async handle(operation: string, data: any, correlationId: string, replyTo: string) {
        let response;

        switch (operation) {
            case 'get-all-recruiter':
                response = await adminController.fetchedRecruiterData();
                console.log("response of fetch user in message handler",response);
                break;
            default:
                response = { error: 'Operation not supported' };
                break;
        }

        await RabbitMQClient.produce(response, correlationId, replyTo);
    }
}
