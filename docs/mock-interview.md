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
  <label>Số câu
    <select id="mock-count">
      <option>5</option>
      <option selected>8</option>
      <option>10</option>
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
  <div class="mock-actions">
    <button id="mock-next" type="button">Câu tiếp theo →</button>
  </div>
</div>

<div id="mock-result" class="mock-panel" hidden></div>

!!! note "Tự chấm theo 3 tiêu chí"
    Sau mỗi câu, tự hỏi: **đúng bản chất chưa**, **có nói được trade-off không**, và **có ví dụ thực tế không**. Không cần nói giống đáp án mẫu từng chữ.
