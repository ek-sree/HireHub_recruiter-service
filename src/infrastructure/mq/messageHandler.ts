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

            case 'unVerify-recruiter':
                response = await adminController.unVerifiedRecr();
                break;

            case 'verify-recruiter':
                response = await adminController.verifyedRecruiter(data)
                break;

            case 'block-recruiter':
                response = await adminController.blockRecruiter(data);    
                break;
                
            default:
                response = { error: 'Operation not supported' };
                break;
        }

        await RabbitMQClient.produce(response, correlationId, replyTo);
    }
}
