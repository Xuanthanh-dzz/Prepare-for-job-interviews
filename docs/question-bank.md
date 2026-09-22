# Ngân hàng câu hỏi

Dùng bộ lọc để chọn level và chủ đề. Mỗi câu gồm đáp án mẫu vừa đủ để luyện phỏng vấn, key points mà interviewer mong đợi và các **câu hỏi đào sâu có đáp án riêng**.

<div class="interview-toolbar">
  <div class="toolbar-row">
    <div class="toolbar-item toolbar-search">
      <label for="qb-search">Tìm kiếm</label>
      <div class="search-input-wrap">
        <svg class="search-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input id="qb-search" type="search" placeholder="Tìm câu hỏi, từ khóa, mã câu (VD: LINQ, async, INT-CS-001)...">
      </div>
    </div>
    <div class="toolbar-item">
      <label for="qb-level">Cấp độ</label>
      <select id="qb-level">
        <option value="">Tất cả cấp độ</option>
        <option value="Intern">Intern (Cơ bản)</option>
        <option value="Junior">Junior</option>
        <option value="Middle">Middle (Trung bình)</option>
        <option value="Senior">Senior (Nâng cao)</option>
      </select>
    </div>
    <div class="toolbar-item">
      <label for="qb-topic">Chủ đề</label>
      <select id="qb-topic"><option value="">Tất cả chủ đề</option></select>
    </div>
  </div>

  <!-- Topic Pills Bar (luyenphongvan style) -->
  <div class="topic-pills-container">
    <div id="qb-topic-pills" class="topic-pills-bar"></div>
  </div>

  <div class="toolbar-actions">
    <div class="toolbar-left-info">
      <div id="qb-count" class="qb-count-badge"></div>
      <button id="qb-bookmark-filter" class="btn btn-filter-bookmark btn-sm" type="button" title="Chỉ hiển thị các câu hỏi đã lưu">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <span>Đã lưu (<span id="qb-bookmark-count">0</span>)</span>
      </button>
    </div>
    <div class="toolbar-btn-group">
      <button id="qb-expand-all" class="btn btn-secondary btn-sm" type="button" title="Mở tất cả câu hỏi">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>
        Mở tất cả
      </button>
      <button id="qb-collapse-all" class="btn btn-secondary btn-sm" type="button" title="Thu gọn tất cả câu hỏi">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>
        Thu gọn tất cả
      </button>
      <button id="qb-reset" class="btn btn-ghost btn-sm" type="button" title="Đặt lại bộ lọc và ô tìm kiếm">Đặt lại lọc</button>
    </div>
  </div>
</div>

<div id="question-bank" class="question-list">
  <p>Đang tải ngân hàng câu hỏi...</p>
</div>
