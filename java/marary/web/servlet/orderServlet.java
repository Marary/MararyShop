package marary.web.servlet;


import com.alibaba.fastjson.JSON;
import marary.domain.Order;
import marary.domain.User;
import marary.service.OrderService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@WebServlet("/orderServlet")
public class orderServlet extends HttpServlet {

    private OrderService orderService;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session=req.getSession();
        User sessionValue= (User) session.getAttribute("loginUser");
        String username=sessionValue.getUsername();

        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");


        orderService = new OrderService();
        //获取出用户订单中的商品的详细信息
        List<Order> orders=orderService.getOrders(username);
        System.out.println(orders.get(0).getDate());

        if (orders.size()==0){
            resp.getWriter().write(JSON.toJSONString("empty"));
        }else {
            String jsonString=JSON.toJSONString(orders);
            resp.getWriter().write(jsonString);
        }

    }
}
