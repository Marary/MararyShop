package marary.web.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import marary.domain.User;
import marary.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    private static final String LOGIN_FORM = "login.html";

    private static final String REGISTER_FORM = "register.html";

    private String username;
    private String password;
    private String email;
    private String phoneNum;
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");


        JSONObject jsonObject = HttpGetJson.getJson(req);

        username = jsonObject.getString("username");
        password = jsonObject.getString("password");
        email = jsonObject.getString("email");
        phoneNum = jsonObject.getString("phoneNum");

        UserService userService = new UserService();

        if (!userService.checkInfo(username, email, phoneNum)) {
            User registerUser = userService.register(username, password, email, phoneNum);
            if (registerUser == null) {
                resp.getWriter().write(JSON.toJSONString("failure"));
            } else {
                resp.getWriter().write(JSON.toJSONString("success"));
            }
        }else{
            resp.getWriter().write(JSON.toJSONString("failure"));
        }

    }
}
