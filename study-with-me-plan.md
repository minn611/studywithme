# 📚 Study With Me — Project Plan

> *Không gian học tập chill, tập trung và kết nối — dù bạn học một mình hay cùng bạn bè.*

---

## 1. Tổng Quan Dự Án

| Hạng mục | Chi tiết |
|---|---|
| **Tên dự án** | Study With Me |
| **Loại sản phẩm** | Web Application |
| **Đối tượng người dùng** | Học sinh, sinh viên, người đi làm muốn học thêm |
| **Mục tiêu cốt lõi** | Tạo không gian học tập ấm cúng, có thể học một mình hoặc cùng bạn bè theo thời gian thực |

---

## 2. Tính Năng Đã Hoàn Thành (Phase 1 & 2)

### ⏱️ 2.1 Công Cụ Thời Gian (Timer)
- [x] **Pomodoro Timer** — Chu kỳ 25/5 mặc định, có vòng tròn tiến trình (Circular Progress).
- [x] **Stopwatch** — Bấm giờ xuôi.
- [x] **Countdown** — Đếm ngược thời gian tùy chỉnh.
- [x] **Clock** — Đồng hồ thực tế đa ngôn ngữ (Locale-aware).

### 🎵 2.2 Âm Thanh Chill (Sound Mixer)
- [x] **Sound Mixer** — Trộn 6 loại âm thanh: Mưa, Café, Sóng biển, Lửa, Rừng, White Noise.
- [x] **Volume Control** — Điều chỉnh âm lượng riêng biệt cho từng loại.

### 🏠 2.3 Phòng Học (Study Room)
- [x] **Realtime Presence** — Xem ai đang online trong phòng qua Supabase Realtime.
- [x] **Tạo & Tham gia phòng** — Qua mã phòng (Room Code).
- [x] **Live Reaction** — Thả emoji (🔥 💪 ✅ ⭐ 🎉) bay lên màn hình của mọi người.

### ✅ 2.4 Quản lý Nhiệm vụ (Todo List)
- [x] **Todo Widget** — Thêm, xóa, hoàn thành nhiệm vụ.
- [x] **Progress Bar** — Theo dõi % hoàn thành công việc.

### 🖼️ 2.5 Giao diện & Trải nghiệm (UI/UX)
- [x] **Glassmorphism Design** — Giao diện kính mờ hiện đại, sang trọng.
- [x] **Background Themes** — 6 loại Gradient + 3 loại **Animated Backgrounds** (Ocean Shore, Sakura, Galaxy).
- [x] **Focus Mode** — Ẩn UI để tập trung hoàn toàn.
- [x] **i18n (Đa ngôn ngữ)** — Hỗ trợ 5 ngôn ngữ: 🇻🇳 Tiếng Việt, 🇺🇸 English, 🇯🇵 日本語, 🇰🇷 한국어, 🇨🇳 中文.
- [x] **Authentication** — Đăng ký/Đăng nhập qua Supabase Auth (Email/Password).

---

## 3. Tính Năng Sắp Tới (Phase 3)

### 📊 3.1 Thống Kê & Mục Tiêu
- [ ] **Study Stats** — Biểu đồ thời gian học theo tuần/tháng.
- [ ] **Streak & Daily Goal** — Mục tiêu học tập hàng ngày.
- [ ] **Heat Map** — Lịch sử học tập giống GitHub.

### 👥 3.2 Cộng Đồng & AI
- [ ] **Phòng công khai** — Danh sách phòng để mọi người cùng tham gia.
- [ ] **AI Study Assistant** — Trợ lý học tập tích hợp Claude API/Gemini.
- [ ] **Global Leaderboard** — Bảng xếp hạng học tập.

---

## 4. Tech Stack

| Thành phần | Công nghệ |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS |
| **State** | Zustand |
| **Animation** | Framer Motion |
| **Backend/DB** | Supabase (PostgreSQL, Auth, Realtime) |
| **Deployment** | Vercel |

---

*Cập nhật lần cuối: 06/05/2026 — Phase 1 & 2 Completed*
