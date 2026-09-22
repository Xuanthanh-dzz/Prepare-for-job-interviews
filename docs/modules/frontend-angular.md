# Module Frontend — JavaScript / TypeScript / Angular

Đây là nhánh Frontend chính của repo dành cho mục tiêu **Full Stack .NET + Angular**.

Module không bắt đầu ngay bằng framework. Một ứng viên Angular tốt vẫn cần hiểu JavaScript, TypeScript, browser và HTML/CSS đủ chắc để debug ngoài abstraction của framework.

## Thứ tự học khuyến nghị

1. **JavaScript**
2. **TypeScript**
3. **HTML / CSS / Web Platform**
4. **Angular fundamentals**
5. **RxJS / Forms / Routing / DI**
6. **Performance / Testing / SSR / Architecture**

## Intern — nền tảng ngôn ngữ và browser

Trọng tâm:

- `var`, `let`, `const`
- equality, null/undefined
- closure
- Promise / event loop
- arrow function và `this`
- TypeScript type system
- union / intersection / generic
- semantic HTML
- CSS box model, Flexbox, Grid
- DOM, cookie và Web Storage

**Interviewer mong đợi:** hiểu JavaScript/TypeScript thật sự, không chỉ biết chạy Angular CLI.

## Junior — xây feature Angular độc lập

Trọng tâm:

- component, directive, service
- data binding
- dependency injection
- router và lazy loading
- Reactive Forms
- Observable / RxJS
- `async` pipe
- Angular Signals
- lifecycle
- Input / Output
- TypeScript thực tế

**Interviewer mong đợi:** có thể nhận một feature, gọi API, dựng form, validate, route và xử lý state cục bộ đúng cách.

## Middle — trade-off và maintainability

Trọng tâm:

- OnPush
- Signals + RxJS
- `switchMap`, `mergeMap`, `concatMap`, `exhaustMap`
- subscription lifecycle
- interceptor
- guard / resolver
- custom form control
- list identity
- standalone architecture
- deferred views
- state management
- component testing
- SSR / hydration

**Interviewer mong đợi:** nói được trade-off, performance implication và lỗi production thường gặp.

## Senior — frontend architecture và production

Trọng tâm:

- feature boundaries
- performance profiling
- zoneless Angular
- state strategy
- error handling
- authentication flow
- refresh-token race
- microfrontend
- monorepo
- Angular major upgrades
- NgModule → standalone migration
- observability
- accessibility
- caching
- SSR / SSG / CSR
- API contract isolation
- testing strategy
- code review ở cấp architecture

**Interviewer mong đợi:** không chỉ biết API framework mà phải quản được complexity, operability và migration của codebase lớn.

## Angular hiện đại và codebase cũ

Repo ưu tiên Angular hiện đại:

- standalone components
- signals
- built-in control flow
- lazy/deferred loading
- typed/reactive forms
- hướng change detection mới

Nhưng vẫn có câu về `NgModule`, lifecycle và RxJS vì nhiều hệ thống enterprise đang chạy codebase cũ và ứng viên cần đọc/migrate được.

## Cách luyện

1. Lọc **JavaScript** và **TypeScript** trước nếu nền tảng chưa chắc.
2. Học Angular theo level.
3. Với RxJS, luôn tự hỏi: **concurrency semantics là gì?**
4. Với Angular Middle/Senior, luôn tự hỏi thêm:
   - Có memory leak không?
   - Có unnecessary rendering không?
   - State owner là ai?
   - Error/loading state xử lý ở đâu?
   - Backend vẫn enforce security chứ?

!!! tip "Không học Angular như bộ syntax"
    Phỏng vấn tốt thường đi từ **JavaScript/TypeScript → browser → Angular → architecture**, không chỉ hỏi decorator hay CLI command.
