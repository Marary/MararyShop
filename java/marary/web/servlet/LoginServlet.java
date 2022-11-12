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
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final String LOGIN_FORM = "login.html";
    private String username;
    private String password;

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

        //调用业务逻辑
        UserService userService = new UserService();
        User loginUser = userService.login(username, password);


        //根据业务逻辑进行相应的页面跳转
        if (userService.login(username, password) == null) {
            resp.getWriter().write(JSON.toJSONString("failure"));
        } else {
            HttpSession session = req.getSession();
            session.setAttribute("loginUser", loginUser);
            resp.getWriter().write(JSON.toJSONString("success"));
        }

    }
}
