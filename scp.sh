rm -rf ./activity
npm run build
scp -i ./sshlogin.pem -r ./activity root@47.104.180.119:/usr/local/openresty/nginx/html/
if [ $? -ne 0 ]; then
echo "上传失败"
else
echo "上传成功"
fi
