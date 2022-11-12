package marary.web.servlet;

import com.alibaba.fastjson.JSON;
import marary.domain.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;


@WebServlet("/checkStatusServlet")
public class isLoginServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");

        HttpSession session = req.getSession();
        User sessionValue = (User) session.getAttribute("loginUser");

        if (sessionValue == null) {
            resp.getWriter().write(JSON.toJSONString("no"));
        } else {
            resp.getWriter().write(JSON.toJSONString("yes"));
        }
    }
}
