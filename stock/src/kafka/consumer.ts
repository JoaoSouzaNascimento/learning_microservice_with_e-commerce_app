import kafka from '.';
import { connectProducer, sendMessage } from './producer';
import StockService from '../services/stockService';

const consumer = kafka.consumer({ groupId: 'stock-group' });


const connectConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'stock-create', fromBeginning: true });
    await consumer.subscribe({ topic: 'stock-check', fromBeginning: true });
    await consumer.subscribe({ topic: 'stock-revert', fromBeginning: true });

    connectProducer();
    
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('Message recepted');
            if (message.value) {
                if (topic === 'stock-check') {
                    const { orderId, items } = JSON.parse(message.value.toString());
                    console.log('MESSAGE RECEIVED AT stock-check TOPIC');
                    try {
                        const result = await StockService.checkAndReserveStock(items); 
                        if (result.success) {
                            sendMessage('payment-process', { orderId, amount: result.totalAmount })
                        } else {
                            sendMessage('order-updates', { orderId, status: 'rejected' });
                        }
                    } catch (error) {
                        console.error('Failed to check stock', error);
                        sendMessage('order-updates', { orderId, status: 'rejected' });
                    }
                } else if (topic === 'stock-revert') {
                    const { items } = JSON.parse(message.value.toString());
                    console.log('MESSAGE RECEIVED AT stock-revert TOPIC');
                    try {
                        await StockService.revertStockReservation(items);
                        console.log('Stock reservation reverted');
                    } catch (error) {
                        console.error('Failed to revert stock reservation', error);
                    }
                } else if (topic === 'stock-create') {
                    const { id } = JSON.parse(message.value.toString());
                    console.log('MESSAGE RECEIVED AT stock-create TOPIC');
                    try {
                        await StockService.createStock(id, 0);
                        console.log('Stock created:', id);
                    } catch (error) {
                        console.error('Failed to create stock', error);
                    }
                }
            }
        },
    });
};

export { connectConsumer };