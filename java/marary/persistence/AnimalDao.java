package marary.persistence;

import com.mysql.jdbc.Driver;
import marary.domain.Animal;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AnimalDao {

    private static final String FIND_ALL_ANIMALS=
            "select * from store.animals";

    private static final String ADD_NEW_ANIMAL=
            "insert store.animals set name=?,number=?,price=?,url=?";

    private static final String CHECK_IS_ANIMAL_EXIST =
            "select * from store.animals where name=?";

    private static final String SEARCH_CENTERN_ANIMAL =
            "select * from store.animals where name = ?";

    private static final String SEARCH_ANIMAL_BY_ID =
            "select * from store.animals where id=?";

    private static final String SEARCH_ANIMAL_BY_TYPE =
            "select * from store.animals where type=?";

    private static final String SEARCH_ANIMAL_BY_SPECIFIC =
            "select * from store.animals where good_specific LIKE ?";

    public List<Animal> FindAllAnimals() throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        List<Animal> animals = new ArrayList<>();

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(FIND_ALL_ANIMALS);

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Animal animal = new Animal();
                animal.setId(resultSet.getInt("id"));
                animal.setName(resultSet.getString("name"));
                animal.setNumber(resultSet.getInt("number"));
                animal.setPrice(BigDecimal.valueOf(resultSet.getDouble("price")));
                animal.setUrl(resultSet.getString("url"));
                animal.setType(resultSet.getString("type"));
                animal.setSpecific(resultSet.getString("good_specific"));
                animals.add(animal);
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        }catch (Exception e){
            e.printStackTrace();
        }

        return animals;
    }

    public List<Animal> FindCenternAnimal(String keyword) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        List<Animal> animals=new ArrayList<>();


        try {
            PreparedStatement preparedStatement = connection.prepareStatement(SEARCH_CENTERN_ANIMAL);
            preparedStatement.setString(1, keyword);

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Animal animal = new Animal();
                animal.setId(resultSet.getInt("id"));
                animal.setName(resultSet.getString("name"));
                animal.setNumber(resultSet.getInt("number"));
                animal.setPrice(BigDecimal.valueOf(resultSet.getDouble("price")));
                animal.setUrl(resultSet.getString("url"));
                animal.setType(resultSet.getString("type"));
                animal.setSpecific(resultSet.getString("good_specific"));
                animals.add(animal);
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        }catch (Exception e){
            e.printStackTrace();
        }

        return animals;
    }

    public boolean AddNewAnimal(Animal animal) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean flag=false;//添加失败

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(ADD_NEW_ANIMAL);
            preparedStatement.setString(1, animal.getName());
            preparedStatement.setInt(2, animal.getNumber());
            preparedStatement.setBigDecimal(3, animal.getPrice());
            preparedStatement.setString(4, animal.getUrl());

            int result = preparedStatement.executeUpdate();

            if (result != 0) {
                flag = true;
            }

            preparedStatement.close();
            connection.close();
        }catch (Exception e){
            e.printStackTrace();
        }

        return flag;
    }

    public boolean IsAnimalExist(Animal animal) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        boolean flag=false;//动物不存在

        try {
            PreparedStatement preparedStatement=connection.prepareStatement(CHECK_IS_ANIMAL_EXIST);
            preparedStatement.setString(1,animal.getName());

            ResultSet resultSet=preparedStatement.executeQuery();

            if (resultSet.next()){
                flag=true;
            }

            preparedStatement.close();
            connection.close();
        }catch (Exception e){
            e.printStackTrace();
        }

        return flag;
    }

    public Animal FindAnimalById(Integer id) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        Animal animal = null;

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(SEARCH_ANIMAL_BY_ID);
            preparedStatement.setInt(1, id);

            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                animal = new Animal();
                animal.setId(resultSet.getInt("id"));
                animal.setName(resultSet.getString("name"));
                animal.setNumber(resultSet.getInt("number"));
                animal.setPrice(BigDecimal.valueOf(resultSet.getDouble("price")));
                animal.setUrl(resultSet.getString("url"));
                animal.setType(resultSet.getString("type"));
                animal.setSpecific(resultSet.getString("good_specific"));
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return animal;
    }

    public List<Animal> FindAnimalByType(String type) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");
        List<Animal> animals = new ArrayList<>();

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(SEARCH_ANIMAL_BY_TYPE);
            preparedStatement.setString(1, type);

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Animal animal = new Animal();
                animal.setId(resultSet.getInt("id"));
                animal.setName(resultSet.getString("name"));
                animal.setNumber(resultSet.getInt("number"));
                animal.setPrice(BigDecimal.valueOf(resultSet.getDouble("price")));
                animal.setUrl(resultSet.getString("url"));
                animal.setType(resultSet.getString("type"));
                animal.setSpecific(resultSet.getString("good_specific"));
                animals.add(animal);
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return animals;
    }

    public List<Animal> FindAnimalBySpecific(String specific) throws SQLException {
        DriverManager.registerDriver(new Driver());
        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/library?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai"
                , "root", "password");

        List<Animal> animals = new ArrayList<>();

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(SEARCH_ANIMAL_BY_SPECIFIC);
            preparedStatement.setString(1, '%' + specific + '%');

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Animal animal = new Animal();
                animal.setId(resultSet.getInt("id"));
                animal.setName(resultSet.getString("name"));
                animal.setNumber(resultSet.getInt("number"));
                animal.setPrice(BigDecimal.valueOf(resultSet.getDouble("price")));
                animal.setUrl(resultSet.getString("url"));
                animal.setType(resultSet.getString("type"));
                animal.setSpecific(resultSet.getString("good_specific"));
                animals.add(animal);
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return animals;
    }

}
