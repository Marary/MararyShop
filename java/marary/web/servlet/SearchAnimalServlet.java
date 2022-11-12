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
import java.util.ArrayList;
import java.util.List;

@WebServlet("/searchServlet")
public class SearchAnimalServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req,resp);
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
            }

            List<Animal> animalList = new ArrayList<>();
            for (Animal animal : animals) {
                boolean sign = true;
                if (animalList.size() == 0)
                    animalList.add(animals.get(0));
                else {
                    for (int j = 0; j < animalList.size(); j++) {
                        if (animalList.get(j).getSpecific().equals(animal.getSpecific())) {
                            sign = false;
                            break;
                        }

                    }
                    if (sign)
                        animalList.add(animal);
                }
            }


            String jsonString;
            if (animalList.size() != 0) {
                //将集合转化为JSON数据-序列化
                jsonString = JSON.toJSONString(animalList);
            } else {
                animals = animalService.SearchAnimal(JSON.parseObject(keyword, String.class));
                jsonString = JSON.toJSONString(animals);
            }

            //响应数据

            resp.getWriter().write(jsonString);
        }else {
            resp.getWriter().write(JSON.toJSONString("failure"));
        }
    }
}
