# Junior & Middle Focus

Đây là giai đoạn ưu tiên hiện tại của repo.

## Junior — phải làm được feature độc lập

Junior không cần trả lời như kiến trúc sư. Interviewer thường muốn biết bạn có thể nhận một ticket và hoàn thành đúng cách hay không.

### Backend .NET

Bạn nên chắc:

- C# core, async/await, LINQ
- ASP.NET Core request pipeline
- model binding + validation
- DI lifetime
- configuration + logging
- Web API status code + DTO
- EF Core query/tracking/migration
- SQL join/index/group/transaction
- authentication vs authorization
- unit test + integration test cơ bản

**Chuẩn Junior:** trả lời đúng bản chất, biết dùng trong feature thật, biết lỗi phổ biến.

### Frontend Angular

Bạn nên chắc:

- JavaScript / TypeScript nền tảng
- component, directive, service
- Input / Output
- data binding
- Angular DI
- Router + lazy loading
- Reactive Forms
- Observable / async pipe
- Signals cơ bản
- HTTP API + error/loading state

**Chuẩn Junior:** tự build một màn CRUD/form/API flow hoàn chỉnh mà không cần người khác chỉ từng bước.

---

## Middle — phải giải thích được trade-off

Middle không chỉ biết làm feature. Bạn cần biết **vì sao chọn cách đó**, hệ thống sẽ lỗi ở đâu và cách debug.

### Backend .NET

Bạn nên chắc:

- middleware vs filter
- BackgroundService + DI scope
- health check
- rate limiting
- output caching
- global exception handling
- EF Core split query / bulk update / concurrency
- keyset pagination
- migration zero-downtime
- SQL execution plan
- sargability
- covering/composite index
- deadlock + isolation level
- Testcontainers / contract test
- repository/unit-of-work trade-off
- cache stampede

**Chuẩn Middle:** nói được performance implication, concurrency issue, failure mode và cách đo/debug.

### Frontend Angular

Bạn nên chắc:

- OnPush
- Signals + RxJS
- switchMap / mergeMap / concatMap / exhaustMap
- subscription lifecycle
- interceptor
- guard / resolver
- custom form control
- standalone architecture
- defer/lazy loading
- state management
- component/integration testing
- SSR / hydration

**Chuẩn Middle:** quản được một feature/module có state, async flow, performance và maintainability tốt.

---

## Cách mock interview

### Junior Backend — 30 phút

- 2 câu C#/.NET
- 2 câu ASP.NET Core
- 2 câu EF Core
- 2 câu SQL
- 1 câu Security
- 1 câu Testing

### Middle Backend — 45 phút

- 2 câu C# / Async
- 2 câu ASP.NET Core
- 2 câu EF Core
- 2 câu SQL
- 1 câu Security / Testing
- 1 câu Architecture

### Junior Frontend — 30 phút

- 2 câu JavaScript/TypeScript
- 5 câu Angular
- 1 câu Web Platform

### Middle Frontend — 45 phút

- 2 câu JavaScript/TypeScript
- 6 câu Angular/RxJS
- 1 câu performance
- 1 câu testing/architecture

## Cách tự đánh giá

| Mức | Biểu hiện |
|---|---|
| Cần ôn | Không nêu đúng bản chất hoặc phải nhìn đáp án ngay |
| Đạt Junior | Đúng ý chính, biết dùng trong feature |
| Junior mạnh | Biết thêm lỗi phổ biến và ví dụ project |
| Đạt Middle | Có trade-off, performance/concurrency/failure mode |
| Middle mạnh | Biết cách đo, debug và đưa ra quyết định có lý do |

!!! warning "Đừng học thuộc câu chữ"
    Một câu trả lời Middle tốt thường bắt đầu từ **context/constraint**, sau đó mới nói solution và trade-off.


---

## Scenario drill — đợt luyện mới

Sau khi học lý thuyết, hãy luyện các tình huống sau mà **không mở đáp án ngay**:

### Junior

- API bind đúng nhưng business rule fail: trả status nào?
- Client hủy request: CancellationToken đi đến EF Core/HttpClient thế nào?
- EF Core phát hàng chục query trong một loop: nghi vấn gì?
- JOIN làm số dòng tăng bất thường: kiểm tra gì trước khi dùng DISTINCT?
- Angular HttpClient lỗi: loading/error state đặt ở đâu?
- Reactive Form invalid: khi nào nên hiện message?
- XSS và CSRF khác nhau ra sao?

### Middle

- Endpoint chậm vì hàng trăm query giống nhau: debug từ đâu?
- POST payment bị retry hai lần: thiết kế idempotency thế nào?
- Distributed cache stale: invalidation strategy ra sao?
- Query plan ước lượng sai row: statistics ảnh hưởng thế nào?
- Angular component bị check quá nhiều: profile và xử lý gì?
- RxJS stream chết sau một request lỗi: kiểm tra vị trí catchError ở đâu?
- Form lớn lag khi gõ: validator/valueChanges/updateOn ảnh hưởng thế nào?
- Outbox worker test bị flaky: làm sao chờ eventual consistency mà không sleep cố định?

!!! tip "Cách trả lời scenario"
    Dùng cấu trúc: **triệu chứng → giả thuyết → cách đo/xác nhận → cách sửa → trade-off**.  
    Với Middle, nếu chỉ nhảy thẳng vào solution mà không nói cách xác nhận nguyên nhân thì câu trả lời vẫn chưa mạnh.
