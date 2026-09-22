# Prepare for Job Interviews — Full Stack .NET

Kho kiến thức luyện phỏng vấn Full Stack .NET từ **Intern → Junior → Middle → Senior**.

Mục tiêu của repo không phải học thuộc đáp án, mà là luyện cách trả lời đúng trọng tâm, giải thích được trade-off và xử lý các câu hỏi đào sâu như trong phỏng vấn thật.

## Website

- Production (`main`): https://xuanthanh-dzz.github.io/Prepare-for-job-interviews/
- Branch preview: `https://xuanthanh-dzz.github.io/Prepare-for-job-interviews/previews/<branch-slug>/`

Ví dụ branch `feat/interview-prep-platform` có preview tại:

`https://xuanthanh-dzz.github.io/Prepare-for-job-interviews/previews/feat-interview-prep-platform/`

Quy ước deploy:

- `main` là **nguồn UI duy nhất** cho toàn bộ website.
- Theme, `mkdocs.yml`, CSS, JavaScript và các trang shell (home/question bank/flashcard/mock interview) luôn lấy từ `main`.
- Branch chỉ overlay data và nội dung riêng của branch lên UI từ `main`.
- Mỗi lần `main` thay UI, workflow tự rebuild lại toàn bộ branch previews bằng UI mới.
- Branch cũ có schema câu hỏi thấp hơn `main` sẽ tự dùng data mới của `main` để tránh preview bị vỡ.
- `main` luôn là bản production dành cho người dùng cuối.

- `main` luôn là bản production dành cho người dùng cuối.
- Mọi branch khác được deploy vào thư mục `previews/` và không được ghi đè production.
- Pull request phải build MkDocs thành công trước khi merge.
- Branch `gh-pages` chỉ dùng để lưu snapshot site đã build, không dùng để phát triển nội dung.

## Nội dung dự kiến

- C# / .NET
- OOP, SOLID, Design Patterns
- ASP.NET Core / Web API
- Entity Framework Core
- SQL / Database
- Authentication / Authorization / Security
- JavaScript / TypeScript / HTML / CSS / Web Platform
- Angular / RxJS / Forms / Routing / Frontend Architecture
- Testing
- Git / CI-CD / Docker / Cloud basics
- Architecture / Distributed Systems / System Design
- Behavioral & Project Experience

## 4 cấp độ

| Level | Trọng tâm |
|---|---|
| Intern | Nền tảng, syntax, HTTP, SQL cơ bản, tư duy lập trình |
| Junior | Viết feature độc lập, CRUD, DI, EF Core, debugging |
| Middle | Thiết kế module, performance, testing, security, trade-off |
| Senior | Kiến trúc, scalability, reliability, observability, leadership, failure modes |

## Mỗi câu hỏi gồm

- Câu hỏi
- Câu trả lời mẫu ngắn gọn
- Key points interviewer mong đợi
- Câu hỏi đào sâu + câu trả lời mẫu riêng
- Level và topic

Cấu trúc dữ liệu này được tái sử dụng cho **website học**, **flashcard** và **mock interview**.

> Core track hiện tại: **Backend C#/.NET/EF Core/SQL** và **Frontend JavaScript/TypeScript/Angular**. Nội dung ưu tiên chất lượng câu hỏi và cách trả lời thực chiến hơn số lượng.
>
> Platform depth đang được mở rộng có chọn lọc: **Redis, Docker/Kubernetes, HTTP/Security, Testing và System Design fundamentals**.
