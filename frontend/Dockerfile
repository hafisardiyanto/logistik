# STAGE 1: Build tahap kompilasi Vue (Vite)
FROM node:20-alpine AS builder

WORKDIR /app

# Salin package.json dan install dependensi
COPY package*.json ./
RUN npm install

# Salin seluruh kode frontend
COPY . .

# Build aplikasi untuk production
RUN npm run build

# STAGE 2: Tahap penyajian menggunakan Nginx
FROM nginx:alpine

# Salin konfigurasi Nginx kustom untuk menangani Vue Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Hapus file default nginx
RUN rm -rf /usr/share/nginx/html/*

# Salin hasil build dari tahap 1 ke folder html Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
