import RabbitMQClient from './client';
import { adminController } from '../../interfaces/controller/adminController';

export default class MessageHandler {
    static async handle(operation: string, data: any, correlationId: string, replyTo: string) {
        let response;

        switch (operation) {
            case 'get-all-recruiter':
                response = await adminController.fetchedRecruiterData(data);
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

            case 'search-recruiter':
                response = await adminController.searchRecruiter(data);
                break;  
                
            case 'blocked-recruiter-report':
                response = await adminController.getBlockedRecruiter();
                break;    
                
            default:
                response = { error: 'Operation not supported' };
                break;
        }

        await RabbitMQClient.produce(response, correlationId, replyTo);
    }
}
