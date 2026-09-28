# Custom Domain Setup & Configuration Guide

Aarogya-Grid is configured for production custom domain deployment (e.g., `grid.mohfw.gov.in` or `aarogyagrid.in`).

---

## 1. Domain Configuration Variables

Set your custom domain in `.env.local` or your production hosting environment:

```env
NEXT_PUBLIC_APP_URL=https://grid.mohfw.gov.in
```

This dynamically configures:
- Canonical link tags and OpenGraph URLs
- `robots.txt` endpoint (`/robots.txt`)
- `sitemap.xml` endpoint (`/sitemap.xml`)

---

## 2. DNS Record Mapping

### Option A: Standard Production Domain (e.g. Vercel / Cloudflare)
Add the following records at your Domain Registrar (NIC, GoDaddy, Namecheap, Cloudflare):

| Type | Host / Name | Target / Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or subdomain `grid`) | `76.76.21.21` (or your host IP) | Auto / 300 |
| **CNAME** | `www` (or `grid`) | `cname.vercel-dns.com.` | Auto / 300 |

### Option B: On-Premise / National Informatics Centre (NIC) Server
If running behind an Nginx reverse proxy on an Indian NIC cloud VM:

```nginx
server {
    listen 80;
    server_name grid.mohfw.gov.in;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name grid.mohfw.gov.in;

    ssl_certificate /etc/ssl/certs/mohfw_grid.crt;
    ssl_certificate_key /etc/ssl/private/mohfw_grid.key;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 3. SSL / TLS Verification
Once DNS propagates:
- Ensure HTTP Strict Transport Security (HSTS) is active.
- Verify security headers (Content Security Policy, X-Frame-Options, X-Content-Type-Options).
