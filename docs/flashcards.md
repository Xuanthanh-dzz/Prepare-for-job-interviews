# Flashcards

Mục tiêu của flashcard là **tự trả lời trước khi lật thẻ**. Đừng lật ngay khi vừa đọc câu hỏi.

<div class="interview-toolbar">
  <label>Level
    <select id="fc-level">
      <option value="">Tất cả</option>
      <option>Intern</option>
      <option>Junior</option>
      <option>Middle</option>
      <option>Senior</option>
    </select>
  </label>
  <label>Chủ đề
    <select id="fc-topic"><option value="">Tất cả</option></select>
  </label>
  <button id="fc-shuffle" type="button">Trộn thẻ</button>
</div>

<div id="flashcard-app">
  <div id="flashcard" class="flashcard" tabindex="0">
    <div class="flashcard-meta" id="fc-meta"></div>
    <div class="flashcard-question" id="fc-question">Đang tải...</div>
    <div class="flashcard-answer" id="fc-answer" hidden></div>
    <div class="flashcard-hint">Nhấn vào thẻ hoặc Space để lật</div>
  </div>
  <div class="flashcard-actions">
    <button id="fc-prev" type="button">← Trước</button>
    <button id="fc-unknown" type="button">Cần ôn lại</button>
    <button id="fc-known" type="button">Đã biết</button>
    <button id="fc-next" type="button">Sau →</button>
  </div>
  <p id="fc-progress"></p>
</div>
