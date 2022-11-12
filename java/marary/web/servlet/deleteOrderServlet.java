package marary.web.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import marary.domain.User;
import marary.service.OrderService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/deleteOrderServlet")
public class deleteOrderServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        User sessionValue = (User) session.getAttribute("loginUser");
        String username = sessionValue.getUsername();

        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");

        OrderService orderService = new OrderService();

        JSONObject jsonObject = HttpGetJson.getJson(req);
        int order_number = (int) jsonObject.get("order_number");

        boolean sign = orderService.deleteOrderItem(username, order_number);
        if (sign) {
            resp.getWriter().write(JSON.toJSONString("success"));
        } else {
            resp.getWriter().write(JSON.toJSONString("fail"));
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }
}
