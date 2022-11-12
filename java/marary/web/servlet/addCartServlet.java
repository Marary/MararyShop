package marary.web.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import marary.domain.User;
import marary.service.CartService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;


@WebServlet("/addNewCartServlet")
public class addCartServlet extends HttpServlet {

    CartService cartService = new CartService();

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

        //添加购物车 获取数据
        JSONObject jsonObject = HttpGetJson.getJson(req);

        int id = Integer.parseInt((String) jsonObject.get("item_id"));
        int number = Integer.parseInt((String) jsonObject.get("item_number"));


        if (cartService.addNewCart(username, id, number)) {
            //添加成功
            resp.getWriter().write(JSON.toJSONString("success"));
        } else {
            //添加失败
            resp.getWriter().write(JSON.toJSONString("failure"));
        }

    }
}
