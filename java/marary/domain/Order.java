package marary.domain;

import java.math.BigDecimal;

public class Order {
    //订单号
    private long order_number;
    //用户
    private String username;

    //订单物品
    private String animalName;
    //订单物品图片
    private String url;
    //订单物品数量
    private int column;
    //订单物品单价
    private BigDecimal price;
    //订单日期
    private String date;
    //订单是否完成
    private boolean sign;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Order(long order_number, String username, String animalName, String url, int column, BigDecimal price, String date, Boolean sign) {
        this.order_number = order_number;
        this.username = username;
        this.animalName = animalName;
        this.url = url;
        this.column = column;
        this.price = price;
        this.date = date;
        this.sign = sign;

    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Order() {

    }

    public long getOrder_number() {
        return order_number;
    }

    public void setOrder_number(long order_number) {
        this.order_number = order_number;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAnimalName() {
        return animalName;
    }

    public void setAnimalName(String animalName) {
        this.animalName = animalName;
    }

    public int getColumn() {
        return column;
    }

    public void setColumn(int column) {
        this.column = column;
    }


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isSign() {
        return sign;
    }

    public void setSign(boolean sign) {
        this.sign = sign;
    }
}