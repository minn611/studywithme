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

## 2. Tính Năng Cốt Lõi (MVP)

### ⏱️ 2.1 Công Cụ Thời Gian
- **Đồng hồ bấm giờ (Stopwatch)** — bắt đầu / dừng / reset, hiển thị giờ:phút:giây
- **Bộ đếm ngược (Countdown Timer)** — nhập thời gian mong muốn, có cảnh báo khi hết giờ
- **Pomodoro Timer** — chu kỳ học/nghỉ mặc định 25/5 phút, tùy chỉnh được; tự động chuyển sang break
- **Đồng hồ thực (Clock)** — hiển thị giờ thực tế theo múi giờ người dùng

### 🕐 2.2 Timelapse Phiên Học
- Ghi lại thời gian bắt đầu và kết thúc từng phiên học
- Tổng kết cuối phiên: đã học bao lâu, bao nhiêu pomodoro hoàn thành
- Lịch sử timelapse theo ngày (xem lại đã học những lúc nào)

### 🏠 2.3 Phòng Học (Study Room)
- **Tạo phòng** — đặt tên phòng, mô tả ngắn, chọn chủ đề màu sắc
- **Mời bạn bè** — chia sẻ link/mã phòng để bạn bè tham gia
- **Phòng công khai / riêng tư** — toggle visibility
- **Danh sách thành viên online** — xem ai đang online trong phòng, avatar + tên
- **Live reaction nhẹ** — thành viên có thể gửi emoji (🔥 💪 ✅) hiển thị thoáng qua không làm phân tâm

### 🎵 2.4 Âm Thanh Chill (Ambient Sounds)
- Thư viện âm thanh sẵn có:
  - ☕ Tiếng café (café background noise)
  - 🌧️ Tiếng mưa (rain)
  - 🌊 Tiếng sóng biển (ocean waves)
  - 🔥 Tiếng lửa crackling
  - 🌿 Tiếng rừng / thiên nhiên
  - 🎵 Lo-fi hip hop
  - 📚 White noise / brown noise
- **Sound Mixer** — trộn nhiều loại âm thanh cùng lúc, điều chỉnh âm lượng từng loại riêng biệt
- Nút tắt / bật âm thanh nhanh

### 🖼️ 2.5 Background Themes
- Thư viện background sẵn có (cozy room, library, café, forest, rainy window...)
- Upload background ảnh cá nhân
- Hỗ trợ video loop background (ví dụ: cửa sổ mưa rơi)
- **Focus Mode** — ẩn toàn bộ UI, chỉ hiện đồng hồ và background

---

## 3. Tính Năng Mở Rộng (v2)

### ✅ 3.1 To-do List Tích Hợp
- Thêm task cần hoàn thành trong phiên học
- Check off từng task
- Gắn task với pomodoro (task này cần bao nhiêu pomodoro?)

### 📊 3.2 Thống Kê Cá Nhân (Study Stats)
- Tổng số giờ học hôm nay / tuần này / tháng này
- **Streak** — số ngày liên tiếp đã học
- Biểu đồ heat map học tập (giống GitHub contribution graph)
- Số pomodoro hoàn thành
- So sánh với tuần trước

### 🎯 3.3 Daily Goal
- Đặt mục tiêu số giờ học mỗi ngày
- Progress bar hiển thị tiến độ trong ngày
- Thông báo khi đạt mục tiêu

### 👥 3.4 Tính Năng Cộng Đồng
- **Phòng công khai** — tham gia vào phòng lạ, học cùng người chưa quen
- **Global leaderboard** — xem ai học nhiều nhất tuần này (opt-in)
- **Study buddy** — ghép đôi ngẫu nhiên để cùng học 1 phiên

### 🤖 3.5 AI Study Assistant (tích hợp Claude API)
- Hỏi nhanh câu hỏi học tập ngay trong web
- Giải thích khái niệm, tóm tắt tài liệu
- Gợi ý kế hoạch học tập dựa trên thời gian còn lại

---

## 4. UI/UX Design Direction

### Aesthetic
- **Tone**: Cozy, ấm áp, tối giản — không bị rối mắt
- **Typography**: Font serif hoặc rounded sans-serif, dễ đọc
- **Color palette**: Earth tones, pastel ấm (beige, sage green, dusty rose, warm gray)
- **Dark mode** mặc định với option light mode
- Animations nhẹ nhàng, smooth — không flash, không distract

### Layout chính
```
┌─────────────────────────────────────────────────┐
│  [Background full screen]                        │
│                                                  │
│  ┌─────────┐   ┌──────────────┐   ┌──────────┐  │
│  │  Clock  │   │  Main Timer  │   │  Sound   │  │
│  │ 10:42AM │   │   25:00  ▶  │   │  Mixer   │  │
│  └─────────┘   └──────────────┘   └──────────┘  │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  Study Room: "CS Finals 2025" 👥 4 online │   │
│  │  [Avatar] [Avatar] [Avatar] [Avatar]      │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  [To-do]  [Stats]  [Settings]  [Focus Mode]     │
└─────────────────────────────────────────────────┘
```

---

## 5. Tech Stack Đề Xuất

### Frontend
| Công nghệ | Lý do chọn |
|---|---|
| **Next.js (React)** | SSR, routing, performance tốt |
| **Tailwind CSS** | Style nhanh, dễ responsive |
| **Framer Motion** | Animation smooth |
| **Zustand** | State management nhẹ |

### Backend & Real-time
| Công nghệ | Lý do chọn |
|---|---|
| **Supabase** | Database + Auth + Realtime subscriptions |
| **Socket.io / Supabase Realtime** | Đồng bộ phòng học live |
| **Cloudinary** | Upload và lưu trữ background ảnh |

### Hosting
| Dịch vụ | Dùng cho |
|---|---|
| **Vercel** | Deploy frontend |
| **Supabase** | Backend + DB |

---

## 6. Database Schema (Cơ bản)

```
users
  - id, username, avatar_url, email
  - total_study_minutes, streak_days, daily_goal_minutes
  - created_at

study_rooms
  - id, name, description, host_user_id
  - is_public, room_code (6 ký tự)
  - background_theme, ambient_sound_preset
  - created_at

room_members
  - room_id, user_id, joined_at, is_online

study_sessions
  - id, user_id, room_id (nullable nếu học một mình)
  - started_at, ended_at, duration_minutes
  - pomodoros_completed

todos
  - id, user_id, session_id
  - content, is_completed, pomodoros_estimated
```

---

## 7. Lộ Trình Phát Triển

### 🟢 Phase 1 — MVP (4–6 tuần)
- [ ] Setup project (Next.js + Tailwind + Supabase)
- [ ] Authentication (đăng ký / đăng nhập)
- [ ] Trang chính với background + ambient sound
- [ ] Stopwatch + Countdown + Pomodoro timer
- [ ] Tạo phòng & mời bạn qua link
- [ ] Xem danh sách thành viên online trong phòng (realtime)
- [ ] Deploy lên Vercel

### 🟡 Phase 2 — Enhancement (3–4 tuần)
- [ ] To-do list tích hợp
- [ ] Study stats cơ bản (hôm nay học bao lâu)
- [ ] Sound mixer (trộn nhiều âm thanh)
- [ ] Thư viện background themes
- [ ] Focus Mode
- [ ] Upload background cá nhân
- [ ] Live emoji reactions trong phòng

### 🔵 Phase 3 — Community & AI (4–6 tuần)
- [ ] Streak + Daily goal
- [ ] Heat map thống kê
- [ ] Phòng công khai (browse & join)
- [ ] Leaderboard
- [ ] AI Study Assistant (Claude API)
- [ ] Mobile responsive / PWA

---

## 8. Monetization (Tùy chọn tương lai)

| Tính năng | Free | Premium |
|---|---|---|
| Học một mình | ✅ | ✅ |
| Tạo phòng | ✅ (1 phòng) | ✅ (không giới hạn) |
| Background sẵn có | ✅ (5 cái) | ✅ (toàn bộ) |
| Upload background cá nhân | ❌ | ✅ |
| Study stats chi tiết | 7 ngày | Không giới hạn |
| AI Assistant | ❌ | ✅ |
| Sound mixer nâng cao | ❌ | ✅ |

---

## 9. Tên Miền & Branding Gợi Ý

- `studywithme.app`
- `focushive.co`
- `cozystudy.space`
- `studynest.io`

**Tagline gợi ý:**
> *"Học thôi, mình có nhau."*
> *"Your cozy corner to get things done."*
> *"Study alone. Study together. Just study."*

---

## 10. Checklist Trước Khi Launch

- [ ] Responsive trên mobile
- [ ] Test realtime với nhiều user cùng lúc
- [ ] Xử lý mất kết nối / reconnect gracefully
- [ ] Audio autoplay policy (cần user gesture)
- [ ] Tối ưu performance (lazy load sounds, images)
- [ ] GDPR / Privacy policy cơ bản
- [ ] Error handling và loading states
- [ ] SEO cơ bản (meta tags, OG image đẹp để share)

---

*Plan được tạo: 06/05/2026 — Version 1.0*
