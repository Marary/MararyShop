package marary.service;

import marary.domain.CartInfo;
import marary.persistence.CartInfoDao;

import java.sql.SQLException;

public class CartService {
    private CartInfoDao cartInfoDao;

    public CartService() {
        this.cartInfoDao = new CartInfoDao();
    }

    public CartInfo getAllCart(String username) {
        try {
            return cartInfoDao.FindCartInfoByUsername(username);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public CartInfo changeCartNum(String username, int number, int id) {
        try {
            if (cartInfoDao.ChangeCartNumByUsername(username, number, id))
                return getAllCart(username);
            else {
                //此处未更改购物车中物品数量
                return null;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public CartInfo deleteCartItem(String username, int id) {
        try {
            if (cartInfoDao.DeleteCartByUsernameAndId(username, id))
                return getAllCart(username);
            else {
                //此处未删除购物车中物品
                return null;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean addNewCart(String username, int id, int number) {
        try {
            if (!cartInfoDao.CheckIsExistCart(username, id))
                return cartInfoDao.AddCartByUsername(username, id, number);
            else
                return false;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
