# Ngân hàng câu hỏi

Dùng bộ lọc để chọn level và chủ đề. Mỗi câu gồm đáp án mẫu vừa đủ để luyện phỏng vấn, key points mà interviewer mong đợi và các **câu hỏi đào sâu có đáp án riêng**.

<div class="interview-toolbar">
  <div class="toolbar-row">
    <div class="toolbar-item">
      <label for="qb-level">Level</label>
      <select id="qb-level">
        <option value="">Tất cả level</option>
        <option>Intern</option>
        <option>Junior</option>
        <option>Middle</option>
        <option>Senior</option>
      </select>
    </div>
    <div class="toolbar-item">
      <label for="qb-topic">Chủ đề</label>
      <select id="qb-topic"><option value="">Tất cả chủ đề</option></select>
    </div>
    <div class="toolbar-item toolbar-search">
      <label for="qb-search">Tìm kiếm</label>
      <input id="qb-search" type="search" placeholder="Nhập từ khóa hoặc mã câu hỏi (VD: LINQ, INT-CS-001)...">
    </div>
  </div>
  <div class="toolbar-actions">
    <div class="toolbar-btn-group">
      <button id="qb-expand-all" class="btn btn-secondary btn-sm" type="button">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>
        Mở tất cả
      </button>
      <button id="qb-collapse-all" class="btn btn-secondary btn-sm" type="button">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>
        Thu gọn tất cả
      </button>
      <button id="qb-reset" class="btn btn-ghost btn-sm" type="button">Đặt lại lọc</button>
    </div>
    <div id="qb-count" class="qb-count-badge"></div>
  </div>
</div>

<div id="question-bank" class="question-list">
  <p>Đang tải ngân hàng câu hỏi...</p>
</div>
