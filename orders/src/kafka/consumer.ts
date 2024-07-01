import kafka from '.';
import { connectProducer, sendMessage } from './producer';
import OrderService from '../services/orderService';
import { OrderStatus } from '../models/orderStatus';

const consumer = kafka.consumer({ groupId: 'order-group' });
connectProducer();

const connectConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'order-updates', fromBeginning: true });
    
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('MESSAGE RECEIVED AT order-updates TOPIC');
            if (message.value) {
                console.log(message.value);
                const { orderId, status } = JSON.parse(message.value.toString());
                try {
                    if (status === 'approved') {
                        await OrderService.updateOrderStatus(orderId, OrderStatus.Completed);
                    } else {
                        await OrderService.updateOrderStatus(orderId, OrderStatus.Cancelled);
                        sendMessage('stock-revert', { orderId })
                    }
                    console.log('Order updated:', { orderId, status });
                } catch (error) {
                    console.error('Failed to update order', error);
                }
            } else {
                console.log('Empty Message');
            }
        },
    });
};

export default connectConsumer;
