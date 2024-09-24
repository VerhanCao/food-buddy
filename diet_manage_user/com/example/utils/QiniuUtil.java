package com.example.utils;

import com.google.gson.Gson;
import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

/**
 * 七牛OSS管理工具
 */
public class QiniuUtil {

    /**
     * 存储空间名
     */
    private static final String BUCKET = "cd-diet-manage";
    /**
     * accessKey和secretKey
     */
    private static final String ACCESS_KEY = "p6-0lZ__03_Mc0GEgghdYginESPf2wdt9YUENJNr";
    private static final String SECRET_KEY = "TsvPhGpkemrjqGJ-ssvnmvBZUxvwJKuAerXfNo-T";
    /**
     * 外网访问地址(内置域名有效期只有30天)
     */
    private static final String BASE_URL = "https://sdg8qzun3.hn-bkt.clouddn.com/";

    /**
     * 上传管理器
     */
    private UploadManager upload;
    /**
     * 桶管理器（存储空间管理器）
     */
    private BucketManager bucket;

    public QiniuUtil() {
        //创建配置对象
        Configuration cfg = new Configuration(Zone.zone2());
        //创建上传管理器
        upload = new UploadManager(cfg);
        //创建存储空间管理器
        bucket = new BucketManager(getAuth(), cfg);
    }

    /**
     * 返回认证器（包含的访问密钥）
     *
     * @return
     */
    private Auth getAuth() {
        return Auth.create(ACCESS_KEY, SECRET_KEY);
    }

    /**
     * 获取令牌对象（服务器返回的授权信息）
     *
     * @return
     */
    private String getToken() {
        return getAuth().uploadToken(BUCKET);
    }

    /**
     * 文件上传
     *
     * @param file
     * @return
     */
    public String upload(File file, String key) {
        try {
            return upload(new FileInputStream(file), key);
        } catch (FileNotFoundException | QiniuException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 上传文件
     *
     * @param is
     * @param key
     * @return
     * @throws QiniuException
     */
    public String upload(InputStream is, String key) throws QiniuException {
        //上传流
        Response response = upload.put(is, key, getToken(), null, null);
        //解析返回结果
        DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
        //将文件的访问地址返回
        return BASE_URL + putRet.key;
    }

    /**
     * 删除文件
     *
     * @param key
     */
    public void delete(String key) {
        try {
            bucket.delete(BUCKET, key);
        } catch (QiniuException e) {
            e.printStackTrace();
        }
    }

    /**
     * 从完整的URL中提取文件的key
     *
     * @param avater 完整的文件URL
     * @return 文件的key
     */
    public static String extractKeyavater(String avater) {
        // 判断URL是否以BASE_URL开头
        if (avater.startsWith(BASE_URL)) {
            // 从URL中移除BASE_URL，得到文件的key
            return avater.substring(BASE_URL.length());
        } else {
            // 如果URL不是预期的格式，返回null
            return null;
        }
    }
}