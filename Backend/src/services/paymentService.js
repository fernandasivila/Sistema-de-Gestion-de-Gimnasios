const axios = require("axios");

class PaymentService {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      items: [
        {
          title: "Mensualidad Gym Resolve",
          description: "Mensualidad de Gimnasio",
          category_id: "gym_resolve",
          quantity: 1,
          unit_price: 10
        }
      ],
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/success"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer APP_USR-7541429582129828-071001-ee57f047258d4fb02fc1034069cce14d-1285781730`
      }
    });

    return payment.data;
  }
}

module.exports = PaymentService;