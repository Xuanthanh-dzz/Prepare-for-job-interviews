# Mock Interview

Hãy trả lời **thành tiếng** trước khi xem đáp án. Một lượt nên có 8–12 câu và kéo dài 20–40 phút tùy level.

<div id="mock-setup" class="mock-panel">
  <div class="toolbar-row">
    <div class="toolbar-item">
      <label for="mock-level">Level phỏng vấn</label>
      <select id="mock-level">
        <option>Intern</option>
        <option selected>Junior</option>
        <option>Middle</option>
        <option>Senior</option>
      </select>
    </div>
    <div class="toolbar-item">
      <label for="mock-track">Track</label>
      <select id="mock-track">
        <option value="">Full Stack</option>
        <option value="backend" selected>Backend .NET</option>
        <option value="frontend">Frontend Angular</option>
      </select>
    </div>
    <div class="toolbar-item">
      <label for="mock-topic">Chủ đề câu hỏi</label>
      <select id="mock-topic">
        <option value="">Tất cả chủ đề</option>
      </select>
    </div>
    <div class="toolbar-item">
      <label for="mock-count">Số lượng câu</label>
      <select id="mock-count">
        <option>5 câu (Luyện nhanh)</option>
        <option selected>8 câu (Tiêu chuẩn)</option>
        <option>10 câu (Đầy đủ)</option>
        <option>12 câu (Chuyên sâu)</option>
      </select>
    </div>
    <div class="toolbar-item" style="flex: 0 0 auto;">
      <label>&nbsp;</label>
      <button id="mock-start" class="btn btn-primary" type="button">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        Bắt đầu phỏng vấn
      </button>
    </div>
  </div>
</div>

<div id="mock-session" class="mock-session-card" hidden>
  <div class="mock-stepper">
    <span id="mock-progress-text" class="mock-stepper-text">Câu 1 / 8</span>
    <div id="mock-meta-badges" class="badges"></div>
  </div>

  <div class="mock-progress-track">
    <div id="mock-progress-fill" class="mock-progress-fill"></div>
  </div>

  <div class="mock-question-display">
    <div id="mock-question"></div>
  </div>

  <div style="text-align: center; margin: 1.5rem 0;">
    <button id="mock-reveal" class="btn btn-primary" type="button">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      Xem đáp án mẫu & Key points
    </button>
  </div>

  <div id="mock-answer" class="mock-answer-wrapper" hidden></div>

  <div id="mock-score" class="mock-actions" hidden>
    <button id="mock-review" class="btn btn-warning" type="button">⚠️ Cần ôn</button>
    <button id="mock-pass" class="btn btn-secondary" type="button">✓ Đạt</button>
    <button id="mock-strong" class="btn btn-success" type="button">🌟 Tốt</button>
    <button id="mock-next" class="btn btn-ghost" type="button">Bỏ qua →</button>
  </div>
</div>

<div id="mock-result" hidden></div>

!!! tip "Preset nên dùng cho Junior / Middle"
    **Junior Backend**: ưu tiên C#, ASP.NET Core, EF Core, SQL, HTTP/API, Security.  
    **Middle Backend**: thêm performance, transaction, caching, testing và architecture.  
    **Frontend Angular**: JavaScript/TypeScript + Angular theo đúng level.

!!! note "Cách tự chấm"
    **Cần ôn**: sai bản chất hoặc không trả lời được. **Đạt**: đúng ý chính nhưng còn thiếu trade-off/ví dụ. **Tốt**: trả lời đúng, có trade-off và xử lý được câu hỏi đào sâu. Không cần nói giống đáp án mẫu từng chữ.
