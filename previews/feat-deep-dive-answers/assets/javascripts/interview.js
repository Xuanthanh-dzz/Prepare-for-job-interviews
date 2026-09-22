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

  /* --- Question Bank Controller --- */
  function renderQuestionBank() {
    const root = byId('question-bank');
    if (!root) return;
    const level = byId('qb-level')?.value || '';
    const topic = byId('qb-topic')?.value || '';
    const text = (byId('qb-search')?.value || '').trim().toLowerCase();

    const filtered = questions.filter(q =>
      (!level || q.level === level) &&
      (!topic || q.topic === topic) &&
      (!text || (q.question + ' ' + q.answer + ' ' + q.topic + ' ' + q.id).toLowerCase().includes(text))
    );

    const countEl = byId('qb-count');
    if (countEl) {
      countEl.innerHTML = `Hiển thị <strong>${filtered.length}</strong> / ${questions.length} câu hỏi`;
    }

    if (!filtered.length) {
      root.innerHTML = `
        <div style="padding: 2.5rem 1rem; text-align: center; color: var(--md-default-fg-color--light);">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.75rem; opacity: 0.6;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <p style="font-size: 1.05rem; font-weight: 600; margin-bottom: 0.25rem;">Không tìm thấy câu hỏi phù hợp</p>
          <p style="font-size: 0.9rem;">Hãy thử đổi từ khóa tìm kiếm hoặc bỏ chọn các bộ lọc level/chủ đề.</p>
        </div>`;
      return;
    }

    root.innerHTML = filtered.map((q, idx) => `
      <details class="question-card" data-level="${esc(q.level)}">
        <summary class="question-summary">
          <div class="question-header-content">
            <div class="badges">
              <span class="badge badge-index">#${idx + 1}</span>
              ${renderBadges(q)}
            </div>
            <div class="question-title">${esc(q.question)}</div>
          </div>
          <span class="accordion-chevron" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </span>
        </summary>
        <div class="answer-block">
          ${renderStructuredAnswer(q)}
        </div>
      </details>
    `).join('');
  }

  // Delegated event handling for Question Bank
  document.addEventListener('click', (e) => {
    const expandBtn = e.target.closest('#qb-expand-all');
    if (expandBtn) {
      e.preventDefault();
      document.querySelectorAll('#question-bank details.question-card').forEach(d => {
        d.open = true;
      });
      return;
    }

    const collapseBtn = e.target.closest('#qb-collapse-all');
    if (collapseBtn) {
      e.preventDefault();
      document.querySelectorAll('#question-bank details.question-card').forEach(d => {
        d.open = false;
      });
      return;
    }

    const resetBtn = e.target.closest('#qb-reset');
    if (resetBtn) {
      e.preventDefault();
      const lvl = byId('qb-level');
      const top = byId('qb-topic');
      const src = byId('qb-search');
      if (lvl) lvl.value = '';
      if (top) top.value = '';
      if (src) src.value = '';
      renderQuestionBank();
      return;
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target && (e.target.id === 'qb-level' || e.target.id === 'qb-topic')) {
      renderQuestionBank();
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target && e.target.id === 'qb-search') {
      renderQuestionBank();
    }
  });

  function initQuestionBank() {
    if (!byId('question-bank')) return;
    fillTopics(byId('qb-topic'), questions);
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
      'Testing', 'Architecture', 'Reliability', 'Observability', 'DevOps'
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

