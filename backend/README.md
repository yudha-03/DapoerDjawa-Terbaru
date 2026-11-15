# DapoerDjawa Backend (NestJS + Prisma v7 + Swagger)

Backend API untuk aplikasi DapoerDjawa dibangun menggunakan NestJS v12, Prisma v7 (dengan `@prisma/adapter-pg`), dan Swagger OpenAPI.

## Fitur & Konfigurasi

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma v7](https://www.prisma.io/docs/guides/v7/frameworks/nestjs) dengan custom client output (`src/generated/prisma`) dan driver adapter `@prisma/adapter-pg`.
- **API Docs**: [Swagger](https://docs.nestjs.com/openapi/introduction) (`@nestjs/swagger`, `swagger-ui-express`)
- **Port default**: `3001` (menghindari bentrok dengan frontend pada port `3000`)
- **CORS**: Sudah diaktifkan secara default untuk memudahkan komunikasi dengan frontend.

## Cara Menjalankan

Masuk ke folder `backend`:
```bash
cd backend
```

### 1. Menjalankan Mode Development
```bash
npm run start:dev
```

### 2. Membuka Swagger API Documentation
Setelah server berjalan, buka browser di:
- [http://localhost:3001/api](http://localhost:3001/api)

### 3. Generate Prisma Client (jika mengubah schema)
```bash
npx prisma generate
```

### 4. Build Production
```bash
npm run build
npm run start:prod
```
