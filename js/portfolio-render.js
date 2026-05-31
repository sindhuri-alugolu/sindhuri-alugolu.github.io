const PortfolioRender = (() => {
  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s ?? '';
    return d.innerHTML;
  }

  function renderInto(container, data) {
    const p = data.profile;
    const ps = data.personalSnapshot;

    container.innerHTML = `
      <div class="header">
        <div class="profile-container">
          <img src="${esc(p.photo)}" alt="${esc(p.name)}" />
          <h1>${esc(p.name)}</h1>
          <p class="subtitle">${esc(p.subtitle)}</p>
          <div class="contact-info">
            <div class="contact-item">
              <a href="tel:${esc(p.phone)}"><i class="fas fa-phone"></i> ${esc(p.phoneDisplay)}</a>
            </div>
            <div class="contact-item">
              <a href="mailto:${esc(p.email)}"><i class="fas fa-envelope"></i> ${esc(p.email)}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="section fade-in">
        <h2>Professional Summary</h2>
        <p>${esc(data.summary)}</p>
      </div>

      <div class="section fade-in">
        <h2>Core Competencies</h2>
        <ul>${data.competencies.map(c => `<li><i class="fas fa-check"></i> ${esc(c)}</li>`).join('')}</ul>
      </div>

      <div class="section fade-in">
        <h2>Professional Experience</h2>
        ${data.experience.map(exp => `
          <h3>${esc(exp.title)}</h3>
          <p>${esc(exp.date)}</p>
          <ul>${exp.bullets.map(b => `<li><i class="fas fa-circle"></i> ${esc(b)}</li>`).join('')}</ul>
        `).join('')}
      </div>

      <div class="section fade-in">
        <h2>Featured Projects & Workshops</h2>
        <p>${esc(data.projects.intro)}</p>
        <div class="projects-grid">
          ${data.projects.items.map(proj => `
            <div class="project-card">
              <img src="${esc(proj.image)}" alt="${esc(proj.alt || proj.title)}" />
              <div class="project-details">
                <h4>${esc(proj.title)}</h4>
                <p><strong>Date:</strong> ${esc(proj.date)}</p>
                <p><strong>Role:</strong> ${esc(proj.role)}</p>
                <p><strong>Organised by:</strong> ${esc(proj.organisedBy)}</p>
                <p><strong>Conducted by:</strong> ${esc(proj.conductedBy)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="section fade-in">
        <h2>${esc(data.jobDescription.title)}</h2>
        <ul>${data.jobDescription.items.map(i => `<li><i class="fas fa-angle-right"></i> ${esc(i)}</li>`).join('')}</ul>
      </div>

      <div class="section fade-in">
        <h2>Education</h2>
        <ul>${data.education.map(e => `<li><i class="fas fa-graduation-cap"></i> ${esc(e.degree)} | ${esc(e.school)}</li>`).join('')}</ul>
      </div>

      <div class="section fade-in">
        <h2>Technical Skills</h2>
        <div class="skills">${data.technicalSkills.map(s => `<span class="skill-tag">${esc(s)}</span>`).join('')}</div>
      </div>

      <div class="section achievements fade-in">
        <h2>Achievements & Recognitions</h2>
        <ul>${data.achievements.map(a => `<li class="achievement-item"><i class="fas fa-trophy"></i> ${esc(typeof a === 'string' ? a : a.text)}</li>`).join('')}</ul>
      </div>

      <div class="section fade-in">
        <h2>Extra-Curricular Activities</h2>
        <ul>${data.extracurricular.map(e => `<li><i class="fas fa-star"></i> ${esc(e)}</li>`).join('')}</ul>
      </div>

      <div class="section fade-in">
        <h2>Personal Details</h2>
        <ul>
          <li><i class="fas fa-birthday-cake"></i> Date of Birth: ${esc(data.personalDetails.dob)}</li>
          <li><i class="fas fa-globe"></i> Nationality: ${esc(data.personalDetails.nationality)}</li>
          <li><i class="fas fa-language"></i> Languages: ${esc(data.personalDetails.languages)}</li>
          <li><i class="fas fa-map-marker-alt"></i> Current Location: ${esc(data.personalDetails.location)}</li>
        </ul>
      </div>

      <div class="section fade-in">
        <h2>Personal Snapshot</h2>
        <div class="personality-overview">
          <div class="personality-card">
            <div class="personality-icon"><i class="fas fa-heart"></i></div>
            <h3>Core Personality</h3>
            <p>${esc(ps.personality)}</p>
          </div>
        </div>
        <div class="traits-grid">
          ${ps.traits.map(t => `
            <div class="trait-item">
              <div class="trait-icon"><i class="fas fa-comments"></i></div>
              <div class="trait-content">
                <h4>${esc(t.title)}</h4>
                <p>${esc(t.desc)}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="interests-goals">
          <div class="interests-card passion-card">
            <div class="card-header"><i class="fas fa-palette"></i><h3>Personal Pursuits</h3></div>
            <div class="card-content">
              ${ps.pursuits.map(item => `<div class="pursuit-item"><i class="fas fa-feather-alt"></i><span>${esc(item)}</span></div>`).join('')}
            </div>
          </div>
          <div class="interests-card goals-card">
            <div class="card-header"><i class="fas fa-compass"></i><h3>Future Aspirations</h3></div>
            <div class="card-content">
              <div class="goal-section">
                <div class="goal-label">Short-term</div>
                ${ps.shortTermGoals.map(g => `<div class="goal-item"><i class="fas fa-pen-nib"></i><span>${esc(g)}</span></div>`).join('')}
              </div>
              <div class="goal-section">
                <div class="goal-label">Long-term</div>
                ${ps.longTermGoals.map(g => `<div class="goal-item"><i class="fas fa-book-open"></i><span>${esc(g)}</span></div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section fade-in">
        <h2>Declaration</h2>
        <p>${esc(data.declaration.text)}</p>
        <p>Place: ${esc(data.declaration.place)}</p>
        <p>Signature: ${esc(data.declaration.signature)}</p>
      </div>
    `;
  }

  return { renderInto, esc };
})();
