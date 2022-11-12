package marary.web.servlet;

import com.alibaba.fastjson.JSONObject;
import marary.domain.User;
import marary.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;


@WebServlet("/personServlet")
public class personServlet extends HttpServlet {
    private static final String LOGIN_FORM = "/WEB-INF/jsp/login.jsp";

    private static final String PERSONAL = "personal.html";
    private UserService userService;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        User user = (User) session.getAttribute("loginUser");
        String username = user.getUsername();
        userService = new UserService();

        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");

        //获取输入

        JSONObject jsonObject = HttpGetJson.getJson(req);
        String sign = (String) jsonObject.get("sign");
        String newPassword = (String) jsonObject.get("newPassword");
        String newPhone = (String) jsonObject.get("newPhone");
        String newEmail = (String) jsonObject.get("newEmail");


        if (sign.equals("password")) {
            userService.updatePassword(username, newPassword);//修改密码
        } else if (sign.equals("phone")) {
            userService.updatePhone(username, newPhone);//修改手机
        } else if (sign.equals("email")) {
            userService.updateEmail(username, newEmail);//修改邮箱
        } else {
            System.out.println("Wrong");
        }


    }
}
