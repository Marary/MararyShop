package marary.web.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

//检查验证码是否正确，不正确则刷新页面，重新生成验证码

@WebServlet("/CheckValidateCodeServlet")
public class CheckValidateCodeServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取session中储存的实际验证码的值
        HttpSession session = req.getSession();
        String checkCode = (String) session.getAttribute("checkCode");

        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/plain");

        //获取用户输入的验证码
        String validateCode = req.getParameter("validateCode");

        //不区分大小写
        boolean result = (validateCode).equalsIgnoreCase(checkCode);

        PrintWriter writer = resp.getWriter();
        if (result) {
            writer.print("Correct");
        } else {
            writer.print("Wrong");
        }

        writer.flush();
        writer.close();
    }
}
