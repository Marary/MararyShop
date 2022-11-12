package marary.web.servlet;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@WebServlet("/ValidateCodeServlet")
public class ValidateCodeServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("image/jpeg");
        HttpSession session = req.getSession();
        int width = 60;
        int height = 20;

        //设置浏览器不要缓存此图片
        resp.setHeader("Pragma", "No-cache");
        resp.setHeader("Cache-Control", "no-cache");
        resp.setDateHeader("Expires", 0);

        //创建内存图像并获得图形上下文
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics graphics = image.getGraphics();

        /*
         * 产生随机验证码
         * 定义验证码的字符表
         */
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        char[] rands = new char[4];
        for (int i = 0; i < 4; i++) {
            int rand = (int) (Math.random() * 62);
            rands[i] = chars.charAt(rand);
        }

        /*
         * 产生图像
         * 画背景
         */
        graphics.setColor(new Color(0xDCDCDC));
        graphics.fillRect(0, 0, width, height);

        /*
         * 随机产生2000个干扰点
         */

        for (int i = 0; i < 200; i++) {
            int x = (int) (Math.random() * width);
            int y = (int) (Math.random() * height);
            int red = (int) (Math.random() * 255);
            int green = (int) (Math.random() * 255);
            int blue = (int) (Math.random() * 255);
            graphics.setColor(new Color(red, green, blue));
            graphics.drawOval(x, y, 1, 0);
        }
        graphics.setColor(new Color((int) (Math.random() * 255), (int) (Math.random() * 255), (int) (Math.random() * 255)));
        graphics.setFont(new Font(null, Font.ITALIC | Font.BOLD, 18));

        //在不同高度输出验证码的不同字符
        graphics.drawString("" + rands[0], 1, 17);
        graphics.drawString("" + rands[1], 16, 15);
        graphics.drawString("" + rands[2], 31, 18);
        graphics.drawString("" + rands[3], 46, 16);
        graphics.dispose();

        //将图像传到客户端
        ServletOutputStream sos = resp.getOutputStream();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "JPEG", baos);
        byte[] buffer = baos.toByteArray();
        resp.setContentLength(buffer.length);
        sos.write(buffer);
        baos.close();
        sos.close();

        //将验证码值保存在session中
        session.setAttribute("checkCode", new String(rands));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

}