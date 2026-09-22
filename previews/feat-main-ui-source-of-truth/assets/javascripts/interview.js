(() => {
  const script = [...document.scripts].find(s => s.src.includes('/assets/javascripts/interview.js'));
  const dataUrl = script ? new URL('../../data/questions.json', script.src) : null;
  let questions = [];

  const byId = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[ch]));

  const shuffle = arr => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  function renderBadges(q, extra = '') {
    const lvlClass = `badge-${(q.level || '').toLowerCase()}`;
    return `
      <span class="badge badge-level ${lvlClass}">${esc(q.level)}</span>
      <span class="badge badge-topic">${esc(q.topic)}</span>
      <span class="badge badge-id">${esc(q.id)}</span>
      ${extra}
    `;
  }

  function renderStructuredAnswer(q) {
    const followUps = q.followUps || [];
    const keyPoints = q.keyPoints || [];

    return `
      <div class="answer-section model-answer-card">
        <div class="section-label">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"></path><path d="M9 21h6"></path></svg>
          <span>Trả lời mẫu</span>
        </div>
        <p class="model-answer-text">${esc(q.answer)}</p>
      </div>

      ${keyPoints.length ? `
      <div class="answer-section key-points-card">
        <div class="section-label">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
          <span>Key points mong đợi</span>
        </div>
        <ul class="key-points-list">
          ${keyPoints.map(pt => `
            <li>
              <svg class="check-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${esc(pt)}</span>
            </li>
          `).join('')}
        </ul>
      </div>` : ''}

      ${followUps.length ? `
      <div class="answer-section deep-dives-card">
        <div class="section-label">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span>Câu hỏi đào sâu (${followUps.length})</span>
        </div>
        <div class="deep-dive-list">
          ${followUps.map(x => `
            <details class="deep-dive-item">
              <summary>
                <span class="deep-dive-tag">Follow-up</span>
                <span class="deep-dive-q">${esc(x.question)}</span>
                <span class="deep-dive-chevron"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
              </summary>
              <div class="deep-dive-body">
                <div class="deep-dive-label">Trả lời mẫu:</div>
                <p>${esc(x.answer)}</p>
              </div>
            </details>
          `).join('')}
        </div>
      </div>` : ''}
    `;
  }

  function fillTopics(select, source) {
    if (!select) return;
    const current = select.value;
    const topics = [...new Set(source.map(q => q.topic))].sort();
    select.innerHTML = '<option value="">Tất cả chủ đề</option>' + topics.map(t => `<option value="${esc(t)}">${esc(t)}</option>`).join('');
    select.value = topics.includes(current) ? current : '';
  }

  /* --- Question Bank Controller (LPV Layout: Sidebar Topics + Flat Header) --- */
  const BOOKMARK_STORAGE_KEY = 'interview-bookmarked-questions';
  let onlyBookmarkedFilter = false;
  let currentSelectedTopic = '';

  function getBookmarkedSet() {
    try {
      return new Set(JSON.parse(localStorage.getItem(BOOKMARK_STORAGE_KEY) || '[]'));
    } catch {
      return new Set();
    }
  }

  function setBookmarkedSet(set) {
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify([...set]));
  }

  function renderSidebarTopics() {
    const listContainer = byId('lpv-topic-list');
    if (!listContainer) return;

    const level = byId('qb-level')?.value || '';
    const bookmarks = getBookmarkedSet();
    const topicFilterText = (byId('lpv-topic-filter')?.value || '').trim().toLowerCase();

    const pool = questions.filter(q => {
      if (onlyBookmarkedFilter && !bookmarks.has(q.id)) return false;
      if (level && q.level !== level) return false;
      return true;
    });

    const totalEl = byId('lpv-sidebar-total');
    if (totalEl) {
      totalEl.textContent = String(pool.length);
    }

    const topicCounts = {};
    pool.forEach(q => {
      topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
    });

    const sortedTopics = Object.keys(topicCounts).sort();
    const matchedTopics = topicFilterText
      ? sortedTopics.filter(t => t.toLowerCase().includes(topicFilterText))
      : sortedTopics;

    let html = '';
    // "Tất cả" item
    if (!topicFilterText || 'tất cả'.includes(topicFilterText)) {
      const isAllActive = currentSelectedTopic === '';
      html += `
        <button type="button" class="lpv-topic-item ${isAllActive ? 'active' : ''}" data-topic="">
          <span class="topic-title">Tất cả câu hỏi</span>
          <span class="topic-count">${pool.length}</span>
        </button>
      `;
    }

    matchedTopics.forEach(topic => {
      const isActive = currentSelectedTopic === topic;
      html += `
        <button type="button" class="lpv-topic-item ${isActive ? 'active' : ''}" data-topic="${esc(topic)}">
          <span class="topic-title">${esc(topic)}</span>
          <span class="topic-count">${topicCounts[topic] || 0}</span>
        </button>
      `;
    });

    if (matchedTopics.length === 0 && topicFilterText) {
      html = `<div class="lpv-no-topics">Không tìm thấy chủ đề</div>`;
    }

    listContainer.innerHTML = html;
  }

  function renderQuestionBank() {
    const root = byId('question-bank');
    if (!root) return;
    const level = byId('qb-level')?.value || '';
    const text = (byId('qb-search')?.value || '').trim().toLowerCase();
    const bookmarks = getBookmarkedSet();

    // Update bookmark count badge
    const bookmarkCountEl = byId('qb-bookmark-count');
    if (bookmarkCountEl) {
      bookmarkCountEl.textContent = String(bookmarks.size);
    }
    const bookmarkFilterBtn = byId('qb-bookmark-filter');
    if (bookmarkFilterBtn) {
      bookmarkFilterBtn.classList.toggle('active', onlyBookmarkedFilter);
    }

    // Filter questions
    const filtered = questions.filter(q => {
      if (onlyBookmarkedFilter && !bookmarks.has(q.id)) return false;
      if (level && q.level !== level) return false;
      if (currentSelectedTopic && q.topic !== currentSelectedTopic) return false;
      if (text) {
        const hay = (q.question + ' ' + q.answer + ' ' + q.topic + ' ' + q.id).toLowerCase();
        if (!hay.includes(text)) return false;
      }
      return true;
    });

    // Update sidebar topics
    renderSidebarTopics();

    // Update header topic title and count
    const titleEl = byId('lpv-active-topic-title');
    if (titleEl) {
      titleEl.textContent = currentSelectedTopic || 'Tất cả câu hỏi';
    }

    const countEl = byId('lpv-active-topic-count');
    if (countEl) {
      if (text || level || onlyBookmarkedFilter) {
        countEl.textContent = `Hiển thị ${filtered.length} / ${questions.length} câu`;
      } else {
        countEl.textContent = `${filtered.length} câu hỏi`;
      }
    }

    if (!filtered.length) {
      root.innerHTML = `
        <div class="empty-state-card">
          <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <p class="empty-title">Không tìm thấy câu hỏi phù hợp</p>
          <p class="empty-desc">${onlyBookmarkedFilter ? 'Bạn chưa lưu câu hỏi nào hoặc các câu đã lưu không khớp bộ lọc hiện tại.' : 'Hãy thử đổi từ khóa tìm kiếm hoặc chọn lại chủ đề / cấp độ.'}</p>
          ${onlyBookmarkedFilter ? '<button class="btn btn-secondary btn-sm" id="qb-clear-bookmark-filter" type="button" style="margin-top: 0.6rem;">Xem tất cả câu hỏi</button>' : ''}
        </div>`;
      return;
    }

    root.innerHTML = filtered.map((q, idx) => {
      const isBookmarked = bookmarks.has(q.id);
      const lvlClass = `badge-${(q.level || '').toLowerCase()}`;
      return `
        <details class="question-card" data-level="${esc(q.level)}" id="q-${esc(q.id)}">
          <summary class="question-summary">
            <div class="card-left">
              <span class="question-index">#${idx + 1}</span>
              <span class="question-title">${esc(q.question)}</span>
              <button class="btn-icon btn-copy-q" type="button" data-q="${esc(q.question)}" title="Sao chép câu hỏi" aria-label="Sao chép câu hỏi">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
            <div class="card-right">
              <span class="badge badge-level ${lvlClass}">${esc(q.level)}</span>
              <span class="badge badge-topic">${esc(q.topic)}</span>
              <button class="btn-icon btn-bookmark ${isBookmarked ? 'active' : ''}" type="button" data-id="${esc(q.id)}" title="${isBookmarked ? 'Bỏ lưu câu hỏi' : 'Lưu câu hỏi'}" aria-label="Lưu câu hỏi">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </button>
              <span class="accordion-chevron" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </div>
          </summary>
          <div class="answer-block">
            ${renderStructuredAnswer(q)}
          </div>
        </details>
      `;
    }).join('');
  }

  // Delegated event handling for Question Bank
  document.addEventListener('click', (e) => {
    // Copy question text
    const copyBtn = e.target.closest('.btn-copy-q');
    if (copyBtn) {
      e.preventDefault();
      e.stopPropagation();
      const text = copyBtn.getAttribute('data-q') || '';
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.classList.add('copied');
          copyBtn.setAttribute('title', 'Đã sao chép!');
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.setAttribute('title', 'Sao chép câu hỏi');
          }, 1500);
        }).catch(() => {});
      }
      return;
    }

    // Bookmark toggle
    const bookmarkBtn = e.target.closest('.btn-bookmark');
    if (bookmarkBtn) {
      e.preventDefault();
      e.stopPropagation();
      const qId = bookmarkBtn.getAttribute('data-id');
      if (qId) {
        const bookmarks = getBookmarkedSet();
        if (bookmarks.has(qId)) {
          bookmarks.delete(qId);
        } else {
          bookmarks.add(qId);
        }
        setBookmarkedSet(bookmarks);
        renderQuestionBank();
      }
      return;
    }

    // Bookmark filter toggle
    const bookmarkFilterBtn = e.target.closest('#qb-bookmark-filter');
    if (bookmarkFilterBtn) {
      e.preventDefault();
      onlyBookmarkedFilter = !onlyBookmarkedFilter;
      renderQuestionBank();
      return;
    }

    const clearBookmarkFilter = e.target.closest('#qb-clear-bookmark-filter');
    if (clearBookmarkFilter) {
      e.preventDefault();
      onlyBookmarkedFilter = false;
      renderQuestionBank();
      return;
    }

    // Topic item click in sidebar
    const topicItem = e.target.closest('.lpv-topic-item');
    if (topicItem) {
      e.preventDefault();
      currentSelectedTopic = topicItem.getAttribute('data-topic') || '';
      renderQuestionBank();
      return;
    }

    // Expand all
    const expandBtn = e.target.closest('#qb-expand-all');
    if (expandBtn) {
      e.preventDefault();
      document.querySelectorAll('#question-bank details.question-card').forEach(d => {
        d.open = true;
      });
      return;
    }

    // Collapse all
    const collapseBtn = e.target.closest('#qb-collapse-all');
    if (collapseBtn) {
      e.preventDefault();
      document.querySelectorAll('#question-bank details.question-card').forEach(d => {
        d.open = false;
      });
      return;
    }

    // Reset filters
    const resetBtn = e.target.closest('#qb-reset');
    if (resetBtn) {
      e.preventDefault();
      currentSelectedTopic = '';
      onlyBookmarkedFilter = false;
      const lvl = byId('qb-level');
      const src = byId('qb-search');
      const topFilter = byId('lpv-topic-filter');
      if (lvl) lvl.value = '';
      if (src) src.value = '';
      if (topFilter) topFilter.value = '';
      renderQuestionBank();
      return;
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target && e.target.id === 'qb-level') {
      renderQuestionBank();
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target && e.target.id === 'qb-search') {
      renderQuestionBank();
    }
    if (e.target && e.target.id === 'lpv-topic-filter') {
      renderSidebarTopics();
    }
  });

  function initQuestionBank() {
    if (!byId('question-bank')) return;
    if (byId('qb-topic')) {
      fillTopics(byId('qb-topic'), questions);
    }
    // Check URL parameters for initial topic
    try {
      const params = new URLSearchParams(window.location.search);
      const t = params.get('topic');
      if (t) {
        currentSelectedTopic = t;
      }
    } catch {}
    renderQuestionBank();
  }

  /* --- Flashcards Controller --- */
  function initFlashcards() {
    if (!byId('flashcard-app')) return;

    const levelEl = byId('fc-level');
    const topicEl = byId('fc-topic');
    const card = byId('flashcard');
    const qBox = byId('fc-question-box');
    const aBox = byId('fc-answer-box');
    const qEl = byId('fc-question');
    const aEl = byId('fc-answer');
    const kpContainer = byId('fc-keypoints-container');
    const kpList = byId('fc-keypoints-list');
    const metaBadges = byId('fc-meta-badges');
    const statusBadge = byId('fc-status-badge');
    const progressFill = byId('fc-progress-fill');
    const progressText = byId('fc-progress-text');
    const countKnown = byId('fc-count-known');
    const countUnknown = byId('fc-count-unknown');

    let deck = [];
    let index = 0;
    let revealed = false;
    const state = JSON.parse(localStorage.getItem('interview-flashcard-state') || '{}');

    const filtered = () => questions.filter(q =>
      (!levelEl.value || q.level === levelEl.value) &&
      (!topicEl.value || q.topic === topicEl.value)
    );

    function updateStats() {
      const known = deck.filter(q => state[q.id] === 'Đã biết').length;
      const unknown = deck.filter(q => state[q.id] === 'Cần ôn').length;
      if (countKnown) countKnown.textContent = `Đã biết: ${known}`;
      if (countUnknown) countUnknown.textContent = `Cần ôn: ${unknown}`;
    }

    function rebuild(doShuffle = false) {
      deck = filtered();
      if (doShuffle) deck = shuffle(deck);
      index = 0;
      revealed = false;
      show();
    }

    function show() {
      const q = deck[index];
      if (!q) {
        if (metaBadges) metaBadges.innerHTML = '';
        if (statusBadge) statusBadge.innerHTML = '';
        if (qEl) qEl.textContent = 'Không có thẻ phù hợp với bộ lọc.';
        if (qBox) qBox.hidden = false;
        if (aBox) aBox.hidden = true;
        if (progressFill) progressFill.style.width = '0%';
        if (progressText) progressText.textContent = '0 / 0';
        updateStats();
        return;
      }

      const cardState = state[q.id];
      if (metaBadges) {
        metaBadges.innerHTML = renderBadges(q);
      }
      if (statusBadge) {
        if (cardState === 'Đã biết') {
          statusBadge.innerHTML = '<span class="badge badge-intern">✓ Đã biết</span>';
        } else if (cardState === 'Cần ôn') {
          statusBadge.innerHTML = '<span class="badge badge-middle">⚠️ Cần ôn</span>';
        } else {
          statusBadge.innerHTML = '';
        }
      }

      if (qEl) qEl.textContent = q.question;
      if (aEl) aEl.textContent = q.answer;

      if (kpContainer && kpList) {
        if (q.keyPoints && q.keyPoints.length) {
          kpList.innerHTML = q.keyPoints.map(kp => `<li>${esc(kp)}</li>`).join('');
          kpContainer.hidden = false;
        } else {
          kpContainer.hidden = true;
        }
      }

      if (qBox) qBox.hidden = revealed;
      if (aBox) aBox.hidden = !revealed;

      const pct = Math.round(((index + 1) / deck.length) * 100);
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (progressText) progressText.textContent = `Thẻ ${index + 1} / ${deck.length} (${pct}%)`;

      updateStats();
    }

    function flip() {
      if (!deck.length) return;
      revealed = !revealed;
      show();
    }

    function move(delta) {
      if (!deck.length) return;
      index = (index + delta + deck.length) % deck.length;
      revealed = false;
      show();
    }

    function mark(value) {
      const q = deck[index];
      if (!q) return;
      state[q.id] = value;
      localStorage.setItem('interview-flashcard-state', JSON.stringify(state));
      move(1);
    }

    fillTopics(topicEl, questions);

    levelEl?.addEventListener('change', () => {
      fillTopics(topicEl, questions.filter(q => !levelEl.value || q.level === levelEl.value));
      rebuild();
    });

    topicEl?.addEventListener('change', () => rebuild());
    byId('fc-shuffle')?.addEventListener('click', () => rebuild(true));
    byId('fc-prev')?.addEventListener('click', () => move(-1));
    byId('fc-next')?.addEventListener('click', () => move(1));
    byId('fc-known')?.addEventListener('click', () => mark('Đã biết'));
    byId('fc-unknown')?.addEventListener('click', () => mark('Cần ôn'));

    card?.addEventListener('click', e => {
      if (e.target.closest('button') || e.target.closest('a')) return;
      flip();
    });

    activeFcFlip = flip;
    activeFcMove = move;
    activeFcMark = mark;

    rebuild(true);
  }

  let activeFcFlip = null;
  let activeFcMove = null;
  let activeFcMark = null;

  // Keyboard Shortcuts (bound once globally)
  window.addEventListener('keydown', e => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;
    if (!byId('flashcard-app') || byId('flashcard-app').offsetParent === null) return;

    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      activeFcFlip?.();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      activeFcMove?.(-1);
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      activeFcMove?.(1);
    } else if (e.key === '1') {
      e.preventDefault();
      activeFcMark?.('Cần ôn');
    } else if (e.key === '2') {
      e.preventDefault();
      activeFcMark?.('Đã biết');
    }
  });

  /* --- Mock Interview Controller --- */
  function initMock() {
    if (!byId('mock-start')) return;

    const backendTopics = new Set([
      'C#', '.NET', 'Collections/LINQ', 'Async/Concurrency', 'Memory/GC',
      'ASP.NET Core', 'EF Core', 'SQL', 'HTTP/API', 'Security',
      'Testing', 'Architecture', 'Reliability', 'Observability', 'DevOps', 'Redis'
    ]);
    const frontendTopics = new Set([
      'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Web Platform', 'Angular'
    ]);

    const levelEl = byId('mock-level');
    const trackEl = byId('mock-track');
    const topicEl = byId('mock-topic');
    const sessionEl = byId('mock-session');
    const resultEl = byId('mock-result');
    const answerEl = byId('mock-answer');
    const scoreEl = byId('mock-score');
    const revealBtn = byId('mock-reveal');
    const progressFill = byId('mock-progress-fill');
    const progressText = byId('mock-progress-text');
    const badgesEl = byId('mock-meta-badges');
    const qEl = byId('mock-question');

    let session = [];
    let index = 0;
    let scores = { review: 0, pass: 0, strong: 0, skipped: 0 };

    const matchesTrack = q => {
      if (!trackEl || !trackEl.value) return true;
      if (trackEl.value === 'backend') return backendTopics.has(q.topic);
      if (trackEl.value === 'frontend') return frontendTopics.has(q.topic);
      return true;
    };

    function currentPool() {
      return questions.filter(q => q.level === levelEl.value && matchesTrack(q));
    }

    function refreshTopics() {
      fillTopics(topicEl, currentPool());
    }

    function showQuestion() {
      const q = session[index];
      if (!q) return;

      const progressPct = Math.round(((index) / session.length) * 100);
      if (progressFill) progressFill.style.width = `${progressPct}%`;
      if (progressText) progressText.textContent = `Câu ${index + 1} / ${session.length}`;
      if (badgesEl) badgesEl.innerHTML = renderBadges(q);
      if (qEl) qEl.textContent = q.question;

      if (answerEl) {
        answerEl.innerHTML = renderStructuredAnswer(q);
        answerEl.hidden = true;
      }
      if (scoreEl) scoreEl.hidden = true;
      if (revealBtn) revealBtn.hidden = false;
    }

    function finish() {
      if (progressFill) progressFill.style.width = '100%';
      sessionEl.hidden = true;
      resultEl.hidden = false;

      const trackLabel = trackEl?.selectedOptions?.[0]?.textContent || 'Full Stack';
      const passed = scores.pass + scores.strong;
      const passRate = Math.round((passed / session.length) * 100);

      resultEl.innerHTML = `
        <div class="mock-result-dashboard">
          <h2>🎉 Hoàn thành lượt phỏng vấn</h2>
          <p style="font-size: 1.05rem; color: var(--md-default-fg-color--light);">
            Bạn đã hoàn thành <strong>${session.length} câu hỏi</strong> phỏng vấn mô phỏng (<strong>${esc(levelEl.value)} · ${esc(trackLabel)}</strong>).
          </p>

          <div class="mock-stats-grid">
            <div class="mock-stat-box stat-strong">
              <span class="mock-stat-number">${scores.strong}</span>
              <span class="mock-stat-label">🌟 Tốt</span>
            </div>
            <div class="mock-stat-box stat-pass">
              <span class="mock-stat-number">${scores.pass}</span>
              <span class="mock-stat-label">✓ Đạt</span>
            </div>
            <div class="mock-stat-box stat-review">
              <span class="mock-stat-number">${scores.review}</span>
              <span class="mock-stat-label">⚠️ Cần ôn</span>
            </div>
            <div class="mock-stat-box stat-skipped">
              <span class="mock-stat-number">${scores.skipped}</span>
              <span class="mock-stat-label">⏭️ Bỏ qua</span>
            </div>
          </div>

          <div class="mock-result-advice">
            <strong>Đánh giá chung (${passRate}% đạt yêu cầu):</strong>
            ${scores.review > 0
              ? `Có <strong>${scores.review} câu</strong> bạn tự đánh giá là cần ôn lại. Hãy mở trang <strong>Flashcards</strong> để luyện active recall cho các câu này.`
              : 'Xuất sắc! Bạn đã trả lời chắc chắn toàn bộ các câu trong lượt này. Hãy thử tăng độ khó hoặc số lượng câu hỏi để luyện tiếp.'
            }
          </div>

          <div style="display: flex; justify-content: center; gap: 0.8rem; flex-wrap: wrap;">
            <button id="mock-restart" class="btn btn-primary" type="button">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
              Làm lượt phỏng vấn mới
            </button>
            <a href="../flashcards/" class="btn btn-secondary">Chuyển sang Flashcards</a>
          </div>
        </div>
      `;

      byId('mock-restart')?.addEventListener('click', () => {
        resultEl.hidden = true;
        byId('mock-setup').scrollIntoView({ behavior: 'smooth' });
      });
    }

    function advance(score) {
      if (score && Object.prototype.hasOwnProperty.call(scores, score)) {
        scores[score]++;
      }
      index++;
      if (index >= session.length) {
        finish();
        return;
      }
      showQuestion();
    }

    levelEl?.addEventListener('change', refreshTopics);
    trackEl?.addEventListener('change', refreshTopics);
    refreshTopics();

    byId('mock-start')?.addEventListener('click', () => {
      const topic = topicEl.value;
      const count = parseInt(byId('mock-count').value, 10) || 8;
      const pool = currentPool().filter(q => !topic || q.topic === topic);

      session = shuffle(pool).slice(0, count);
      index = 0;
      scores = { review: 0, pass: 0, strong: 0, skipped: 0 };
      resultEl.hidden = true;

      if (!session.length) {
        sessionEl.hidden = true;
        resultEl.hidden = false;
        resultEl.innerHTML = `
          <div class="mock-panel" style="text-align: center; padding: 2rem;">
            <p style="font-weight: 600; margin-bottom: 0.5rem;">Không có câu hỏi phù hợp với bộ lọc này.</p>
            <p style="font-size: 0.9rem; color: var(--md-default-fg-color--light);">Hãy chọn chủ đề khác hoặc để "Tất cả chủ đề".</p>
          </div>`;
        return;
      }

      sessionEl.hidden = false;
      showQuestion();
      sessionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    revealBtn?.addEventListener('click', () => {
      if (answerEl) answerEl.hidden = false;
      if (scoreEl) scoreEl.hidden = false;
      if (revealBtn) revealBtn.hidden = true;
    });

    byId('mock-review')?.addEventListener('click', () => advance('review'));
    byId('mock-pass')?.addEventListener('click', () => advance('pass'));
    byId('mock-strong')?.addEventListener('click', () => advance('strong'));
    byId('mock-next')?.addEventListener('click', () => advance('skipped'));
  }

  /* --- Main Init & Instant Navigation Support --- */
  let questionsPromise = null;
  function loadQuestions() {
    if (questions.length) return Promise.resolve(questions);
    if (!questionsPromise) {
      questionsPromise = fetch(dataUrl)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => {
          questions = data.questions || [];
          return questions;
        })
        .catch(err => {
          questionsPromise = null;
          throw err;
        });
    }
    return questionsPromise;
  }

  function boot() {
    loadQuestions().then(() => {
      initQuestionBank();
      initFlashcards();
      initMock();
    }).catch(error => {
      console.error('Không tải được interview question data', error);
      document.querySelectorAll('#question-bank,#flashcard-app,#mock-setup').forEach(el => {
        if (el) el.innerHTML = '<p>Không tải được dữ liệu câu hỏi. Hãy kiểm tra file docs/data/questions.json.</p>';
      });
    });
  }

  // Subscribe to Material for MkDocs instant navigation
  if (typeof window.document$ !== 'undefined') {
    window.document$.subscribe(boot);
  } else {
    let checkCount = 0;
    const checkDoc = setInterval(() => {
      checkCount++;
      if (typeof window.document$ !== 'undefined') {
        clearInterval(checkDoc);
        window.document$.subscribe(boot);
      } else if (checkCount > 60) {
        clearInterval(checkDoc);
      }
    }, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

