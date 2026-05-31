const ResumeStore = (() => {
  async function loadFromFile() {
    try {
      const res = await fetch(`data/resume.json?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) return res.json();
    } catch {
      /* offline or file:// — fall back to embedded copy */
    }
    return structuredClone(RESUME_DEFAULT_DATA);
  }

  async function load() {
    return loadFromFile();
  }

  async function save(data) {
    const res = await fetch('/api/save-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Could not save. Make sure the site is running (npm start).');
    }

    return res.json();
  }

  function uid(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }

  return { load, save, uid };
})();
