package marary.web.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import marary.domain.Animal;
import marary.domain.CartDetails;
import marary.domain.CartInfo;
import marary.domain.User;
import marary.service.AnimalService;
import marary.service.CartService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/changeNumberServlet")
public class changeCartNumServlet extends HttpServlet {

    private CartService cartService = new CartService();
    private AnimalService animalService = new AnimalService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        User sessionValue = (User) session.getAttribute("loginUser");
        String username = sessionValue.getUsername();

        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");

        JSONObject jsonObject = HttpGetJson.getJson(req);

        int number = (int) jsonObject.get("number");
        int pid = (int) jsonObject.get("id");

        CartInfo cart = cartService.changeCartNum(username, number, pid);
        if (cart != null) {
            //获取出用户购物车中的商品的详细信息
            List<CartDetails> cartDetailsList = new ArrayList<>();
            for (int id : cart.getMap().keySet()) {
                CartDetails cartDetails = new CartDetails();
                Animal animal = animalService.SearchAnimalById(id);
                cartDetails.setId(id);
                cartDetails.setType(animal.getType());
                cartDetails.setSpecific(animal.getSpecific());
                cartDetails.setName(animal.getName());
                cartDetails.setUrl(animal.getUrl());
                cartDetails.setPrice(animal.getPrice());
                cartDetails.setNumber(cart.getMap().get(id));
                cartDetailsList.add(cartDetails);
            }

            if (cartDetailsList.size() == 0) {
                resp.getWriter().write(JSON.toJSONString("empty"));
            } else {
                String jsonString = JSON.toJSONString(cartDetailsList);
                resp.getWriter().write(jsonString);
            }
        } else {
            resp.getWriter().write(JSON.toJSONString("null"));
        }

    }
}
