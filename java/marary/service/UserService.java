package marary.service;


import marary.domain.User;
import marary.persistence.UserDao;

import java.sql.SQLException;

public class UserService {
    private UserDao userDao;
    public UserService(){
        this.userDao=new UserDao();
    }
    public User login(String ThreeTypeStr,String password) {
        try {
            if (userDao.FindUserByUsernameAndPassword(ThreeTypeStr,password)!=null)
                return userDao.FindUserByUsernameAndPassword(ThreeTypeStr,password);
            else
                if (userDao.FindUserByEmailAndPassword(ThreeTypeStr, password) != null) {
                    return userDao.FindUserByEmailAndPassword(ThreeTypeStr, password);
                } else
                    return userDao.FindUserByPhoneAndPassword(ThreeTypeStr, password);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public User register(String username, String password, String email, String phoneNum) {
        try {
            return userDao.SetNewUsernameAndPassword(username, password, email, phoneNum);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean updatePassword(String username, String password) {
        try {
            return userDao.UpdatePassword(username, password);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean updatePhone(String username, String phone) {
        try {
            return userDao.UpdatePhone(username, phone);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean updateEmail(String username, String email) {
        try {
            return userDao.UpdateEmail(username, email);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //判断 用户名、邮箱、手机号是否已经存在
    public boolean checkInfo(String username, String email, String phoneNum) {
        try {
            return (userDao.CheckIsUsernameExist(username) && userDao.CheckIsEmailExist(email) && userDao.CheckIsPhoneExist(phoneNum));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean checkUsername(String username){
        try {
            return userDao.CheckIsUsernameExist(username);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean checkEmail(String email){
        try {
            return userDao.CheckIsEmailExist(email);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean checkPhoneNum(String phoneNum){
        try {
            return userDao.CheckIsPhoneExist(phoneNum);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}
