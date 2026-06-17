/* ==========================================================================
   VIEW: THE DO - Workflow Library
   Installed process library for care, teaching, discipleship, research,
   security, and operational follow-through.
   ========================================================================== */

import { pageHero } from '../_frame.js';
import {
  DO_FAMILY_LABELS,
  allDoWorkflows,
  doWorkflowFamilies,
  escapeHtml as _e,
  titleize,
  workflowSummaryText,
} from '../../Scripts/do_workflow_registry.js';

export const name = 'the_do';
export const title = 'Workflows';

let _activeWorkflowSheet = null;

export function render() {
  const families = doWorkflowFamilies();
  const total = families.reduce((sum, f) => sum + f.count, 0);
  return /* html */`
    <section class="do-view">
      ${pageHero({
        title: 'Workflows',
        subtitle: 'The installed process library for care, teaching, discipleship, security, and follow-through.',
        scripture: 'Let all things be done decently and in order. - 1 Corinthians 14:40',
      })}

      <div class="fold-toolbar" style="align-items:stretch; gap:10px;">
        <div class="fold-filters" data-do-filters>
          <button class="fold-filter is-active" data-family="all">All <span>${total}</span></button>
          ${families.map((f) => `<button class="fold-filter" data-family="${_e(f.family)}">${_e(f.label)} <span>${f.count}</span></button>`).join('')}
        </div>
        <input class="life-sheet-input" data-do-search type="search" placeholder="Search workflows..." style="max-width:320px; margin-left:auto;">
      </div>

      <div class="way-section-header" style="margin-top:18px;">
        <h2 class="way-section-title">Installed Procedures</h2>
        <span class="life-field-hint" data-do-count>${total} workflows</span>
      </div>

      <div class="do-workflow-grid" data-do-grid>
        ${allDoWorkflows().sort(_sortWorkflows).map(_workflowCard).join('')}
      </div>
    </section>
  `;
}

export function mount(root) {
  const cards = Array.from(root.querySelectorAll('[data-workflow-id]'));
  const countEl = root.querySelector('[data-do-count]');
  const search = root.querySelector('[data-do-search]');
  let activeFamily = 'all';

  function applyFilters() {
    const q = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const familyOk = activeFamily === 'all' || card.dataset.family === activeFamily;
      const searchOk = !q || (card.dataset.search || '').includes(q);
      const on = familyOk && searchOk;
      card.style.display = on ? '' : 'none';
      if (on) visible += 1;
    });
    if (countEl) countEl.textContent = `${visible} workflow${visible === 1 ? '' : 's'}`;
  }

  root.querySelectorAll('[data-do-filters] [data-family]').forEach((btn) => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('[data-do-filters] [data-family]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeFamily = btn.dataset.family || 'all';
      applyFilters();
    });
  });

  search?.addEventListener('input', applyFilters);

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const workflow = allDoWorkflows().find((w) => w.workflowId === card.dataset.workflowId);
      if (workflow) _openWorkflowSheet(workflow);
    });
  });

  applyFilters();
  return () => _closeWorkflowSheet();
}

function _workflowCard(w) {
  const priority = String(w.defaultPriority || 'normal').toLowerCase();
  const search = [
    w.workflowId, w.title, w.description, w.family, w.groupLabel,
    ...(w.aliases || []), ...(w.routingRules || []), ...(w.escalationTriggers || []),
  ].join(' ').toLowerCase();
  return /* html */`
    <article class="life-card" data-workflow-id="${_e(w.workflowId)}" data-family="${_e(w.family)}" data-search="${_e(search)}" tabindex="0">
      <div class="life-card-icon">${_workflowIcon(w.family)}</div>
      <div class="life-card-body">
        <div class="life-card-top">
          <span class="life-card-name">${_e(w.title || w.workflowId)}</span>
          <span class="life-priority-badge" style="${_priorityStyle(priority)}">${_e(titleize(priority))}</span>
          <span class="life-type-badge">${_e(DO_FAMILY_LABELS[w.family] || titleize(w.family))}</span>
        </div>
        <div class="life-card-note">${_e(w.description || w.purpose || 'Workflow procedure')}</div>
        <div class="life-card-foot">
          <span class="life-assignee">${_e(w.groupLabel || titleize(w.family))}</span>
          <span class="life-days">${_e(w.confidentialityLevel || 'internal')}</span>
        </div>
      </div>
    </article>
  `;
}

function _openWorkflowSheet(w) {
  _closeWorkflowSheet();
  const sheet = document.createElement('div');
  sheet.className = 'life-sheet';
  const fields = (w.requiredIntakeFields || []).slice(0, 14);
  const routing = (w.routingRules || []).slice(0, 8);
  const outputs = (w.outputExpectations || []).slice(0, 8);
  const escalation = (w.escalationTriggers || []).slice(0, 12);
  const closure = (w.closureChecklist || []).slice(0, 10);
  sheet.innerHTML = /* html */`
    <div class="life-sheet-overlay"></div>
    <div class="life-sheet-panel" role="dialog" aria-label="${_e(w.title || 'Workflow')}">
      <div class="life-sheet-drag"></div>
      <div class="life-sheet-hd">
        <div class="life-sheet-hd-info">
          <div class="life-sheet-hd-name">${_e(w.title || w.workflowId)}</div>
          <div class="life-sheet-hd-meta">${_e(w.workflowId)} - ${_e(w.sourcePath || '')}</div>
        </div>
        <button class="life-sheet-close" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="life-sheet-body">
        <div class="life-card-note" style="white-space:pre-wrap; margin-bottom:12px;">${_e(workflowSummaryText(w) || 'No summary available.')}</div>
        <div class="life-status-row" style="margin-bottom:14px;">
          <span class="life-status-pill is-active">${_e(DO_FAMILY_LABELS[w.family] || titleize(w.family))}</span>
          <span class="life-status-pill is-active">${_e(titleize(w.defaultPriority || 'normal'))}</span>
          <span class="life-status-pill is-active">${_e(w.confidentialityLevel || 'internal')}</span>
          <span class="life-status-pill is-active">Tier ${_e(w.minimumRoleTier || 2)}</span>
        </div>
        ${_section('Required Intake', fields)}
        ${_section('Routing Rules', routing)}
        ${_section('Output Expectations', outputs)}
        ${_section('Escalation Triggers', escalation)}
        ${_section('Closure Checklist', closure)}
      </div>
      <div class="life-sheet-foot">
        <button class="flock-btn" data-cancel>Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(sheet);
  _activeWorkflowSheet = sheet;
  requestAnimationFrame(() => {
    sheet.querySelector('.life-sheet-overlay')?.classList.add('is-open');
    sheet.querySelector('.life-sheet-panel')?.classList.add('is-open');
  });
  sheet.querySelector('[data-cancel]')?.addEventListener('click', _closeWorkflowSheet);
  sheet.querySelector('.life-sheet-close')?.addEventListener('click', _closeWorkflowSheet);
}

function _closeWorkflowSheet() {
  if (!_activeWorkflowSheet) return;
  const sheet = _activeWorkflowSheet;
  sheet.querySelector('.life-sheet-overlay')?.classList.remove('is-open');
  sheet.querySelector('.life-sheet-panel')?.classList.remove('is-open');
  setTimeout(() => {
    sheet.remove();
    if (_activeWorkflowSheet === sheet) _activeWorkflowSheet = null;
  }, 320);
}

function _section(label, items) {
  if (!items || !items.length) return '';
  return /* html */`
    <div class="life-sheet-field">
      <div class="life-sheet-label">${_e(label)}</div>
      <ul style="margin:0; padding-left:18px; color:var(--ink,#111827); line-height:1.55;">
        ${items.map((item) => `<li>${_e(item)}</li>`).join('')}
      </ul>
    </div>
  `;
}

function _workflowIcon(family) {
  if (family === 'cases' || family === 'care') return 'C';
  if (family === 'teach') return 'T';
  if (family === 'discipleship') return 'D';
  if (family === 'security') return 'S';
  if (family === 'research') return 'R';
  return 'W';
}

function _priorityStyle(priority) {
  if (priority === 'urgent') return 'color:#dc2626; background:rgba(220,38,38,0.10)';
  if (priority === 'high') return 'color:#c27803; background:rgba(232,168,56,0.13)';
  if (priority === 'low') return 'color:#6b7280; background:rgba(107,114,128,0.10)';
  return 'color:#0ea5e9; background:rgba(14,165,233,0.10)';
}

function _sortWorkflows(a, b) {
  const fa = a.family || '';
  const fb = b.family || '';
  if (fa !== fb) return fa.localeCompare(fb);
  return (a.title || a.workflowId || '').localeCompare(b.title || b.workflowId || '');
}
