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


@WebServlet("/addNewOrderServlet")
public class addOrderServlet extends HttpServlet {

    private OrderService orderService = new OrderService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        User user = (User) session.getAttribute("loginUser");
        String username = user.getUsername();

        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");

        boolean sign = true;

        //添加购物车 获取数据
        JSONObject jsonObject = HttpGetJson.getJson(req);

        int[][] list = (int[][]) jsonObject.getObject("info", int[][].class);
        for (int i = 0; i < list.length; i++) {
            if (!orderService.addNewOrder(username, list[i][0], list[i][1]))
                sign = false;
        }

        System.out.println(sign);

        if (sign) {
            resp.getWriter().write(JSON.toJSONString("success"));
        } else {
            resp.getWriter().write(JSON.toJSONString("failure"));
        }


    }
}
