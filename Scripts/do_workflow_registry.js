import DO_WORKFLOWS from '../Data/do_workflows.js';

export const DO_FAMILY_LABELS = {
  care: 'Care Process',
  cases: 'Care Cases',
  discipleship: 'Discipleship',
  research: 'Research',
  security: 'Security',
  teach: 'Teaching',
};

export const DO_PRIORITY_RANK = {
  urgent: 0,
  high: 1,
  normal: 2,
  low: 3,
};

export function allDoWorkflows() {
  return Array.isArray(DO_WORKFLOWS) ? DO_WORKFLOWS.slice() : [];
}

export function doWorkflowsByFamily(family) {
  const wanted = String(family || '').trim();
  return allDoWorkflows()
    .filter((w) => !wanted || w.family === wanted)
    .sort(sortDoWorkflows);
}

export function doWorkflowById(workflowId) {
  const id = String(workflowId || '').trim();
  if (!id) return null;
  return allDoWorkflows().find((w) => w.workflowId === id) || null;
}

export function doWorkflowFamilies() {
  const counts = {};
  allDoWorkflows().forEach((w) => {
    const family = w.family || 'other';
    counts[family] = (counts[family] || 0) + 1;
  });
  return Object.keys(counts).sort().map((family) => ({
    family,
    label: DO_FAMILY_LABELS[family] || titleize(family),
    count: counts[family],
  }));
}

export function doWorkflowGroups(family = '') {
  const groups = new Map();
  doWorkflowsByFamily(family).forEach((w) => {
    const key = w.groupLabel || DO_FAMILY_LABELS[w.family] || titleize(w.family);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  });
  return Array.from(groups.entries()).map(([label, workflows]) => ({ label, workflows }));
}

export function workflowSelectOptions(families, selectedId = '') {
  const familyList = Array.isArray(families) ? families : [families].filter(Boolean);
  const workflows = allDoWorkflows()
    .filter((w) => !familyList.length || familyList.includes(w.family))
    .sort(sortDoWorkflows);
  const groups = new Map();
  workflows.forEach((w) => {
    const label = DO_FAMILY_LABELS[w.family] || titleize(w.family);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(w);
  });
  return Array.from(groups.entries()).map(([groupLabel, items]) => {
    const options = items.map((w) => {
      const selected = w.workflowId === selectedId ? ' selected' : '';
      return `<option value="${escapeHtml(w.workflowId)}"${selected}>${escapeHtml(w.title || w.workflowId)}</option>`;
    }).join('');
    return `<optgroup label="${escapeHtml(groupLabel)}">${options}</optgroup>`;
  }).join('');
}

export function workflowPayload(w) {
  if (!w) return {};
  return {
    workflowId: w.workflowId,
    workflowTitle: w.title || '',
    workflowSourcePath: w.sourcePath || '',
    workflowFamily: w.family || '',
    workflowKind: w.kind || '',
    workflowGroup: w.group || '',
    workflowGroupLabel: w.groupLabel || '',
    defaultPriority: w.defaultPriority || 'normal',
    defaultUrgency: w.defaultUrgency || 'standard',
    confidentialityLevel: w.confidentialityLevel || 'internal',
    minimumRoleTier: w.minimumRoleTier || 2,
    screeningRequired: !!w.screeningRequired,
    requiredIntakeFields: w.requiredIntakeFields || [],
    routingRules: w.routingRules || [],
    escalationTriggers: w.escalationTriggers || [],
    closureChecklist: w.closureChecklist || [],
    sourceHash: w.sourceHash || '',
  };
}

export function workflowSummaryText(w) {
  if (!w) return '';
  const lines = [
    w.description || w.purpose || '',
    w.routingRules?.length ? `First steps: ${w.routingRules.slice(0, 3).join(' ')}` : '',
    w.outputExpectations?.length ? `Output: ${w.outputExpectations.slice(0, 2).join(' ')}` : '',
  ];
  return lines.filter(Boolean).join('\n\n');
}

export function sortDoWorkflows(a, b) {
  const fa = a.family || '';
  const fb = b.family || '';
  if (fa !== fb) return fa.localeCompare(fb);
  const ga = a.groupLabel || '';
  const gb = b.groupLabel || '';
  if (ga !== gb) return ga.localeCompare(gb);
  const pa = DO_PRIORITY_RANK[a.defaultPriority] ?? 9;
  const pb = DO_PRIORITY_RANK[b.defaultPriority] ?? 9;
  if (pa !== pb) return pa - pb;
  return (a.title || a.workflowId || '').localeCompare(b.title || b.workflowId || '');
}

export function titleize(value) {
  return String(value || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
