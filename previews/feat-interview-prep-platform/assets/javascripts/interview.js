(() => {
  const script = [...document.scripts].find(s => s.src.includes('/assets/javascripts/interview.js'));
  const dataUrl = script ? new URL('../../data/questions.json', script.src) : null;
  let questions = [];

  const byId = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
  const shuffle = arr => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  function fillTopics(select, source) {
    if (!select) return;
    const current = select.value;
    const topics = [...new Set(source.map(q => q.topic))].sort();
    select.innerHTML = '<option value="">Tất cả</option>' + topics.map(t => `<option>${esc(t)}</option>`).join('');
    select.value = topics.includes(current) ? current : '';
  }

  function renderQuestionBank() {
    const root = byId('question-bank');
    if (!root) return;
    const level = byId('qb-level')?.value || '';
    const topic = byId('qb-topic')?.value || '';
    const text = (byId('qb-search')?.value || '').trim().toLowerCase();
    const filtered = questions.filter(q =>
      (!level || q.level === level) &&
      (!topic || q.topic === topic) &&
      (!text || (q.question + ' ' + q.answer + ' ' + q.topic).toLowerCase().includes(text))
    );
    root.innerHTML = filtered.length ? filtered.map(q => `
      <details class="question-card">
        <summary>
          <div class="badges"><span class="badge">${esc(q.level)}</span><span class="badge">${esc(q.topic)}</span><span class="badge">${esc(q.id)}</span></div>
          ${esc(q.question)}
        </summary>
        <div class="answer-block">
          <h4>Trả lời mẫu</h4><p>${esc(q.answer)}</p>
          <h4>Key points</h4><ul class="key-list">${q.keyPoints.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          <h4>Follow-up thường gặp</h4><ul>${q.followUps.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
      </details>`).join('') : '<p>Không tìm thấy câu hỏi phù hợp.</p>';
  }

  function initQuestionBank() {
    if (!byId('question-bank')) return;
    fillTopics(byId('qb-topic'), questions);
    ['qb-level','qb-topic'].forEach(id => byId(id)?.addEventListener('change', renderQuestionBank));
    byId('qb-search')?.addEventListener('input', renderQuestionBank);
    renderQuestionBank();
  }

  function initFlashcards() {
    if (!byId('flashcard-app')) return;
    const levelEl = byId('fc-level'), topicEl = byId('fc-topic');
    const card = byId('flashcard'), qEl = byId('fc-question'), aEl = byId('fc-answer'), meta = byId('fc-meta'), progress = byId('fc-progress');
    let deck = [], index = 0, revealed = false;
    const state = JSON.parse(localStorage.getItem('interview-flashcard-state') || '{}');

    const filtered = () => questions.filter(q => (!levelEl.value || q.level === levelEl.value) && (!topicEl.value || q.topic === topicEl.value));

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
        meta.textContent = '';
        qEl.textContent = 'Không có thẻ phù hợp.';
        aEl.hidden = true;
        progress.textContent = '';
        return;
      }
      meta.textContent = `${q.level} · ${q.topic} · ${q.id}${state[q.id] ? ' · ' + state[q.id] : ''}`;
      qEl.textContent = q.question;
      aEl.textContent = q.answer;
      aEl.hidden = !revealed;
      progress.textContent = `${index + 1} / ${deck.length}`;
    }

    function flip() { if (!deck.length) return; revealed = !revealed; show(); }
    function move(delta) { if (!deck.length) return; index = (index + delta + deck.length) % deck.length; revealed = false; show(); }
    function mark(value) {
      const q = deck[index];
      if (!q) return;
      state[q.id] = value;
      localStorage.setItem('interview-flashcard-state', JSON.stringify(state));
      move(1);
    }

    fillTopics(topicEl, questions);
    levelEl.addEventListener('change', () => { fillTopics(topicEl, questions.filter(q => !levelEl.value || q.level === levelEl.value)); rebuild(); });
    topicEl.addEventListener('change', () => rebuild());
    byId('fc-shuffle').addEventListener('click', () => rebuild(true));
    byId('fc-prev').addEventListener('click', () => move(-1));
    byId('fc-next').addEventListener('click', () => move(1));
    byId('fc-known').addEventListener('click', () => mark('Đã biết'));
    byId('fc-unknown').addEventListener('click', () => mark('Cần ôn'));
    card.addEventListener('click', flip);
    card.addEventListener('keydown', e => { if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); flip(); } });
    rebuild(true);
  }

  function initMock() {
    if (!byId('mock-start')) return;
    let session = [], index = 0;
    const sessionEl = byId('mock-session'), resultEl = byId('mock-result'), answerEl = byId('mock-answer');

    function showQuestion() {
      const q = session[index];
      if (!q) return;
      byId('mock-progress').textContent = `Câu ${index + 1} / ${session.length}`;
      byId('mock-question').textContent = q.question;
      byId('mock-meta').textContent = `${q.level} · ${q.topic}`;
      answerEl.innerHTML = `<strong>Trả lời mẫu</strong><p>${esc(q.answer)}</p><strong>Key points</strong><ul>${q.keyPoints.map(x => `<li>${esc(x)}</li>`).join('')}</ul><strong>Follow-up</strong><ul>${q.followUps.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
      answerEl.hidden = true;
      byId('mock-reveal').hidden = false;
    }

    byId('mock-start').addEventListener('click', () => {
      const level = byId('mock-level').value;
      const count = Number(byId('mock-count').value);
      session = shuffle(questions.filter(q => q.level === level)).slice(0, count);
      index = 0;
      resultEl.hidden = true;
      sessionEl.hidden = false;
      showQuestion();
    });

    byId('mock-reveal').addEventListener('click', () => {
      answerEl.hidden = false;
      byId('mock-reveal').hidden = true;
    });

    byId('mock-next').addEventListener('click', () => {
      index++;
      if (index >= session.length) {
        sessionEl.hidden = true;
        resultEl.hidden = false;
        resultEl.innerHTML = '<h2>Hoàn thành lượt phỏng vấn</h2><p>Ôn lại những câu bạn chưa trả lời được bằng Flashcards, rồi tạo một đề mới. Hãy ưu tiên giải thích bằng lời của chính bạn thay vì học thuộc đáp án mẫu.</p>';
        return;
      }
      showQuestion();
    });
  }

  async function main() {
    try {
      const response = await fetch(dataUrl);
      const data = await response.json();
      questions = data.questions || [];
      initQuestionBank();
      initFlashcards();
      initMock();
    } catch (error) {
      console.error('Không tải được interview question data', error);
      document.querySelectorAll('#question-bank,#flashcard-app,#mock-setup').forEach(el => {
        if (el) el.innerHTML = '<p>Không tải được dữ liệu câu hỏi. Hãy kiểm tra file docs/data/questions.json.</p>';
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', main);
  else main();
})();
