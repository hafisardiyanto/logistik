# Gunakan image Node.js versi 20
FROM node:20-alpine

# Set working directory di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependensi (termasuk Prisma)
RUN npm install

# Salin seluruh kode backend
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port yang digunakan backend (3000)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
