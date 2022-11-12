package marary.persistence;

import com.mysql.jdbc.Driver;
import marary.domain.CartInfo;

import java.sql.*;
import java.util.HashMap;

public class CartInfoDao {

    private static final String FIND_CART_BY_USERNAME =
            "select * from store.cart where username=?";

    private static final String CHANGE_CART_NUMBER_BY_USERNAME =
            "update store.cart set product_number = ? where username=? and product_id=?";

    private static final String DELETE_CART_BY_USERNAME_AND_ID =
            "delete from store.cart where username=? and product_id=?";

    private static final String ADD_CART_BY_USERNAME =
            "insert store.cart set username = ?,product_id=?,product_number=?";

    private static final String IS_EXIST_CART =
            "select * from store.cart where username=? and product_id=?";


    public boolean DeleteCartByUsernameAndId(String username, int id) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean sign = false;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(DELETE_CART_BY_USERNAME_AND_ID);
            preparedStatement.setString(1, username);
            preparedStatement.setInt(2, id);

            if (preparedStatement.executeUpdate() != 0)
                sign = true;

            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sign;
    }

    public boolean ChangeCartNumByUsername(String username, int number, int id) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean sign = false;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(CHANGE_CART_NUMBER_BY_USERNAME);
            preparedStatement.setInt(1, number);
            preparedStatement.setString(2, username);
            preparedStatement.setInt(3, id);

            if (preparedStatement.executeUpdate() != 0)
                sign = true;

            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sign;
    }

    public boolean CheckIsExistCart(String username, int product_id) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean sign = false;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(IS_EXIST_CART);
            preparedStatement.setString(1, username);
            preparedStatement.setInt(2, product_id);

            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next())
                sign = true;

            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sign;
    }


    public boolean AddCartByUsername(String username, int product_id, int product_number) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean sign = false;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(ADD_CART_BY_USERNAME);
            preparedStatement.setString(1, username);
            preparedStatement.setInt(2, product_id);
            preparedStatement.setInt(3, product_number);

            if (preparedStatement.executeUpdate() != 0)
                sign = true;

            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sign;
    }

    public CartInfo FindCartInfoByUsername(String username) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        CartInfo cartInfo = null;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(FIND_CART_BY_USERNAME);
            preparedStatement.setString(1, username);

            ResultSet resultSet = preparedStatement.executeQuery();
            cartInfo = new CartInfo();
            HashMap<Integer, Integer> map = new HashMap<>();
            while (resultSet.next()) {
                map.put(resultSet.getInt("product_id"), resultSet.getInt("product_number"));
            }

            cartInfo.setUsername(username);
            cartInfo.setMap(map);

            resultSet.close();
            preparedStatement.close();
            connection.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return cartInfo;
    }
}
