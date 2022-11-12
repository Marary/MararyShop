package marary.domain;

import java.util.HashMap;

public class CartInfo {
    //关键字为编号，值为数量
    private HashMap<Integer,Integer> map;
    private String username;

    public CartInfo(){}

    public HashMap<Integer, Integer> getMap() {
        return map;
    }

    public void setMap(HashMap<Integer, Integer> map) {
        this.map = map;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
