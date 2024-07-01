class PaymentService {
    static processPayment(orderId: number, amount: number) {
        // Simulação de processamento de pagamento
        const approved = Math.random() > 0.1;

        
        if (approved) {
            return { status: 'approved' };
        } else {
            throw new Error('Payment rejected');
        }
    }
  }
  
  export default PaymentService;
  