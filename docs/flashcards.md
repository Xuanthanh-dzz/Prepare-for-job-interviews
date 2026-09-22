# Flashcards

Mục tiêu của flashcard là **tự trả lời trước khi lật thẻ**. Đừng lật ngay khi vừa đọc câu hỏi.

<div class="interview-toolbar">
  <div class="toolbar-row">
    <div class="toolbar-item">
      <label for="fc-level">Level</label>
      <select id="fc-level">
        <option value="">Tất cả level</option>
        <option>Intern</option>
        <option>Junior</option>
        <option>Middle</option>
        <option>Senior</option>
      </select>
    </div>
    <div class="toolbar-item">
      <label for="fc-topic">Chủ đề</label>
      <select id="fc-topic"><option value="">Tất cả chủ đề</option></select>
    </div>
    <div class="toolbar-item" style="flex: 0 0 auto;">
      <label>&nbsp;</label>
      <button id="fc-shuffle" class="btn btn-secondary" type="button">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
        Trộn thẻ
      </button>
    </div>
  </div>
</div>

<div id="flashcard-app">
  <div class="fc-progress-wrapper">
    <div class="fc-progress-track">
      <div id="fc-progress-fill" class="fc-progress-fill"></div>
    </div>
    <div class="fc-stats">
      <span id="fc-progress-text">Đang tải...</span>
      <div class="fc-counts">
        <span class="badge-known" id="fc-count-known">Đã biết: 0</span>
        <span>·</span>
        <span class="badge-unknown" id="fc-count-unknown">Cần ôn: 0</span>
      </div>
    </div>
  </div>

  <div id="flashcard" class="flashcard" tabindex="0" role="button" aria-label="Nhấn để lật thẻ">
    <div class="flashcard-header">
      <div class="badges" id="fc-meta-badges"></div>
      <div id="fc-status-badge"></div>
    </div>
    <div id="fc-question-box" class="fc-box">
      <span class="fc-card-label">Câu hỏi</span>
      <div class="flashcard-question" id="fc-question">Đang tải câu hỏi...</div>
    </div>
    <div id="fc-answer-box" class="fc-box" hidden>
      <span class="fc-card-label" style="background: rgba(16, 185, 129, 0.12); color: #059669;">Đáp án mẫu</span>
      <div class="flashcard-answer" id="fc-answer"></div>
      <div class="fc-keypoints-box" id="fc-keypoints-container" hidden>
        <div class="fc-keypoints-title">🎯 Key points cần nêu:</div>
        <ul id="fc-keypoints-list"></ul>
      </div>
    </div>
    <div class="flashcard-hint">
      <span><kbd>Space</kbd> hoặc chạm vào thẻ để lật</span>
    </div>
  </div>

  <div class="flashcard-actions">
    <button id="fc-prev" class="btn btn-secondary" type="button" title="Phím mũi tên trái ←">← Trước</button>
    <button id="fc-unknown" class="btn btn-warning" type="button" title="Phím 1">⚠️ Cần ôn lại <kbd>1</kbd></button>
    <button id="fc-known" class="btn btn-success" type="button" title="Phím 2">✓ Đã biết <kbd>2</kbd></button>
    <button id="fc-next" class="btn btn-secondary" type="button" title="Phím mũi tên phải →">Sau →</button>
  </div>
</div>
