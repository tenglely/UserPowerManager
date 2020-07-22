package com.teng.siedemo.config;

import com.teng.siedemo.entity.User;
import com.teng.siedemo.util.TokenUtils;
import io.micrometer.core.instrument.util.JsonUtils;
import io.micrometer.core.instrument.util.StringUtils;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * 登录拦截器
 *
 */
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object handler) throws IOException {
        // PreFlight请求，忽略本拦截器
        if (CorsUtils.isPreFlightRequest(request))
        {
            return true;
        }
        boolean flg = false; // 是否通过
        String token = request.getHeader("mytoken");
        //校验taken是否过期
        if (token!=null&&TokenUtils.verify(token))
        {
            flg = true;
        }
        else
        {
            // 根据系统需要，返回特定的消息格式
            write(request, response,"未登录或会话超时，接口不能访问!!!");
        }
        return flg;
    }

    /**
     * 通过response返回错误信息给前端
     *
     * @param request 请求
     * @param response 响应
     * @param content 响应内容
     */
    private void write(HttpServletRequest request, HttpServletResponse response, String content)
            throws IOException {

        String origin = request.getHeader("Origin");
        response.setHeader("Access-Control-Allow-Origin", origin);
        response.setCharacterEncoding("UTF-8");
        response.setStatus(401);
        // 401（身份验证错误） 此页要求授权。
        response.setContentType("application/json; charset=utf-8");
        response.getWriter().write(content);
    }
}

