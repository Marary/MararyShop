package marary.web.servlet;

import com.alibaba.fastjson.JSON;
import marary.domain.Order;
import marary.service.OrderService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/searchOrderServlet")
public class SearchServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");
        BufferedReader reader=req.getReader();
        String keyword=reader.readLine().replaceAll(" ","");

        //查询订单
        Long id = Long.getLong(keyword);

        if (keyword!=null&&!keyword.equals("")){
            //调用service查询
            OrderService orderServic=new OrderService();
            Order order=orderServic.getOrderById(id);

            //将集合转化为JSON数据-序列化
            String jsonString = JSON.toJSONString(order);

            //响应数据

            resp.getWriter().write(jsonString);
        }else {
            resp.getWriter().write(JSON.toJSONString("failure"));
        }
    }
}
