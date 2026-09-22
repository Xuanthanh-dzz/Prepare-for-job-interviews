# Ngân hàng câu hỏi

Dùng bộ lọc để chọn level và chủ đề. Mỗi câu gồm đáp án mẫu vừa đủ để luyện phỏng vấn, key points mà interviewer mong đợi và các **câu hỏi đào sâu có đáp án riêng**.

<div class="lpv-layout">
  <!-- Cột trái: Danh mục chủ đề -->
  <aside class="lpv-sidebar">
    <div class="lpv-sidebar-header">
      <div class="lpv-sidebar-title-row">
        <span class="lpv-sidebar-heading">Danh mục</span>
        <span id="lpv-sidebar-total" class="lpv-count-chip">0</span>
      </div>
      <div class="lpv-sidebar-search-wrap">
        <svg class="lpv-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input id="lpv-topic-filter" type="text" placeholder="Lọc danh mục..." autocomplete="off">
      </div>
    </div>
    <div id="lpv-topic-list" class="lpv-topic-list">
      <!-- Rendered dynamically by interview.js -->
    </div>
  </aside>

  <!-- Cột phải: Khu vực nội dung & Thao tác -->
  <section class="lpv-main">
    <!-- Top Action Bar -->
    <div class="lpv-action-bar">
      <div class="lpv-action-left">
        <div class="lpv-active-topic-info">
          <h2 id="lpv-active-topic-title" class="lpv-topic-name">Tất cả câu hỏi</h2>
          <span id="lpv-active-topic-count" class="lpv-topic-badge-count">0 câu hỏi</span>
        </div>
      </div>

      <div class="lpv-action-right">
        <!-- Search input -->
        <div class="lpv-search-box">
          <svg class="lpv-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input id="qb-search" type="search" placeholder="Tìm câu hỏi, mã câu..." autocomplete="off">
        </div>

        <!-- Level selector -->
        <div class="lpv-select-box">
          <select id="qb-level" aria-label="Lọc theo cấp độ">
            <option value="">Cấp độ: Tất cả</option>
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Middle">Middle</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <!-- Bookmark button -->
        <button id="qb-bookmark-filter" class="btn-lpv-bookmark" type="button" title="Chỉ hiển thị các câu hỏi đã lưu">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>Đã lưu (<span id="qb-bookmark-count">0</span>)</span>
        </button>

        <!-- Tools: Expand all, Collapse all, Reset -->
        <div class="lpv-tools-group">
          <button id="qb-expand-all" class="btn-lpv-tool" type="button" title="Mở tất cả câu hỏi" aria-label="Mở tất cả">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>
          </button>
          <button id="qb-collapse-all" class="btn-lpv-tool" type="button" title="Thu gọn tất cả câu hỏi" aria-label="Thu gọn tất cả">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>
          </button>
          <button id="qb-reset" class="btn-lpv-tool" type="button" title="Đặt lại bộ lọc" aria-label="Đặt lại bộ lọc">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Question Cards List -->
    <div id="question-bank" class="question-list">
      <p>Đang tải ngân hàng câu hỏi...</p>
    </div>
  </section>
</div>
