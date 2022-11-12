package marary.persistence;

import com.mysql.jdbc.Driver;
import marary.domain.Log;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class LogDao {

    private static final String ADD_LOG_BY_USERNAME =
            "insert store.log set username = ?,information = ?";

    public Log AddLog(String username, String information) throws Exception {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        Log log = null;
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(ADD_LOG_BY_USERNAME);

            preparedStatement.setString(1, username);
            preparedStatement.setString(2, information);

            int result = preparedStatement.executeUpdate();

            if (result != 0) {
                log = new Log();
                log.setUsername(username);
                log.setInformation(information);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }


        return log;
    }

}
