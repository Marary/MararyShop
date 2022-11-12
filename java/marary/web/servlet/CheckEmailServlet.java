package marary.web.servlet;

import marary.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


@WebServlet("/emailIsExists")
public class CheckEmailServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String email=req.getParameter("email");
        UserService userService=new UserService();
        boolean result=userService.checkEmail(email);

        resp.setContentType("text/plain");
        PrintWriter writer=resp.getWriter();
        if (result){
            writer.print("Exist");
        }else {
            writer.print("Not Exist");
        }

        writer.flush();
        writer.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
