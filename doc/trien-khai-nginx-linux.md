# Triển khai Forte trên Linux với Nginx

Hướng dẫn này dùng cho nhánh `main` của https://github.com/TrietTran1701/forte. Nhánh này chỉ có giao diện landing page, không cần cơ sở dữ liệu.

Nginx nhận truy cập từ internet qua cổng 80 và 443, rồi chuyển tiếp vào ứng dụng Next.js đang chạy ở `127.0.0.1:3000`. Ứng dụng đó do `npm run build` tạo ra và được `systemd` giữ cho chạy nền.

Các lệnh dưới đây dành cho Ubuntu hoặc Debian. Thay `forte.example.com` bằng tên miền của bạn.

## 1. Cài Node.js 22 và Nginx

Ứng dụng cần Node.js từ `20.18.1` trở lên.

```bash
sudo apt update
sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

## 2. Lấy mã nguồn

```bash
sudo mkdir -p /var/www
sudo git clone --branch main https://github.com/TrietTran1701/forte.git /var/www/forte
cd /var/www/forte
```

## 3. Tạo file .env, rồi build

Trong thư mục project, tạo file `.env` và thêm biến `NEXT_PUBLIC_SERVER_URL`. Biến này được đọc lúc build, dùng cho canonical URL, Open Graph, `robots.txt` và sitemap. Phải tạo file này trước khi chạy `npm run build`.

```bash
cd /var/www/forte
nano .env
```

Gõ đúng một dòng. Thay `forte.example.com` bằng tên miền thật, bắt đầu bằng `https://`, không có dấu `/` ở cuối:

```text
NEXT_PUBLIC_SERVER_URL=https://forte.example.com
```

Nhấn `Ctrl + O`, Enter để lưu, rồi `Ctrl + X` để thoát. Kiểm tra lại nội dung file:

```bash
cat .env
```

Sau đó cài dependency và build:

```bash
npm ci
npm run build
```

Kiểm tra ứng dụng trước khi mở ra internet:

```bash
npx next start -H 127.0.0.1 -p 3000
```

Trên server, lệnh `curl -I http://127.0.0.1:3000` cần trả về `200`. Sau đó nhấn Ctrl+C để dừng tiến trình thử.

## 4. Chạy ứng dụng bằng systemd

```bash
sudo tee /etc/systemd/system/forte.service >/dev/null <<'EOF'
[Unit]
Description=Forte landing page
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/forte
Environment=NODE_ENV=production
ExecStart=/usr/bin/npx next start -H 127.0.0.1 -p 3000
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo chown -R www-data:www-data /var/www/forte
sudo systemctl daemon-reload
sudo systemctl enable --now forte
sudo systemctl status forte
```

## 5. Trỏ Nginx vào ứng dụng

Trỏ bản ghi DNS A của tên miền về địa chỉ IP của server trước.

```bash
sudo tee /etc/nginx/sites-available/forte >/dev/null <<'EOF'
server {
    listen 80;
    server_name forte.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/forte /etc/nginx/sites-enabled/forte
sudo nginx -t
sudo systemctl reload nginx
```

Mở `http://forte.example.com` để kiểm tra.

## 6. Bật HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d forte.example.com
```

Certbot cấp chứng chỉ TLS và cấu hình Nginx lắng nghe cổng 443. Chứng chỉ được gia hạn tự động.

## Cập nhật phiên bản mới

```bash
cd /var/www/forte
sudo git pull origin main
npm ci
npm run build
sudo systemctl restart forte
```

Giữ nguyên file `.env`. File này không nằm trong repo, nên `git pull` sẽ không xóa nó.
