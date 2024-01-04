# Sử dụng một hình ảnh chứa Node.js
FROM node:14

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn vào thư mục làm việc
COPY . .

# Expose cổng mà ứng dụng Nest.js sẽ chạy trên
EXPOSE 5000

# Chạy ứng dụng Nest.js khi container được khởi chạy
CMD ["npm", "run", "start:dev"]
