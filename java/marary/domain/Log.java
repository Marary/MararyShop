package marary.domain;

public class Log {
    //用户
    private String username = null;

    //记录信息
    private String information;

    //时间由数据库自动生成


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }
}
