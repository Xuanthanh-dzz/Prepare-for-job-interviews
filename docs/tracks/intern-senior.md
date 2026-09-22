# Intern & Senior Focus — 60 / 40

Đợt nội dung này ưu tiên **60% Intern / 40% Senior**.

Mục tiêu không phải làm hai level giống nhau về độ khó:

- **Intern:** chắc nền tảng, hiểu luồng ứng dụng và có thể làm task nhỏ dưới hướng dẫn.
- **Senior:** ra quyết định có trade-off, quản rủi ro production và giải thích được vì sao chọn kiến trúc.

## Intern — 60%

### Backend

Nên chắc:

- C# syntax, type system, class/struct, interface
- OOP: encapsulation, inheritance, composition, polymorphism
- ASP.NET Core: endpoint, route/query, DI, middleware, status code
- EF Core: DbContext, DbSet, ToListAsync, Add/SaveChanges, migration
- SQL: WHERE, ORDER BY, primary key, JOIN
- Git: fetch/pull, commit, merge conflict

### Frontend

Nên chắc:

- JavaScript: array/object, map/filter, Promise/event loop
- TypeScript: type/interface, optional, readonly, generic
- Angular: component, service, Input/Output, Router
- HTML/CSS/Web Platform fundamentals

**Chuẩn Intern:** trả lời đúng khái niệm, giải thích được flow đơn giản và viết được ví dụ nhỏ.

## Senior — 40%

### Backend / Architecture

Nên chắc:

- modular monolith vs microservices
- domain/infrastructure boundary
- distributed transaction + outbox
- sync API vs messaging
- API versioning/deprecation
- multi-tenancy isolation
- downstream protection/backpressure
- EF Core vs raw SQL/Dapper
- migration bảng rất lớn
- DbContext + background concurrency
- hot table/write contention
- read replica
- partitioning

### Production / Security / Reliability

Nên chắc:

- threat modeling
- secret rotation
- timeout budget
- circuit breaker
- SLI / SLO / error budget
- progressive deployment
- rollback với database migration
- design system governance ở Angular

**Chuẩn Senior:** không trả lời theo “best practice” chung chung. Phải nói được constraint, cách đo, failure mode, trade-off và rollout/rollback.

## Cách luyện

### Intern

1. Trả lời trong 30–60 giây.
2. Có một ví dụ ngắn.
3. Nếu sai khái niệm cơ bản → đưa về Flashcards.
4. Chỉ chuyển topic khi trả lời đúng phần lớn câu đào sâu.

### Senior

Dùng cấu trúc:

**Context → Constraints → Options → Trade-off → Decision → Failure mode → Measurement**

Ví dụ khi hỏi “microservices hay monolith?” không trả lời “microservices scale tốt hơn”. Hãy nói rõ khi nào cần deploy độc lập, team ownership, failure isolation và chi phí distributed system.

!!! tip "Hai level, hai cách đánh giá"
    Intern được đánh giá ở **độ chắc nền tảng**. Senior được đánh giá ở **chất lượng quyết định trong điều kiện không hoàn hảo**.
