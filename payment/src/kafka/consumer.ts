import kafka from '.';
import PaymentService from '../services/paymentService';
import dotenv from 'dotenv';
import { connectProducer, sendMessage } from './producer';

dotenv.config();

const consumer = kafka.consumer({ groupId: 'payment-group' });

const connectConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'payment-process', fromBeginning: true });
    connectProducer();
    
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value) {
                const { orderId, amount } = JSON.parse(message.value.toString());
                try {
                    const result = PaymentService.processPayment(orderId, amount);
                    console.log('Payment processed:', result);
                    sendMessage('order-updates', { orderId, status: result.status })
                } catch (error) {
                    console.error('Failed to process payment', error);
                    sendMessage('order-updates', { orderId, status: 'rejected' })
                }
            } else {
                console.log('Empty Message');
            }
        },
    });
};

export default connectConsumer;
