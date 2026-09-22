# Mock Interview

Hãy trả lời **thành tiếng** trước khi xem đáp án. Một lượt nên có 8–12 câu và kéo dài 20–40 phút tùy level.

<div id="mock-setup" class="mock-panel">
  <label>Level
    <select id="mock-level">
      <option>Intern</option>
      <option selected>Junior</option>
      <option>Middle</option>
      <option>Senior</option>
    </select>
  </label>
  <label>Chủ đề
    <select id="mock-topic">
      <option value="">Tất cả</option>
    </select>
  </label>
  <label>Số câu
    <select id="mock-count">
      <option>5</option>
      <option selected>8</option>
      <option>10</option>
      <option>12</option>
    </select>
  </label>
  <button id="mock-start" type="button">Bắt đầu phỏng vấn</button>
</div>

<div id="mock-session" class="mock-panel" hidden>
  <div id="mock-progress"></div>
  <h2 id="mock-question"></h2>
  <div id="mock-meta" class="muted"></div>

  <button id="mock-reveal" type="button">Xem đáp án mẫu</button>

  <div id="mock-answer" class="mock-answer" hidden></div>

  <div id="mock-score" class="mock-actions" hidden>
    <button id="mock-review" type="button">Cần ôn</button>
    <button id="mock-pass" type="button">Đạt</button>
    <button id="mock-strong" type="button">Tốt</button>
    <button id="mock-next" type="button">Bỏ qua →</button>
  </div>
</div>

<div id="mock-result" class="mock-panel" hidden></div>

!!! note "Cách tự chấm"
    **Cần ôn**: sai bản chất hoặc không trả lời được. **Đạt**: đúng ý chính nhưng còn thiếu trade-off/ví dụ. **Tốt**: trả lời đúng, có trade-off và xử lý được follow-up. Không cần nói giống đáp án mẫu từng chữ.
