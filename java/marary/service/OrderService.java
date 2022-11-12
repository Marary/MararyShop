package marary.service;

import marary.domain.Order;
import marary.persistence.CartInfoDao;
import marary.persistence.OrderDao;

import java.sql.SQLException;
import java.util.List;

public class OrderService {
    private OrderDao orderDao;

    private CartInfoDao cartInfoDao;


    public OrderService() {
        orderDao = new OrderDao();
        cartInfoDao = new CartInfoDao();
    }

    public List<Order> getOrders(String username){
        try {
            return orderDao.OrderByUsername(username);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Order getOrderById(Long id) {
        try {
            return orderDao.OrderById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Boolean deleteOrderItem(String username, int order_number) {
        try {
            if (orderDao.DeleteOrder(username, order_number))
                return true;
            else {
                //此处未删除购物车中物品
                return false;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Order getOrderByUsernameAndOrderNumber(String username, int order_number) {
        Order order = null;
        try {
            order = orderDao.OrderByUsernameAndOrderNumber(username, order_number);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return order;
    }

    public boolean addNewOrder(String username, int product_id, int product_number) {
        try {
            if (orderDao.AddNewOrder(username, product_id, product_number)) {
                return cartInfoDao.DeleteCartByUsernameAndId(username, product_id);
            } else
                return false;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}
