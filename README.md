# 재활용품 홈페이지

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

# 배포 (CI/CD) - Vercel

**URL** : https://www.ecobuddy.life/

## 📌 프로젝트 개요

- **기간**: 2024/07 - 2024/09 (리팩토링 예정)
- **협업**: 대구 지방청과 협업을 맺어 진행한 팀 프로젝트 (백엔드, AI 협업)

## **프로젝트 내 나의 역할**

- FullStack (Frontend - Next.JS, Backend - MongoDB 모두 담당)  + AI chatbot 구현
- PM

## 🛠 기술 스택

### Frontend

- **Framework**: Next.js (React 기반)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **상태관리**: Zustand

### Backend

- **mongoose**
- **Database**: MongoDB

## 🌟 주요 기능

1. **재활용 정보 게시판**

   - Swiper를 이용한 슬라이딩 구현
   - Dynamic Routes 활용
   - RESTful API 구현

2. **상세 제품 검색 기능**

   - RESTful API 활용
   - JavaScript filter 함수 사용

3. **공지(자유) 게시판**

   - CRUD 기능 구현 (추가, 삭제 등)
   - axios를 이용한 RESTful API 호출 (GET, POST)

4. **재활용 쓰레기통 지도**

   - 카카오 지도 API 활용
   - RESTful API 연동

5. **To-Do List**
   - Zustand 상태관리 라이브러리 사용
  
6. **Open AI**
   - AI Chat Bot
   - Prompt 구현

## 🔍 개발 과정에서 배운 점

- Next.js의 Link 태그는 클라이언트 사이드 라우팅으로 동작하여 성능 최적화
- 서버 사이드 렌더링을 통한 SEO 최적화
- 동적 라우팅의 편리함

## 🚧 직면한 문제와 해결 방법

### 1. 마커 상태 관리 문제

**문제**: 하나의 마커 상태 변경이 모든 마커에 적용되는 현상
**해결**: 개별 마커 컴포넌트를 생성하여 상태를 독립적으로 관리

### 2. CORS 에러

**문제**: 네이버 뉴스 API 호출 시 CORS 에러 발생
**해결**: Next.js의 API Routes 기능을 활용하여 서버 사이드에서 API 호출

### 3. Props Drilling 문제

**문제**: 동적 페이지 이동 시 데이터 전달의 복잡성
**해결**: Zustand 상태관리 라이브러리 도입 및 Local Storage 활용 (Zustand persist)

### 4 MongoDB 사용하여 BackEnd - DB 구축

### 5. OpenAI API 사용하여 Chat Bot 구현

## 🏁 시작하기

```bash
# 개발 서버 실행
npm run dev
# 또는
yarn dev
<<<<<<< HEAD
```

=======
