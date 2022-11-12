package marary.persistence;

import com.mysql.jdbc.Driver;
import marary.domain.User;

import java.sql.*;

public class UserDao {
    private static final String FIND_USER_BY_USERNAME_AND_PASSWORD=
            "select * from store.user_info where username=? && password=?";

    private static final String FIND_USER_BY_EMAIL_AND_PASSWORD=
            "select * from store.user_info where email=? && password=?";

    private static final String FIND_USER_BY_PHONE_AND_PASSWORD=
            "select * from store.user_info where phone_number=? && password = ?";

    private static final String SET_NEW_USERNAME_AND_PASSWORD=
            "insert store.user_info set username=?, password=?, status=? , email=? ,phone_number=?";

    private static final String CHECK_IS_USERNAME_EXIST =
            "select * from store.user_info where username=?";

    private static final String CHECK_IS_EMAIL_EXIST =
            "select * from store.user_info where email=?";

    private static final String CHECK_IS_PHONE_EXIST =
            "select * from store.user_info where phone_number=?";

    private static final String UPDATE_PASSWORD =
            "update store.user_info set password = ? where username = ?";

    private static final String UPDATE_PHONE =
            "update store.user_info set phone_number = ? where username = ?";

    private static final String UPDATE_EMAIL =
            "update store.user_info set email = ? where username = ?";


    public User FindUserByUsernameAndPassword(String username, String password) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        User user = null;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(FIND_USER_BY_USERNAME_AND_PASSWORD);
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);

            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                user = new User();
                user.setId(resultSet.getInt("id"));
                user.setUsername(resultSet.getString("username"));
                user.setPassword(resultSet.getString("password"));
                user.setAdmin(resultSet.getBoolean("status"));
                user.setEmail(resultSet.getString("email"));
                user.setPhoneNum(resultSet.getString("phone_number"));
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return user;
    }

    public User FindUserByEmailAndPassword(String email,String password) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        User user=null;
        try {
            PreparedStatement preparedStatement=connection.prepareStatement(FIND_USER_BY_EMAIL_AND_PASSWORD);
            preparedStatement.setString(1,email);
            preparedStatement.setString(2,password);

            ResultSet resultSet=preparedStatement.executeQuery();
            if (resultSet.next()){
                user=new User();
                user.setId(resultSet.getInt("id"));
                user.setUsername(resultSet.getString("username"));
                user.setPassword(resultSet.getString("password"));
                user.setAdmin(resultSet.getBoolean("status"));
                user.setEmail(resultSet.getString("email"));
                user.setPhoneNum(resultSet.getString("phone_number"));
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return user;
    }

    public User FindUserByPhoneAndPassword(String phone,String password) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        User user=null;
        try {
            PreparedStatement preparedStatement=connection.prepareStatement(FIND_USER_BY_PHONE_AND_PASSWORD);
            preparedStatement.setString(1,phone);
            preparedStatement.setString(2,password);

            ResultSet resultSet=preparedStatement.executeQuery();
            if (resultSet.next()){
                user=new User();
                user.setId(resultSet.getInt("id"));
                user.setUsername(resultSet.getString("username"));
                user.setPassword(resultSet.getString("password"));
                user.setAdmin(resultSet.getBoolean("status"));
                user.setEmail(resultSet.getString("email"));
                user.setPhoneNum(resultSet.getString("phone_number"));
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return user;
    }

    //用户注册
    public User SetNewUsernameAndPassword(String username,String password,String email,String phoneNum) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        User user=null;
        try{
            PreparedStatement preparedStatement=connection.prepareStatement(SET_NEW_USERNAME_AND_PASSWORD);
            preparedStatement.setString(1,username);
            preparedStatement.setString(2,password);
            preparedStatement.setBoolean(3,false);
            preparedStatement.setString(4,email);
            preparedStatement.setString(5,phoneNum);

            int result=preparedStatement.executeUpdate();

            if (result!=0){
                user = new User();
                user.setUsername(username);
                user.setPassword(password);
                user.setAdmin(false);
                user.setEmail(email);
                user.setPhoneNum(phoneNum);
            }

            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    //修改密码
    public Boolean UpdatePassword(String username, String password) throws Exception {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean status = false;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(UPDATE_PASSWORD);
            //传入新密码
            preparedStatement.setString(1, password);
            preparedStatement.setString(2, username);
            if (preparedStatement.executeUpdate() == 1)
                return true;
        } catch (Exception e) {
            e.printStackTrace();
        }


        return status;
    }

    //修改手机
    public Boolean UpdatePhone(String username, String phone) throws Exception {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean status = false;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(UPDATE_PHONE);
            //传入新密码
            preparedStatement.setString(1, phone);
            preparedStatement.setString(2, username);
            if (preparedStatement.executeUpdate() == 1)
                return true;
        } catch (Exception e) {
            e.printStackTrace();
        }


        return status;
    }

    //修改邮箱
    public Boolean UpdateEmail(String username, String email) throws Exception {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean status = false;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(UPDATE_EMAIL);
            //传入新密码
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, username);
            if (preparedStatement.executeUpdate() == 1)
                return true;
        } catch (Exception e) {
            e.printStackTrace();
        }


        return status;
    }

    public Boolean CheckIsUsernameExist(String username) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean status = false;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(CHECK_IS_USERNAME_EXIST);
            preparedStatement.setString(1, username);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next())
                status = true;

        }catch (Exception e){
            e.printStackTrace();
        }
        return status;
    }

    public Boolean CheckIsEmailExist(String email) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean status=false;
        try {
            PreparedStatement preparedStatement=connection.prepareStatement(CHECK_IS_EMAIL_EXIST);
            preparedStatement.setString(1,email);
            ResultSet resultSet=preparedStatement.executeQuery();
            if (resultSet.next())
                status=true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return status;
    }

    public Boolean CheckIsPhoneExist(String phone) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean status=false;
        try {
            PreparedStatement preparedStatement=connection.prepareStatement(CHECK_IS_PHONE_EXIST);
            preparedStatement.setString(1,phone);
            ResultSet resultSet=preparedStatement.executeQuery();
            if (resultSet.next())
                status=true;

        }catch (Exception e){
            e.printStackTrace();
        }
        return status;
    }
}
