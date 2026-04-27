#include <bits/stdc++.h>
using namespace std;

class Inventory {
public:
    bool checkStock() {
        cout << "Checking stock"<<endl;
        return true;
    }
};

class Payment {
public:
    void makePayment() {
        cout << "Processing payment"<<endl;
    }
};

class Order {
public:
    void createOrder() {
        cout << "Order created"<<endl;
    }
};

class Shipping {
public:
    void shipOrder() {
        cout << "Shipping started"<<endl;
    }
};

class EmailService {
public:
    void sendEmail() {
        cout << "Sending confirmation email"<<endl;
    }
};

class OrderFacade {
    Inventory inventory;
    Payment payment;
    Order order;
    Shipping shipping;
    EmailService email;

public:
    void placeOrder() {
        if (inventory.checkStock()) {
            payment.makePayment();
            order.createOrder();
            shipping.shipOrder();
            email.sendEmail(); 
            cout << "Order placed successfully!"<<endl;
        } else {
            cout << "Out of stock!"<<endl;
        }
    }
};

int main() {
    OrderFacade facade;
    facade.placeOrder();
}