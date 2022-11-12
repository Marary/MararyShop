package marary.web.servlet;

import com.alibaba.fastjson.JSONObject;
import marary.domain.User;
import marary.service.LogService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/addLogServlet")
public class addLogServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        HttpSession session = req.getSession();
        User user = (User) session.getAttribute("loginUser");
        String username = user.getUsername();
        LogService logService = new LogService();

        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");

        JSONObject jsonObject = HttpGetJson.getJson(req);
        String information = (String) jsonObject.get("information");

        logService.addLog(username, information);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }
}
