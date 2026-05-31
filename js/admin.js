let resumeData = null;

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3200);
}

function esc(str) {
  return (str ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function field(id, label, value, type = 'text') {
  if (type === 'textarea') {
    return `<div class="form-group"><label for="${id}">${label}</label><textarea id="${id}">${esc(value)}</textarea></div>`;
  }
  return `<div class="form-group"><label for="${id}">${label}</label><input type="${type}" id="${id}" value="${esc(value)}" /></div>`;
}

function inlineField(attr, label, value, type = 'text') {
  if (type === 'textarea') {
    return `<div class="form-group"><label>${label}</label><textarea data-${attr}>${esc(value)}</textarea></div>`;
  }
  return `<div class="form-group"><label>${label}</label><input type="${type}" data-${attr} value="${esc(value)}" /></div>`;
}

function simpleListRow(value = '') {
  return `<div class="simple-row"><input type="text" value="${esc(value)}" /><button type="button" onclick="this.parentElement.remove()">×</button></div>`;
}

window.addSimpleRow = (listId) => {
  document.getElementById(listId).insertAdjacentHTML('beforeend', simpleListRow());
};

window.addBullet = (container) => {
  container.insertAdjacentHTML('beforeend', '<textarea data-exp="bullets" style="margin-bottom:0.5rem;min-height:60px;"></textarea>');
};

window.removeCard = (btn) => {
  if (confirm('Remove this item?')) btn.closest('.item-card').remove();
};

function readSimpleList(id) {
  return [...document.querySelectorAll(`#${id} input`)].map(i => i.value.trim()).filter(Boolean);
}

function normalizePhone(display) {
  const cleaned = display.replace(/[\s\-()]/g, '');
  if (cleaned.startsWith('+')) return cleaned;
  if (/^\d{10}$/.test(cleaned)) return '+91' + cleaned;
  return cleaned;
}

function readAll() {
  const backup = JSON.parse(JSON.stringify(resumeData));
  const g = id => document.getElementById(id)?.value?.trim() ?? '';
  const phoneDisplay = g('phone');

  resumeData.profile = {
    ...backup.profile,
    name: g('name'),
    subtitle: g('subtitle'),
    phoneDisplay,
    phone: normalizePhone(phoneDisplay),
    email: g('email')
  };

  resumeData.summary = g('summary');
  resumeData.competencies = readSimpleList('competencies-list');

  resumeData.experience = [...document.querySelectorAll('#exp-list .item-card')].map(el => ({
    id: el.dataset.id,
    title: el.querySelector('[data-exp="title"]')?.value?.trim() ?? '',
    date: el.querySelector('[data-exp="date"]')?.value?.trim() ?? '',
    bullets: [...el.querySelectorAll('[data-exp="bullets"]')].map(t => t.value.trim()).filter(Boolean)
  }));

  resumeData.projects = {
    ...backup.projects,
    intro: g('projectsIntro'),
    items: [...document.querySelectorAll('#proj-list .item-card')].map((el, i) => {
      const id = el.dataset.id;
      const existing = backup.projects.items.find(p => p.id === id) || backup.projects.items[i] || {};
      return {
        id: id || ResumeStore.uid('proj'),
        title: el.querySelector('[data-proj="title"]')?.value?.trim() ?? '',
        date: el.querySelector('[data-proj="date"]')?.value?.trim() ?? '',
        role: el.querySelector('[data-proj="role"]')?.value?.trim() ?? '',
        organisedBy: el.querySelector('[data-proj="organisedBy"]')?.value?.trim() ?? '',
        conductedBy: el.querySelector('[data-proj="conductedBy"]')?.value?.trim() ?? '',
        image: existing.image || '',
        alt: existing.alt || ''
      };
    })
  };

  resumeData.education = [...document.querySelectorAll('#edu-list .item-card')].map(el => ({
    degree: el.querySelector('[data-edu="degree"]')?.value?.trim() ?? '',
    school: el.querySelector('[data-edu="school"]')?.value?.trim() ?? ''
  }));

  resumeData.technicalSkills = readSimpleList('skills-list');
  resumeData.achievements = readSimpleList('ach-list');

  // Keep sections not shown in the simple editor
  resumeData.jobDescription = backup.jobDescription;
  resumeData.extracurricular = backup.extracurricular;
  resumeData.personalDetails = backup.personalDetails;
  resumeData.personalSnapshot = backup.personalSnapshot;
  resumeData.declaration = backup.declaration;
}

function expCard(exp, i) {
  return `
    <div class="item-card" data-id="${exp.id}">
      <div class="item-card-head"><span>Job ${i + 1}</span><button type="button" class="remove-btn" onclick="removeCard(this)">Remove</button></div>
      ${inlineField('exp="title"', 'Job title & company', exp.title)}
      ${inlineField('exp="date"', 'When (e.g. 2024 – Present)', exp.date)}
      <label>What you did</label>
      <div>${exp.bullets.map(b => `<textarea data-exp="bullets" style="margin-bottom:0.5rem;min-height:60px;width:100%;">${esc(b)}</textarea>`).join('')}</div>
      <button type="button" class="add-btn" style="font-size:0.85rem;padding:0.5rem;" onclick="addBullet(this.previousElementSibling)">+ Add another point</button>
    </div>`;
}

function projCard(p, i) {
  return `
    <div class="item-card" data-id="${p.id}">
      <div class="item-card-head"><span>Workshop ${i + 1}</span><button type="button" class="remove-btn" onclick="removeCard(this)">Remove</button></div>
      ${inlineField('proj="title"', 'Workshop name', p.title)}
      ${inlineField('proj="date"', 'Date', p.date)}
      ${inlineField('proj="role"', 'Your role', p.role)}
      ${inlineField('proj="organisedBy"', 'Organised by', p.organisedBy)}
      ${inlineField('proj="conductedBy"', 'Conducted by', p.conductedBy)}
    </div>`;
}

function renderEditor() {
  const p = resumeData.profile;
  document.getElementById('editor').innerHTML = `
    <div class="section">
      <div class="section-head"><i class="fas fa-user"></i> My Details</div>
      <div class="section-body">
        ${field('name', 'Your name', p.name)}
        ${field('subtitle', 'Job title (e.g. Soft Skills Trainer | Communication Specialist)', p.subtitle)}
        ${field('phone', 'Phone number', p.phoneDisplay)}
        ${field('email', 'Email address', p.email, 'email')}
      </div>
    </div>
    <div class="section">
      <div class="section-head"><i class="fas fa-file-alt"></i> About Me</div>
      <div class="section-body">
        ${field('summary', 'Professional summary', resumeData.summary, 'textarea')}
        <label>Skills & strengths</label>
        <div id="competencies-list">${resumeData.competencies.map(c => simpleListRow(c)).join('')}</div>
        <button type="button" class="add-btn" onclick="addSimpleRow('competencies-list')">+ Add a skill</button>
      </div>
    </div>
    <div class="section">
      <div class="section-head"><i class="fas fa-briefcase"></i> Work Experience</div>
      <div class="section-body">
        <div id="exp-list">${resumeData.experience.map(expCard).join('')}</div>
        <button type="button" class="add-btn" id="addExpBtn">+ Add a job</button>
      </div>
    </div>
    <div class="section">
      <div class="section-head"><i class="fas fa-images"></i> Workshops & Projects</div>
      <div class="section-body">
        ${field('projectsIntro', 'Intro line for workshops section', resumeData.projects.intro, 'textarea')}
        <div id="proj-list">${resumeData.projects.items.map(projCard).join('')}</div>
        <button type="button" class="add-btn" id="addProjBtn">+ Add a workshop</button>
      </div>
    </div>
    <div class="section">
      <div class="section-head"><i class="fas fa-graduation-cap"></i> Education</div>
      <div class="section-body">
        <div id="edu-list">
          ${resumeData.education.map((e, i) => `
            <div class="item-card">
              <div class="item-card-head"><span>Degree ${i + 1}</span><button type="button" class="remove-btn" onclick="removeCard(this)">Remove</button></div>
              ${inlineField('edu="degree"', 'Qualification', e.degree)}
              ${inlineField('edu="school"', 'College / School', e.school)}
            </div>
          `).join('')}
        </div>
        <button type="button" class="add-btn" id="addEduBtn">+ Add education</button>
      </div>
    </div>
    <div class="section">
      <div class="section-head"><i class="fas fa-star"></i> Skills & Achievements</div>
      <div class="section-body">
        <label>Technical skills</label>
        <div id="skills-list">${resumeData.technicalSkills.map(s => simpleListRow(s)).join('')}</div>
        <button type="button" class="add-btn" onclick="addSimpleRow('skills-list')">+ Add a skill</button>
        <label style="margin-top:1rem;">Achievements</label>
        <div id="ach-list">${resumeData.achievements.map(a => simpleListRow(a)).join('')}</div>
        <button type="button" class="add-btn" onclick="addSimpleRow('ach-list')">+ Add achievement</button>
      </div>
    </div>
  `;

  document.getElementById('addExpBtn').addEventListener('click', () => {
    readAll();
    resumeData.experience.unshift({ id: ResumeStore.uid('exp'), title: '', date: '', bullets: [''] });
    renderEditor();
  });

  document.getElementById('addProjBtn').addEventListener('click', () => {
    readAll();
    resumeData.projects.items.unshift({
      id: ResumeStore.uid('proj'), title: '', date: '', role: '', organisedBy: '', conductedBy: '',
      image: 'images/workshop-personality-development.png', alt: ''
    });
    renderEditor();
  });

  document.getElementById('addEduBtn').addEventListener('click', () => {
    readAll();
    resumeData.education.push({ degree: '', school: '' });
    renderEditor();
  });
}

async function save() {
  const btn = document.getElementById('saveBtn');
  readAll();
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
  try {
    await ResumeStore.save(resumeData);
    toast('Saved! Your portfolio is updated.');
  } catch (err) {
    toast(err.message || 'Save failed');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-check"></i> Save';
  }
}

async function preview() {
  const btn = document.getElementById('previewBtn');
  readAll();
  btn.disabled = true;
  try {
    await ResumeStore.save(resumeData);
    window.open('sindhu.html', '_blank');
  } catch (err) {
    toast(err.message || 'Save failed — preview needs a saved copy first');
  } finally {
    btn.disabled = false;
  }
}

async function init() {
  resumeData = await ResumeStore.load();
  renderEditor();
  document.getElementById('saveBtn').addEventListener('click', save);
  document.getElementById('previewBtn').addEventListener('click', preview);
}

init();
