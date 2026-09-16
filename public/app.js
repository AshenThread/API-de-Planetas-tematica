const list = document.querySelector('#planet-list');
const count = document.querySelector('#planet-count');
const status = document.querySelector('#status');
const form = document.querySelector('#planet-form');
const feedback = document.querySelector('#feedback');

const typeLabels = {
  terrestrial: 'Terrestre',
  'gas-giant': 'Gigante gaseoso',
  'ice-giant': 'Gigante helado',
  dwarf: 'Enano'
};

async function loadPlanets() {
  const response = await fetch('/api/planets');
  if (!response.ok) throw new Error('No se pudo cargar el catálogo.');
  const { data } = await response.json();
  count.textContent = `${data.length} ${data.length === 1 ? 'planeta' : 'planetas'}`;
  list.innerHTML = data.length ? data.map(renderPlanet).join('') : '<p class="empty">Todavía no hay planetas registrados.</p>';
  status.textContent = 'API conectada';
}

function renderPlanet(planet) {
  return `<article class="planet-card"><div><div class="planet-top"><div><h3>${escapeHtml(planet.name)}</h3><span class="section-label">${typeLabels[planet.type]}</span></div><span class="tag">${planet.habitable ? 'Habitable' : 'No habitable'}</span></div><p>${escapeHtml(planet.description)}</p></div><div class="planet-top"><div class="planet-meta"><span class="tag">${planet.massEarths} M⊕</span><span class="tag">${planet.distanceFromSunAu} UA</span></div><button class="delete-button" data-id="${planet.id}" type="button">Eliminar</button></div></article>`;
}

function escapeHtml(value) { return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character])); }

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form));
  values.massEarths = Number(values.massEarths);
  values.distanceFromSunAu = Number(values.distanceFromSunAu);
  values.habitable = form.habitable.checked;
  const response = await fetch('/api/planets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
  const result = await response.json();
  if (!response.ok) { feedback.textContent = result.details?.join(' ') || result.error; return; }
  form.reset();
  feedback.textContent = 'Planeta creado correctamente.';
  await loadPlanets();
});

list.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-id]');
  if (!button || !confirm('¿Eliminar este planeta?')) return;
  await fetch(`/api/planets/${button.dataset.id}`, { method: 'DELETE' });
  await loadPlanets();
});

document.querySelector('#refresh-button').addEventListener('click', loadPlanets);
loadPlanets().catch(() => { status.textContent = 'API desconectada'; list.innerHTML = '<p class="empty">Inicia el servidor para ver los planetas.</p>'; });