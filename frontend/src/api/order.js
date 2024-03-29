import axios from "axios";

class ToDoService {
  constructor() {}

  request = async (url) => {
    return await axios.get(url);
  };

  getAllOrders() {
    const url = `http://localhost:8000/orders/`;
    return this.request(url);
  }
  getOrdersByStatus(status) {
    const url = `http://localhost:8000/orders/getOrdersByStatus/${status}`;
    return this.request(url);
  }
  getShippedOrders() {
    const url = `http://localhost:8000/orders/getShippedOrders`;
    return this.request(url);
  }
  getSingleOrder(orderID) {
    const url = `http://localhost:8000/orders/getorderbyorderid/${orderID}`;
    return this.request(url);
  }
  getOrderProducts(orderID) {
    const url = `http://localhost:8000/orders/orderProduct/view/${orderID}`;
    return this.request(url);
  }
  getDelivery(orderID) {
    const url = `http://localhost:8000/delivery/getDelivery/${orderID}`;
    return this.request(url);
  }
  getNRSellerProduct(sellerID) {
    const url = `http://localhost:8000/orders/orderProduct/getNRSellerProduct/${sellerID}`;
    return this.request(url);
  }
  getRSellerProduct(sellerID) {
    const url = `http://localhost:8000/orders/orderProduct/getRSellerProduct/${sellerID}`;
    return this.request(url);
  }
  getSellerOrderProduct(sellerID, orderID) {
    const url = `http://localhost:8000/orders/orderProduct/getSellerOrderProduct/${sellerID}/${orderID}`;
    return this.request(url);
  }

  getOrdersByCusID(cusID) {
    const url = `http://localhost:8000/orders/getOrdersByCusID/${cusID}`;
    return this.request(url);
  }
}
export default ToDoService;
