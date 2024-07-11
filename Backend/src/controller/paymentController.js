class PaymentController {
    constructor(subscriptionService) {
      this.subscriptionService = subscriptionService;
    }
  
    async getPaymentLink(req, res) {
      try {
        const { monthlyPlan } = req.body;

        if (!monthlyPlan || monthlyPlan.length === 0) {
          return res.status(400).json({ error: true, msg: "No monthlyPlan provided" });
        }

        const payment = await this.subscriptionService.createPayment(monthlyPlan);
  
        return res.json(payment);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create payment" });
      }
    }
}

module.exports = PaymentController;