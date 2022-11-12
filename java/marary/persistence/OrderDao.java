package marary.persistence;

import marary.domain.Animal;
import marary.domain.Order;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrderDao {

    private static final String FIND_ORDER_BY_USERNAME =
            "select * from store.`order` where username=?";


    private static final String FIND_ORDER_BY_ID =
            "select *from store.`order` where product_id=?";

    private static final String DELETE_ORDER_BY_USERNAME_AND_ORDERNUMBER =
            "delete from store.order where username=? and order_number=?";

    private static final String FIND_ORDER_BY_USERNAME_AND_ORDERNUMBER =
            "select * from store.order where username=? and order_number=?";


    private static final String ADD_NEW_ORDER =
            "insert store.`order` set username=?,product_id=?,product_number=?";

    private static final AnimalDao animalDao = new AnimalDao();


    public List<Order> OrderByUsername(String Username) throws Exception {
        DriverManager.registerDriver(new com.mysql.jdbc.Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");

        List<Order> orders = new ArrayList<>();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(FIND_ORDER_BY_USERNAME);
            preparedStatement.setString(1, Username);

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {

                Long order_number = resultSet.getLong("order_number");
                String username = resultSet.getString("username");
                //由宠物Id号查找宠物
                int product_id = resultSet.getInt("product_id");
                Animal animal = animalDao.FindAnimalById(product_id);

                String animalName = animal.getName();
                String url = animal.getUrl();
                int column = resultSet.getInt("product_number");
                BigDecimal price = animal.getPrice();
                String date = resultSet.getTimestamp("order_date").toString();
                boolean sign = resultSet.getBoolean("isPay");
                Order order = new Order(order_number, username, animalName, url, column, price, date, sign);
                orders.add(order);
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return orders;
    }

    public Order OrderById(Long id) throws Exception {
        DriverManager.registerDriver(new com.mysql.jdbc.Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");

        Order order = null;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(FIND_ORDER_BY_ID);
            preparedStatement.setLong(1, id);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                Long order_number = resultSet.getLong("order_number");
                String username = resultSet.getString("username");
                int product_id = resultSet.getInt("product_id");
                Animal animal1 = animalDao.FindAnimalById(product_id);
                String animalName = animal1.getName();
                String url = animal1.getUrl();
                int column = resultSet.getInt("product_number");
                BigDecimal price = animal1.getPrice();
                String date = resultSet.getTimestamp("order_date").toString();
                boolean sign = resultSet.getBoolean("isPay");
                order = new Order(order_number, username, animalName, url, column, price, date, sign);

            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return order;
    }

    public boolean DeleteOrder(String username, int order_number) throws Exception {
        DriverManager.registerDriver(new com.mysql.jdbc.Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean sign = false;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(DELETE_ORDER_BY_USERNAME_AND_ORDERNUMBER);
            preparedStatement.setString(1, username);
            preparedStatement.setInt(2, order_number);

            if (preparedStatement.executeUpdate() != 0)
                sign = true;

            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sign;
    }

    public Order OrderByUsernameAndOrderNumber(String username, int order_number) throws Exception {

        DriverManager.registerDriver(new com.mysql.jdbc.Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");

        Order order = null;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(FIND_ORDER_BY_USERNAME_AND_ORDERNUMBER);
            preparedStatement.setString(1, username);
            preparedStatement.setInt(2, order_number);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                order = new Order();
                order.setOrder_number(resultSet.getLong("order_number"));
                order.setUsername(username);
                order.setColumn(resultSet.getInt("product_number"));
                order.setSign(resultSet.getBoolean("isPay"));
                order.setDate(resultSet.getTimestamp("order_date").toString());

                Animal animal = animalDao.FindAnimalById(resultSet.getInt("product_id"));
                String animalName = animal.getName();
                String url = animal.getUrl();
                BigDecimal price = animal.getPrice();

                order.setAnimalName(animalName);
                order.setUrl(url);
                order.setPrice(price);

            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return order;
    }


    public boolean AddNewOrder(String username, int product_id, int product_number) throws SQLException {
        DriverManager.registerDriver(new com.mysql.jdbc.Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean sign = false;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(ADD_NEW_ORDER);
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

}


