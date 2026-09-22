# Module C# / .NET

Module này tập trung vào phần kiến thức thường được dùng để phân biệt **Intern → Junior → Middle → Senior** trong phỏng vấn .NET.

Hiện ngân hàng có các nhóm chính:

- **C# language**: type system, equality, record, generic, delegate/event, iterator, expression tree.
- **Collections / LINQ**: enumeration, deferred execution, materialization, grouping, equality.
- **Async / Concurrency**: Task, async/await, cancellation, bounded concurrency, starvation, backpressure.
- **Memory / GC**: generations, LOH, allocation, pooling, pinning, memory leak.
- **.NET Runtime**: CLR, JIT, reflection, source generator, NativeAOT, trimming, AssemblyLoadContext.

## Intern — hiểu đúng nền tảng

Bạn nên trả lời chắc các câu về:

- value type / reference type
- class / struct
- interface / abstract class
- access modifier
- const / readonly
- property / field
- overload / override
- nullable, boxing/unboxing
- Array, List, Dictionary
- exception, using, IDisposable
- CLR, assembly, JIT, GC

**Interviewer mong đợi:** định nghĩa đúng, có ví dụ ngắn và không nhầm các khái niệm cơ bản.

## Junior — dùng được trong feature thực tế

Trọng tâm:

- delegate, event, extension method
- generics
- record, init, required
- IEnumerable / IEnumerator
- LINQ và deferred execution
- async/await, Task, Task.WhenAll
- nullable reference types
- IDisposable / IAsyncDisposable
- DateTime / DateTimeOffset

**Interviewer mong đợi:** không chỉ nói “là gì” mà phải biết khi nào dùng và lỗi phổ biến.

## Middle — trade-off và performance

Trọng tâm:

- covariance / contravariance
- closure
- Span / Memory
- expression tree
- LINQ materialization
- SemaphoreSlim
- bounded concurrency
- ThreadPool starvation
- ConfigureAwait
- ValueTask
- GC generations, LOH
- managed memory leak
- ArrayPool
- reflection và source generator

**Interviewer mong đợi:** giải thích được trade-off, performance implication và failure mode.

## Senior — runtime, operability và API design

Trọng tâm:

- thiết kế equality/value object
- lựa chọn class/struct/record cho public API
- async API design
- backpressure
- chẩn đoán ThreadPool starvation
- concurrent collection và atomicity
- allocation profiling
- Server GC / Workstation GC
- pinning, pooling, memory leak investigation
- NativeAOT / trimming
- AssemblyLoadContext
- runtime/SDK version strategy
- binary compatibility
- serialization contract

**Interviewer mong đợi:** bắt đầu từ constraint, dùng số liệu/profiling, nói được hậu quả production và tránh tối ưu theo cảm tính.

## Cách luyện module này

1. Vào **Ngân hàng câu hỏi**, lọc từng topic và level.
2. Với mỗi câu, tự trả lời trong khoảng **30–90 giây** trước khi mở đáp án.
3. Dùng **Flashcards** cho các câu cần recall nhanh.
4. Chạy **Mock Interview** theo đúng topic vừa học.
5. Với Middle/Senior, luôn thêm một câu: **“trade-off là gì?”** hoặc **“khi nào giải pháp này thất bại?”**

!!! warning "Không học thuộc câu chữ"
    Đáp án trong repo là **đáp án mẫu để kiểm tra ý**, không phải script bắt buộc. Khi phỏng vấn thật, trả lời bằng ngôn ngữ của bạn và gắn với kinh nghiệm/project sẽ tự nhiên hơn.
