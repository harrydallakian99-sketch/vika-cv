#!/usr/bin/env python3
"""Деплой CV Вики на Timeweb VPS: /var/www/vika, https://vika.77-233-220-78.sslip.io

Запуск: ~/marketing_tool/.venv/bin/python ~/vika-cv/deploy.py [--init]
  --init  — первый раз: nginx-сайт + сертификат Let's Encrypt
"""
import os
import sys

sys.path.insert(0, os.path.expanduser("~/marketing_tool/planer"))
from _ssh import connect, run  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
DOMAIN = "vika.77-233-220-78.sslip.io"
ROOT = "/var/www/vika"
URL = f"https://{DOMAIN}/"

HEAD = f"""<!doctype html>
<html lang="hy">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#07060f">
<meta name="description" content="Vika Gezalyan — content producer, reels maker, AI creator. Ijevan, Armenia. Open to relocation.">
<meta property="og:type" content="website">
<meta property="og:url" content="{URL}">
<meta property="og:title" content="Vika Gezalyan — Content producer · Reels maker · AI creator">
<meta property="og:description" content="Interactive CV: shoots, AI video, AI photo, editing. Open to relocation.">
<meta property="og:image" content="{URL}assets/og.jpg">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%AA%90%3C/text%3E%3C/svg%3E">
<style>html{{color-scheme:dark}}body{{margin:0}}img{{max-width:100%}}</style>
"""

NGINX_80 = f"""server {{
    listen 80;
    listen [::]:80;
    server_name {DOMAIN};
    location /.well-known/acme-challenge/ {{ root /var/www/acme; }}
    location / {{ return 301 https://$host$request_uri; }}
}}
"""

NGINX_443 = f"""
server {{
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name {DOMAIN};

    ssl_certificate     /etc/letsencrypt/live/{DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/{DOMAIN}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    root {ROOT};
    index index.html;

    location / {{ try_files $uri $uri/ =404; add_header Cache-Control "no-cache"; }}
    location /assets/ {{ add_header Cache-Control "public, max-age=604800"; }}
}}
"""


def build():
    src = open(os.path.join(HERE, "index.html"), encoding="utf-8").read()
    title_end = src.index("</title>") + len("</title>")
    style_end = src.index("</style>") + len("</style>")
    page = HEAD + src[:style_end] + "\n</head>\n<body>\n" + src[style_end:] + "\n</body>\n</html>\n"
    assert title_end < style_end
    out = os.path.join(HERE, "build")
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, "index.html"), "w", encoding="utf-8") as f:
        f.write(page)
    return os.path.join(out, "index.html")


def write_remote(sftp, path, text):
    with sftp.open(path, "w") as f:
        f.write(text)


def main():
    init = "--init" in sys.argv
    page = build()
    c = connect()
    sftp = c.open_sftp()
    run(c, f"mkdir -p {ROOT}/assets /var/www/acme")

    sftp.put(page, f"{ROOT}/index.html")
    print("  ↑ index.html")
    assets = os.path.join(HERE, "assets")
    for name in sorted(os.listdir(assets)):
        local = os.path.join(assets, name)
        remote = f"{ROOT}/assets/{name}"
        try:
            if sftp.stat(remote).st_size == os.path.getsize(local):
                continue
        except IOError:
            pass
        sftp.put(local, remote)
        print(f"  ↑ assets/{name}")
    run(c, f"chown -R www-data:www-data {ROOT}; chmod -R a+rX {ROOT}")

    if init:
        conf = "/etc/nginx/sites-available/vika"
        write_remote(sftp, conf, NGINX_80)
        run(c, f"ln -sf {conf} /etc/nginx/sites-enabled/vika")
        rc, o, e = run(c, "nginx -t 2>&1 && systemctl reload nginx")
        print(o + e)
        if rc:
            run(c, "rm -f /etc/nginx/sites-enabled/vika; systemctl reload nginx")
            raise SystemExit("nginx -t не прошёл, откатил")
        rc, o, e = run(c, f"certbot certonly --webroot -w /var/www/acme -d {DOMAIN} "
                          "--non-interactive --agree-tos --register-unsafely-without-email 2>&1 | tail -8")
        print(o + e)
        rc, _, _ = run(c, f"test -f /etc/letsencrypt/live/{DOMAIN}/fullchain.pem")
        if rc:
            raise SystemExit("Сертификат не выпущен")
        write_remote(sftp, conf, NGINX_80 + NGINX_443)
        rc, o, e = run(c, "nginx -t 2>&1 && systemctl reload nginx")
        print(o + e)
        if rc:
            write_remote(sftp, conf, NGINX_80)
            run(c, "systemctl reload nginx")
            raise SystemExit("nginx -t (443) не прошёл, откатил до :80")

    sftp.close()
    c.close()
    print(URL)


if __name__ == "__main__":
    main()
