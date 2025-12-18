interface RequestConfig extends RequestInit {
  params?: Record<string, any>;
}

/**
 * 基础请求函数封装
 * @param url 请求地址
 * @param config 请求配置
 * @returns Promise
 */
export const request = async (url: string, config: RequestConfig = {}) => {
  const { params, ...init } = config;

  // 处理 URL 参数
  let finalUrl = url;
  if (params) {
    const searchParams = new URLSearchParams(params);
    finalUrl += (url.includes("?") ? "&" : "?") + searchParams.toString();
  }

  try {
    const response = await fetch(finalUrl, init);

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 尝试解析 JSON，如果不是 JSON 则返回文本
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

/**
 * POST 请求封装
 * @param url 请求地址
 * @param data 请求数据
 * @param config 请求配置
 * @returns Promise
 */
export const post = (url: string, data?: any, config?: RequestConfig) => {
  const headers = {
    "Content-Type": "application/json",
    ...config?.headers,
  } as Record<string, string>;

  const defaultConfig: RequestConfig = {
    method: "POST",
    headers,
    ...config,
  };

  // 处理不同类型的请求体
  if (data instanceof FormData) {
    // 如果是 FormData，直接使用（常用于文件上传）
    defaultConfig.body = data;
    // FormData 会自动设置 Content-Type，所以删除手动设置的
    delete headers["Content-Type"];
  } else if (data) {
    // 如果是普通对象，转换为 JSON
    defaultConfig.body = JSON.stringify(data);
  }

  return request(url, defaultConfig);
};

/**
 * GET 请求封装
 * @param url 请求地址
 * @param params URL 参数
 * @param config 请求配置
 * @returns Promise
 */
export const get = (url: string, params?: Record<string, any>, config?: RequestConfig) => {
  return request(url, {
    method: "GET",
    params,
    ...config,
  });
};

export default {
  request,
  get,
  post,
};
