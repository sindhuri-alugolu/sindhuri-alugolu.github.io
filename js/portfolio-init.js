function initPortfolioEffects() {
  document.querySelectorAll('.fade-in').forEach(el => el.classList.remove('visible'));

  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }),
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  document.querySelectorAll('.section').forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
    section.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;position:absolute;border-radius:50%;background:rgba(26,26,26,0.08);transform:scale(0);animation:ripple 0.6s linear;pointer-events:none;`;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.onmouseenter = () => { tag.style.transform = 'translateY(-2px) scale(1.05)'; };
    tag.onmouseleave = () => { tag.style.transform = 'translateY(0) scale(1)'; };
  });
}

async function loadPortfolio() {
  const root = document.getElementById('portfolio-root');
  if (!root) return;

  try {
    const data = await ResumeStore.load();
    PortfolioRender.renderInto(root, data);
    document.title = `${data.profile.name} - Portfolio`;
    initPortfolioEffects();
  } catch (err) {
    root.innerHTML = '<p style="padding:2rem;text-align:center;color:#666;">Could not load portfolio.</p>';
    console.error(err);
  }
}

if (document.getElementById('portfolio-root')) {
  loadPortfolio();
}
