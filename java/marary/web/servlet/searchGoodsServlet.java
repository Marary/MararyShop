package marary.web.servlet;

import com.alibaba.fastjson.JSON;
import marary.domain.Animal;
import marary.service.AnimalService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;


@WebServlet("/searchGoodsServlet")
public class searchGoodsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");
        BufferedReader reader = req.getReader();
        String keyword = reader.readLine().replaceAll(" ", "");


        if (keyword != null && !keyword.equals("")) {
            //调用service查询
            AnimalService animalService = new AnimalService();
            List<Animal> animals = animalService.SearchAnimalByType(JSON.parseObject(keyword, String.class));
            if (animals.size() == 0) {
                animals = animalService.SearchAnimalBySpecific(JSON.parseObject(keyword, String.class));
                if (animals.size() == 0)
                    animals = animalService.SearchAnimal(JSON.parseObject(keyword, String.class));
            }


            //将集合转化为JSON数据-序列化
            String jsonString = JSON.toJSONString(animals);

            //响应数据

            resp.getWriter().write(jsonString);
        } else {
            resp.getWriter().write(JSON.toJSONString("failure"));
        }
    }
}
