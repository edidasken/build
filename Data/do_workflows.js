// do_workflows.js - Generated workflow registry for /do.
// Source: New_Covenant/iris/docs/do
// Generated: 2026-06-17T06:09:52.040Z
// Records: 160
// Re-generate: node New_Covenant/iris/build_do_workflows.mjs
// DO NOT EDIT - regenerate from /do markdown instead.

export const DO_WORKFLOW_META = {
  "generatedAt": "2026-06-17T06:09:52.040Z",
  "sourceRoot": "New_Covenant/iris/docs/do",
  "count": 160,
  "byFamily": {
    "care": 17,
    "cases": 69,
    "discipleship": 4,
    "research": 35,
    "security": 4,
    "teach": 31
  },
  "byPriority": {
    "urgent": 17,
    "normal": 119,
    "high": 15,
    "low": 9
  }
};

export const DO_WORKFLOWS = [
  {
    "workflowId": "care.do-spiritual-care-best-practices-by-type",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-best-practices-by-type.md",
    "sourceHash": "5284652e40ad04e2",
    "title": "Spiritual Care Best Practices by Type",
    "description": "Type-based pastoral care best practices for spiritual care workflows, including crisis, grief, family, discipleship, recovery, hardship, identity-sensitive, and long-term care situations.",
    "family": "care",
    "kind": "care-process",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-best-practices-by-type",
      "Spiritual Care Best Practices by Type",
      "best-practices-by-type",
      "spiritual-care-best-practices-by-type"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "sexual-assault",
      "harassment",
      "neglect",
      "exploitation",
      "overdose",
      "end-of-life",
      "mental-health",
      "leadership-failure",
      "moral-failure",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide when you need a deeper layer of practical best practices for spiritual care by case type. The taxonomy tells you what the case is. The case playbooks tell you how to handle a specific situation. This document tells you how to pastor well across the major families of care so the system remains consistent, compassionate, and safe.\n\nThis guide exists because many care situations share the same underlying patterns:\n- a person needs to be heard before they are fixed\n- safety must be checked before detail gathering\n- privacy must be protected before sharing\n- practical relief often matters before long explanation\n- the right next step is usually smaller than the first emotion suggests\n- the tone of the first response can shape the entire care journey\n\nUse this guide to keep care responsive, humble, and appropriately routed.",
    "outputExpectations": [
      "the presenting type or primary care family",
      "the immediate pastoral stance to take",
      "the first questions to ask",
      "the tone to use",
      "the confidentiality level to apply",
      "the likely routing destination",
      "the expected follow-up rhythm",
      "the main do-not-do cautions for that type",
      "any extra support needed for the person’s safety, dignity, or stability"
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-closure-by-type",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-closure-by-type.md",
    "sourceHash": "1995b7fa280baca8",
    "title": "Spiritual Care Closure by Type",
    "description": "Type-based closure and transition guidance for spiritual care cases, covering how closure should differ by crisis, grief, medical, trauma, recovery, family, discipleship, hardship, and identity-sensitive care.",
    "family": "care",
    "kind": "care-process",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-closure-by-type",
      "Spiritual Care Closure by Type",
      "closure-by-type",
      "spiritual-care-closure-by-type"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "sexual-assault",
      "overdose",
      "end-of-life",
      "leadership-failure",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide when a case is ready to close, transition, or hand off, but you want the closure to fit the kind of care that was provided. Timing and documentation matter, but closure quality also depends on the type of case.\n\nA crisis case should not close like a discipleship case.  \nA grief case should not close like a scheduling task.  \nA trauma case should not close like a routine encouragement check-in.\n\nThis document helps you end care in a way that is honest, gentle, and useful to the next shepherd.",
    "outputExpectations": [
      "the care type",
      "the closure reason",
      "the current stability level",
      "the next owner or support lane",
      "the key watch-outs for future reopening",
      "any sensitivity, boundary, or confidentiality notes"
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-closure-transition",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-closure-transition.md",
    "sourceHash": "79c8d79baf711556",
    "title": "Spiritual Care Closure and Transition",
    "description": "Steps for closing spiritual care cases, documenting referrals, and transitioning people into ongoing support.",
    "family": "care",
    "kind": "care-process",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-closure-transition",
      "Spiritual Care Closure and Transition",
      "closure-transition",
      "spiritual-care-closure-transition"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm that the active care need has resolved, stabilized, or been handed off.",
      "Document the outcome in plain, complete language.",
      "Record every referral, handoff, and external support relationship.",
      "Transition the person into ongoing discipleship or support when appropriate.",
      "Capture final shepherd notes that future caregivers can actually use.",
      "Set the re-entry path before you close the record."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this document when a case is ready to close, move, or hand off. Closure should never feel like abandonment; it should clearly explain what happened, where the person is going next, who owns the next step, and what future shepherds need to know if the person returns.",
    "outputExpectations": [
      "A clear closure reason or transfer status.",
      "A documented referral list with owners, destinations, or handoff details.",
      "A transition plan for ongoing discipleship, support, or lighter follow-up.",
      "Final shepherd notes with background, sensitivities, boundaries, and watch-outs.",
      "A re-entry note that explains when and how the case should be reopened."
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-follow-up-by-type",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-follow-up-by-type.md",
    "sourceHash": "f0ccf5c69b19325e",
    "title": "Spiritual Care Follow-Up by Type",
    "description": "Type-based follow-up guidance for spiritual care cases, covering how follow-up should differ by crisis, grief, medical, trauma, recovery, family, discipleship, hardship, and identity-sensitive care.",
    "family": "care",
    "kind": "care-process",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-follow-up-by-type",
      "Spiritual Care Follow-Up by Type",
      "follow-up-by-type",
      "spiritual-care-follow-up-by-type"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "sexual-assault",
      "neglect",
      "overdose",
      "end-of-life",
      "leadership-failure",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide when you already know the follow-up cadence from the timelines document, but you need to decide how follow-up should actually feel and what it should focus on for a given care type.\n\nTiming answers **when** to follow up.  \nThis document answers **what to ask, what to avoid, and what to look for next** based on the kind of care case.",
    "outputExpectations": [
      "the care type",
      "the specific follow-up focus",
      "what changed since last contact",
      "what still needs attention",
      "whether the cadence should tighten or loosen",
      "the next owner and next date",
      "any safety, consent, or confidentiality changes"
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-follow-up-timelines",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-follow-up-timelines.md",
    "sourceHash": "303a92546e6257d5",
    "title": "Spiritual Care Follow-Up Timelines",
    "description": "Cadence, reminder, and escalation timelines for spiritual care follow-up by urgency and case type.",
    "family": "care",
    "kind": "care-process",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-follow-up-timelines",
      "Spiritual Care Follow-Up Timelines",
      "follow-up-timelines",
      "spiritual-care-follow-up-timelines"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Classify the case by urgency before setting cadence.",
      "Set the base cadence by urgency, then tighten it for higher-risk care types.",
      "Put reminders on the calendar before the due date and make the next step explicit.",
      "Escalate within a defined window when the person is at risk, unresponsive, or the situation changes.",
      "Define overdue in a way that is measurable and easy to review.",
      "Document the cadence decision and keep the next action visible."
    ],
    "followUpCadence": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "overdueRule": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "unresponsive"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this document to set the next contact date, determine how often to check in, and decide when a case is overdue or needs escalation. Follow-up should reflect both urgency and care type so that crisis situations move quickly while long-term growth cases stay steady, humane, and well documented.",
    "outputExpectations": [
      "A clear urgency label and care type classification for the case.",
      "A next follow-up date that matches the urgency and case type.",
      "Reminder timing and a defined escalation window if contact is missed.",
      "A measurable overdue threshold that can be reviewed consistently.",
      "A documented next action, owner, and any handoff or waiting-state notes."
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-intake-triage",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-intake-triage.md",
    "sourceHash": "7070d8089932ed3f",
    "title": "Spiritual Care Intake and Triage",
    "description": "Practical intake and triage guidance for spiritual care requests.",
    "family": "care",
    "kind": "care-process",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-intake-triage",
      "Spiritual Care Intake and Triage",
      "intake-triage",
      "spiritual-care-intake-triage"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Begin with presence, clarity, and immediate safety.",
      "Explain consent, confidentiality, and the limits of care.",
      "Ask the first-contact questions that reveal the basic facts.",
      "Check for privacy, safety, and communication constraints.",
      "Identify the most urgent care lane and immediate needs.",
      "Document the intake clearly and set the next step."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "threat",
      "abuse",
      "end-of-life",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide when a member, guest, or family first reaches out for spiritual care. The goal is to respond with warmth, gather enough information to understand the need, protect privacy, identify any immediate danger, and route the person to the right care lane without delay. Intake and triage are not about solving everything in the first conversation. They are about creating a safe, clear, and faithful next step.",
    "outputExpectations": [
      "A clear intake summary that captures the person’s main concern, basic facts, and current level of urgency.",
      "A documented consent and privacy note showing what was explained and what permissions were given.",
      "A routing decision that names the correct care lane and why that lane was chosen.",
      "A record of any immediate needs, safety concerns, or emergency instructions given during the contact.",
      "A next-step plan with the assigned owner, follow-up timeframe, and any prayer, referral, or handoff already arranged."
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-intake-triage-by-type",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-intake-triage-by-type.md",
    "sourceHash": "d3300c98d63ac2a1",
    "title": "Spiritual Care Intake and Triage by Type",
    "description": "Type-based intake and triage guidance for spiritual care cases, covering how the first conversation should differ by crisis, grief, medical, trauma, recovery, family, discipleship, hardship, and identity-sensitive care.",
    "family": "care",
    "kind": "care-process",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-intake-triage-by-type",
      "Spiritual Care Intake and Triage by Type",
      "intake-triage-by-type",
      "spiritual-care-intake-triage-by-type"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "overdose",
      "end-of-life",
      "leadership-failure",
      "moral-failure",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide when a new care request arrives and you need to decide how the first contact should feel, what questions to ask first, and where the case should go next.\n\nThe generic intake guide tells you how to begin safely and respectfully.  \nThis document tells you how the opening conversation should differ by care type.",
    "outputExpectations": [
      "the care type",
      "the immediate safety status",
      "the first key facts gathered",
      "the consent and safe-contact rules",
      "the chosen lane",
      "the named owner or next responder",
      "any urgent follow-up date or escalation trigger"
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-notes-handoffs",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-notes-handoffs.md",
    "sourceHash": "62d79209bb20dad7",
    "title": "Spiritual Care Notes and Handoffs",
    "description": "Guidance for factual care notes and smooth pastoral handoffs.",
    "family": "care",
    "kind": "care-process",
    "group": "care",
    "groupLabel": "Care",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-notes-handoffs",
      "Spiritual Care Notes and Handoffs",
      "notes-handoffs",
      "spiritual-care-notes-handoffs"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "ownerId",
      "nextAction",
      "closureReason",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Write the note promptly and include the basic case facts.",
      "Separate fact, member report, and interpretation.",
      "Capture contact history and continuity of care.",
      "Record actions, commitments, and next steps with precision.",
      "Prepare a handoff that is concise, complete, and respectful.",
      "Close the loop after transition or case completion."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide to write care notes that are accurate, respectful, and useful to the next person who serves the case. Good notes protect the member, preserve continuity, and help pastors and care workers avoid repeating questions or missing important history. A good handoff carries the burden of care with clarity, not confusion.",
    "outputExpectations": [
      "A dated and time-stamped care note that can be understood without extra explanation.",
      "A clear separation of facts, reported statements, and the writer’s assessment or interpretation.",
      "A current contact history showing outreach attempts, responses, and completed follow-ups.",
      "A handoff summary that names the new owner, the current status, and the next action required.",
      "Confidential and necessary-only sharing that protects the person while preserving continuity of care."
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-notes-handoffs-by-type",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-notes-handoffs-by-type.md",
    "sourceHash": "8a31f9eb80b60ddd",
    "title": "Spiritual Care Notes and Handoffs by Type",
    "description": "Type-based notes and handoff guidance for spiritual care cases, covering how documentation and transfers should differ by crisis, grief, medical, trauma, recovery, family, discipleship, hardship, and identity-sensitive care.",
    "family": "care",
    "kind": "care-process",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-notes-handoffs-by-type",
      "Spiritual Care Notes and Handoffs by Type",
      "notes-handoffs-by-type",
      "spiritual-care-notes-handoffs-by-type"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "overdose",
      "end-of-life",
      "leadership-failure",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide when the case is active and you need to write notes or transfer ownership in a way that fits the care type.\n\nA crisis handoff should not read like a discipleship note.  \nA grief handoff should not read like a task ticket.  \nA trauma handoff should not expose details that make the next caregiver unsafe or clumsy.\n\nThis document helps you write useful notes and handoffs that preserve dignity, protect privacy, and make the next shepherd effective.",
    "outputExpectations": [
      "the care type",
      "the current status",
      "the important facts and reported statements",
      "the current owner",
      "the next action and due date",
      "the sensitivity or confidentiality constraints",
      "the exact handoff destination if ownership changed",
      "the watch-outs for the next shepherd"
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-prayer",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-prayer.md",
    "sourceHash": "fbec900d415c6437",
    "title": "Spiritual Care Prayer Bank",
    "description": "Comprehensive prayer bank for spiritual conditions, pastoral care needs, and everyday discipleship, with special focus on the Sermon on the Mount.",
    "family": "care",
    "kind": "care-process",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-prayer",
      "Spiritual Care Prayer Bank",
      "prayer",
      "spiritual-care-prayer"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "abuse",
      "neglect",
      "end-of-life"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this document when you need biblically shaped prayers that match a person’s spiritual condition, practical challenge, or daily discipleship need.\n\nThis is a prayer library, not a generic devotional. The goal is to keep prayer:\n- rooted in Scripture,\n- honest about the person’s real condition,\n- short enough to use in care,\n- and specific enough to support the next step of discipleship.",
    "outputExpectations": [
      "A scripture-shaped prayer bank that can be used across many care situations.",
      "A Sermon on the Mount centered prayer framework for daily discipleship.",
      "A set of short, concrete prayers for repentance, grief, fear, temptation, and growth.",
      "A clear prayer note that can be recorded and reused by future shepherds.",
      "A resource that helps prayer stay specific, biblical, and pastorally grounded.",
      "**Pride** — “Break my pride and make me glad to be little before You.”",
      "**Distraction** — “Gather my scattered heart and help me seek first Your kingdom.”",
      "**Forgiveness** — “Help me release what I have been carrying against others.”",
      "**Submission** — “Make me willing to follow Your word even when I would rather resist.”",
      "**Service** — “Let me serve with joy, not resentment or self-display.”",
      "**Sabbath rest** — “Teach me to rest in You without guilt or fear.”",
      "**Ordinary faithfulness** — “Help me be steady in small things that no one sees.”",
      "**Joyless duty** — “Renew delight in obedience so duty becomes devotion.”",
      "**Relapse into old patterns** — “Give me a way forward, a clean break, and a fresh start today.”"
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-prayer-by-type",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-prayer-by-type.md",
    "sourceHash": "1b3a4e2442d73feb",
    "title": "Spiritual Care Prayer by Type",
    "description": "Type-based prayer guidance for spiritual care cases, covering how prayer tone, content, and timing should differ by crisis, grief, medical, trauma, recovery, family, discipleship, hardship, and identity-sensitive care.",
    "family": "care",
    "kind": "care-process",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-prayer-by-type",
      "Spiritual Care Prayer by Type",
      "prayer-by-type",
      "spiritual-care-prayer-by-type"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "overdose",
      "end-of-life",
      "leadership-failure",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide when you already know prayer is appropriate, but you need to pray in a way that fits the kind of care case in front of you.\n\nThe generic prayer bank gives you words to use.  \nThis document gives you **how to pray**, **what to emphasize**, and **what to avoid** for each care type.\n\nPrayer should support care, not replace safety, consent, wisdom, or practical action.",
    "outputExpectations": [
      "the care type",
      "the prayer posture to use",
      "the main themes to emphasize",
      "the cautions to avoid",
      "whether the prayer was brief, moderate, or extended",
      "whether the person consented to prayer",
      "any follow-up prayer request or verse anchor"
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-risk-escalation",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-risk-escalation.md",
    "sourceHash": "55c7d1f88c5813a3",
    "title": "Spiritual Care Risk Escalation",
    "description": "Thresholds and actions for urgent spiritual care escalation.",
    "family": "care",
    "kind": "care-process",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-risk-escalation",
      "Spiritual Care Risk Escalation",
      "risk-escalation",
      "spiritual-care-risk-escalation"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "closureReason",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Screen for immediate danger at the first sign of concern.",
      "Use a safety-first threshold for suicide, self-harm, and threats to others.",
      "Respond immediately to abuse, domestic violence, and coercive control.",
      "Recognize medical emergencies and do not delay emergency services.",
      "Handle mandated referrals and authority involvement carefully and transparently.",
      "Stabilize the case, then continue pastoral support in the right order."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "overdose",
      "mandated-reporting",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide when a care conversation reveals danger, abuse, self-harm, a medical emergency, or any situation that may require immediate protection or outside intervention. The purpose is to protect life, reduce harm, respect legal and ethical duties, and ensure the church responds with steady pastoral care rather than hesitation or confusion. When safety is at stake, act first to preserve life and reach out for appropriate help.",
    "outputExpectations": [
      "A clear risk level statement showing whether the matter is urgent, emergency-level, or appropriate for standard follow-up.",
      "Documentation of any emergency services, authorities, or mandated reporters contacted, including time and outcome when available.",
      "A factual summary of the danger indicators, reported statements, and observed conditions that triggered escalation.",
      "A short interim pastoral plan that explains what support continues after the immediate safety action is taken.",
      "A named owner and next follow-up time so the case does not stall after the initial escalation."
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-risk-escalation-by-type",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-risk-escalation-by-type.md",
    "sourceHash": "05bcbbf22723fa26",
    "title": "Spiritual Care Risk Escalation by Type",
    "description": "Type-based risk escalation guidance for spiritual care cases, covering how danger thresholds and response steps differ by crisis, trauma, medical, grief, recovery, family, discipleship, hardship, and identity-sensitive care.",
    "family": "care",
    "kind": "care-process",
    "group": "medical-hospital-elder-and-end-of-life-care",
    "groupLabel": "Medical, Hospital, Elder, and End-of-Life Care",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-risk-escalation-by-type",
      "Spiritual Care Risk Escalation by Type",
      "risk-escalation-by-type",
      "spiritual-care-risk-escalation-by-type"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "overdose",
      "end-of-life",
      "mental-health",
      "leadership-failure",
      "moral-failure",
      "mandated-reporting",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide when a case may need more than routine pastoral care, but the escalation path should be shaped by the kind of case it is.\n\nThe generic escalation guide tells you **when to act fast**.  \nThis document tells you **what kind of escalation to use, who should be involved, and what not to do** for each care type.",
    "outputExpectations": [
      "the care type",
      "the specific trigger that required escalation",
      "the level of escalation used",
      "who was contacted",
      "what immediate action was taken",
      "what remains for follow-up",
      "any privacy, consent, or confidentiality constraints"
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-scripture-prayer",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-scripture-prayer.md",
    "sourceHash": "ebe57c885889da39",
    "title": "Spiritual Care Scripture and Prayer",
    "description": "Pastoral language, scripture selection, and prayer patterns for spiritual care workflows.",
    "family": "care",
    "kind": "care-process",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-scripture-prayer",
      "Spiritual Care Scripture and Prayer",
      "scripture-prayer",
      "spiritual-care-scripture-prayer"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Start with the care moment, not with a verse.",
      "Match Scripture to the care workflow and keep the selection narrow.",
      "Translate Scripture into pastoral language that fits the person’s state.",
      "Keep prayer short, specific, and matched to the next action in the workflow.",
      "Use pastoral language that strengthens trust rather than pressure.",
      "Record what was used so future shepherds can keep the tone consistent."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this document to keep Scripture and prayer specific, brief, and pastorally grounded. The goal is not to sound religiously generic; the goal is to match the person’s actual need with a fitting biblical frame, a truthful pastoral sentence, and a short prayer that supports the care workflow.",
    "outputExpectations": [
      "A brief set of scripture references that match the care workflow.",
      "A short pastoral sentence that reflects the person’s actual need.",
      "A prayer that is specific, brief, and non-generic.",
      "A note explaining why the chosen language fits the moment.",
      "A record of the spiritual tone or emphasis for future follow-up."
    ]
  },
  {
    "workflowId": "care.do-spiritual-care-scripture-prayer-by-type",
    "sourcePath": "New_Covenant/iris/docs/do/care/do-spiritual-care-scripture-prayer-by-type.md",
    "sourceHash": "3db82a13c6cb4192",
    "title": "Spiritual Care Scripture Prayer by Type",
    "description": "Type-based Scripture-prayer guidance for spiritual care cases, covering which biblical passages to use, how to frame them, and what to avoid by care type.",
    "family": "care",
    "kind": "care-process",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-scripture-prayer-by-type",
      "Spiritual Care Scripture Prayer by Type",
      "scripture-prayer-by-type",
      "spiritual-care-scripture-prayer-by-type"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "violence",
      "abuse",
      "end-of-life",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide when you want Scripture anchored prayer, but you need to choose the passage and emphasis based on the kind of care case in front of you.\n\nThe generic Scripture-prayer guide tells you how to pray from Scripture.  \nThis document tells you **which kinds of passages fit which kinds of care**, and **how to use them without flattening the person’s situation**.",
    "outputExpectations": [
      "the care type",
      "the primary Scripture passage or passage family",
      "the reason that passage fits",
      "the tone it should carry",
      "the cautions to avoid",
      "whether the passage is short, medium, or extended",
      "any prayer follow-up or study step"
    ]
  },
  {
    "workflowId": "care.readme",
    "sourcePath": "New_Covenant/iris/docs/do/care/README.md",
    "sourceHash": "4f636b77fafeef5d",
    "title": "Spiritual Care Core Index",
    "description": "Flat authoritative index for the core spiritual-care workflow docs under documentation/do/core.",
    "family": "care",
    "kind": "index",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "",
    "aliases": [
      "readme",
      "Spiritual Care Core Index",
      "do-spiritual-care-core-index"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This folder contains the shared spiritual-care process docs that apply across many care cases. Keep this index flat and authoritative so the core care layer is easy to scan, maintain, and extend.",
    "outputExpectations": [
      "`README.md`",
      "`do-spiritual-care-intake-triage.md`",
      "`do-spiritual-care-risk-escalation.md`",
      "`do-spiritual-care-risk-escalation-by-type.md`",
      "`do-spiritual-care-follow-up-timelines.md`",
      "`do-spiritual-care-follow-up-by-type.md`",
      "`do-spiritual-care-notes-handoffs.md`",
      "`do-spiritual-care-notes-handoffs-by-type.md`",
      "`do-spiritual-care-closure-transition.md`",
      "`do-spiritual-care-closure-by-type.md`",
      "`do-spiritual-care-prayer.md`",
      "`do-spiritual-care-prayer-by-type.md`",
      "`do-spiritual-care-scripture-prayer.md`",
      "`do-spiritual-care-best-practices-by-type.md`"
    ]
  },
  {
    "workflowId": "care.spiritual-care-case-taxonomy-and-workflows",
    "sourcePath": "New_Covenant/iris/docs/do/care/spiritual-care-case-taxonomy-and-workflows.md",
    "sourceHash": "ebf25f5e1b29f3e8",
    "title": "Spiritual Care Case Taxonomy and Software Workflows",
    "description": "Build a comprehensive, software-ready taxonomy for spiritual care cases so the system can classify requests correctly, apply the right confidentiality rules, route to the right people, and trigger the right follow-up workflow.",
    "family": "care",
    "kind": "reference",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "",
    "aliases": [
      "spiritual-care-case-taxonomy-and-workflows",
      "Spiritual Care Case Taxonomy and Software Workflows"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "sexual-assault",
      "harassment",
      "neglect",
      "exploitation",
      "overdose",
      "terminal",
      "end-of-life",
      "mental-health",
      "leadership-failure",
      "moral-failure",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Build a comprehensive, software-ready taxonomy for spiritual care cases so the system can classify requests correctly, apply the right confidentiality rules, route to the right people, and trigger the right follow-up workflow.\n\nThis document is intentionally broad. No taxonomy can literally enumerate every human situation, but the software should treat the categories below as the primary case families and extend them by adding new subtypes rather than inventing one-off handling.",
    "outputExpectations": []
  },
  {
    "workflowId": "cases.do-spiritual-care-abuse-domestic-violence",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-abuse-domestic-violence.md",
    "sourceHash": "11e0928e16ac1e2c",
    "title": "Abuse and Domestic Violence",
    "description": "Spiritual-care workflow for abuse, coercive control, domestic violence, stalking, and unsafe home situations.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Abuse and Domestic Violence",
    "aliases": [
      "do-spiritual-care-abuse-domestic-violence",
      "Abuse and Domestic Violence",
      "abuse-domestic-violence",
      "spiritual-care-abuse-domestic-violence"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "restricted",
    "minimumRoleTier": 6,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "safetyScreen",
      "nextAction",
      "dueDate",
      "closureReason",
      "ownerId"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Assess immediate danger before asking for a story.",
      "Gather only the intake details needed to protect the survivor.",
      "State a survivor-centered confidentiality posture.",
      "Route to protection, advocacy, and legal/medical support.",
      "Offer scripture and prayer that protect dignity and refuse coercion.",
      "Maintain close follow-up until the person has a safer path."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "safety",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "sexual-assault",
      "mandated-reporting",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when a person may be experiencing abuse in a relationship, home, ministry, or caregiving setting, including physical violence, sexual coercion, threats, stalking, financial control, intimidation, isolation, or coercive control.\n\nThe goal is not reconciliation at any cost. The goal is **safety, truthful assessment, survivor agency, and careful routing to protection and support**. A spiritually mature response never pressures a victim to return to danger, forgive before safety is established, or disclose details to the abuser.",
    "outputExpectations": [
      "A survivor-centered intake summary that identifies the abuse pattern and current level of danger.",
      "A routing record showing whether emergency, medical, advocacy, shelter, legal, or child-protection support was activated.",
      "A confidentiality note that protects the survivor from retaliation or exposure.",
      "A safety plan note with contact restrictions, code words, and safer communication methods.",
      "A follow-up cadence that keeps the survivor connected until safety is materially improved."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-abuse-neglect-exploitation",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-abuse-neglect-exploitation.md",
    "sourceHash": "c199f6b96ee3c1a3",
    "title": "Abuse, Neglect, and Exploitation",
    "description": "Immediate pastoral response workflow for suspected abuse, neglect, or exploitation of a minor or vulnerable adult.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Abuse, Neglect, and Exploitation",
    "aliases": [
      "do-spiritual-care-abuse-neglect-exploitation",
      "Abuse, Neglect, and Exploitation",
      "abuse-neglect-exploitation",
      "spiritual-care-abuse-neglect-exploitation"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Assess immediate danger and separate from the possible source of harm. If the person is in current danger, contact emergency services and help move them to a safer setting. Do not send the person back to a place or person that may increase harm when an immediate safety alternative is available.",
      "Listen carefully and document only objective facts. Record who said what, when, and any visible injuries, neglect indicators, or financial irregularities. Do not investigate beyond the role of care, and do not promise secrecy if reporting may be required.",
      "Escalate to the pastor, care leader, and safeguarding or abuse response lead. Share information only with those who need it to protect the person and meet legal obligations. Keep all notes, messages, and case files sealed and confidential, with access limited to the response team.",
      "Determine and complete mandated reporting. If the person is a minor, elder, dependent adult, vulnerable adult, or there is a legal requirement to report abuse, neglect, or exploitation, contact the appropriate agency immediately. Do not wait for additional proof, and do not let pastoral concern delay the report.",
      "Refer to protective, medical, legal, and practical supports. Help the person connect with medical care, protective services, victim advocacy, legal aid, shelter, financial support, or a safe family member when appropriate. If the alleged abuser is in the church, apply immediate safeguarding restrictions and remove access where policy allows.",
      "Establish a follow-up and protection plan. Decide who will check in, who will coordinate with outside agencies, and what boundaries must remain in place. Document the referral details, the report reference if available, and the next follow-up time so the pastor and care leader can continue support without compromising safety."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "safety",
      "abuse",
      "neglect",
      "exploitation",
      "mandated-reporting",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when there is concern that a person may be experiencing abuse, neglect, or exploitation, including physical, emotional, sexual, financial, spiritual, or caregiving neglect. The priority is protection, mandated reporting, careful documentation, and referral to the right authority without placing the burden of proof on the person seeking help.",
    "outputExpectations": [
      "The person is protected from further harm and not sent back into an unsafe situation when alternatives exist.",
      "Objective documentation is completed and kept confidential with restricted access.",
      "Any required abuse, neglect, or exploitation report is made promptly to the proper authority.",
      "Referrals are completed to medical, protective, legal, and practical support resources as needed.",
      "The pastor or care leader leaves with a clear safety, boundary, and follow-up checklist."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-addiction",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-addiction.md",
    "sourceHash": "81b44b40922e316f",
    "title": "Addiction Care Workflow",
    "description": "Shepherding workflow for substance use, compulsive behavior, and recovery support.",
    "family": "cases",
    "kind": "case",
    "group": "addiction-mental-health-and-counseling",
    "groupLabel": "Addiction, Mental Health, and Counseling",
    "caseType": "Addiction Care Workflow",
    "aliases": [
      "do-spiritual-care-addiction",
      "Addiction Care Workflow",
      "addiction",
      "spiritual-care-addiction"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason",
      "presentingNeed"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Receive the story without shame and identify the current pattern.",
      "Screen immediately for withdrawal, overdose, and safety risk.",
      "Set a confidentiality posture that supports honesty and accountability.",
      "Route to the right recovery and care pathway.",
      "Offer a steady recovery posture with scripture, prayer, and follow-up.",
      "Close only when a durable recovery structure is in place."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "overdose",
      "mental-health",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when someone is struggling with alcohol, drugs, nicotine, gambling, spending, food, pornography-linked compulsions, or other addictive patterns that are damaging spiritual life, relationships, work, or safety. The goal is to provide sober, compassionate pastoral care, screen for medical and relational danger, protect family members, and route the person to trained pastoral care leaders, recovery support, and professional treatment as needed.",
    "outputExpectations": [
      "A summary of the addiction pattern, triggers, last use or relapse, and family-system impact.",
      "Risk screening notes covering overdose, withdrawal, self-harm, violence, and child safety.",
      "The confidentiality and accountability plan, including who may receive updates.",
      "The assigned route, named pastoral care leader, and any treatment, counseling, or recovery referrals.",
      "Follow-up cadence, relapse-response expectations, and closure or handoff notes."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-addiction-recovery",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-addiction-recovery.md",
    "sourceHash": "ed5eef006de4a62e",
    "title": "Spiritual Care: Addiction & Recovery",
    "description": "Workflow for Addiction and Pornography / Sexual Addiction spiritual care cases.",
    "family": "cases",
    "kind": "case",
    "group": "addiction-mental-health-and-counseling",
    "groupLabel": "Addiction, Mental Health, and Counseling",
    "caseType": "Spiritual Care: Addiction & Recovery",
    "aliases": [
      "do-spiritual-care-addiction-recovery",
      "Spiritual Care: Addiction & Recovery",
      "addiction-recovery",
      "spiritual-care-addiction-recovery"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the exact care type and the presenting need.",
      "Check for urgent safety or safeguarding concerns before anything else.",
      "Choose the right workflow decision for the level of need.",
      "Set a recovery-oriented follow-up pattern.",
      "Offer Bible and prayer support in a way that is truthful and non-shaming.",
      "Document notes clearly and protect confidentiality."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "abuse",
      "exploitation",
      "overdose",
      "unresponsive"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide for care cases tagged **Addiction** or **Pornography / Sexual Addiction**. The goal is to respond with truth, compassion, confidentiality, and clear next steps. This document helps you decide when the need is a crisis, when it is a recovery and accountability conversation, when counseling or pastoral escalation is appropriate, and how to keep prayer and Scripture support grounded and non-shaming.",
    "outputExpectations": [
      "The case is tagged with **Addiction** or **Pornography / Sexual Addiction** and routed to the correct response path.",
      "Safety, safeguarding, and escalation decisions are documented clearly.",
      "Follow-up timing, owner, and accountability expectations are recorded.",
      "Prayer and Scripture support are included in a compassionate, non-shaming summary.",
      "Notes include only the necessary details, consent, referrals, and recovery commitments."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-adoption-foster-care",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-adoption-foster-care.md",
    "sourceHash": "742fd9aa187b0859",
    "title": "Adoption and Foster Care Care",
    "description": "Pastoral care workflow for adoption, foster care, placement transitions, and family support around children in care.",
    "family": "cases",
    "kind": "case",
    "group": "practical-hardship-and-life-stability",
    "groupLabel": "Practical Hardship and Life Stability",
    "caseType": "Adoption and Foster Care Care",
    "aliases": [
      "do-spiritual-care-adoption-foster-care",
      "Adoption and Foster Care Care",
      "adoption-foster-care",
      "spiritual-care-adoption-foster-care"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Clarify the placement situation and the person’s role.",
      "Distinguish the care need from the legal process.",
      "Stabilize the immediate emotional and practical load.",
      "Route to safe support and advocacy.",
      "Build a calm support plan around the placement.",
      "Follow up with stability in mind.",
      "Close when the immediate placement need is stable."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "safety",
      "abuse",
      "neglect"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when a family, child, caregiver, or ministry contact is navigating adoption, foster care, kinship placement, reunification, placement disruption, or the emotional and practical strain that comes with care-system involvement. The goal is to offer steady pastoral support, reduce confusion, protect confidentiality, and help the family or child connect to the right practical and relational support.\n\nHandle the situation discreetly. Share only the minimum necessary information with the people who can help with advocacy, placement stability, emotional support, or practical care.",
    "outputExpectations": [
      "A concise summary of the placement type, current stability, and immediate concerns.",
      "A routing note showing what pastoral, emotional, or practical support is active.",
      "A short support plan with next steps and any key dates.",
      "A follow-up cadence with owner and focus.",
      "A closure note confirming the placement situation is stable enough for the next stage."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-caregiver-burnout",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-caregiver-burnout.md",
    "sourceHash": "f567f07937ba7628",
    "title": "Caregiver Burnout Care",
    "description": "Pastoral care workflow for caregiver burnout, fatigue, overload, and support needs.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Caregiver Burnout Care",
    "aliases": [
      "do-spiritual-care-caregiver-burnout",
      "Caregiver Burnout Care",
      "caregiver-burnout",
      "spiritual-care-caregiver-burnout"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Assess the caregiver’s current load and emotional state.",
      "Distinguish burden from boundary problems.",
      "Stabilize the caregiver with immediate relief.",
      "Route to practical and relational support.",
      "Build a realistic follow-up plan.",
      "Close only when the burden is manageable."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "abuse",
      "neglect"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when someone is carrying sustained care responsibilities for a spouse, parent, child, relative, friend, or congregant and is showing signs of exhaustion, resentment, guilt, overwhelm, or isolation. The goal is to stabilize the caregiver, reduce immediate strain, identify practical support, and keep the person from burning out while honoring both the care receiver and the caregiver.\n\nHandle the situation discreetly. Share only the minimum necessary information with people who can help relieve the load, coordinate support, or provide respite.",
    "outputExpectations": [
      "A concise summary of the caregiving load, strain level, and immediate needs.",
      "A routing note showing what practical, pastoral, or counseling support was activated.",
      "A short relief plan with one or two concrete actions for the next few days.",
      "A follow-up cadence with owner and focus.",
      "A closure note confirming the caregiver is supported enough to continue without immediate crisis."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-church-hurt-ministry-conflict",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-church-hurt-ministry-conflict.md",
    "sourceHash": "1180f069d0aa9abf",
    "title": "Spiritual Care: Church Hurt and Ministry Conflict",
    "description": "Pastoral workflow for church hurt, ministry conflict, and relational wounds within church leadership or volunteer settings.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Spiritual Care: Church Hurt and Ministry Conflict",
    "aliases": [
      "do-spiritual-care-church-hurt-ministry-conflict",
      "Spiritual Care: Church Hurt and Ministry Conflict",
      "church-hurt-ministry-conflict",
      "spiritual-care-church-hurt-ministry-conflict"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Receive the story without defensive language or quick reconciliation pressure.",
      "Clarify what kind of harm is present and whether it is still active.",
      "Assess confidentiality boundaries and retaliation risk.",
      "Offer pastoral care before process, and process before pressure.",
      "Choose a routing path that matches the situation.",
      "Close with a concrete care plan and documentation that protects everyone."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "abuse",
      "leadership-failure"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when someone has been wounded by church conflict, ministry disagreement, leadership failure, public correction, gossip, power misuse, or unresolved relational tension inside a church setting. The goal is to reduce further harm, listen with precision, avoid sides-taking, and help the person move toward healing, truth, and appropriate next steps.\n\nThis workflow must be careful with confidentiality and especially careful not to intensify conflict by relaying one person’s complaints without consent or a clear care purpose. It should distinguish hurt, offense, injustice, leadership concern, and patterns that may require formal escalation.",
    "outputExpectations": [
      "A factual summary of the church hurt or ministry conflict without unnecessary editorializing.",
      "A risk and confidentiality note indicating whether safety, retaliation, or formal escalation concerns were present.",
      "A pastoral care record showing what was offered for lament, prayer, and Scripture support.",
      "A routing decision describing mediation, leadership review, counseling referral, or simple follow-up.",
      "A closure plan with timelines, ownership, and conditions for reopening the case."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-counseling",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-counseling.md",
    "sourceHash": "527d861879fbbd92",
    "title": "Counseling Care",
    "description": "General spiritual counseling workflow for discernment, support, and next steps",
    "family": "cases",
    "kind": "case",
    "group": "addiction-mental-health-and-counseling",
    "groupLabel": "Addiction, Mental Health, and Counseling",
    "caseType": "Counseling Care",
    "aliases": [
      "do-spiritual-care-counseling",
      "Counseling Care",
      "counseling",
      "spiritual-care-counseling"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Start with a calm intake and clarify the person’s goal.",
      "Triage for safety, abuse, and fit.",
      "Listen for the underlying discipleship question, not only the presenting problem.",
      "Provide scripture, prayer, and one clear next step.",
      "Set a follow-up cadence that matches the weight of the issue.",
      "Close when the next shepherding lane is clear and stable."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "exploitation",
      "mental-health"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when someone needs wise, biblically grounded conversation about relationships, decision-making, conflict, grief, sin patterns, life transitions, vocational stress, spiritual confusion, or general pastoral care that does not yet fit a more specific case. This is a listening-and-guidance lane, not a replacement for licensed therapy, crisis response, or safeguarding action.\n\nHandle information discreetly, share only on a need-to-know basis, and avoid collecting more detail than is necessary to understand the concern and route it well. When the issue becomes clinical, abusive, unsafe, or legally sensitive, move out of this lane immediately.",
    "outputExpectations": [
      "A concise intake summary that states the presenting concern, the desired outcome, and any immediate risks.",
      "A routing decision that identifies whether the case stays in counseling or needs escalation to another care lane.",
      "A practical next-step plan with one or more actions, owners, and a follow-up date.",
      "A brief note of scripture, prayer emphasis, and any discernment themes that emerged.",
      "A closure note confirming stability, handoff completion, and any criteria for reopening."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-crisis",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-crisis.md",
    "sourceHash": "22e5b8b089ba7edb",
    "title": "Crisis and Safety",
    "description": "Immediate spiritual-care workflow for suicide risk, self-harm, violence, psychosis, or other urgent safety concerns.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Crisis and Safety",
    "aliases": [
      "do-spiritual-care-crisis",
      "Crisis and Safety",
      "crisis",
      "spiritual-care-crisis"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Stabilize the moment before you investigate anything else.",
      "Ask the minimum safety questions needed to assess imminent risk.",
      "State the confidentiality posture clearly and without hedging.",
      "Route the case based on the level of danger.",
      "Offer a prayer and scripture posture that protects dignity and reduces shame.",
      "Follow up quickly and close only when safety is no longer the unresolved issue."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "violence",
      "mandated-reporting",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when a person may be in immediate danger, may harm themselves or someone else, is actively psychotic or disoriented, or needs urgent protection before any deeper pastoral conversation can happen.\n\nThis workflow prioritizes **safety, fast routing, and calm presence**. The shepherd's job is not to solve every issue in the moment. The shepherd's job is to determine whether the person needs emergency help, to reduce risk, and to connect them to the right responders without delay.",
    "outputExpectations": [
      "A documented safety assessment with the minimum facts needed to determine imminence.",
      "A clear decision on whether emergency services, crisis response, clinical care, or protective action is required.",
      "A confidentiality note that reflects safety limits without oversharing.",
      "A specific handoff record showing who was contacted, when, and what the next step is.",
      "A follow-up plan that confirms the person is not left isolated after the first intervention."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-crisis-safety",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-crisis-safety.md",
    "sourceHash": "dc0fbbf4c7a4d8ec",
    "title": "Crisis & Safety Spiritual Care",
    "description": "Safely triage crisis and abuse or domestic violence care cases with immediate protection and pastoral clarity.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Crisis & Safety Spiritual Care",
    "aliases": [
      "do-spiritual-care-crisis-safety",
      "Crisis & Safety Spiritual Care",
      "crisis-safety",
      "spiritual-care-crisis-safety"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the exact care type first: determine whether the situation is Crisis or Abuse / Domestic Violence, and do not blur it into general encouragement if there is any active danger, coercion, or fear.",
      "Ask only the minimum safety questions needed to assess immediate risk, location, access to the person, access to children or vulnerable adults, and whether emergency services or a safe exit are needed now.",
      "Route immediately based on risk: call emergency services for imminent harm, notify mandated reporting channels when required, involve on-call pastoral leadership, and connect the person to a safe trusted contact, advocate, shelter, or crisis line as appropriate.",
      "Provide short pastoral care that reinforces dignity, safety, and God’s nearness; avoid pressure to reconcile, return home, forgive quickly, or disclose details that could increase danger.",
      "Document the main risks, the chosen routing decision, the scripture anchor used, the safety plan, and the next follow-up time; make sure the record clearly states any unresolved danger or reporting obligation.",
      "Close only when immediate safety is stabilized, the person knows the next contact point, the external and internal handoffs are complete, and the case has an owner for continued care or monitoring."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "violence",
      "abuse",
      "domestic-violence",
      "mandated-reporting",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This playbook covers the exact care types:\n\n- Crisis\n- Abuse / Domestic Violence\n\nUse it when the first responsibility is protection, stabilization, and correct routing before deeper pastoral conversation. The pastoral posture is calm, brief, trauma-aware, non-judgmental, protective, and willing to interrupt the conversation when safety requires it. Main risks include ongoing harm, retaliation, coercive control, child or vulnerable-adult risk, unsafe disclosure, self-harm, and delayed emergency response. Routing decisions should prioritize emergency services, mandated reporting, on-call pastoral leadership, and trusted safety resources before any extended follow-up. Typical timeline is immediate same-day triage, a 24-hour safety check, and 1-2 week stabilization follow-up. Scripture anchors are Psalm 46:1, Proverbs 31:8-9, Isaiah 1:17, and Luke 10:33-37. Closure criteria require a documented safety plan, the correct handoffs, an assigned support owner, and no unresolved immediate danger.",
    "outputExpectations": [
      "The case record names the exact care type, the urgency level, and the key safety concern in plain language.",
      "The response includes the pastoral posture used, with a clear note that the conversation remained protective and non-pressuring.",
      "The routing decision is explicit, including any emergency, reporting, shelter, or leadership escalation that occurred.",
      "The timeline is documented with a same-day action, a 24-hour follow-up, and any longer stabilization plan.",
      "The closure note states the safety status, scripture anchor, assigned owner, and whether any further risk remains."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-death-bereavement-funeral-support",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-death-bereavement-funeral-support.md",
    "sourceHash": "8340a3553d02e43b",
    "title": "Death, Bereavement, and Funeral Support",
    "description": "Practical workflow for bereavement care and funeral support.",
    "family": "cases",
    "kind": "case",
    "group": "medical-hospital-elder-and-end-of-life-care",
    "groupLabel": "Medical, Hospital, Elder, and End-of-Life Care",
    "caseType": "Death, Bereavement, and Funeral Support",
    "aliases": [
      "do-spiritual-care-death-bereavement-funeral-support",
      "Death, Bereavement, and Funeral Support",
      "death-bereavement-funeral-support",
      "spiritual-care-death-bereavement-funeral-support"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "closureReason",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Respond with compassion and assess immediate needs.",
      "Clarify the funeral, burial, or memorial situation.",
      "Route the family to practical and financial help.",
      "Provide short-term support for the grieving household.",
      "Track follow-up and bereavement needs.",
      "Close or transfer the case appropriately."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when someone has experienced the death of a loved one, needs bereavement support, or needs practical help with funeral arrangements, memorial logistics, or immediate post-death responsibilities. The workflow should provide compassionate care, help with urgent logistics, connect to financial and community resources, and determine when the case should close or move to another pathway.",
    "outputExpectations": [
      "A documented summary of the death, the family’s immediate needs, and the funeral status.",
      "Referrals or direct support arranged for funeral logistics, financial help, or community care.",
      "Practical assistance provided for meals, transportation, documentation, or coordination.",
      "A follow-up plan for grief care after the service or memorial.",
      "A clear closure or transfer decision based on ongoing needs and scope."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-disability-accessibility-support",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-disability-accessibility-support.md",
    "sourceHash": "963321f9b8f77f53",
    "title": "Disability / Accessibility Support",
    "description": "Spiritual care workflow for disability-related accessibility support, accommodations, and inclusive pastoral care.",
    "family": "cases",
    "kind": "case",
    "group": "identity-leadership-mission-and-accessibility",
    "groupLabel": "Identity, Leadership, Mission, and Accessibility",
    "caseType": "Disability / Accessibility Support",
    "aliases": [
      "do-spiritual-care-disability-accessibility-support",
      "Disability / Accessibility Support",
      "disability-accessibility-support",
      "spiritual-care-disability-accessibility-support"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Ask respectful intake questions about access needs. Learn what disability or accessibility barriers are present, what settings are difficult, what accommodations help, whether communication support is needed, and whether a caregiver, advocate, or support person should be included. Ask with permission and avoid treating disability as a problem to be fixed.",
      "Screen for urgent or compounding concerns. Determine whether there is pain, neglect, unsafe housing, caregiver burnout, mental health distress, or isolation making the situation more urgent. If there are safeguarding concerns, abuse, or a medical emergency, route immediately to the correct care or emergency pathway.",
      "Set a clear confidentiality posture. Explain who may need to know about access needs so appropriate accommodations can be made, and ask what information should remain private. Share only the minimum necessary details with leaders, hosts, teachers, or volunteers responsible for accessibility implementation.",
      "Provide pastoral encouragement and scripture with accessibility in mind. Offer prayer, scripture, and support in a way that fits the person's communication style and energy level. Use plain language, allow extra time, and do not pressure the person to mask, overexplain, or attend in ways that are not sustainable.",
      "Route to the right church support and practical adjustments. Coordinate seating, transportation, captions, sensory accommodations, assistive technology, live interpretation, service pacing, or companion support as appropriate. If the issue involves repeated exclusion or policy barriers, involve the responsible ministry leader or elder to make a durable accessibility plan.",
      "Set follow-up cadence and closure conditions. Follow up after accommodations are tried to confirm whether they worked and what needs adjustment. Close the case when access barriers are addressed, the support plan is documented, and the person has a clear contact for future accommodation needs."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "abuse",
      "neglect",
      "mental-health",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Provide a pastoral workflow for people seeking spiritual care while navigating disability, chronic impairment, neurodivergence, accessibility needs, or barriers to participation in church life. This case emphasizes dignity, accommodation, careful listening, practical support, and inclusion without assumptions or pity.",
    "outputExpectations": [
      "Intake notes record the access need, preferred communication style, any caregiver or advocate involvement, and immediate barriers to participation.",
      "Triage notes identify whether the case is routine accommodation, urgent support, or escalation for safety, neglect, or exclusion concerns.",
      "Confidentiality notes document what access information may be shared and with whom for implementation.",
      "Follow-up plan includes the accommodations tried, the next review date, and the leader responsible for sustaining the access plan.",
      "Closure summary confirms that participation is feasible, dignity has been preserved, and future accommodation requests have a clear pathway."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-disaster-community-displacement",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-disaster-community-displacement.md",
    "sourceHash": "13cb1e82e78b172e",
    "title": "Disaster and Community Displacement",
    "description": "Practical workflow for disaster response and community displacement support.",
    "family": "cases",
    "kind": "case",
    "group": "practical-hardship-and-life-stability",
    "groupLabel": "Practical Hardship and Life Stability",
    "caseType": "Disaster and Community Displacement",
    "aliases": [
      "do-spiritual-care-disaster-community-displacement",
      "Disaster and Community Displacement",
      "disaster-community-displacement",
      "spiritual-care-disaster-community-displacement"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "safetyScreen",
      "nextAction",
      "closureReason",
      "ownerId",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm immediate safety and location.",
      "Assess the practical damage and displacement impact.",
      "Connect the person to disaster relief and local resources.",
      "Support immediate stabilization and practical recovery.",
      "Track contact and recovery milestones.",
      "Close or transfer the case with clear handoff."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when a person or family has been affected by a natural disaster, fire, flood, storm, evacuation, infrastructure failure, or community displacement that disrupts shelter, work, school, or daily living. The goal is to verify immediate safety, connect to disaster relief, support practical recovery, and coordinate follow-up until the situation stabilizes or is transferred.",
    "outputExpectations": [
      "A documented safety and location assessment with the current displacement status.",
      "Referrals or direct connections made to disaster relief and recovery resources.",
      "Immediate practical supports arranged for shelter, food, communication, or transportation.",
      "A follow-up plan with milestones for recovery and reassessment.",
      "A closeout or transfer decision based on safety, stabilization, and remaining needs."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-discipleship",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-discipleship.md",
    "sourceHash": "35a236a16b682b2a",
    "title": "Discipleship Care",
    "description": "Ongoing discipleship workflow for spiritual growth, obedience, and formation",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Discipleship Care",
    "aliases": [
      "do-spiritual-care-discipleship",
      "Discipleship Care",
      "discipleship",
      "spiritual-care-discipleship"
    ],
    "defaultPriority": "low",
    "defaultUrgency": "ongoing",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Clarify the growth goal and gather a focused discipleship intake.",
      "Discern whether the person needs discipleship, recovery support, or another lane.",
      "Create a structured growth pathway with one or two clear aims.",
      "Establish accountability and confidentiality boundaries.",
      "Set a follow-up cadence that matches the season of formation.",
      "Close when the person has a sustainable discipleship rhythm."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when someone wants intentional growth in Christ, deeper obedience, spiritual habits, accountability, or help taking the next step in maturity. This lane is for believers who are ready for structured formation and may include Bible study, prayer habits, confession, service, and mentoring.\n\nKeep the work discreet and pastoral. Share only the minimum information with mentors or leaders needed to support growth, and do not expose sensitive details unnecessarily. If the person’s struggle becomes clinical, abusive, or crisis-related, route out of this case immediately.",
    "outputExpectations": [
      "A concise discipleship intake summary with the growth goal, current habits, and any relevant sensitivities.",
      "A routing note showing whether the person stays in discipleship or needs another care lane.",
      "A practical growth plan with one or two aims, actions, and accountability ownership.",
      "A follow-up cadence with the next check-in date and the main focus for review.",
      "A closure note confirming stability, ongoing support, and reopening criteria."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-discipleship-growth",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-discipleship-growth.md",
    "sourceHash": "34338ad572630fda",
    "title": "Spiritual Care: Discipleship & Growth",
    "description": "Workflow for New Believer, New Member Integration, Discipleship, Shepherding, and Restoration cases.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Spiritual Care: Discipleship & Growth",
    "aliases": [
      "do-spiritual-care-discipleship-growth",
      "Spiritual Care: Discipleship & Growth",
      "discipleship-growth",
      "spiritual-care-discipleship-growth"
    ],
    "defaultPriority": "low",
    "defaultUrgency": "ongoing",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Identify the exact care type and the person’s stage of spiritual growth.",
      "Choose the correct workflow path for the need.",
      "Set a follow-up pattern that matches the pathway.",
      "Decide what belongs in the care note and what should become a next action.",
      "Use Bible and prayer support that fits the growth stage.",
      "Close the loop with clear next-step ownership."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide for care cases tagged **New Believer**, **New Member Integration**, **Discipleship**, **Shepherding**, or **Restoration**. These cases are usually about spiritual formation, onboarding, belonging, obedience, accountability, and healing after drift or conflict. The goal is to choose the right growth pathway, set simple next steps, and keep the care record focused on discipleship rather than crisis handling unless a separate risk is present.",
    "outputExpectations": [
      "The case is tagged with **New Believer**, **New Member Integration**, **Discipleship**, **Shepherding**, or **Restoration** and routed correctly.",
      "The next discipleship or restoration step is clearly defined with an owner and timeline.",
      "Follow-up cadence matches the stage of growth and does not leave the person without a next contact.",
      "Notes capture the spiritual stage, action items, and any boundaries or accountability needs.",
      "Prayer and Scripture are tailored to formation, belonging, repentance, and renewal."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-elder-care",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-elder-care.md",
    "sourceHash": "04713aff91260687",
    "title": "Elder Care",
    "description": "Spiritual-care workflow for aging adults, caregivers, safety concerns, memory loss, and elder support.",
    "family": "cases",
    "kind": "case",
    "group": "medical-hospital-elder-and-end-of-life-care",
    "groupLabel": "Medical, Hospital, Elder, and End-of-Life Care",
    "caseType": "Elder Care",
    "aliases": [
      "do-spiritual-care-elder-care",
      "Elder Care",
      "elder-care",
      "spiritual-care-elder-care"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Identify who the client is and whether the older adult can speak for themselves.",
      "Ask intake questions that cover health, home safety, and caregiving load.",
      "Keep confidentiality and consent centered on the elder's dignity.",
      "Route the case to practical support and protective services as needed.",
      "Pray and use scripture in a way that honors aging and dependence.",
      "Set a cadence for follow-up and define closure clearly."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "abuse",
      "neglect",
      "exploitation",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when the primary need involves an older adult, a family caregiver, or an aging-related transition such as memory loss, falls, home safety, isolation, loss of independence, or decision-making support.\n\nThis workflow treats older adults as full image-bearers, not as projects. The shepherd should preserve dignity, assess capacity and safety carefully, and support both the elder and the caregiver without confusing the two voices.",
    "outputExpectations": [
      "A clear picture of who the primary client is and whether consent/capacity is intact.",
      "A summary of home, health, and caregiving risks that affect day-to-day safety.",
      "A routing record for medical, protective, social, or church-based support.",
      "A dignity-preserving prayer or scripture note suited to aging, frailty, or caregiver fatigue.",
      "A follow-up plan that checks both elder safety and caregiver sustainability."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-encouragement-check-in",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-encouragement-check-in.md",
    "sourceHash": "a2524fbd3ca9c92c",
    "title": "Spiritual Care: Encouragement Check-In",
    "description": "Pastoral workflow for encouragement check-ins that provide steady contact, discernment, and low-pressure support.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Spiritual Care: Encouragement Check-In",
    "aliases": [
      "do-spiritual-care-encouragement-check-in",
      "Spiritual Care: Encouragement Check-In",
      "encouragement-check-in",
      "spiritual-care-encouragement-check-in"
    ],
    "defaultPriority": "low",
    "defaultUrgency": "ongoing",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Open with relational warmth and a low-pressure tone.",
      "Ask a small set of practical and emotional questions.",
      "Screen for escalation cues without losing the encouragement posture.",
      "Provide encouragement that is specific, honest, and practical.",
      "Decide on routing and follow-up cadence.",
      "Close clearly with the next connection point and any handoff."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow for people who do not need crisis intervention but would benefit from a brief pastoral check-in, encouragement, and prayerful presence. This is common after a hard season, between visits, after a handoff, or when someone is drifting and needs gentle reconnection.\n\nThe goal is to check on wellbeing, encourage without fixing, notice whether the situation has changed, and decide whether the person should remain in routine follow-up, move to another care path, or close out.",
    "outputExpectations": [
      "A brief check-in summary describing the person’s current emotional and spiritual state.",
      "Notes on any escalation cues identified and whether triage or referral was triggered.",
      "The encouragement offered, including any Scripture or prayer posture used.",
      "A follow-up plan with cadence, owner, and expected method of contact.",
      "A closure note stating whether the case remains open, transitions, or closes with consent."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-family",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-family.md",
    "sourceHash": "c0aca6f2addbb34d",
    "title": "Family Care Workflow",
    "description": "Shepherding workflow for family-system concerns, parenting stress, and relational repair.",
    "family": "cases",
    "kind": "case",
    "group": "grief-pregnancy-and-family-systems",
    "groupLabel": "Grief, Pregnancy, and Family Systems",
    "caseType": "Family Care Workflow",
    "aliases": [
      "do-spiritual-care-family",
      "Family Care Workflow",
      "family",
      "spiritual-care-family"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Map the family system before giving advice.",
      "Screen for child safety, abuse, and urgent relational danger.",
      "Set confidentiality boundaries appropriate to age and authority.",
      "Route by family need, not by the loudest voice in the room.",
      "Offer a pastoral posture that blesses the household and strengthens formation.",
      "Close only when the household has a workable plan and stable support."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "suicidal",
      "violence",
      "abuse",
      "domestic-violence",
      "neglect"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when the primary need is family-system support: parent-child conflict, blended family stress, sibling rivalry, caregiving strain, generational tension, household disruption, or discipleship needs affecting the home. The goal is to stabilize the family, protect children and vulnerable adults, clarify roles and boundaries, and route the household to trained pastoral care leaders or safety resources when needed.",
    "outputExpectations": [
      "A summary of the family structure, the main presenting issue, and the people most affected.",
      "Safety screening notes for children or vulnerable adults, including any reporting or crisis escalation.",
      "The confidentiality and communication plan across parents, children, and caregivers.",
      "The assigned route, named pastoral care leader, and any counseling, youth, or safety referrals.",
      "Follow-up cadence, household action steps, and closure or handoff notes."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-family-estrangement-reconciliation",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-family-estrangement-reconciliation.md",
    "sourceHash": "3859ae17f82e07ab",
    "title": "Family Estrangement and Reconciliation",
    "description": "Pastoral workflow for family estrangement, reconciliation discernment, and boundary-aware care.",
    "family": "cases",
    "kind": "case",
    "group": "grief-pregnancy-and-family-systems",
    "groupLabel": "Grief, Pregnancy, and Family Systems",
    "caseType": "Family Estrangement and Reconciliation",
    "aliases": [
      "do-spiritual-care-family-estrangement-reconciliation",
      "Family Estrangement and Reconciliation",
      "family-estrangement-reconciliation",
      "spiritual-care-family-estrangement-reconciliation"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Check for safety and boundary concerns first. Ask whether any contact would be unsafe, whether there is harassment, threats, manipulation, substance abuse, or a history of violence, and whether children or vulnerable adults are affected. If the answer suggests risk, do not move toward direct reconciliation planning until safety is addressed.",
      "Clarify who is estranged and what the current distance looks like. Ask questions such as: “Who is involved?”, “How long has there been distance?”, “What prompted the separation?”, “What contact, if any, is currently happening?”, “What boundaries have been set?”, and “What outcome are you hoping for?” Document each person’s perspective separately if needed and avoid blending accounts.",
      "Explain confidentiality and the limits of shared stories. Let the person know that pastoral conversations are held in confidence, but the team may need to consult when safety, abuse, or vulnerable people are involved. If more than one relative is speaking with the team, do not carry secret messages or hidden agendas that undermine trust, unless a pastorally appropriate and safe process has been agreed upon.",
      "Discern whether the next step is reconciliation, boundary maintenance, or grief care. Route to reconciliation work only if there is some openness on both sides and no current safety barrier. Route to family care if the goal is communication, event planning, or coexisting with boundaries. Route to grief/loss care if the primary need is mourning what cannot be repaired right now. Encourage slow, concrete steps rather than demands for immediate contact.",
      "Offer scripture and prayer that support wisdom and humility. Use scriptures about peacemaking, patience, reconciliation where possible, honest speech, and God’s care for the wounded. Avoid verses that flatten harm or demand reunion without repentance and safety. Pray for discernment, soft hearts, truthful words, wise boundaries, and the grace to accept partial or delayed healing.",
      "Set follow-up cadence and closure conditions. Schedule a follow-up within 1 to 2 weeks when reconnection is being explored, or within 3 to 4 weeks when the main work is processing grief and boundaries. Close the case when the person has a clear and safe plan, understands the limits of what pastoral care can accomplish, and knows what would warrant reopening the case. Keep it open if contact attempts, family reactions, or safety concerns are still unfolding."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "violence",
      "threat",
      "abuse",
      "harassment"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when extended family, siblings, parents, adult children, or other relatives are separated by conflict, silence, hurt, boundaries, or repeated disappointment and are considering reconnection. The aim is to provide careful pastoral support that honors truth, protects safety, and distinguishes healthy reconciliation from pressure, enmeshment, or premature contact.\n\nThis case often includes grief, loyalty conflict, unresolved trauma, and differing stories of the past. Keep the care centered on what is actually known, what is hoped for, and what boundaries are necessary. If there is abuse, coercive control, stalking, or child safety risk, route immediately to the safety workflow rather than trying to force reconciliation.",
    "outputExpectations": [
      "A non-assumptive summary that identifies the family members involved, the level of contact, and the stated goals for care.",
      "Notes on any safety issues, boundary limits, or reasons reconciliation should be slowed, deferred, or redirected.",
      "A routing decision that distinguishes reconciliation support from boundary maintenance, grief care, or safety escalation.",
      "A follow-up plan with a specific timeframe, communication plan, and any agreed boundaries for contact or mediation.",
      "A closing note that captures scripture/prayer posture, confidentiality limits, and conditions for reopening the case."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-financial",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-financial.md",
    "sourceHash": "b768040b9676589b",
    "title": "Financial Spiritual Care",
    "description": "Pastoral and practical workflow for financial hardship, benevolence, debt, and stability planning.",
    "family": "cases",
    "kind": "case",
    "group": "practical-hardship-and-life-stability",
    "groupLabel": "Practical Hardship and Life Stability",
    "caseType": "Financial Spiritual Care",
    "aliases": [
      "do-spiritual-care-financial",
      "Financial Spiritual Care",
      "financial",
      "spiritual-care-financial"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the exact financial problem and the deadline.",
      "Triage the case by survival risk and urgency.",
      "Protect confidentiality and document financial information carefully.",
      "Route to the right support path.",
      "Offer practical help, scripture, and prayer that match the need.",
      "Set follow-up, handoff notes, and closure conditions."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "abuse",
      "exploitation",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow for **Financial** care cases when the core issue is bills, debt, income loss, food insecurity, rent pressure, utilities, budgeting, or benevolence requests. The goal is to respond with dignity, discern the actual urgency, protect sensitive financial information, and connect the person to practical help, spiritual support, and any appropriate follow-up plan. This is not a promise of aid; it is a process for deciding whether the church can help directly, should refer out, or should combine pastoral care with practical support.\n\nThe shepherding posture should be calm, non-shaming, specific, and realistic. Financial strain often overlaps with shame, marital stress, parenting stress, legal pressure, and survival risk, so the care plan should address both the immediate need and the longer-term path toward stability and restoration.",
    "outputExpectations": [
      "The case is tagged **Financial** and the urgency level reflects the real deadline or survival risk.",
      "Intake notes identify the expense, amount, due date, and any immediate consequence in clear language.",
      "Confidentiality is tight, with consent documented for any contact beyond the care team.",
      "The routing decision names any benevolence review, coaching, employment help, or outside referral that was made.",
      "The closure note includes the follow-up cadence, scripture and prayer posture, practical aid provided or declined, and the owner for the next step."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-follow-up",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-follow-up.md",
    "sourceHash": "737e60c0ac0d0b53",
    "title": "Follow-Up",
    "description": "Shepherding workflow for follow-up care after an earlier conversation, prayer request, referral, or intervention.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Follow-Up",
    "aliases": [
      "do-spiritual-care-follow-up",
      "Follow-Up",
      "follow-up",
      "spiritual-care-follow-up"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Open by naming the prior thread and asking for consent to continue.",
      "Clarify whether this is true follow-up or a new primary issue.",
      "Reassess confidentiality and safety without sounding repetitive.",
      "Summarize what has changed and offer a next faithful step.",
      "Set the follow-up cadence based on the current need.",
      "Close the loop cleanly once the plan is stable."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "safety",
      "self-harm",
      "abuse"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when the main purpose is to check in after a prior spiritual-care interaction, confirm how someone is doing, or continue an already-open shepherding thread. This is the “don’t drop the ball” workflow: it keeps the team attentive, concise, and responsive without re-litigating the whole history.\n\nPrimary goals:\n- Reconnect with the person in a way that feels caring, not surveilling.\n- Identify what has changed since the last contact and whether the original care plan still fits.\n- Catch new risk, new needs, or unresolved concerns early.\n- Close the loop cleanly when the issue is stabilized or handed off.",
    "outputExpectations": [
      "A follow-up summary that identifies the prior thread and the current status.",
      "A determination of whether the conversation remains follow-up or must be reclassified.",
      "A safety and confidentiality note if new risk or privacy concerns surfaced.",
      "A follow-up cadence with owner, timing, and any contact boundaries.",
      "A closure note that clearly states whether the case is complete, handed off, or still open."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-food-insecurity-transportation-utilities",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-food-insecurity-transportation-utilities.md",
    "sourceHash": "a894c563b2ceafdf",
    "title": "Food Insecurity, Transportation, and Utilities",
    "description": "Practical workflow for food, transportation, and utility insecurity support.",
    "family": "cases",
    "kind": "case",
    "group": "practical-hardship-and-life-stability",
    "groupLabel": "Practical Hardship and Life Stability",
    "caseType": "Food Insecurity, Transportation, and Utilities",
    "aliases": [
      "do-spiritual-care-food-insecurity-transportation-utilities",
      "Food Insecurity, Transportation, and Utilities",
      "food-insecurity-transportation-utilities",
      "spiritual-care-food-insecurity-transportation-utilities"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Identify the most urgent basic need.",
      "Clarify the scope of the shortage.",
      "Route the person to the right assistance.",
      "Arrange practical short-term support.",
      "Record actions and schedule follow-up.",
      "Close or transfer the case when appropriate."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "threat",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when a person cannot reliably afford food, transportation, electricity, water, heat, gas, or other essential living supports. This workflow is designed to quickly identify the most urgent gap, connect the person to aid, reduce practical barriers, and determine whether the case should close or move to another team.",
    "outputExpectations": [
      "A clear record of the primary unmet basic need and urgency level.",
      "Referrals or direct support arranged for food, transportation, or utilities.",
      "Practical assistance completed to reduce immediate hardship.",
      "A follow-up date with ownership and verification of next steps.",
      "A closure or transfer decision based on sustainability and risk."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-gender-identity-sexuality",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-gender-identity-sexuality.md",
    "sourceHash": "c91e61378a45fddb",
    "title": "Gender Identity & Sexuality",
    "description": "Shepherding workflow for gender identity and sexuality conversations that centers dignity, safety, and careful routing.",
    "family": "cases",
    "kind": "case",
    "group": "identity-leadership-mission-and-accessibility",
    "groupLabel": "Identity, Leadership, Mission, and Accessibility",
    "caseType": "Gender Identity & Sexuality",
    "aliases": [
      "do-spiritual-care-gender-identity-sexuality",
      "Gender Identity & Sexuality",
      "gender-identity-sexuality",
      "spiritual-care-gender-identity-sexuality"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Receive the story using the person’s language first.",
      "Clarify the actual care need before choosing a route.",
      "Assess confidentiality posture and safety cues before going deeper.",
      "Respond with careful, non-assumptive pastoral language.",
      "Route the case to the right shepherding owner and set follow-up cadence.",
      "Close only when the care plan is clear and the person is not left hanging."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "threat",
      "abuse",
      "exploitation",
      "mental-health",
      "mandated-reporting"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when a person is seeking support around gender identity, sexuality, attraction, celibacy, disclosure, family response, identity language, shame, or questions about how faith and lived experience intersect. This workflow should be marked by dignity, careful wording, non-assumptive care, and a refusal to force a premature label.\n\nPrimary goals:\n- Hear the person in their own words without assuming orientation, identity, behavior, relationship status, or theological conclusions.\n- Distinguish a pastoral conversation from a crisis, abuse, or mental-health safety issue.\n- Route the care to the right shepherding lane without inventing unnecessary sub-workflows.\n- Offer prayer and Scripture only with consent and with a posture of gentleness, not debate or pressure.",
    "outputExpectations": [
      "A documented intake summary using the person’s own language and any requested privacy boundaries.",
      "A clear triage decision showing whether the case stays here or routes to another care type.",
      "A confidentiality note that states the sharing limits and any safety-related escalation.",
      "A follow-up plan with owner, cadence, and preferred contact method if known.",
      "A closing note or referral note that reflects dignity, non-assumptive care, and Scripture/prayer posture when used."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-general",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-general.md",
    "sourceHash": "8036796d157ac7b8",
    "title": "Spiritual Care: General",
    "description": "Workflow for Prayer Request, Follow-Up, Life Milestone, and Other spiritual care cases.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Spiritual Care: General",
    "aliases": [
      "do-spiritual-care-general",
      "Spiritual Care: General",
      "general",
      "spiritual-care-general"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "ownerId",
      "nextAction",
      "closureReason",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the exact care type and make sure general is the right bucket.",
      "Decide what kind of response the person needs.",
      "Set the follow-up pattern based on the request type.",
      "Keep notes simple, accurate, and usable later.",
      "Offer Bible and prayer support when it fits the request.",
      "Close the case or route it onward with clarity."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide for care cases tagged **Prayer Request**, **Follow-Up**, **Life Milestone**, or **Other** when the need does not clearly belong in a more specific care type. The goal is to quickly identify the actual request, decide whether it should remain general or be recategorized, and respond with practical communication, prayer, and clear next steps.",
    "outputExpectations": [
      "The case is tagged with **Prayer Request**, **Follow-Up**, **Life Milestone**, or **Other** and confirmed as the right bucket.",
      "The response chosen matches the need: prayer, callback, blessing, update, or recategorization.",
      "Follow-up ownership and timing are explicit when the case remains open.",
      "Notes are concise, specific, and easy for another leader to pick up later.",
      "Prayer and Scripture support are included when appropriate and aligned to the person’s request."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-grief",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-grief.md",
    "sourceHash": "057cc5f718fc2e16",
    "title": "Grief Care Workflow",
    "description": "Shepherding workflow for grief, mourning, and loss support.",
    "family": "cases",
    "kind": "case",
    "group": "grief-pregnancy-and-family-systems",
    "groupLabel": "Grief, Pregnancy, and Family Systems",
    "caseType": "Grief Care Workflow",
    "aliases": [
      "do-spiritual-care-grief",
      "Grief Care Workflow",
      "grief",
      "spiritual-care-grief"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Receive the story and name the loss clearly.",
      "Screen for urgent risk and grief complications.",
      "Set a confidentiality posture and clarify who needs to know.",
      "Route according to grief type, family impact, and level of need.",
      "Provide a compassionate follow-up cadence and spiritual posture.",
      "Close only when support is stable and handoff is complete."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "threat",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when someone is grieving a death, a major loss, or anticipatory sorrow that is disrupting daily life, relationships, or faith. This case is for pastoral accompaniment, not clinical diagnosis. The goal is to offer steady presence, assess safety, identify family-system impacts, and route the person to the right level of pastoral care, group support, or professional help.",
    "outputExpectations": [
      "A brief summary of the loss, the person’s current functioning, and the family-system context.",
      "Documented risk screening results, including any safety concerns or crisis escalations.",
      "The assigned route, named pastoral care leader, and any professional referrals or support groups.",
      "The planned follow-up cadence with dates or intervals and any practical support commitments.",
      "Closure notes or handoff notes that show whether the case is stable, ongoing, or escalated."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-grief-loss",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-grief-loss.md",
    "sourceHash": "0fed3104b37d5e80",
    "title": "Grief & Loss Spiritual Care",
    "description": "Shepherd grief and pregnancy or infant loss cases with compassionate presence, clear routing, and patient follow-up.",
    "family": "cases",
    "kind": "case",
    "group": "grief-pregnancy-and-family-systems",
    "groupLabel": "Grief, Pregnancy, and Family Systems",
    "caseType": "Grief & Loss Spiritual Care",
    "aliases": [
      "do-spiritual-care-grief-loss",
      "Grief & Loss Spiritual Care",
      "grief-loss",
      "spiritual-care-grief-loss"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "confidentiality",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason",
      "presentingNeed"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the exact care type and loss context: determine whether this is Grief or Pregnancy & Infant Loss, and note whether the loss is recent, expected, sudden, public, private, or connected to trauma.",
      "Lead with presence and validation by naming the loss carefully, making room for lament, avoiding rushed explanations, and following the person’s pace for prayer, scripture, or silence.",
      "Route according to the shape of the loss: connect to chaplaincy or hospital support for recent medical loss, funeral or memorial support for death-related grief, grief counseling for complicated or prolonged grief, and pastoral leadership for sensitive family dynamics.",
      "Identify the main risks early, including isolation, shame, spiritual numbness, blame, postpartum or medical complications, and unresolved trauma, then document any warning signs that require additional support.",
      "Offer a clear follow-up rhythm based on the timeline: initial outreach within 24-72 hours, continued check-ins through the first weeks and 90 days, and anniversary support when appropriate.",
      "Close only when the person has an identified support network, the next contact or referral is scheduled, the scripture anchor has been offered in a life-giving way, and no unresolved urgent risk remains."
    ],
    "followUpCadence": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "overdueRule": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This playbook covers the exact care types:\n\n- Grief\n- Pregnancy & Infant Loss\n\nUse it when sorrow, death, miscarriage, stillbirth, infant loss, or anticipatory grief is affecting the person or family. The pastoral posture is gentle, reverent, patient, and validating, with room for silence, tears, lament, and hope without forcing resolution. Main risks include isolation, complicated grief, trauma reactions, spiritual despair, shame, and the risk of minimizing pregnancy or infant loss. Routing decisions should include funeral or memorial support, chaplaincy when the loss is recent or medical, grief counseling for prolonged or complicated grief, and pastoral leadership when the story is layered or fragile. Typical timeline is immediate care in the first 24-72 hours, active support through the first weeks and first 90 days, and longer check-ins across anniversaries and milestones. Scripture anchors are Psalm 34:18, Matthew 5:4, John 11:35, 1 Thessalonians 4:13-14, and Romans 8:38-39. Closure criteria require that the person has been seen, named, and supported, that the next care owner is clear, and that longer-term grief support is either scheduled or intentionally declined.",
    "outputExpectations": [
      "The case record names the exact care type, the kind of loss, and the timing of the first outreach.",
      "The pastoral posture is documented as gentle, validating, patient, and willing to sit with sorrow without rushing it.",
      "The routing decision is explicit and includes any chaplaincy, funeral, counseling, or pastoral handoff that was made.",
      "The timeline shows both the immediate response and the longer grief follow-up window, including anniversaries when needed.",
      "The closure note includes the scripture anchor, the support network, any remaining risks, and the next owner or contact point."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-hospital-visit",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-hospital-visit.md",
    "sourceHash": "73ff20fae7902f98",
    "title": "Hospital Visit",
    "description": "Spiritual-care workflow for hospital bedside visits, inpatient support, and discharge transitions.",
    "family": "cases",
    "kind": "case",
    "group": "medical-hospital-elder-and-end-of-life-care",
    "groupLabel": "Medical, Hospital, Elder, and End-of-Life Care",
    "caseType": "Hospital Visit",
    "aliases": [
      "do-spiritual-care-hospital-visit",
      "Hospital Visit",
      "hospital-visit",
      "spiritual-care-hospital-visit"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "nextAction",
      "dueDate",
      "closureReason",
      "ownerId"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the setting, the patient's consent, and the visit goal.",
      "Ask focused intake questions that respect the medical environment.",
      "Keep confidentiality and hospital etiquette tight.",
      "Route the care to the right hospital or community resource.",
      "Use brief scripture and prayer that match the person's condition.",
      "Set the follow-up cadence and closure point before leaving."
    ],
    "followUpCadence": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "overdueRule": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "escalationTriggers": [
      "crisis",
      "mental-health",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when someone is in the hospital, emergency department, observation unit, or short-term inpatient care and needs spiritual presence, coordinated support, or help navigating the next steps of care.\n\nThis workflow helps the shepherd stay appropriately grounded in the realities of the hospital setting: permission, privacy, medical urgency, family dynamics, and the limits of what a visitor can do. The aim is to provide peaceful presence, useful coordination, and a clean handoff to the next stage of care.",
    "outputExpectations": [
      "A visit summary that records consent, location, bedside goal, and the most important concern.",
      "A clear handoff to hospital staff, chaplaincy, social work, or discharge support when needed.",
      "A privacy-safe note that avoids oversharing medical details or family conflict.",
      "A prayer or presence note that reflects the patient's condition and spiritual readiness.",
      "A follow-up plan tied to admission status, procedure timing, or discharge date."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-housing-insecurity-homelessness",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-housing-insecurity-homelessness.md",
    "sourceHash": "07b47428250b2625",
    "title": "Housing Insecurity and Homelessness",
    "description": "Practical workflow for responding to housing insecurity and homelessness.",
    "family": "cases",
    "kind": "case",
    "group": "practical-hardship-and-life-stability",
    "groupLabel": "Practical Hardship and Life Stability",
    "caseType": "Housing Insecurity and Homelessness",
    "aliases": [
      "do-spiritual-care-housing-insecurity-homelessness",
      "Housing Insecurity and Homelessness",
      "housing-insecurity-homelessness",
      "spiritual-care-housing-insecurity-homelessness"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "closureReason",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Assess immediate safety and urgency.",
      "Clarify the housing situation and practical barriers.",
      "Route the person to shelter, housing, and public support.",
      "Provide immediate practical help while longer-term options are explored.",
      "Create a follow-up plan and document the case.",
      "Close or transfer the case at the appropriate point."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "suicidal",
      "violence",
      "abuse",
      "exploitation",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when a person is at risk of losing housing, is currently unhoused, is staying in unsafe temporary arrangements, or needs help moving from crisis to stable shelter and next-step support. The goal is to stabilize the immediate situation, connect the person to shelter and housing resources, manage practical barriers, and determine when the case should close or be transferred.",
    "outputExpectations": [
      "A clear record of the housing situation, urgency, and current sleeping plan.",
      "Referrals or direct connections made to shelter, housing navigation, legal aid, or emergency assistance.",
      "Practical support arranged for immediate stability and barrier reduction.",
      "A documented follow-up date with owner and next action.",
      "A closeout or transfer decision based on safety, stability, and ongoing need."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-immigration-deportation",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-immigration-deportation.md",
    "sourceHash": "5a5537f14ac2cfb5",
    "title": "Immigration & Deportation Spiritual Care",
    "description": "Pastoral and practical workflow for immigration stress, detention, deportation risk, and family protection.",
    "family": "cases",
    "kind": "case",
    "group": "identity-leadership-mission-and-accessibility",
    "groupLabel": "Identity, Leadership, Mission, and Accessibility",
    "caseType": "Immigration & Deportation Spiritual Care",
    "aliases": [
      "do-spiritual-care-immigration-deportation",
      "Immigration & Deportation Spiritual Care",
      "immigration-deportation",
      "spiritual-care-immigration-deportation"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the exact immigration situation and any deadline.",
      "Triage for detention, deportation, separation, or safety risk.",
      "Protect confidentiality and control the flow of information.",
      "Route to qualified and practical support.",
      "Offer scripture, prayer, and pastoral presence with restraint.",
      "Set follow-up, create handoff notes, and close only when the next step is secure."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "violence",
      "threat",
      "abuse",
      "mental-health",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow for **Immigration / Deportation** care cases when the person is facing immigration deadlines, detention, deportation risk, asylum or visa uncertainty, family separation, relocation, or fear connected to legal status. The goal is to respond with dignity, protect confidentiality, route to qualified legal help, and provide prayerful and practical support without pretending the church can give legal advice. Immigration cases can be emotionally fragile and time-sensitive, so the care plan must be careful, calm, and fast when deadlines are involved.\n\nThe pastoral posture should be respectful, steady, and non-assumptive. Avoid shame, fear-based language, or casual discussion of status. Keep the focus on safety, next steps, and family care.",
    "outputExpectations": [
      "The case is tagged **Immigration / Deportation** and the urgency reflects any deadline, detention, or family-separation risk.",
      "Intake notes record the immediate legal or practical problem, the relevant deadline, and the person’s safe-contact preferences.",
      "Confidentiality is restricted, with consent required before involving family, pastors, or volunteers.",
      "The routing decision names the legal referral, practical aid, or family coordination step that was taken.",
      "The closure note includes the follow-up plan, scripture and prayer posture, remaining risk, and the person responsible for continued care."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-incarceration-reentry",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-incarceration-reentry.md",
    "sourceHash": "ef36b833334e45ae",
    "title": "Incarceration & Re-Entry Spiritual Care",
    "description": "Pastoral and practical workflow for incarceration, release planning, and re-entry support.",
    "family": "cases",
    "kind": "case",
    "group": "identity-leadership-mission-and-accessibility",
    "groupLabel": "Identity, Leadership, Mission, and Accessibility",
    "caseType": "Incarceration & Re-Entry Spiritual Care",
    "aliases": [
      "do-spiritual-care-incarceration-reentry",
      "Incarceration & Re-Entry Spiritual Care",
      "incarceration-reentry",
      "spiritual-care-incarceration-reentry"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the exact incarceration or re-entry stage and the first urgent need.",
      "Triage for immediate survival, safety, or legal pressure.",
      "Protect confidentiality and coordinate carefully.",
      "Route to the right support lanes.",
      "Offer scripture, prayer, and restoration language that strengthens hope.",
      "Set follow-up cadence, write handoff notes, and close only when stability is real."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "safety",
      "self-harm",
      "violence",
      "threat"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow for **Incarceration & Re-Entry** care cases when the person is detained, incarcerated, recently released, preparing for release, or trying to rebuild life after jail or prison. The goal is to respond with dignity, provide spiritual care, coordinate practical help, and build a stable re-entry plan that supports family, housing, employment, accountability, and discipleship. Re-entry is often a high-risk transition, so the care team should move quickly, keep details confidential, and avoid leaving the person to navigate the first days alone.\n\nThe pastoral posture should be hopeful, grounded, and restoration-oriented. Treat the person as a full image-bearer, not just a record or a risk, while still taking legal conditions and safety concerns seriously.",
    "outputExpectations": [
      "The case is tagged **Incarceration & Re-Entry** and the urgency reflects release timing or stability risk.",
      "Intake notes identify the current location, next transition point, and the first urgent re-entry need.",
      "Confidentiality is restricted and safe-contact rules are recorded before any outreach.",
      "The routing decision names any chaplaincy, re-entry, benevolence, housing, legal, or discipleship handoff that was made.",
      "The closure note includes the follow-up cadence, scripture and prayer posture, remaining risks, and the next owner for continued care."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-infidelity-betrayal",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-infidelity-betrayal.md",
    "sourceHash": "00492f2855d60fc3",
    "title": "Infidelity and Betrayal",
    "description": "Pastoral workflow for infidelity, betrayal, disclosure, and trust repair care.",
    "family": "cases",
    "kind": "case",
    "group": "grief-pregnancy-and-family-systems",
    "groupLabel": "Grief, Pregnancy, and Family Systems",
    "caseType": "Infidelity and Betrayal",
    "aliases": [
      "do-spiritual-care-infidelity-betrayal",
      "Infidelity and Betrayal",
      "infidelity-betrayal",
      "spiritual-care-infidelity-betrayal"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Assess immediate emotional and physical safety. Ask whether either person feels unsafe, whether there have been threats, weapon access, stalking, self-harm thoughts, or volatile reactions since disclosure. Determine whether it is safe to continue together or whether separate conversations are needed. Escalate immediately if any danger is present.",
      "Gather a clear but limited account. Ask questions such as: “What was discovered or disclosed?”, “When did each person learn about it?”, “What has happened since?”, “Are there repeated patterns or one-time events?”, and “What boundaries are currently in place?” Avoid pressuring for graphic details. Record only what is necessary for care, accountability, and routing.",
      "Explain confidentiality and consultation boundaries. State that the conversation is held in confidence within the pastoral team as appropriate, but safety issues, abuse, or child protection concerns may require consultation or escalation. When both spouses are present, be clear that the goal is not secrecy but truthful, safe care that does not collude with deception.",
      "Discern the care path and accountability needs. Route to marriage care if both partners want structured repair and there is a willingness to engage honestly. Route to counseling or therapeutic support if trauma, compulsive behavior, or repeated betrayal patterns are present. Route to safety escalation if there is coercion, intimidation, retaliation, or danger. If repentance, disclosure, or boundaries are being discussed, encourage specific, observable actions rather than vague promises.",
      "Use scripture and prayer to support truth, repentance, and healing. Choose scriptures that emphasize honesty, mercy, clean hearts, wisdom, and God’s presence with the wounded. Avoid quick forgiveness language or verses used to shut down grief. Pray for truth, protection, steadfastness, humility, wise counsel, and the ability to take one faithful step at a time. If one or both parties are overwhelmed, offer a short prayer and end with clear next steps.",
      "Set follow-up cadence and closure conditions. Arrange a follow-up within 48 to 72 hours if disclosure is fresh or emotions are volatile, or within 1 week if the situation is stable and both parties have support. Close only when immediate danger is addressed, support is in place, next accountability steps are clear, and the person knows how to return if new disclosures or risks emerge. If trust repair is ongoing, keep the case open with specific milestones."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "self-harm",
      "violence",
      "threat",
      "abuse"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when a person or couple is dealing with infidelity, secrecy, betrayal, emotional affairs, pornography-related breach of trust, or other forms of relational unfaithfulness that have damaged confidence and safety. The aim is to create a careful, truthful, and non-pressuring pastoral process that makes space for grief, accountability, discernment, and wise next steps.\n\nThis case requires special attention to shame, rage, manipulation, and risk of escalation. Stay grounded in facts, avoid investigative curiosity, and do not assume what happened beyond what is clearly reported. If there is violence, threats, self-harm, stalking, coercive control, or child endangerment, move immediately to the appropriate safety workflow.",
    "outputExpectations": [
      "A factual summary of the betrayal issue, using reported information only and avoiding speculation or moralizing language.",
      "A safety note covering threats, coercion, self-harm, violence, or other escalation cues if present.",
      "A routing decision that names the next support path, such as marriage care, counseling, safety escalation, or therapeutic referral.",
      "A documented accountability and follow-up plan with concrete actions, timeline, and responsible person.",
      "A closing note that includes scripture/prayer posture, confidentiality limits, and the condition for reopening or escalating the case."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-leadership-failure-moral-failure",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-leadership-failure-moral-failure.md",
    "sourceHash": "b13979482e3cc084",
    "title": "Leadership Failure / Moral Failure",
    "description": "Spiritual care workflow for leaders facing moral failure, disqualification questions, repentance, accountability, and restoration discernment.",
    "family": "cases",
    "kind": "case",
    "group": "identity-leadership-mission-and-accessibility",
    "groupLabel": "Identity, Leadership, Mission, and Accessibility",
    "caseType": "Leadership Failure / Moral Failure",
    "aliases": [
      "do-spiritual-care-leadership-failure-moral-failure",
      "Leadership Failure / Moral Failure",
      "leadership-failure-moral-failure",
      "spiritual-care-leadership-failure-moral-failure"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "closureReason",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Collect the facts with restraint and clarity. Ask what happened, who is affected, whether the issue involves abuse, exploitation, financial misconduct, sexual misconduct, substance misuse, deception, or public scandal, and whether there is any immediate risk to others. Avoid speculation, rumor spreading, or counseling around an unverified narrative.",
      "Triage for safety, authority, and reporting obligations. If there are minors, vulnerable adults, criminal behavior, coercion, or active danger, escalate immediately to safeguarding, legal, or emergency channels as required. Remove the person from ministry responsibility during investigation if policy or wisdom requires it.",
      "Set confidentiality boundaries and accountability structure. State clearly that confidentiality is limited by safety, legal duty, and church accountability. Identify who must know, who should know, and who should not be informed. Ensure there is an appropriate overseer, elder, or ministry supervisor assigned to the case instead of informal side conversations.",
      "Guide toward repentance, confession, and truthful repair. Use scripture and prayer with a posture of seriousness, humility, and hope. Encourage confession to the right parties, cessation of harmful behavior, acceptance of consequences, and willingness to participate in accountability, counseling, restitution, or disciplinary processes.",
      "Route carefully between restoration and non-restoration. Distinguish spiritual care for the person from reinstatement to leadership. Restoration of character and relationship may occur without restoration to office. Refer to church policy, elder review, or denominational process before making any promises about future ministry roles.",
      "Plan follow-up and determine closure conditions. Schedule close follow-up at first, with documented accountability checkpoints, then move to less frequent care only if stability, honesty, and compliance are evident. Close the case when investigative steps are complete, protections are in place, and the person has an approved ongoing care path that does not compromise the church or those harmed."
    ],
    "followUpCadence": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "overdueRule": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "escalationTriggers": [
      "safety",
      "abuse",
      "exploitation",
      "leadership-failure",
      "moral-failure",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Provide a pastoral workflow for cases where a leader, minister, volunteer, or public-facing servant has experienced moral failure, compromised trust, or potential disqualification from leadership. This case centers truth-telling, protection of others, leadership accountability, and careful discernment about repentance, consequences, restoration, and ongoing care.",
    "outputExpectations": [
      "Intake notes summarize the allegation or failure, the people affected, and any immediate safety or reporting concerns.",
      "Triage outcome states whether ministry removal, safeguarding escalation, legal reporting, or restorative care is required.",
      "Confidentiality notes identify the accountability circle and any limits on distribution of information.",
      "Follow-up plan records repentance steps, accountability partners, counseling or supervision referrals, and review dates.",
      "Closure summary distinguishes clearly between personal pastoral care, restitution, and any leadership status decision."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-life-milestone",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-life-milestone.md",
    "sourceHash": "bbe7765c0a6296c9",
    "title": "Life Milestone",
    "description": "Shepherding workflow for celebrations and transitions tied to major life milestones.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Life Milestone",
    "aliases": [
      "do-spiritual-care-life-milestone",
      "Life Milestone",
      "life-milestone",
      "spiritual-care-life-milestone"
    ],
    "defaultPriority": "low",
    "defaultUrgency": "ongoing",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Identify the milestone and ask how the person wants it handled.",
      "Clarify whether the milestone is purely celebratory or also a transition point needing care.",
      "Apply a confidentiality posture that matches the moment.",
      "Check for hidden triage needs or relational complexity.",
      "Respond with a blessing, prayer, and Scripture posture suited to the milestone.",
      "Set a light follow-up cadence or close with a clean handoff."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "mental-health"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when someone is experiencing a meaningful life event or transition that calls for blessing, encouragement, prayer, or pastoral acknowledgment. Examples can include birth, adoption, marriage, engagement, graduation, relocation, retirement, new employment, baptism, recovery anniversaries, anniversaries, promotions, and other significant threshold moments.\n\nPrimary goals:\n- Celebrate with sincerity without assuming the meaning of the milestone to the person.\n- Distinguish celebration from deeper pastoral needs that may be hiding underneath a transition.\n- Protect privacy around names, dates, photos, family structure, and public announcements.\n- Offer a blessing that matches the moment and does not become a generic congratulation.",
    "outputExpectations": [
      "A milestone summary that records the event, timing, and the person’s preferred level of visibility.",
      "A determination of whether the case stays a life milestone or routes into another care type.",
      "A confidentiality note covering any sharing limits, naming preferences, or public-announcement permissions.",
      "A blessing, prayer, or Scripture note that fits the milestone and the person’s consent.",
      "A follow-up or closure note that states whether more support is planned or the case is complete."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-life-situations",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-life-situations.md",
    "sourceHash": "a7d174529378f031",
    "title": "Spiritual Care: Life Situations",
    "description": "Workflow for Financial, Immigration / Deportation, Incarceration & Re-Entry, and Gender Identity / Sexuality cases.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Spiritual Care: Life Situations",
    "aliases": [
      "do-spiritual-care-life-situations",
      "Spiritual Care: Life Situations",
      "life-situations",
      "spiritual-care-life-situations"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the exact care type and the concrete situation.",
      "Check for immediate risk, deadlines, or legal and safety concerns.",
      "Choose the correct response path for the category.",
      "Set follow-up patterns that match the urgency of the situation.",
      "Use Bible and prayer carefully and appropriately.",
      "Document the situation and any practical next steps clearly."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "safety",
      "self-harm",
      "violence",
      "threat",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide for care cases tagged **Financial**, **Immigration / Deportation**, **Incarceration & Re-Entry**, or **Gender Identity / Sexuality**. These cases often include practical pressure, family strain, fear, identity questions, legal consequences, or major life transitions. The purpose is to discern what kind of care is needed, protect dignity and confidentiality, and connect the person to spiritual support, practical help, and outside resources when appropriate.",
    "outputExpectations": [
      "The case is tagged with **Financial**, **Immigration / Deportation**, **Incarceration & Re-Entry**, or **Gender Identity / Sexuality** and routed correctly.",
      "Immediate risks, deadlines, and referral needs are documented clearly.",
      "Follow-up cadence and ownership are explicit and matched to the urgency.",
      "Prayer and Scripture support are offered carefully, respectfully, and with consent where appropriate.",
      "Notes capture practical next steps, support resources, and any confidentiality or safety boundaries."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-loneliness-isolation",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-loneliness-isolation.md",
    "sourceHash": "531c2cc7f9ae9764",
    "title": "Loneliness and Isolation Care",
    "description": "Pastoral care workflow for chronic loneliness, isolation, and relational disconnection.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Loneliness and Isolation Care",
    "aliases": [
      "do-spiritual-care-loneliness-isolation",
      "Loneliness and Isolation Care",
      "loneliness-isolation",
      "spiritual-care-loneliness-isolation"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Understand the shape of the isolation.",
      "Distinguish solitude from harmful isolation.",
      "Identify one or two safe connection points.",
      "Route to practical and pastoral support.",
      "Create a low-pressure belonging plan.",
      "Follow up consistently without flooding the person.",
      "Close when connection is no longer the immediate need."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "self-harm",
      "abuse"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when someone is persistently lonely, socially isolated, or disconnected from meaningful Christian, family, or community support. The goal is to understand the source of isolation, reduce shame, identify one or two safe relational connections, and create a realistic plan for renewed belonging without overwhelming the person.\n\nHandle the situation discreetly. Share only the minimum necessary information with people who can provide companionship, practical connection, or pastoral support.",
    "outputExpectations": [
      "A concise summary of the loneliness pattern, likely causes, and current severity.",
      "A routing note showing what relational, pastoral, or practical support was activated.",
      "A small belonging plan with one or two safe next steps.",
      "A follow-up cadence with owner and focus.",
      "A closure note confirming the person has a realistic path toward connection."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-marriage",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-marriage.md",
    "sourceHash": "807ea73d41773e53",
    "title": "Marriage Care Workflow",
    "description": "Shepherding workflow for married couples needing pastoral support.",
    "family": "cases",
    "kind": "case",
    "group": "grief-pregnancy-and-family-systems",
    "groupLabel": "Grief, Pregnancy, and Family Systems",
    "caseType": "Marriage Care Workflow",
    "aliases": [
      "do-spiritual-care-marriage",
      "Marriage Care Workflow",
      "marriage",
      "spiritual-care-marriage"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Start with the relationship story and the presenting concern.",
      "Screen carefully for safety, coercion, and hidden harm.",
      "Set a confidentiality posture that protects safety and honesty.",
      "Route the couple based on the severity and type of issue.",
      "Offer a shepherding posture grounded in truth, repentance, and hope.",
      "Close only when next steps are clear and the right care team owns the work."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "violence",
      "threat",
      "abuse"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when a married couple needs pastoral care for conflict, disconnection, transition, betrayal, communication breakdown, or family stress. The goal is to stabilize the relationship, protect any vulnerable family members, screen for abuse or coercion, and route the couple to trained pastoral care leaders, counseling, or safety resources as appropriate.",
    "outputExpectations": [
      "A summary of the presenting marital issue, the impact on children or extended family, and the couple’s stated goals.",
      "Safety screening results, including any abuse, coercion, or crisis concerns and how they were escalated.",
      "The confidentiality and communication plan, especially any limits on secrecy or outside contact.",
      "The assigned route, named pastoral care leader, and any counseling, mentoring, or safety referrals.",
      "Follow-up dates or cadence, plus closure notes showing whether the marriage is stable, ongoing, or escalated."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-medical",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-medical.md",
    "sourceHash": "c7c7da33488724b5",
    "title": "Medical Care",
    "description": "Spiritual-care workflow for non-emergency medical concerns, diagnosis support, chronic illness, and treatment navigation.",
    "family": "cases",
    "kind": "case",
    "group": "medical-hospital-elder-and-end-of-life-care",
    "groupLabel": "Medical, Hospital, Elder, and End-of-Life Care",
    "caseType": "Medical Care",
    "aliases": [
      "do-spiritual-care-medical",
      "Medical Care",
      "medical",
      "spiritual-care-medical"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "restricted",
    "minimumRoleTier": 6,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Clarify the medical situation and rule out urgent escalation.",
      "Gather intake information that helps with practical shepherding.",
      "Set a confidentiality posture that protects medical privacy.",
      "Route the person to the right medical and support resources.",
      "Offer scripture and prayer that support endurance and trust.",
      "Set a realistic follow-up cadence and closure condition."
    ],
    "followUpCadence": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "overdueRule": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "escalationTriggers": [
      "crisis",
      "suicidal",
      "mental-health",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when the primary need is medical but not an immediate emergency: a new diagnosis, ongoing illness, treatment decisions, chronic symptoms, medication concerns, pain, recovery, disability, or anxiety about health.\n\nThe role of the shepherd here is to help the person feel seen, reduce confusion, encourage wise medical follow-through, and support faith without replacing professional care. Medical care cases often involve fear, fatigue, uncertainty, and loss of control, so clarity and consistency matter.",
    "outputExpectations": [
      "A concise summary of the medical concern, its urgency, and any red-flag symptoms.",
      "A routing note showing which provider, clinic, or support service should be involved next.",
      "A confidentiality note that protects sensitive health information and disclosure boundaries.",
      "A prayer and scripture posture that encourages endurance without replacing medical treatment.",
      "A follow-up plan tied to appointments, treatment changes, or symptom progression."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-medical-physical",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-medical-physical.md",
    "sourceHash": "bc47acfe17e6a813",
    "title": "Medical & Physical Spiritual Care",
    "description": "Guide hospital, medical, elder care, and terminal illness cases with steady pastoral support and timely routing.",
    "family": "cases",
    "kind": "case",
    "group": "medical-hospital-elder-and-end-of-life-care",
    "groupLabel": "Medical, Hospital, Elder, and End-of-Life Care",
    "caseType": "Medical & Physical Spiritual Care",
    "aliases": [
      "do-spiritual-care-medical-physical",
      "Medical & Physical Spiritual Care",
      "medical-physical",
      "spiritual-care-medical-physical"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the exact care type and context: determine whether the need is Hospital Visit, Medical, Elder Care, or Terminal Illness / End of Life, and note any immediate medical crisis, admission, discharge, or hospice transition.",
      "Assess the practical and pastoral needs together by identifying who is present, who is making decisions, what the current treatment or care timeline is, and what support the person or family needs right now.",
      "Route to the right support channel: use hospital chaplaincy or bedside ministry for admissions and procedures, medical or hospice professionals for clinical questions, elder-care resources for aging and mobility concerns, and pastoral leadership for prolonged or high-complexity cases.",
      "Offer brief spiritual care that honors suffering without rushing past it; pray with permission, use scripture that strengthens hope and presence, and include caregivers when appropriate without creating pressure or confusion.",
      "Document the main risks, the routing decision, the follow-up schedule, the scripture anchor used, and any boundaries around medical advice so that the record stays clear about what was pastoral and what was clinical.",
      "Close when the person has a stable support plan, the next medical or caregiving milestone is known, the pastoral follow-up cadence is set, and all urgent concerns have been handed to the correct team."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "terminal",
      "end-of-life"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This playbook covers the exact care types:\n\n- Hospital Visit\n- Medical\n- Elder Care\n- Terminal Illness / End of Life\n\nUse it when illness, hospitalization, aging, treatment decisions, or end-of-life realities are shaping the care need. The pastoral posture is steady, compassionate, patient, honoring, and practical, with attention to the person, the caregiver, and the medical context. Main risks include medical uncertainty, caregiver burnout, consent or decision-making confusion, isolation, spiritual fear, and end-of-life urgency. Routing decisions should include hospital chaplaincy, licensed medical or hospice support, elder-care assistance, family coordination, and pastoral leadership when the need is ongoing or complex. Typical timeline is same-day or 72-hour contact for hospital and urgent medical needs, weekly or biweekly follow-up during treatment, and more frequent support in terminal or hospice situations. Scripture anchors are James 5:14-16, Psalm 23, Isaiah 41:10, Matthew 25:36, and 2 Corinthians 1:3-4. Closure criteria require a clear care plan, stable handoffs, a scheduled follow-up rhythm, and confirmation that urgent medical or caregiving questions have been routed appropriately.",
    "outputExpectations": [
      "The case record states the exact care type, the relevant medical or caregiving milestone, and the current urgency.",
      "The pastoral posture is recorded as compassionate, practical, and steady, with attention to both patient and caregiver.",
      "The routing decision is explicit and names any hospital, hospice, elder-care, or pastoral handoff that was made.",
      "The timeline includes same-day or 72-hour contact when needed, plus any ongoing weekly or end-of-life cadence.",
      "The closure note includes the scripture anchor, support plan, remaining risks, and the person responsible for the next follow-up."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-mental-emotional-health",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-mental-emotional-health.md",
    "sourceHash": "f58dba7990f0564a",
    "title": "Spiritual Care: Mental & Emotional Health",
    "description": "Workflow for Mental Health and Counseling spiritual care cases.",
    "family": "cases",
    "kind": "case",
    "group": "addiction-mental-health-and-counseling",
    "groupLabel": "Addiction, Mental Health, and Counseling",
    "caseType": "Spiritual Care: Mental & Emotional Health",
    "aliases": [
      "do-spiritual-care-mental-emotional-health",
      "Spiritual Care: Mental & Emotional Health",
      "mental-emotional-health",
      "spiritual-care-mental-emotional-health"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the exact care type and the emotional health context.",
      "Assess immediate safety and crisis indicators before moving forward.",
      "Decide whether the right response is pastoral care, referral, or both.",
      "Set a follow-up pattern that matches the level of concern.",
      "Use Bible and prayer with care, compassion, and consent.",
      "Write notes that support continuity and protect dignity."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "abuse",
      "mental-health",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide for care cases tagged **Mental Health** or **Counseling**. These cases often include anxiety, depression, trauma, panic, grief reactions, spiritual distress, or a request for professional counseling. The purpose is to help you respond with empathy, discern safety risk, encourage appropriate care, and keep prayer and Scripture aligned with the person’s needs rather than used as a shortcut.",
    "outputExpectations": [
      "The case is tagged with **Mental Health** or **Counseling** and matched to the correct response path.",
      "Safety screening and any escalation or referral decision are clearly documented.",
      "Follow-up timing and communication ownership are explicit.",
      "Prayer and Scripture support are compassionate, consent-based, and not dismissive.",
      "Notes are respectful, concise, and sufficient for continuity of care."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-mental-health",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-mental-health.md",
    "sourceHash": "79dfee7e6128c511",
    "title": "Mental Health Care",
    "description": "Pastoral triage and discreet support workflow for mental health concerns",
    "family": "cases",
    "kind": "case",
    "group": "addiction-mental-health-and-counseling",
    "groupLabel": "Addiction, Mental Health, and Counseling",
    "caseType": "Mental Health Care",
    "aliases": [
      "do-spiritual-care-mental-health",
      "Mental Health Care",
      "mental-health",
      "spiritual-care-mental-health"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Create a calm intake environment and gather only essential information.",
      "Assess for urgent risk and move immediately when necessary.",
      "Route with discernment and preserve privacy.",
      "Offer scripture, prayer, and presence without minimizing suffering.",
      "Establish a follow-up cadence matched to severity.",
      "Close only when stability and support are evident."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "mental-health",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case for depression, anxiety, panic, grief-related distress, burnout, intrusive thoughts, emotional overwhelm, trauma responses, and other mental health concerns that surface in pastoral care. The aim is to listen well, assess safety, protect confidentiality, and connect the person to the right mix of spiritual care, community support, and licensed help when needed.\n\nThis workflow is not a substitute for professional diagnosis or treatment. Protect dignity, keep notes minimal, and escalate immediately when there is any concern about self-harm, harm to others, psychosis, severe impairment, or inability to care for basic needs.",
    "outputExpectations": [
      "A concise intake summary that identifies the primary concern, onset, severity, and stated supports.",
      "A triage decision showing whether the case is pastoral, clinical, crisis, or emergency in nature.",
      "A routing note that protects privacy while connecting the person to the right care owner.",
      "A follow-up plan with cadence, check-in questions, and safety-review triggers.",
      "A closure note confirming stability, support connections, and any re-open criteria."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-ministry-burnout-volunteer-fatigue",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-ministry-burnout-volunteer-fatigue.md",
    "sourceHash": "451def5db7e603c8",
    "title": "Spiritual Care: Ministry Burnout and Volunteer Fatigue",
    "description": "Pastoral workflow for ministry burnout, volunteer fatigue, overcommitment, and sustainable care planning.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Spiritual Care: Ministry Burnout and Volunteer Fatigue",
    "aliases": [
      "do-spiritual-care-ministry-burnout-volunteer-fatigue",
      "Spiritual Care: Ministry Burnout and Volunteer Fatigue",
      "ministry-burnout-volunteer-fatigue",
      "spiritual-care-ministry-burnout-volunteer-fatigue"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Affirm the person’s service and invite an honest assessment of capacity.",
      "Distinguish ordinary tiredness from burnout or deeper distress.",
      "Review role clarity, boundaries, and confidentiality needs.",
      "Offer spiritual care that restores rather than pressures.",
      "Plan a realistic response: rest, reduction, delegation, or role change.",
      "Document the plan and define closure conditions carefully."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "mental-health"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when someone serving in ministry, volunteering, or caring for others is exhausted, emotionally depleted, spiritually dry, resentful, or considering stepping back because the load is no longer sustainable. The purpose is to honor their service, reduce shame, identify whether the issue is burnout or something deeper, and help them move toward rest, resourcing, or a healthier role.\n\nThis workflow should not treat burnout as a failure of faith. It should combine pastoral care, practical boundaries, and clear routing so the person is not left carrying more than they can bear.",
    "outputExpectations": [
      "A summary of the burnout or fatigue pattern, including symptoms, duration, and ministry context.",
      "A triage note indicating whether the concern is simple fatigue, burnout, or a more serious mental health issue.",
      "A confidentiality and routing record identifying who was told, who should follow up, and what role changes were discussed.",
      "A spiritual care note capturing any Scripture, prayer, or rest-oriented encouragement offered.",
      "A written action plan with rest, delegation, follow-up timing, and closure criteria."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-ministry-conflict-volunteer-dispute",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-ministry-conflict-volunteer-dispute.md",
    "sourceHash": "109cccbc78788089",
    "title": "Ministry Conflict / Volunteer Dispute",
    "description": "Spiritual care workflow for ministry conflict, volunteer disputes, team tension, and leadership mediation.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Ministry Conflict / Volunteer Dispute",
    "aliases": [
      "do-spiritual-care-ministry-conflict-volunteer-dispute",
      "Ministry Conflict / Volunteer Dispute",
      "ministry-conflict-volunteer-dispute",
      "spiritual-care-ministry-conflict-volunteer-dispute"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason",
      "memberId"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Hear each side and identify the core issue. Ask who is involved, what happened, how long the conflict has been going on, whether the disagreement is relational, procedural, theological, or behavioral, and whether any power imbalance is present. Capture whether the conflict is public, private, repeated, or harming the ministry team.",
      "Screen for escalation cues and safeguarding concerns. Look for bullying, intimidation, retaliation, gossip, emotional abuse, discrimination, harassment, or conflict involving minors or vulnerable adults. If safety or misconduct is present, move immediately to the appropriate pastoral or safeguarding route rather than treating it as a simple disagreement.",
      "Clarify confidentiality and communication boundaries. Explain that conflict details will be shared only with those necessary to resolve the issue. Discourage triangulation, social-media venting, and side conversations. If leaders, supervisors, or elders need to be involved, state that clearly and limit sharing to what is necessary.",
      "Provide peacemaking guidance anchored in scripture. Encourage direct, truthful, and respectful conversation, repentance where needed, and humility in listening. Pray for wisdom, gentleness, and unity. If a mediated meeting is appropriate, ensure a neutral, responsible leader is present and the expectations are clear.",
      "Route to the right level of oversight. Use informal reconciliation for minor misunderstandings, but move to supervisor, elder, or HR-like oversight when there is repeated conflict, authority misuse, doctrinal disagreement, or impact on team health. Remove someone from direct cooperation temporarily if the environment cannot remain safe or constructive.",
      "Set follow-up cadence and closure conditions. Check in soon after the first mediated step, then after any agreed correction or boundary change. Close the case only when there is a documented resolution, restored working relationship or stable boundary, and no unresolved safety or conduct concerns."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "abuse",
      "harassment"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Provide a pastoral workflow for conflict among volunteers, ministry teams, or leaders serving together. This case emphasizes peacemaking, accountability, healthy communication, and timely escalation when conflict affects trust, safety, or ministry effectiveness.",
    "outputExpectations": [
      "Intake notes describe the people involved, the ministry context, the nature of the conflict, and any power imbalance or safety issue.",
      "Triage notes state whether the case is a simple mediation, leadership escalation, or safeguarding matter.",
      "Confidentiality notes record who was informed, what was shared, and any restrictions on gossip or external discussion.",
      "Follow-up plan includes mediation steps, leader oversight, next review date, and any temporary serving boundaries.",
      "Closure summary confirms whether reconciliation, boundary-setting, reassignment, or disciplinary follow-up was completed."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-missionary-cross-cultural-support",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-missionary-cross-cultural-support.md",
    "sourceHash": "ddbc693cc7a36058",
    "title": "Missionary / Cross-Cultural Support",
    "description": "Spiritual care workflow for missionaries and cross-cultural workers needing support, discernment, and pastoral care.",
    "family": "cases",
    "kind": "case",
    "group": "identity-leadership-mission-and-accessibility",
    "groupLabel": "Identity, Leadership, Mission, and Accessibility",
    "caseType": "Missionary / Cross-Cultural Support",
    "aliases": [
      "do-spiritual-care-missionary-cross-cultural-support",
      "Missionary / Cross-Cultural Support",
      "missionary-cross-cultural-support",
      "spiritual-care-missionary-cross-cultural-support"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Learn the ministry context and current pressures. Ask where the worker is serving, what culture or language context they are in, what support they are requesting, what feels most difficult, and whether there are safety, health, family, visa, or financial concerns affecting the assignment.",
      "Assess urgency, isolation, and security. Screen for burnout, trauma exposure, family distress, persecution, danger, or inability to communicate safely. If there is immediate risk, health crisis, or security concern, involve the appropriate agency, medical support, or emergency channel before continuing with routine pastoral care.",
      "Practice confidentiality with cross-cultural awareness. Clarify who may receive updates: sending pastor, missions director, field supervisor, spouse, or a support team. Do not assume the worker wants broad prayer-chain disclosure. Be mindful that cultural expectations, honor-shame dynamics, and language differences may affect what can be shared and how.",
      "Offer scripture, prayer, and encouragement without cultural flattening. Use scripture to strengthen endurance, wisdom, lament, and hope. Pray for protection, discernment, unity, and fruitfulness. Avoid assuming Western ministry patterns are universally best; instead, ask what local leadership, translation, and contextualization require.",
      "Route practical and spiritual supports carefully. Connect the worker to sending-team care, counseling, medical help, language coaching, debriefing, or financial review as needed. If the issue involves team conflict or agency policy, hand it to the appropriate missions leader rather than trying to resolve it informally in one conversation.",
      "Establish a realistic follow-up rhythm and closure criteria. Set a cadence that fits time zones, travel, and bandwidth, such as a near-term check-in followed by scheduled monthly or milestone-based contact. Close the case when the worker has the needed support, knows the next point of contact, and has a sustainable plan for ongoing care or debriefing."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Provide a pastoral workflow for missionaries, cross-cultural workers, and sent families who need spiritual care around adjustment, discouragement, conflict, cultural fatigue, language barriers, isolation, or support transitions. This case emphasizes cross-cultural humility, sustainable care, and careful coordination with sending and receiving churches or agencies.",
    "outputExpectations": [
      "Intake notes summarize location, assignment context, primary concern, safety or security issues, and any family or support-team factors.",
      "Triage notes identify whether the need is encouragement, burnout care, urgent security response, or agency escalation.",
      "Confidentiality notes specify the agreed circle of communication and any restrictions related to local culture, risk, or agency policy.",
      "Follow-up plan includes contact cadence, responsible sending or field leader, and any practical referrals or debrief steps.",
      "Closure summary records prayer themes, support actions, and whether the worker has a stable pathway for continued cross-cultural care."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-new-believer",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-new-believer.md",
    "sourceHash": "d68b20aa419a2a0c",
    "title": "New Believer Care",
    "description": "Discipleship workflow for people who have recently come to faith",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "New Believer Care",
    "aliases": [
      "do-spiritual-care-new-believer",
      "New Believer Care",
      "new-believer",
      "spiritual-care-new-believer"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Celebrate the gospel response and gather a simple intake.",
      "Confirm the basics of salvation, assurance, and urgency.",
      "Route the person into the first discipleship lane.",
      "Give a simple first-things plan.",
      "Set a 30-90 day follow-up rhythm.",
      "Close when the foundations are in place."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when someone has newly trusted Christ, recently returned to faith after a long absence, or is asking foundational questions about salvation, baptism, prayer, Scripture, repentance, and what it means to follow Jesus. The goal is to move the person from initial faith into stable assurance, simple obedience, and early discipleship without overwhelming them.\n\nHandle the story discreetly and with joy. Share only the minimum necessary information with the people who will help the person take first steps in the faith. Keep the tone encouraging, patient, and grounded in the gospel.",
    "outputExpectations": [
      "A concise summary of the person’s faith response, key questions, and any important context.",
      "A routing note showing whether the next step is baptism prep, discipleship, mentoring, or another care lane.",
      "A short starter plan with scripture, prayer, and one to three practical habits.",
      "A follow-up schedule with cadence, owner, and the main focus of each check-in.",
      "A closure note confirming gospel understanding, connection to church support, and next-step readiness."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-new-member-integration",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-new-member-integration.md",
    "sourceHash": "89851dc99151e27e",
    "title": "New Member Integration Care",
    "description": "Integration workflow for welcoming new members into church life and care",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "New Member Integration Care",
    "aliases": [
      "do-spiritual-care-new-member-integration",
      "New Member Integration Care",
      "new-member-integration",
      "spiritual-care-new-member-integration"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Welcome the person and identify what integration means for them.",
      "Check for barriers that could affect healthy integration.",
      "Route the person into the right church connection points.",
      "Build a simple integration plan.",
      "Set a follow-up cadence that supports belonging.",
      "Close when the person is meaningfully connected."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "abuse",
      "mental-health"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case for people who have recently joined the church, completed membership, or are in the final stage of belonging and need help becoming known, connected, and spiritually settled. The aim is to move the person from initial welcome to meaningful participation in worship, community, serving, and pastoral care without losing discretion or overwhelming them.\n\nThis workflow should be relational and practical, not bureaucratic. Keep information minimal, honor privacy, and only share details with leaders who need them to serve well.",
    "outputExpectations": [
      "A concise summary of the person’s membership status, connection goals, and any relevant sensitivities.",
      "A routing note showing the chosen connection points, shepherd, group, or serving pathway.",
      "A practical integration plan with initial actions, owners, and follow-up cadence.",
      "A short scripture and prayer emphasis that supports belonging and unity.",
      "A closure note confirming stable connection, privacy considerations, and re-open criteria."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-other",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-other.md",
    "sourceHash": "ebbd6277fc0b0849",
    "title": "Other",
    "description": "Catch-all shepherding workflow for requests that do not clearly fit another spiritual-care case.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Other",
    "aliases": [
      "do-spiritual-care-other",
      "Other",
      "other",
      "spiritual-care-other"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Start by listening without forcing a category.",
      "Check the taxonomy one more time before keeping the case here.",
      "Apply a cautious confidentiality posture and screen for hidden risk.",
      "Clarify what kind of response the person wants before overworking the case.",
      "Offer a restrained pastoral response that fits the uncertainty.",
      "Set a short follow-up window and close or reroute decisively."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "violence",
      "abuse",
      "domestic-violence",
      "exploitation",
      "mental-health",
      "mandated-reporting"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case only when a request truly does not fit a more specific spiritual-care category after a careful review of the taxonomy. This is not a shortcut or a junk drawer; it is a disciplined fallback for uncommon, mixed, or still-unclear requests.\n\nPrimary goals:\n- Avoid inventing unnecessary workflows when the correct route is not yet obvious.\n- Preserve the person’s dignity while the team gathers enough information to classify the need accurately.\n- Prevent “other” from becoming a permanent home for cases that actually belong elsewhere.\n- Keep the response simple, faithful, and easy to reclassify as more details emerge.",
    "outputExpectations": [
      "A brief intake summary that states the concern in plain language without over-classifying it.",
      "A taxonomy check note explaining why the case remained in Other or where it was rerouted.",
      "A confidentiality and triage note that captures any risk screen results.",
      "A response note showing the prayer, blessing, referral, or acknowledgment that was provided.",
      "A closure or reclassification note with a short follow-up window if one is still needed."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-overdose-substance-crisis",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-overdose-substance-crisis.md",
    "sourceHash": "a04bbe06029b3640",
    "title": "Overdose and Substance Crisis",
    "description": "Immediate pastoral response workflow for overdose, intoxication, withdrawal, or urgent substance-related crisis.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Overdose and Substance Crisis",
    "aliases": [
      "do-spiritual-care-overdose-substance-crisis",
      "Overdose and Substance Crisis",
      "overdose-substance-crisis",
      "spiritual-care-overdose-substance-crisis"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "closureReason",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Treat overdose or severe withdrawal as a medical emergency. If the person is hard to wake, has slowed breathing, blue lips, seizure activity, chest pain, severe confusion, or has collapsed, call emergency services immediately. If naloxone is available and the situation suggests opioid overdose, use it according to local policy while waiting for help.",
      "Keep the person safe and continuously observed. Do not leave them alone, do not shame them, and do not let the conversation become a moral lecture. If they are vomiting, unconscious, or at risk of aspiration, place them in the safest position possible and wait for emergency responders.",
      "Notify the pastor, care leader, and any designated safety responder on a need-to-know basis. Keep all communication and notes sealed, confidential, and limited to those who need to respond. If there is risk to children, dependents, or vulnerable adults, escalate that concern immediately.",
      "Determine whether additional mandated reporting applies. If there is child endangerment, neglect, unsafe caregiving, impaired driving risk, or suspected abuse or exploitation connected to the crisis, follow the appropriate reporting pathway. Do not delay reporting while trying to secure a spiritual conversation.",
      "Refer to medical and addiction treatment supports. Arrange follow-up with detox, outpatient or residential treatment, medication-assisted treatment, recovery groups, or a licensed addiction counselor as appropriate. If the person has a sponsor, therapist, or recovery mentor, coordinate a warm handoff when the person agrees and safety allows.",
      "Close with a practical recovery plan. Identify who will stay with the person, how they will get home or to treatment, what substances or paraphernalia should be removed safely, and when the next check-in will occur. Document the crisis details, the emergency response, referrals, and any follow-up boundaries for the pastor and care leader."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "abuse",
      "neglect",
      "exploitation",
      "overdose",
      "mandated-reporting",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when a person may be overdosing, severely intoxicated, in dangerous withdrawal, or otherwise in a substance-related crisis. The goal is rapid medical response, harm reduction, confidential handling, and timely referral to detox, treatment, and recovery support.",
    "outputExpectations": [
      "Emergency medical help is activated immediately when overdose or dangerous withdrawal is suspected.",
      "The person is supervised, treated without shame, and not left alone during the crisis.",
      "Confidential handling is preserved with limited, need-to-know sharing.",
      "Any related mandated reporting obligation is recognized and completed.",
      "The pastor or care leader leaves with a concrete referral and follow-up checklist for detox, treatment, or recovery care."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-parenting-child-discipline",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-parenting-child-discipline.md",
    "sourceHash": "92c8436ff3227ceb",
    "title": "Parenting and Child Discipline",
    "description": "Pastoral workflow for parenting challenges, child discipline, and family guidance.",
    "family": "cases",
    "kind": "case",
    "group": "grief-pregnancy-and-family-systems",
    "groupLabel": "Grief, Pregnancy, and Family Systems",
    "caseType": "Parenting and Child Discipline",
    "aliases": [
      "do-spiritual-care-parenting-child-discipline",
      "Parenting and Child Discipline",
      "parenting-child-discipline",
      "spiritual-care-parenting-child-discipline"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Assess the child’s immediate safety and the discipline context. Ask whether anyone has been hurt, whether physical punishment is involved, whether there are bruises, threats, humiliation, locking out, food withholding, or other harmful practices, and whether the child is safe right now. If there is any concern of abuse or imminent harm, stop pastoral coaching and escalate.",
      "Understand the family situation and the specific concern. Ask open questions such as: “How old is the child?”, “What behavior is concerning you?”, “What has already been tried?”, “Who lives in the home?”, “Are there other stressors such as separation, grief, school issues, or mental health concerns?”, and “What would a good outcome look like?” Keep notes specific, behavioral, and non-judgmental.",
      "Set a confidentiality posture that protects children. Explain that pastoral care is private, but child safety concerns, abuse, or required reporting issues cannot remain fully confidential. When speaking with parents, do not promise secrecy about information that indicates risk to a child or another vulnerable person. When appropriate, encourage a separate conversation with the child only if it is safe and pastorally appropriate.",
      "Route to the right support. Use family care if the issue is mainly communication, routines, or household tension. Route to counseling, parenting resources, pediatric support, or school-based support if the issue involves trauma, developmental concerns, learning differences, or persistent behavioral challenges. Route to safety escalation if punishment is harmful, the child is afraid to go home, or there are signs of abuse or neglect.",
      "Offer scripture and prayer with a calm, practical tone. Use scriptures that emphasize gentleness, patience, wisdom, nurture, and the value of children without shaming parents. Pray for steadiness, self-control, clarity, repair after conflict, and help making one healthy change at a time. If the parent is overwhelmed or ashamed, keep the prayer brief and encouraging.",
      "Set follow-up cadence and closure conditions. Schedule a follow-up in 1 to 2 weeks for ongoing parenting support, sooner if a new incident occurs or safety concerns arise. Close the case when the family has a workable plan, the child’s safety is stable, the parent knows when to seek help, and any referrals or practices are underway. Keep the case open if there are unresolved safety, discipline, or family-system concerns."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "threat",
      "abuse",
      "neglect",
      "mental-health"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when a parent, guardian, or family seeks spiritual care around parenting stress, discipline questions, behavioral concerns, sibling conflict, or uncertainty about boundaries and consequences. The purpose is to support wise, age-appropriate, non-harmful caregiving that protects children, strengthens households, and connects families to practical help when needed.\n\nThis case must be handled with particular care around child safety, developmental stage, trauma history, neurodiversity, and family stress. Avoid endorsing harsh, degrading, or fear-based discipline. If there are signs of abuse, neglect, dangerous punishment, or a child at risk of harm, escalate immediately according to safety and child protection workflows.",
    "outputExpectations": [
      "A clear summary of the parenting concern, including age-appropriate context, reported behaviors, and any immediate safety issues.",
      "Intake notes that capture what has been tried, household dynamics, and any related stressors without assigning blame or making assumptions.",
      "A routing decision that identifies whether the case stays in family care or needs counseling, pediatric, school, or safety escalation.",
      "A practical follow-up plan with one or two concrete next steps, a timeline, and any parent-supported boundaries or routines.",
      "A closure note that states the child-safety status, scripture/prayer posture, and the condition for further follow-up or escalation."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-pornography-sexual-addiction",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-pornography-sexual-addiction.md",
    "sourceHash": "49182ed422b7515c",
    "title": "Pornography & Sexual Addiction Care",
    "description": "Discreet shepherding workflow for pornography use and sexual addiction recovery",
    "family": "cases",
    "kind": "case",
    "group": "addiction-mental-health-and-counseling",
    "groupLabel": "Addiction, Mental Health, and Counseling",
    "caseType": "Pornography & Sexual Addiction Care",
    "aliases": [
      "do-spiritual-care-pornography-sexual-addiction",
      "Pornography & Sexual Addiction Care",
      "pornography-sexual-addiction",
      "spiritual-care-pornography-sexual-addiction"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Receive the disclosure and lower the shame level immediately.",
      "Triage for safety, illegality, and clinical referral.",
      "Route the case to the right care lane with minimal exposure.",
      "Build a practical recovery plan in the first conversation.",
      "Set a follow-up cadence that supports recovery and prevents isolation.",
      "Close only when the person has a sustainable next-step network."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "safety",
      "self-harm",
      "suicidal",
      "threat",
      "abuse",
      "exploitation",
      "mandated-reporting",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case to respond to disclosed pornography use, compulsive sexual behavior, secretive online habits, shame spirals, and related recovery needs in a way that is compassionate, discreet, and highly practical. The goal is not merely behavior interruption but repentance, healing, accountability, and a clear discipleship pathway.\n\nThis workflow keeps sensitive information on a strict need-to-know basis. Only record the minimum necessary details, avoid explicit descriptions, and route immediately if there are signs of exploitation, coercion, minors, trafficking, abuse, or imminent danger.",
    "outputExpectations": [
      "A discreet, non-graphic intake summary that captures urgency, risk, and next steps.",
      "A routing decision that identifies whether the case needs pastoral care, recovery support, counseling, or safeguarding escalation.",
      "A practical recovery plan with accountability, boundary, and relapse-response actions.",
      "A follow-up schedule with cadence, owner, and check-in focus.",
      "A closure note that confirms stability, next discipleship steps, and any ongoing support connections."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-post-crisis-stabilization",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-post-crisis-stabilization.md",
    "sourceHash": "d0afafd60db31706",
    "title": "Post-Crisis Stabilization Care",
    "description": "Pastoral care workflow for stabilizing someone after a recent crisis, emergency, or acute care event.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Post-Crisis Stabilization Care",
    "aliases": [
      "do-spiritual-care-post-crisis-stabilization",
      "Post-Crisis Stabilization Care",
      "post-crisis-stabilization",
      "spiritual-care-post-crisis-stabilization"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm what happened and whether the person is safe right now.",
      "Identify the fallout that still needs attention.",
      "Stabilize the next 24-72 hours.",
      "Route practical and relational support.",
      "Create a short stabilization plan.",
      "Follow up quickly and keep the pace gentle.",
      "Close only after stability is visible."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "violence",
      "abuse",
      "overdose",
      "mental-health",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when someone has just come through a crisis such as self-harm concern, violence, abuse, overdose, hospitalization, panic, severe conflict, or another acute event and now needs calm follow-up, grounding, and practical stabilization. The goal is to reduce confusion, confirm current safety, identify immediate supports, and keep the person from slipping back into crisis.\n\nHandle the situation discreetly. Share only the minimum necessary information with the people who will help maintain safety, support recovery, or provide practical care.",
    "outputExpectations": [
      "A brief summary of the crisis, current safety status, and remaining fallout.",
      "A routing note showing what support is active now.",
      "A short stabilization plan for the next few days.",
      "A follow-up cadence with owner and escalation triggers.",
      "A closure note confirming the person is stable enough to move forward or transition to another care path."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-prayer-request",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-prayer-request.md",
    "sourceHash": "2582a16097d5ecf3",
    "title": "Prayer Request",
    "description": "Shepherding workflow for prayer requests that prioritizes consent, clarity, and appropriate escalation.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Prayer Request",
    "aliases": [
      "do-spiritual-care-prayer-request",
      "Prayer Request",
      "prayer-request",
      "spiritual-care-prayer-request"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Start with gratitude and ask what kind of prayer is being requested.",
      "Clarify the scope so the request is neither minimized nor overbuilt.",
      "Apply a confidentiality posture that matches the person’s preference and the risk level.",
      "Screen for triage cues that require a different workflow.",
      "Respond with a short, Scripture-shaped, prayer-ready posture.",
      "Set follow-up cadence or close the request respectfully."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "exploitation",
      "mandated-reporting",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when the primary request is for prayer, blessing, intercession, encouragement, or a simple spiritual check-in rather than a full counseling or crisis conversation. This workflow should help the team respond quickly, warmly, and without overcomplicating what may be a straightforward pastoral need.\n\nPrimary goals:\n- Receive prayer requests without forcing details the person does not want to share.\n- Determine whether the request stays as prayer only or needs routing to another care type.\n- Preserve confidentiality and honor any request for anonymity or limited sharing.\n- Offer Scripture and prayer in a way that is brief, hopeful, and consent-based.",
    "outputExpectations": [
      "A concise intake summary with the requested prayer focus and sharing preference.",
      "A triage decision indicating whether the request stays as prayer-only or routes elsewhere.",
      "A confidentiality note that records any anonymity request or sharing restriction.",
      "A prayer plan or prayer response that matches the person’s tone and consent.",
      "A closure or follow-up note with timing, owner, and any referral made."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-prayer-request-only",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-prayer-request-only.md",
    "sourceHash": "85b325a7a504ad77",
    "title": "Spiritual Care: Prayer Request Only",
    "description": "Pastoral workflow for prayer-only requests that need careful listening, light triage, and clear closure.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Spiritual Care: Prayer Request Only",
    "aliases": [
      "do-spiritual-care-prayer-request-only",
      "Spiritual Care: Prayer Request Only",
      "prayer-request-only",
      "spiritual-care-prayer-request-only"
    ],
    "defaultPriority": "low",
    "defaultUrgency": "ongoing",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Receive the request with a light, respectful posture.",
      "Do a brief triage check for urgency and hidden risk.",
      "Clarify consent, confidentiality, and the scope of support.",
      "Offer Scripture and prayer in a measured, person-centered way.",
      "Route appropriately when prayer-only is not enough.",
      "Document the request and close with a clear next step."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "violence",
      "abuse",
      "mandated-reporting",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when someone asks only for prayer, without asking for counseling, problem-solving, or a long pastoral conversation. The goal is to respond warmly, honor brevity, avoid over-intrusion, and still notice whether the request hides a deeper pastoral, emotional, or safety concern.\n\nThis workflow should keep the posture simple: listen, clarify the prayer need, assess for urgency, offer Scripture and prayer appropriate to the person’s tradition and comfort, and close cleanly unless a follow-up or handoff is needed.",
    "outputExpectations": [
      "A concise summary of the prayer request, including the main concern and any people/groups named.",
      "A triage note stating whether the request remained prayer-only or required escalation/handoff.",
      "A confidentiality note indicating whether the request is private, team-shared, or limited by safety concerns.",
      "A brief record of Scripture/prayer offered, or a note that the person declined Scripture.",
      "A closure or follow-up plan with timing, owner, and any next contact expectation."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-pre-marriage",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-pre-marriage.md",
    "sourceHash": "7d4391c1b609ed4f",
    "title": "Pre-Marriage Care Workflow",
    "description": "Shepherding workflow for engaged couples preparing for marriage.",
    "family": "cases",
    "kind": "case",
    "group": "grief-pregnancy-and-family-systems",
    "groupLabel": "Grief, Pregnancy, and Family Systems",
    "caseType": "Pre-Marriage Care Workflow",
    "aliases": [
      "do-spiritual-care-pre-marriage",
      "Pre-Marriage Care Workflow",
      "pre-marriage",
      "spiritual-care-pre-marriage"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason",
      "presentingNeed"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Assess readiness, expectations, and the story of the relationship.",
      "Screen for safety, coercion, and disqualifying concerns.",
      "Clarify confidentiality and the limits of hidden knowledge.",
      "Route the couple to the correct preparation track.",
      "Offer a formation posture centered on wisdom and covenant.",
      "Close only when the couple is ready for a healthy handoff into marriage."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "threat",
      "abuse",
      "mental-health"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when an engaged couple, seriously dating couple, or marriage-preparation request needs pastoral discernment and practical readiness support. The goal is to help the couple build a healthy foundation, identify family-system pressures early, screen for safety concerns, and route them to trained pastoral care leaders, mentoring, or counseling before the wedding date arrives.",
    "outputExpectations": [
      "A summary of the relationship stage, major strengths, and any unresolved risks or readiness gaps.",
      "Safety and discernment notes, including any coercion, secrecy, or disqualifying concerns.",
      "The confidentiality plan and any required disclosures or shared follow-up expectations.",
      "The assigned route, named pastoral care leader or mentor couple, and any counseling or delay recommendations.",
      "Follow-up cadence, homework themes, and closure or handoff notes for wedding readiness."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-pregnancy-infant-loss",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-pregnancy-infant-loss.md",
    "sourceHash": "c32e4299c073d3b9",
    "title": "Pregnancy and Infant Loss Care Workflow",
    "description": "Shepherding workflow for miscarriage, stillbirth, neonatal loss, and related grief.",
    "family": "cases",
    "kind": "case",
    "group": "grief-pregnancy-and-family-systems",
    "groupLabel": "Grief, Pregnancy, and Family Systems",
    "caseType": "Pregnancy and Infant Loss Care Workflow",
    "aliases": [
      "do-spiritual-care-pregnancy-infant-loss",
      "Pregnancy and Infant Loss Care Workflow",
      "pregnancy-infant-loss",
      "spiritual-care-pregnancy-infant-loss"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Receive the loss with reverence and gather only the facts needed for care.",
      "Screen immediately for medical, emotional, and relational danger.",
      "Protect confidentiality and the dignity of both parents or caregivers.",
      "Route to the right combination of pastoral, medical, and bereavement support.",
      "Offer a prayer posture of lament, blessing, and presence.",
      "Close only after the family has a safe support plan and clear handoff."
    ],
    "followUpCadence": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "overdueRule": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "escalationTriggers": [
      "crisis",
      "self-harm",
      "suicidal",
      "violence",
      "mental-health"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when a family experiences miscarriage, ectopic pregnancy, stillbirth, neonatal loss, or the death of an infant. This care must be tender, trauma-aware, and family-system aware. The goal is to provide immediate pastoral presence, protect privacy, screen for medical or mental-health risk, and connect the family to trained pastoral care leaders and professional support as needed.",
    "outputExpectations": [
      "A concise summary of the loss, the parents’ preferences, and any named children or family members who should be considered in care.",
      "Documented medical, emotional, and relational triage findings, including any urgent escalations.",
      "The privacy and communication plan, including who may receive updates or prayer support.",
      "The assigned route, named pastoral care leader, and any referrals to medical or mental-health care.",
      "Follow-up timing, remembrance plans, and closure or handoff notes for future anniversaries."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-pregnancy-infertility",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-pregnancy-infertility.md",
    "sourceHash": "e7470e8b42592f4f",
    "title": "Pregnancy and Infertility",
    "description": "Pastoral workflow for pregnancy, infertility, conception loss, and reproductive discernment.",
    "family": "cases",
    "kind": "case",
    "group": "grief-pregnancy-and-family-systems",
    "groupLabel": "Grief, Pregnancy, and Family Systems",
    "caseType": "Pregnancy and Infertility",
    "aliases": [
      "do-spiritual-care-pregnancy-infertility",
      "Pregnancy and Infertility",
      "pregnancy-infertility",
      "spiritual-care-pregnancy-infertility"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Assess immediate medical and emotional safety. Ask whether there are urgent medical symptoms, active bleeding, severe pain, panic, or thoughts of self-harm, and whether the person is safe at home and supported. If there is any urgent medical issue, direct the person to emergency or clinical care right away and do not delay for extended pastoral conversation.",
      "Clarify the situation with respectful, non-assumptive questions. Ask: “Are you currently pregnant, trying to conceive, or navigating infertility treatment?”, “What has been shared with you medically?”, “What are the biggest emotional or spiritual burdens right now?”, “Who else knows?”, and “What kind of support would feel helpful?” Keep the record factual and avoid presuming cause, blame, or outcome.",
      "State confidentiality boundaries clearly. Explain that the conversation is private within the care team as appropriate, but medical emergencies, abuse, coercion, or risks to safety may require escalation or consultation. If the person is seeking support with a spouse or partner, be careful not to share personal details between parties without consent and an agreed process.",
      "Route to the correct support lane. Route to pregnancy care, grief/loss care, or family care if the main need is emotional and spiritual support. Route to counseling if there is anxiety, depression, trauma, or repeated loss. Route to medical or fertility specialists for treatment decisions, medication questions, or bodily symptoms. If infertility is affecting the marriage, note the relational strain and consider parallel marriage support when appropriate.",
      "Use scripture and prayer with tenderness and restraint. Offer scripture that emphasizes God’s attention to the hurting, wisdom in waiting, and the reality that lament belongs in faithful prayer. Do not imply that more faith guarantees conception or that loss is being caused by sin. Pray for peace, wisdom, medical clarity, endurance, supportive relationships, and the ability to name hope and grief honestly.",
      "Set follow-up cadence and closure conditions. Schedule follow-up based on need: within days for acute grief, within 1 to 2 weeks for ongoing support, or after major appointments or test results. Close the case when the person has the right support lane, the immediate emotional or medical concern is stabilized, and the next step is clear. Keep the case open if there is ongoing loss, treatment uncertainty, or unresolved relational strain."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "abuse",
      "domestic-violence",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when someone is navigating pregnancy, infertility, recurrent conception difficulty, fertility treatment decisions, miscarriage history, or the emotional and spiritual strain of hoping for a child. The goal is to provide gentle, grounded care that honors grief, hope, bodily autonomy, medical realities, and the person’s need for prayerful support without pressure or simplistic answers.\n\nThis case may involve anxiety, shame, medical uncertainty, marital strain, financial stress, or trauma history. Avoid assumptions about timing, desire, or theological meaning. If there is coercion, reproductive abuse, suicidal ideation, domestic violence, or urgent medical concern, move immediately to the appropriate safety, counseling, or medical referral workflow.",
    "outputExpectations": [
      "A factual summary of the pregnancy or infertility concern, including current status, key stressors, and any urgent medical or safety issues.",
      "Intake notes that capture hopes, fears, medical context, support network, and any related marital or family stress without speculation.",
      "A routing decision that identifies whether the case should move to medical, counseling, grief/loss, family, or pregnancy support.",
      "A follow-up plan with a specific timeline and any next appointment, referral, or check-in expectations.",
      "A closure note that records scripture/prayer posture, confidentiality limits, and the condition for reopening or escalation."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-relationships",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-relationships.md",
    "sourceHash": "2f20008f40baf7b2",
    "title": "Relationships Spiritual Care",
    "description": "Support marriage, pre-marriage, and family care cases with wise, truth-filled pastoral guidance and appropriate routing.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Relationships Spiritual Care",
    "aliases": [
      "do-spiritual-care-relationships",
      "Relationships Spiritual Care",
      "relationships",
      "spiritual-care-relationships"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the exact care type and relationship context: determine whether the case is Marriage, Pre-Marriage, or Family, and identify whether the concern is conflict, preparation, boundaries, communication, repair, or trust.",
      "Assess for safety and power imbalance before anything else, because abuse, coercion, or intimidation changes the routing decision and means the case must not be treated as ordinary conflict.",
      "Choose the right support lane: use pastoral counseling or mentoring for ordinary relationship growth, premarital care for engagement and covenant preparation, family mediation for household patterns, and licensed therapy or specialized help when the issue exceeds pastoral scope.",
      "Provide care that is balanced and practical by naming what healthy truth and healthy love look like, giving next steps that are specific, and avoiding taking sides or escalating gossip.",
      "Document the main risks, the routing decision, the scripture anchor used, the expected timeline, and any boundaries that were set for communication, contact, or accountability.",
      "Close when there is a clear next milestone, the people involved have a shared plan or a documented transfer, and no hidden safety concern or unresolved escalation remains."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "abuse"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This playbook covers the exact care types:\n\n- Marriage\n- Pre-Marriage\n- Family\n\nUse it when the care need centers on covenant relationship health, preparation for marriage, household conflict, or family systems that require wise pastoral attention. The pastoral posture is truthful, calm, discerning, hopeful, and non-partisan, with a commitment to grace, accountability, and healthy boundaries. Main risks include escalating conflict, hidden abuse, manipulation, sexual or emotional unfaithfulness, unresolved expectations, and the temptation to become a referee instead of a shepherd. Routing decisions should include pastoral counseling, premarital mentoring, marriage ministry support, family mediation, and licensed therapy when abuse, trauma, or entrenched conflict is present. Typical timeline is same-week intake, 2-8 weeks of guided care for many relationship issues, and a longer pathway for premarital preparation or multi-layer family repair. Scripture anchors are Genesis 2:24, Ephesians 4:1-3 and 4:32, Colossians 3:12-14, 1 Corinthians 13:4-7, and Hebrews 13:4. Closure criteria require that the next step is clear, the relationship care plan is either complete or formally transferred, and the people involved know how to pursue healthy next steps.",
    "outputExpectations": [
      "The case record names the exact care type, the relationship setting, and the primary concern in clear language.",
      "The pastoral posture is recorded as calm, truthful, hopeful, and focused on healthy boundaries and accountability.",
      "The routing decision is explicit and includes any pastoral, premarital, mediation, therapy, or family support handoff.",
      "The timeline states whether the care is same-week, 2-8 weeks, or longer-term premarital or family work.",
      "The closure note includes the scripture anchor, the next milestone, any remaining risks, and the person responsible for continued care."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-restoration",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-restoration.md",
    "sourceHash": "47f567d6702bba89",
    "title": "Restoration Spiritual Care",
    "description": "Pastoral restoration workflow for confession, repentance, reconciliation, restitution, and trust repair.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Restoration Spiritual Care",
    "aliases": [
      "do-spiritual-care-restoration",
      "Restoration Spiritual Care",
      "restoration",
      "spiritual-care-restoration"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Clarify what happened, who was affected, and what kind of restoration is being asked for.",
      "Triage for safety, power imbalance, and reporting obligations before anything else.",
      "Protect confidentiality and set the right information boundaries.",
      "Route to the right restoration lane.",
      "Build a realistic restoration plan with scripture and prayer.",
      "Set follow-up, handoff notes, and closure conditions clearly."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "violence",
      "abuse",
      "exploitation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow for **Restoration** care cases when the central need is confession, repentance, forgiveness, restitution, reconciliation, trust repair, or a supervised return to fellowship or ministry after sin or harm. Restoration care is not the same as crisis care, and it must never pressure a harmed person into unsafe contact, quick forgiveness, or public reconciliation. The aim is truthful care that protects the vulnerable, names responsibility clearly, and builds a realistic pathway toward healing and renewed trust.\n\nThe posture should be humble, measured, and accountable. Keep the record precise and avoid sensationalizing the failure, the confession, or the harm. Restoration is a process with boundaries, milestones, and review points, not a single conversation.",
    "outputExpectations": [
      "The case is tagged **Restoration** and the urgency reflects any active safety, leadership, or relational risk.",
      "Intake notes identify the event, the people affected, and the specific restoration request in plain language.",
      "Confidentiality is restricted and any reporting or oversight obligation is documented clearly.",
      "The routing decision names the pastoral, counseling, mediation, restitution, or leadership review path that was chosen.",
      "The closure note includes the follow-up cadence, scripture and prayer posture, required boundaries, and the next owner for the restoration journey."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-self-harm-suicidal-ideation",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-self-harm-suicidal-ideation.md",
    "sourceHash": "4f8defef30e12117",
    "title": "Self-Harm and Suicidal Ideation",
    "description": "Immediate pastoral response workflow for self-harm, suicidal ideation, or suicide attempt concerns.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Self-Harm and Suicidal Ideation",
    "aliases": [
      "do-spiritual-care-self-harm-suicidal-ideation",
      "Self-Harm and Suicidal Ideation",
      "self-harm-suicidal-ideation",
      "spiritual-care-self-harm-suicidal-ideation"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Treat every mention of suicide or self-harm as time-sensitive. Ask direct, calm questions about current intent, plan, means, timing, and whether the person is alone. If there is imminent danger, do not leave the person alone, do not promise secrecy, and call emergency services or the local crisis line immediately.",
      "Move first to safety, not to counseling. Keep the person connected to a trusted adult or responder, reduce access to means when it can be done safely, and support transport to the nearest emergency department or crisis stabilization site when risk is acute. If a weapon, medication stockpile, or other lethal means is present, escalate to emergency support right away.",
      "Notify the designated care leader and pastor on a need-to-know basis. Share only the minimum information required to mobilize help. Keep notes and messages sealed, confidential, and restricted to the care team, safety lead, and any legally required reporter or clinician.",
      "Determine whether mandated reporting applies. If the person is a minor, dependent adult, vulnerable adult, or there is abuse, neglect, exploitation, or other reportable risk in the background, follow the mandated reporting pathway immediately. Document objective facts, not assumptions, and do not let spiritual conversation delay reporting.",
      "Refer to clinical and crisis supports without delay. Connect the person to a licensed mental health professional, crisis stabilization, mobile crisis team, or psychiatric evaluation. If the person already has a therapist, encourage immediate contact and, with permission when possible, coordinate a warm handoff. If they have no provider, help arrange the first available emergency or urgent mental health appointment.",
      "Build a short follow-up plan before closing the contact. Confirm who is with the person, who will check in next, what the next 24 hours look like, and what to do if risk increases. Record the disposition, the referrals made, the people notified, and the follow-up time. Use a same-day or next-day check-in until risk has clearly decreased."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "abuse",
      "neglect",
      "exploitation",
      "mental-health",
      "mandated-reporting",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when a person reports suicidal thoughts, self-harm urges, a recent attempt, or behavior that suggests imminent danger to self. The goal is immediate safety, rapid escalation, careful confidentiality, and appropriate referral to emergency and clinical care.",
    "outputExpectations": [
      "The person is not left alone when there is imminent risk, and emergency help is activated when required.",
      "Confidential handling is preserved on a need-to-know basis, with all notes and notifications restricted appropriately.",
      "Any mandated reporting threshold is recognized and acted on without delay.",
      "A clear referral path is completed to crisis, emergency, or mental health care as appropriate.",
      "The pastor or care leader leaves with a concrete check-in plan, responsible contacts, and documented next steps."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-separation-divorce",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-separation-divorce.md",
    "sourceHash": "df81e2c282bfaf01",
    "title": "Separation and Divorce",
    "description": "Pastoral workflow for separation, divorce discernment, and family transition care.",
    "family": "cases",
    "kind": "case",
    "group": "grief-pregnancy-and-family-systems",
    "groupLabel": "Grief, Pregnancy, and Family Systems",
    "caseType": "Separation and Divorce",
    "aliases": [
      "do-spiritual-care-separation-divorce",
      "Separation and Divorce",
      "separation-divorce",
      "spiritual-care-separation-divorce"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Start with safety and immediate status. Ask whether anyone is in immediate danger, whether children are safe, whether law enforcement or emergency support is needed, and whether there are threats, stalking, restraining orders, weapons, intoxication, or suicidal thoughts. If the answer suggests imminent harm, pause pastoral conversation and activate the crisis or safety escalation workflow immediately.",
      "Clarify the relationship situation without assumptions. Ask open, neutral questions such as: “What has changed?”, “Are you currently living together, separated, or in the process of separating?”, “Who knows about this situation?”, “Are there children, shared housing, finances, or court processes involved?”, and “What would feel most helpful from pastoral care right now?” Record only concrete facts, stated concerns, and named next steps.",
      "Protect confidentiality while explaining its limits. State that conversations are held in confidence within the care team as appropriate, but safety concerns, abuse, child protection issues, or legal duties may require escalation or consultation. If both spouses are present and the matter is shared, do not promise secrecy about information that affects the other person’s safety or the integrity of follow-up care.",
      "Discern the right routing path. Route to marriage care if the couple is seeking repair and both are willing to engage. Route to family care if the main issue is the impact on children, co-parenting, or household stability. Route to grief/loss care if the dominant need is mourning, ambiguity, or identity disruption. Route to safety, counseling, legal, financial, or housing support if there is coercion, abuse, eviction, or practical instability. When reconciliation is being considered, encourage paced, realistic steps rather than urgency or pressure.",
      "Offer scripture and prayer with tenderness and restraint. Use scripture that supports truth-telling, wisdom, lament, peacemaking, and God’s nearness in suffering. Do not weaponize verses about covenant or forgiveness to minimize harm. Pray for clarity, protection, repentance where needed, wisdom for children, courage for boundary-setting, and peace for the next 24 to 72 hours. If prayer may feel unsafe in the moment, ask permission and keep it brief.",
      "Set follow-up cadence and closure conditions. Schedule a check-in within 3 to 7 days for active crisis, within 1 to 2 weeks for ongoing discernment, or sooner if safety changes. Close the case only when immediate safety is stable, the person knows where to get help, the next pastoral or practical step is clear, and any children or dependents have a safe support plan. If the situation remains volatile, keep the case open and document the specific unresolved risks."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when a person, couple, or family is navigating separation, divorce, or the possibility of either. The goal is to offer calm, non-assumptive pastoral care that protects safety, lowers shame, clarifies immediate risks, and supports faithful next steps for adults and children.\n\nThis case is not a venue for legal advice, pressure to reconcile at all costs, or attempts to mediate active conflict when safety is uncertain. Keep language careful, document only what is observed or reported, and route concerns quickly when there is coercion, violence, threats, child endangerment, financial abuse, or acute emotional destabilization.",
    "outputExpectations": [
      "A concise note that identifies the relationship status, the main concerns, and any immediate safety issues using only reported facts.",
      "Intake questions captured in a non-assumptive way, including children, housing, finances, legal involvement, and support network.",
      "A documented routing decision with the reason for marriage care, family care, grief care, safety escalation, or practical support referral.",
      "A follow-up plan with a specific cadence, named owner, and any agreed check-in method or boundaries.",
      "A closure summary that states the next step, the conditions that would reopen or escalate the case, and any scripture or prayer posture used."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-sexual-assault-harassment",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-sexual-assault-harassment.md",
    "sourceHash": "369394a769691fee",
    "title": "Sexual Assault and Harassment",
    "description": "Trauma-informed pastoral response workflow for sexual assault, sexual harassment, or recent sexual boundary violation concerns.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Sexual Assault and Harassment",
    "aliases": [
      "do-spiritual-care-sexual-assault-harassment",
      "Sexual Assault and Harassment",
      "sexual-assault-harassment",
      "spiritual-care-sexual-assault-harassment"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "closureReason",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Respond with safety, calm, and belief. Thank the person for disclosing, avoid questioning credibility, and do not pressure them to forgive, reconcile, confront the accused, or make a public statement. If there is immediate danger, call emergency services and move the person to a safer location.",
      "Preserve urgent evidence and medical options. Encourage the person to seek medical attention as soon as possible, including a sexual assault forensic exam if appropriate, and explain that bathing, changing clothes, or deleting messages may affect evidence. Offer help contacting a sexual assault advocate, crisis center, or hospital emergency department.",
      "Escalate discreetly to the pastor, care leader, and safeguarding lead. Share only what is necessary to protect the person and others. Keep records sealed, confidential, and restricted to those with a legitimate care or safety role. Do not discuss the matter casually or with the alleged offender.",
      "Determine reporting obligations immediately. If the person is a minor, vulnerable adult, dependent adult, staff member under safeguarding policy, or there is ongoing risk to others, follow mandatory reporting and any required organizational reporting right away. When in doubt, make the report and document the exact facts disclosed.",
      "Separate pastoral care from investigation. Do not conduct a church-led inquiry, mediation, or confrontation as a substitute for law enforcement, child protection, or professional investigation. Coordinate referrals to police, protective services, medical care, counseling, and survivor advocacy while keeping the church role limited to support and safety.",
      "Set a survivor-centered follow-up plan. Confirm how the person wants contact handled, whether they need accompaniment, and whether they want a support person present. Record the next check-in time, referrals made, and any boundaries about the accused person, and ensure all future conversations remain confidential and trauma-informed."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "sexual-assault",
      "harassment",
      "exploitation",
      "mandated-reporting",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when a person reports sexual assault, sexual harassment, coercion, exploitation, or a serious sexual boundary violation. The goal is trauma-informed care, immediate safety, mandated reporting where required, and referral to medical, legal, and advocacy supports without forcing the person into a premature narrative or decision.",
    "outputExpectations": [
      "The person receives immediate trauma-informed care without pressure to explain, reconcile, or stay silent.",
      "Evidence, medical care, advocacy, and emergency options are offered quickly when appropriate.",
      "Confidential handling is preserved with restricted, need-to-know access only.",
      "Mandatory reporting thresholds are identified and completed without delay.",
      "A concrete safety, accompaniment, and follow-up plan is documented for pastors and care leaders."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-shepherding",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-shepherding.md",
    "sourceHash": "b2ed87c0cf392f9a",
    "title": "Shepherding Care Workflow",
    "description": "Ongoing pastoral shepherding workflow for general care, connection, and follow-up.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Shepherding Care Workflow",
    "aliases": [
      "do-spiritual-care-shepherding",
      "Shepherding Care Workflow",
      "shepherding",
      "spiritual-care-shepherding"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Receive the request and establish a safe, consent-based conversation.",
      "Triage the need and decide whether shepherding is the right first lane.",
      "Apply a careful confidentiality posture and route to the right support.",
      "Provide immediate pastoral care, prayer, and a practical next step.",
      "Set the follow-up cadence and write clear handoff notes.",
      "Close the case only when the care rhythm is stable and the person knows the path forward."
    ],
    "followUpCadence": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "overdueRule": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "abuse",
      "mental-health",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when a person needs ongoing pastoral care, encouragement, accountability, connection to community, or help navigating multiple needs that do not yet fit a single crisis case. Shepherding is not a substitute for emergency response, licensed counseling, or legal/medical advice. It is the coordinating layer that helps the care team listen well, identify the right next step, and make sure no one falls through the cracks.\n\nThis workflow should quickly determine whether the request belongs in another care stream first, then create a clear shepherding plan with ownership, cadence, and a clean handoff note. The goal is steady spiritual care, practical support where appropriate, and restoration toward healthy discipleship and community.",
    "outputExpectations": [
      "A brief intake summary with the person’s stated need, urgency, and desired outcome.",
      "A triage decision that states whether shepherding is primary or whether another case takes precedence.",
      "A confidentiality and routing note showing what was shared, with whom, and why.",
      "A follow-up plan with owner, cadence, and one concrete next step.",
      "A closure note that records unresolved items, handoff details, or the conditions required to reopen care."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-spiritual-abuse-recovery",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-spiritual-abuse-recovery.md",
    "sourceHash": "dae0364c815ff523",
    "title": "Spiritual Abuse Recovery Care",
    "description": "Pastoral care workflow for recovering from spiritual abuse, coercive religious control, and harmed trust in church settings.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Spiritual Abuse Recovery Care",
    "aliases": [
      "do-spiritual-care-spiritual-abuse-recovery",
      "Spiritual Abuse Recovery Care",
      "spiritual-abuse-recovery",
      "spiritual-care-spiritual-abuse-recovery"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Listen first and avoid defending the harmful system.",
      "Assess the harm and current level of exposure.",
      "Prioritize safety, agency, and pacing.",
      "Route to safe support and careful listening.",
      "Create a trust-repair plan.",
      "Follow up with steadiness and no pressure.",
      "Close only when the person has a safe path forward."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "safety",
      "abuse",
      "harassment",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when someone has been harmed by spiritual abuse, coercive religious control, manipulation, authoritarian leadership, shaming, fear-based teaching, or misuse of Scripture in a church, ministry, or discipleship setting. The goal is to create a safe, validating, and carefully paced recovery path that does not re-traumatize the person or push them back into unhealthy control.\n\nHandle the situation with high discretion. Share only the minimum necessary information with people who are safe, wise, and specifically needed to help. Do not pressure the person to reconcile too quickly or to return to the same environment that caused harm.",
    "outputExpectations": [
      "A concise summary of the spiritual abuse, current exposure, and immediate safety concerns.",
      "A routing note showing what safe support is active.",
      "A trust-repair plan with clear boundaries and next steps.",
      "A follow-up cadence that respects the person’s pace.",
      "A closure note confirming the person has a safer environment and a realistic path forward."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-spiritual-doubt-deconstruction",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-spiritual-doubt-deconstruction.md",
    "sourceHash": "ae4ab71ef65cbc33",
    "title": "Spiritual Care: Spiritual Doubt and Deconstruction",
    "description": "Pastoral workflow for spiritual doubt, deconstruction, and questions that require patient listening and careful discernment.",
    "family": "cases",
    "kind": "case",
    "group": "discipleship-integration-and-formation",
    "groupLabel": "Discipleship, Integration, and Formation",
    "caseType": "Spiritual Care: Spiritual Doubt and Deconstruction",
    "aliases": [
      "do-spiritual-care-spiritual-doubt-deconstruction",
      "Spiritual Care: Spiritual Doubt and Deconstruction",
      "spiritual-doubt-deconstruction",
      "spiritual-care-spiritual-doubt-deconstruction"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "closureReason",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Begin with permission and a non-defensive listening posture.",
      "Map the shape of the doubt before trying to answer it.",
      "Check for urgency, coercion, trauma, or isolation.",
      "Respond with careful truthfulness and measured spiritual care.",
      "Route to the appropriate next layer of care.",
      "Document the themes, next steps, and closure conditions carefully."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "self-harm",
      "abuse"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when someone is wrestling with doubt, deconstruction, disillusionment, theological questions, or uncertainty about faith, Scripture, church, or God. The purpose is not to argue them back into certainty. It is to create a safe, honest, and ordered conversation that listens carefully, distinguishes spiritual injury from intellectual inquiry, and keeps the person connected to supportive care.\n\nThis workflow should help the team respond with humility, patience, and truthfulness while watching for trauma, coercion, shame, isolation, or risk that would require a different care path.",
    "outputExpectations": [
      "A summary of the main questions, concerns, and context behind the person’s doubt.",
      "A triage note identifying whether the issue is intellectual, relational, trauma-related, or safety-sensitive.",
      "A confidentiality and routing note describing who may be told and which care role should follow.",
      "A record of any Scripture, prayer, or listening-only posture used during the interaction.",
      "A follow-up or closure plan with timing, ownership, and criteria for re-opening or escalation."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-teen-youth-crisis",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-teen-youth-crisis.md",
    "sourceHash": "8aedd167b1bbb33a",
    "title": "Teen / Youth Crisis",
    "description": "Spiritual care workflow for teens or youth facing crisis, safety concerns, or urgent family and school pressure.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Teen / Youth Crisis",
    "aliases": [
      "do-spiritual-care-teen-youth-crisis",
      "Teen / Youth Crisis",
      "teen-youth-crisis",
      "spiritual-care-teen-youth-crisis"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Start with immediate intake and safety questions. Ask the teen's age, who is present, whether a parent or guardian is aware, what happened, whether anyone is in immediate danger, and whether there are thoughts of self-harm, abuse, violence, substance use, or running away. Clarify location, supervision, and the preferred safe adult contact before moving further.",
      "Assess triage level and confidentiality limits. Explain that conversations with minors may need to include guardians, youth leaders, or care professionals when safety, abuse, or mandated reporting concerns are present. Do not promise secrecy. If there is imminent danger, follow emergency procedures first and involve a responsible adult immediately.",
      "Route according to the concern and age context. For spiritual confusion, shame, peer pressure, or family stress, support the teen while coordinating with a youth pastor or trusted shepherd. For abuse, neglect, exploitation, or self-harm risk, escalate at once according to safeguarding policy. For school discipline, identity questions, or family conflict, keep the teen supported but ensure an adult handoff that is appropriate, documented, and timely.",
      "Offer pastoral care with age-appropriate language and prayer. Use simple, non-pressuring questions that help the teen name fear, grief, anger, or confusion. Provide brief scripture, reassurance, and prayer that emphasize God's presence, wisdom, and protection without minimizing the seriousness of the situation.",
      "Coordinate guardian and leader communication carefully. Confirm what can be shared, what must be shared, and who will speak to the guardian or responsible adult. When appropriate, include the parent or guardian in a follow-up conversation, while preserving the teen's dignity and avoiding unnecessary disclosure to peers or broader church networks.",
      "Set follow-up cadence and closure conditions. Arrange a same-day or next-day check-in for urgent concerns, then weekly or more frequent follow-up until stability improves. Close the case only when safety is established, a responsible adult has been engaged, referrals are complete if needed, and the teen has a clear next-step care plan."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "violence",
      "abuse",
      "neglect",
      "exploitation",
      "mandated-reporting",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Provide a careful, age-aware pastoral workflow for minors and older youth who are experiencing crisis, distress, conflict, or safety concerns. This case prioritizes immediate safety, appropriate guardian involvement, mandated reporting awareness, and clear handoffs to qualified leaders, parents or guardians, and professional or emergency support when needed.",
    "outputExpectations": [
      "Intake notes record age, guardian status, presenting concern, safety screen, and the current level of supervision.",
      "Triage outcome states whether the case is routine care, urgent pastoral escalation, mandated reporting, or emergency referral.",
      "Confidentiality notes clearly identify any information shared with guardians, youth leaders, or authorities and why.",
      "Follow-up plan lists the next contact, responsible leader, referral path if needed, and any prayer or scripture focus.",
      "Closure summary confirms safety, handoffs, and any continued care pathway for the teen and family."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-terminal-illness-end-of-life",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-terminal-illness-end-of-life.md",
    "sourceHash": "1c54fd55e1bd3bc5",
    "title": "Terminal Illness and End-of-Life Care",
    "description": "Spiritual-care workflow for terminal illness, hospice, palliative care, dying, and end-of-life support.",
    "family": "cases",
    "kind": "case",
    "group": "medical-hospital-elder-and-end-of-life-care",
    "groupLabel": "Medical, Hospital, Elder, and End-of-Life Care",
    "caseType": "Terminal Illness and End-of-Life Care",
    "aliases": [
      "do-spiritual-care-terminal-illness-end-of-life",
      "Terminal Illness and End-of-Life Care",
      "terminal-illness-end-of-life",
      "spiritual-care-terminal-illness-end-of-life"
    ],
    "defaultPriority": "high",
    "defaultUrgency": "high",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm prognosis, decision-making, and immediate comfort needs.",
      "Gather intake details that help with bedside and family support.",
      "Hold confidentiality with extreme care and clarity.",
      "Route the case to hospice, palliative, pastoral, and practical supports.",
      "Use scripture and prayer that fit sorrow, hope, and sacred presence.",
      "Set follow-up and closure around the actual course of dying and bereavement."
    ],
    "followUpCadence": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "overdueRule": {
      "cadence": "24-to-48-hours",
      "dueWithinHours": 48,
      "overdueAfterHours": 48
    },
    "escalationTriggers": [
      "safety",
      "terminal",
      "end-of-life"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when a person is facing a terminal diagnosis, entering hospice or palliative care, actively declining, or preparing for death. This case also applies when the family is grieving anticipatory loss and needs help making decisions, praying, saying goodbye, or planning the final days.\n\nThe shepherd's posture here is tender, unhurried, and grounded. The aim is not to fix death or force optimism. The aim is to help the person and family face mortality with honesty, peace, and faithful presence.",
    "outputExpectations": [
      "A summary of prognosis, comfort needs, and the patient's stated spiritual preferences.",
      "A note on what may be shared, who the decision-maker is, and any privacy boundaries.",
      "A routing record for hospice, palliative care, chaplaincy, social work, or bereavement support.",
      "A prayer or scripture posture that reflects lament, peace, and resurrection hope without forcing optimism.",
      "A follow-up plan for active decline, the moment of death, and the early bereavement window."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-unemployment-underemployment",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-unemployment-underemployment.md",
    "sourceHash": "29067b43575eac65",
    "title": "Unemployment and Underemployment",
    "description": "Practical workflow for supporting unemployment and underemployment needs.",
    "family": "cases",
    "kind": "case",
    "group": "practical-hardship-and-life-stability",
    "groupLabel": "Practical Hardship and Life Stability",
    "caseType": "Unemployment and Underemployment",
    "aliases": [
      "do-spiritual-care-unemployment-underemployment",
      "Unemployment and Underemployment",
      "unemployment-underemployment",
      "spiritual-care-unemployment-underemployment"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safetyScreen",
      "nextAction",
      "dueDate",
      "closureReason",
      "ownerId"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Assess the immediate financial and household impact.",
      "Clarify work history, skills, and barriers.",
      "Connect the person to income and employment resources.",
      "Provide short-term practical assistance.",
      "Track progress and maintain follow-up.",
      "Close or transfer the case appropriately."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "mental-health",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this case when a person has lost work, has reduced hours, is struggling with unstable income, or needs help moving from financial disruption toward employment stability. The workflow focuses on urgent needs, practical resource connection, job-search support, follow-up, and clear closeout or transfer decisions.",
    "outputExpectations": [
      "A documented summary of the employment change and current financial pressure.",
      "Referrals or applications completed for employment, benefits, or emergency aid.",
      "A practical short-term plan with concrete job-search or stabilization steps.",
      "A scheduled follow-up to review progress and remaining barriers.",
      "A clear closure or transfer decision tied to ongoing need and case scope."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-violence-threat",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-violence-threat.md",
    "sourceHash": "7a622230f540ef62",
    "title": "Violence Threat",
    "description": "Immediate pastoral response workflow for threats of violence, weapon risk, or credible danger to others.",
    "family": "cases",
    "kind": "case",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Violence Threat",
    "aliases": [
      "do-spiritual-care-violence-threat",
      "Violence Threat",
      "violence-threat",
      "spiritual-care-violence-threat"
    ],
    "defaultPriority": "urgent",
    "defaultUrgency": "immediate",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 4,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Assume the threat may be real until proven otherwise. Ask direct questions about target, time, place, access to weapons, recent escalation, and whether the person has already taken steps toward harm. If the threat appears imminent or specific, call emergency services immediately and do not attempt to manage it alone.",
      "Protect the potential target and reduce exposure. Separate the person from the threatened party when it can be done safely, alert the appropriate safety or facilities lead, and consider closing or securing access to the location if the risk is active. Do not warn the target in a way that increases danger unless coordinated through law enforcement or the designated safety lead.",
      "Escalate to the pastor, care leader, and security lead on a strict need-to-know basis. Keep all documentation and communication confidential and limited to responders with an operational role. If law enforcement is involved, share only verified facts and preserve all records.",
      "Determine whether the situation triggers mandated reporting or criminal reporting. If weapons, stalking, domestic violence, child endangerment, elder abuse, or threats against a protected person are present, follow the applicable reporting pathway immediately. Do not wait for a pastoral meeting before contacting the proper authorities when the threshold is met.",
      "Refer the person for urgent behavioral health evaluation. Arrange a crisis assessment, emergency psychiatric evaluation, or mobile crisis response when the person shows loss of control, psychosis, intoxication, command hallucinations, or inability to commit to nonviolence. Make sure the referral is documented and that transport is safe and supervised.",
      "Create a safety plan and follow-up boundary plan. Decide whether contact must pause, whether a no-contact boundary is needed, and who will be responsible for monitoring future contact. Set a same-day debrief with the pastor and care leader, record the threat details, and define the conditions under which the person may re-engage with pastoral care."
    ],
    "followUpCadence": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "overdueRule": {
      "cadence": "same-day",
      "dueWithinHours": 24,
      "overdueAfterHours": 24
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "mandated-reporting",
      "emergency-services",
      "same-day-escalation"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this workflow when someone expresses a threat, plan, impulse, or credible risk of violence toward another person, a group, a congregation, a workplace, or the public. The priority is immediate protection of potential targets, rapid escalation, sealed handling, and coordination with law enforcement and clinical support as needed.",
    "outputExpectations": [
      "Any credible or imminent violence threat is escalated immediately to emergency or law-enforcement resources when required.",
      "The threatened person, site, or congregation is protected with practical safety steps and clear boundaries.",
      "Confidential, need-to-know handling is maintained with limited operational sharing.",
      "Mandatory or criminal reporting thresholds are identified and acted on without delay.",
      "The case ends with a documented safety and follow-up plan for pastors, care leaders, and security responders."
    ]
  },
  {
    "workflowId": "cases.do-spiritual-care-young-adult-transition",
    "sourcePath": "New_Covenant/iris/docs/do/cases/do-spiritual-care-young-adult-transition.md",
    "sourceHash": "76acb52af01fa9b8",
    "title": "Young Adult Transition",
    "description": "Spiritual care workflow for young adults navigating adulthood, independence, vocation, identity, and faith transition.",
    "family": "cases",
    "kind": "case",
    "group": "identity-leadership-mission-and-accessibility",
    "groupLabel": "Identity, Leadership, Mission, and Accessibility",
    "caseType": "Young Adult Transition",
    "aliases": [
      "do-spiritual-care-young-adult-transition",
      "Young Adult Transition",
      "young-adult-transition",
      "spiritual-care-young-adult-transition"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Gather the transition story and immediate concerns. Ask what is changing, what feels most difficult, what support systems exist, and whether there are financial, housing, mental health, family, or faith concerns affecting stability. Clarify age, living situation, and whether the person is still under parental or guardian oversight.",
      "Check for triage cues and care urgency. Screen for crisis indicators such as self-harm, coercion, abuse, addiction, severe isolation, or unsafe housing. If any are present, escalate to the appropriate safety or practical-care pathway before continuing with a simple transition conversation.",
      "Clarify confidentiality and relational boundaries. Explain what will remain private, what may need to be shared with a pastor or small-group leader, and when a family member or mentor should be included. Protect the young adult's dignity while being honest about the limits of confidentiality in safety or safeguarding situations.",
      "Provide pastoral guidance and scripture-centered encouragement. Speak to vocation, maturity, identity in Christ, stewardship, and wise decision-making. Use scripture and prayer to affirm God's guidance without treating the transition as a quick fix or assuming one right timeline for adulthood.",
      "Route to the right support network. Connect the person to discipleship, mentoring, career discernment, counseling, financial guidance, or housing support as needed. If the young adult is newly independent, identify one or two stable church contacts who can serve as check-in points without creating dependency or over-involvement.",
      "Set follow-up cadence and closure conditions. Schedule an early follow-up within one to two weeks for active transitions, then space out contact as stability increases. Close the case when the person has a realistic support plan, knows where to go for help, and demonstrates growing stability in faith, relationships, and daily life."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "abuse",
      "mental-health"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Support young adults who are moving into greater independence, new responsibility, or major life transitions such as college, work, relocation, singleness, dating, or first-time leadership. This case emphasizes pastoral encouragement, practical discernment, healthy boundaries, and connection to stable discipleship relationships.",
    "outputExpectations": [
      "Intake notes capture the transition being faced, support systems, age or guardian context, and any stressors affecting safety or stability.",
      "Triage notes specify whether the case needs discipleship only, pastoral follow-up, or escalation to another care pathway.",
      "Confidentiality notes document any permissions, boundaries, and the rationale for involving mentors, family, or leaders.",
      "Follow-up plan includes a concrete cadence, assigned contact person, and any referrals or practical next steps.",
      "Closure summary records the main encouragements, prayers, resources, and indicators that the young adult is stable enough for routine care."
    ]
  },
  {
    "workflowId": "cases.readme",
    "sourcePath": "New_Covenant/iris/docs/do/cases/README.md",
    "sourceHash": "6066c7d80700616a",
    "title": "Spiritual Care Cases Index",
    "description": "Index and organizing guide for spiritual-care case workflows under documentation/do/cases.",
    "family": "cases",
    "kind": "index",
    "group": "immediate-safety-and-crisis",
    "groupLabel": "Immediate Safety and Crisis",
    "caseType": "Spiritual Care Cases Index",
    "aliases": [
      "readme",
      "Spiritual Care Cases Index",
      "do-spiritual-care-cases-index"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 2,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Treat every file in this folder as a workflow guide that supports real-time shepherding decisions, not as a static article.",
      "Start with the most urgent risk area: safety, abuse, hospitalization, medical escalation, or end-of-life support.",
      "Use this index to select the narrowest applicable case and avoid forcing a broad category when a specific playbook exists.",
      "Keep routing notes concise, factual, and action-oriented so another shepherd can continue the case without confusion.",
      "Revisit this index whenever new case files are added so the library remains complete and discoverable.",
      "When a case does not fit any current playbook, fall back to the nearest broad category and document the gap for future expansion."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "self-harm",
      "suicidal",
      "violence",
      "threat",
      "abuse",
      "domestic-violence",
      "sexual-assault",
      "harassment",
      "neglect",
      "exploitation",
      "overdose",
      "terminal",
      "end-of-life",
      "mental-health",
      "leadership-failure",
      "moral-failure",
      "mandated-reporting",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This folder contains the detailed case playbooks for the **Do** spiritual-care workflow library.\n\nThe organizing principle is simple: **start with the presenting need, then route to the most specific case, and only fall back to broader category guidance when the situation does not fit a higher-priority safety or care path**. Each case doc is written as a practical shepherding workflow, not a theological essay. The goal is to help the responder quickly identify:\n\n- whether the concern is urgent or routine,\n- what questions to ask first,\n- what information may not stay confidential,\n- where to route the person next,\n- how often to follow up, and\n- when the case can be closed.",
    "outputExpectations": [
      "A clear map from presenting need to the correct case doc.",
      "A repeatable reading order for urgent and non-urgent spiritual-care concerns.",
      "A shared understanding of how confidentiality, routing, and follow-up work in this folder.",
      "A maintenance-friendly index that can be expanded as new case docs are added.",
      "A documentation standard that keeps the whole case library consistent for shepherds and coordinators."
    ]
  },
  {
    "workflowId": "discipleship.discipleship-life-stages",
    "sourcePath": "New_Covenant/iris/docs/do/discipleship/discipleship-life-stages.md",
    "sourceHash": "71db26c79d5782b9",
    "title": "Discipleship Life Stages",
    "description": "Life-stage map for disciple-making pathways from pregnancy through hospice.",
    "family": "discipleship",
    "kind": "discipleship-process",
    "group": "discipleship",
    "groupLabel": "Discipleship",
    "caseType": "",
    "aliases": [
      "discipleship-life-stages",
      "Discipleship Life Stages"
    ],
    "defaultPriority": "low",
    "defaultUrgency": "ongoing",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "3-to-5-days",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "3-to-5-days",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "terminal",
      "end-of-life"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide to sort a person or household by primary life stage before choosing a ministry model or special-path adaptation.",
    "outputExpectations": [
      "Start with the person’s primary age and developmental stage.",
      "Note the household context if it changes the pathway.",
      "Hand off to [discipleship-special-paths.md](./discipleship-special-paths.md) if a situation requires adaptation.",
      "Choose a delivery format in [discipleship-program-models.md](./discipleship-program-models.md)."
    ]
  },
  {
    "workflowId": "discipleship.discipleship-program-models",
    "sourcePath": "New_Covenant/iris/docs/do/discipleship/discipleship-program-models.md",
    "sourceHash": "524191c2e0c62c8f",
    "title": "Discipleship Program Models",
    "description": "Reusable discipleship delivery models for different ages, settings, and needs.",
    "family": "discipleship",
    "kind": "discipleship-process",
    "group": "discipleship",
    "groupLabel": "Discipleship",
    "caseType": "",
    "aliases": [
      "discipleship-program-models",
      "Discipleship Program Models"
    ],
    "defaultPriority": "low",
    "defaultUrgency": "ongoing",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide to choose the delivery model after you have identified life stage and any special path.",
    "outputExpectations": [
      "Match the model to the person's access and capacity.",
      "Prefer the simplest model that can still form consistent habits.",
      "Add human support when the need is relational, complex, or sensitive.",
      "Keep the model flexible enough to hand off between leaders."
    ]
  },
  {
    "workflowId": "discipleship.discipleship-special-paths",
    "sourcePath": "New_Covenant/iris/docs/do/discipleship/discipleship-special-paths.md",
    "sourceHash": "03d486cf31214168",
    "title": "Discipleship Special Paths",
    "description": "Special situations that require discipleship adaptations beyond normal life-stage planning.",
    "family": "discipleship",
    "kind": "discipleship-process",
    "group": "discipleship",
    "groupLabel": "Discipleship",
    "caseType": "",
    "aliases": [
      "discipleship-special-paths",
      "Discipleship Special Paths"
    ],
    "defaultPriority": "low",
    "defaultUrgency": "ongoing",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "abuse",
      "end-of-life",
      "mental-health",
      "moral-failure"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide when a person or household has a situation that changes how discipleship should be delivered.",
    "outputExpectations": [
      "Identify the special situation.",
      "Check whether the life stage still applies.",
      "Adapt the program model for access, pace, and support.",
      "Coordinate with care, teaching, and pastoral teams as needed."
    ]
  },
  {
    "workflowId": "discipleship.readme",
    "sourcePath": "New_Covenant/iris/docs/do/discipleship/README.md",
    "sourceHash": "ef15e5d38eac9323",
    "title": "Discipleship Catalog",
    "description": "Canonical index for disciple-making planning across life stages, special situations, and program models.",
    "family": "discipleship",
    "kind": "index",
    "group": "discipleship",
    "groupLabel": "Discipleship",
    "caseType": "",
    "aliases": [
      "readme",
      "Discipleship Catalog"
    ],
    "defaultPriority": "low",
    "defaultUrgency": "ongoing",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "end-of-life"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This folder is the canonical planning home for disciple-making pathways from childhood through hospice. Use it to sort a person or group into the right pathway, then hand off to the next ministry step.",
    "outputExpectations": [
      "Identify the life stage.",
      "Identify any special situation.",
      "Choose the program model that fits.",
      "Hand off to the next care, teaching, or formation workflow."
    ]
  },
  {
    "workflowId": "research.do-administration-operations-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-administration-operations-research.md",
    "sourceHash": "35ea00bab1fd278f",
    "title": "Administration and Operations Research",
    "description": "Research brief for admin workflows, permissions, support tasks, and operational oversight across the Do environment.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-administration-operations-research",
      "Administration and Operations Research",
      "administration-operations-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "consent"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Define the administrative tasks and permission boundaries needed to keep the system manageable for operators and trusted staff.",
    "outputExpectations": [
      "Admin task inventory with role or permission requirements",
      "Recommended approval and audit controls",
      "Exceptions and escalation paths for sensitive actions",
      "Gaps that need product, process, or security decisions"
    ]
  },
  {
    "workflowId": "research.do-architecture-and-data-model-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-architecture-and-data-model-research.md",
    "sourceHash": "8469ed51cd51eb91",
    "title": "Architecture & Data Model Research",
    "description": "Research brief for documenting system boundaries, key entities, and the data model behind Herald workflows.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-architecture-and-data-model-research",
      "Architecture & Data Model Research",
      "architecture-and-data-model-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Clarify how Herald is structured, which components own which responsibilities, and how core data moves through the system.",
    "outputExpectations": [
      "A high-level architecture summary with component boundaries.",
      "A simple entity map or data dictionary for the most important records and relationships.",
      "A list of integration points, source-of-truth decisions, and open design questions."
    ]
  },
  {
    "workflowId": "research.do-audit-logging-observability-traceability-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-audit-logging-observability-traceability-research.md",
    "sourceHash": "79a6c29e3358088e",
    "title": "Audit Logging, Observability, and Traceability Research",
    "description": "Research brief for logging, monitoring, traceability, and evidence capture across Herald workflows.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-audit-logging-observability-traceability-research",
      "Audit Logging, Observability, and Traceability Research",
      "audit-logging-observability-traceability-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Define the minimum evidence needed to understand what happened, when it happened, and which workflow or person was involved.",
    "outputExpectations": [
      "An audit event catalog with required fields.",
      "A traceability map showing how records connect across workflows.",
      "A monitoring checklist for failures, retries, and missing records.",
      "A note on sensitive data that should not appear in logs."
    ]
  },
  {
    "workflowId": "research.do-bible-overviews-free-tier-automation-plan",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-bible-overviews-free-tier-automation-plan.md",
    "sourceHash": "d26567ed74a0b90f",
    "title": "Bible Overviews Free-Tier Automation Plan",
    "description": "Research and implementation plan for automating Bible overview content with a free-first Google Apps Script and Firestore architecture.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-bible-overviews-free-tier-automation-plan",
      "Bible Overviews Free-Tier Automation Plan",
      "bible-overviews-free-tier-automation-plan"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This document defines how to automate the Bible overview pipeline for the site in a way that is as free as possible while still being fast, reliable, maintainable, and better than a paid alternative.\n\nThe core goal is not simply to store overview markdown. The goal is to create a content system that can:\n- keep the canonical Bible book order correct,\n- generate and update overview pages consistently,\n- publish content with low operational cost,\n- support search, filtering, and navigation,\n- make future expansion easy,\n- and do all of that using Google Apps Script and Firestore as the primary infrastructure backbone wherever possible.\n\nThis plan assumes the site must remain sustainable on a free or near-free budget for as long as possible.",
    "outputExpectations": [
      "a canonical Bible overview inventory,",
      "a Firestore content manifest,",
      "an automated README index,",
      "draft/review/publish support,",
      "free-tier-friendly operations,",
      "and a reusable content automation pattern for the rest of the site."
    ]
  },
  {
    "workflowId": "research.do-care-case-lifecycle-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-care-case-lifecycle-research.md",
    "sourceHash": "6bf67b40b54cff50",
    "title": "Care Case Lifecycle Research",
    "description": "Research notes for the care case lifecycle, from intake through follow-up, closure, and reporting.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-care-case-lifecycle-research",
      "Care Case Lifecycle Research",
      "care-case-lifecycle-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "consent",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Document the end-to-end care case lifecycle so the ministry team can standardize intake, triage, assignment, follow-up, escalation, and closure.",
    "outputExpectations": [
      "a clear lifecycle stage map",
      "required data fields per stage",
      "role and permission assumptions",
      "open questions for ministry leadership",
      "implementation notes for workflow automation"
    ]
  },
  {
    "workflowId": "research.do-communications-announcements-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-communications-announcements-research.md",
    "sourceHash": "bd7896f6abd62970",
    "title": "Communications and Announcements Research",
    "description": "Research plan for ministry announcements, approvals, scheduling, and channel coordination.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-communications-announcements-research",
      "Communications and Announcements Research",
      "communications-announcements-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "safeContactMethod",
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Clarify how announcements move from request to approval to publication across church communication channels.",
    "outputExpectations": [
      "an announcement intake checklist",
      "an approval and scheduling flow",
      "channel rules and timing guidance",
      "reusable content fields or template suggestions",
      "open questions for administration and pastoral review"
    ]
  },
  {
    "workflowId": "research.do-content-ingestion-import-migration-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-content-ingestion-import-migration-research.md",
    "sourceHash": "61bd8b554b3aa094",
    "title": "Content Ingestion, Import, and Migration Research",
    "description": "Research brief for importing legacy content, validating mappings, and migrating records safely.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-content-ingestion-import-migration-research",
      "Content Ingestion, Import, and Migration Research",
      "content-ingestion-import-migration-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Define how existing content moves into Herald without losing meaning, creating duplicates, or breaking downstream workflows.",
    "outputExpectations": [
      "A source-to-target mapping table.",
      "A migration runbook with checkpoints and rollback criteria.",
      "Validation rules for required data, formatting, and duplicates.",
      "A decision log for any transformations that change meaning or structure."
    ]
  },
  {
    "workflowId": "research.do-data-sync-migration-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-data-sync-migration-research.md",
    "sourceHash": "24c6149892befadf",
    "title": "Data Sync and Migration Research",
    "description": "Research brief for syncing data between systems, importing records, and planning safe migrations in the Do automation stack.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-data-sync-migration-research",
      "Data Sync and Migration Research",
      "data-sync-migration-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Identify how records move between systems, what can be synchronized safely, and what migration steps are needed to avoid data loss.",
    "outputExpectations": [
      "Recommended sync/migration approach per dataset",
      "Field-level ownership and conflict rules",
      "Validation and rollback checklist",
      "Risks, dependencies, and decisions required before execution"
    ]
  },
  {
    "workflowId": "research.do-documentation-gap-analysis",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-documentation-gap-analysis.md",
    "sourceHash": "bfc50896b0beb1a6",
    "title": "Documentation Gap Analysis",
    "description": "Research brief for comparing documented processes against actual workflows and identifying missing or stale documentation.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-documentation-gap-analysis",
      "Documentation Gap Analysis",
      "documentation-gap-analysis"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "safetyScreen",
      "ownerId",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Identify where current documentation does not fully explain the workflows, decisions, or operational realities needed to support Herald.",
    "outputExpectations": [
      "A ranked list of documentation gaps with a short rationale for each.",
      "Suggested new docs or doc sections to close the gaps.",
      "Notes on conflicting terminology, outdated links, or missing context."
    ]
  },
  {
    "workflowId": "research.do-editorial-publishing-media-release-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-editorial-publishing-media-release-research.md",
    "sourceHash": "7b1ccd074bad6168",
    "title": "Editorial Publishing and Media Release Research",
    "description": "Research brief for editorial workflows, publishing approvals, and media release coordination within the Do automation area.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-editorial-publishing-media-release-research",
      "Editorial Publishing and Media Release Research",
      "editorial-publishing-media-release-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Map the steps required to prepare, approve, publish, and distribute editorial or media content consistently.",
    "outputExpectations": [
      "A recommended publishing workflow by content type",
      "Approval and handoff requirements",
      "Asset, metadata, and scheduling checklist",
      "Post-release correction and archive guidance"
    ]
  },
  {
    "workflowId": "research.do-events-calendar-coordination-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-events-calendar-coordination-research.md",
    "sourceHash": "961e735b7a0ea07f",
    "title": "Events and Calendar Coordination Research",
    "description": "Research notes for event intake, calendar approval, coordination, and scheduling workflows.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-events-calendar-coordination-research",
      "Events and Calendar Coordination Research",
      "events-calendar-coordination-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "safeContactMethod",
      "ownerId",
      "nextAction",
      "closureReason"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Clarify how events are requested, approved, scheduled, and communicated so calendar coordination stays consistent across ministries.",
    "outputExpectations": [
      "an event lifecycle and approval map",
      "calendar ownership and conflict rules",
      "required data fields and status definitions",
      "communication and cancellation expectations",
      "unresolved questions for ministry leadership"
    ]
  },
  {
    "workflowId": "research.do-giving-stewardship-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-giving-stewardship-research.md",
    "sourceHash": "60d6be40793da799",
    "title": "Giving and Stewardship Research",
    "description": "Research plan for donation workflows, donor care, pledges, and stewardship communication.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-giving-stewardship-research",
      "Giving and Stewardship Research",
      "giving-stewardship-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Understand how giving, stewardship, acknowledgements, and donor communication should work as one operational flow.",
    "outputExpectations": [
      "a giving workflow map",
      "required donor and transaction fields",
      "receipt and acknowledgement rules",
      "stewardship communication checkpoints",
      "open questions for finance and pastoral review"
    ]
  },
  {
    "workflowId": "research.do-groups-community-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-groups-community-research.md",
    "sourceHash": "a40e473f596f5b96",
    "title": "Groups and Community Research",
    "description": "Research notes for group formation, membership, participation, and community engagement workflows.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-groups-community-research",
      "Groups and Community Research",
      "groups-community-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "safeContactMethod",
      "ownerId",
      "nextAction",
      "closureReason"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Document how groups are created, managed, and connected to people so community participation is easy to track and support.",
    "outputExpectations": [
      "a group lifecycle model",
      "membership and leadership rules",
      "participation and communication expectations",
      "integration points with care and guest workflows",
      "open questions for operations leadership"
    ]
  },
  {
    "workflowId": "research.do-guest-follow-up-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-guest-follow-up-research.md",
    "sourceHash": "8c03db0633456543",
    "title": "Guest Follow-Up Research",
    "description": "Research notes for guest follow-up workflows, response timing, and handoff rules.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-guest-follow-up-research",
      "Guest Follow-Up Research",
      "guest-follow-up-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "safeContactMethod",
      "confidentiality",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Document how guests are contacted, routed, and tracked after an initial visit or contact so follow-up is timely and consistent.",
    "outputExpectations": [
      "a follow-up timeline",
      "routing and ownership rules",
      "communication and status definitions",
      "escalation and fallback rules",
      "open questions for ministry leadership"
    ]
  },
  {
    "workflowId": "research.do-identity-membership-account-lifecycle-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-identity-membership-account-lifecycle-research.md",
    "sourceHash": "bfccd493572ec9cc",
    "title": "Identity, Membership, and Account Lifecycle Research",
    "description": "Research notes for identity, membership, and account lifecycle handling in church operations.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-identity-membership-account-lifecycle-research",
      "Identity, Membership, and Account Lifecycle Research",
      "identity-membership-account-lifecycle-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "consent",
      "confidentiality",
      "closureReason"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Define how a person moves through identity creation, membership tracking, account access, and changes over time.",
    "outputExpectations": [
      "a lifecycle model for person and account records",
      "recommended status definitions",
      "rules for duplicates, merges, and deactivations",
      "role-based access assumptions",
      "unresolved policy questions for leadership review"
    ]
  },
  {
    "workflowId": "research.do-integration-interoperability-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-integration-interoperability-research.md",
    "sourceHash": "3d2eeeca29ebfac4",
    "title": "Integration and Interoperability Research",
    "description": "Research brief for integration boundaries, contracts, interoperability rules, and external system fit.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-integration-interoperability-research",
      "Integration and Interoperability Research",
      "integration-interoperability-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Clarify how Herald connects to other systems so each integration has a clear contract, predictable failure behavior, and a stable path for change.",
    "outputExpectations": [
      "An integration catalog with owners, dependencies, and purpose.",
      "A contract checklist for schemas, auth, and versioning.",
      "A compatibility matrix for known systems and supported behaviors.",
      "A failure-mode summary with fallback and escalation guidance."
    ]
  },
  {
    "workflowId": "research.do-missions-sending-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-missions-sending-research.md",
    "sourceHash": "e2ecb02e837ba331",
    "title": "Missions and Sending Research",
    "description": "Research plan for missionary support, sending workflows, updates, and trip coordination.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-missions-sending-research",
      "Missions and Sending Research",
      "missions-sending-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "safeContactMethod",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Document how the church supports missionaries, sending partners, and mission trips from application through ongoing care.",
    "outputExpectations": [
      "a missions partner lifecycle",
      "support and update tracking requirements",
      "trip planning and approval checkpoints",
      "communication and prayer follow-up expectations",
      "open questions for finance, administration, and pastoral oversight"
    ]
  },
  {
    "workflowId": "research.do-notifications-reminders-handoff-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-notifications-reminders-handoff-research.md",
    "sourceHash": "bc8ea424ab4ce66d",
    "title": "Notifications, Reminders, and Handoff Research",
    "description": "Research brief for notification timing, reminder cadence, escalation, and human handoff behavior.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-notifications-reminders-handoff-research",
      "Notifications, Reminders, and Handoff Research",
      "notifications-reminders-handoff-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "safeContactMethod",
      "ownerId",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Clarify when the system should notify, remind, escalate, or hand off to a person so users receive timely support without noisy or redundant messages.",
    "outputExpectations": [
      "A notification matrix mapping triggers to channels and timing.",
      "A handoff policy covering escalation, retries, and owner assignment.",
      "A message template inventory for the most common reminders.",
      "Clear exception handling for suppressed, failed, or delayed notifications."
    ]
  },
  {
    "workflowId": "research.do-operational-maintenance-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-operational-maintenance-research.md",
    "sourceHash": "e6c8ecd7ae6a1ff0",
    "title": "Operational Maintenance Research",
    "description": "Research brief for ongoing upkeep, monitoring, incident response, and routine maintenance workflows in the Do automation area.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-operational-maintenance-research",
      "Operational Maintenance Research",
      "operational-maintenance-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "safetyScreen",
      "ownerId",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Define what must be monitored, maintained, and reviewed on a recurring basis so the automation stays reliable after launch.",
    "outputExpectations": [
      "A concise maintenance checklist by workflow",
      "Clear owner and escalation recommendations",
      "A prioritized list of operational risks and mitigations",
      "Any runbook or alerting gaps that should be addressed before release"
    ]
  },
  {
    "workflowId": "research.do-outreach-evangelism-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-outreach-evangelism-research.md",
    "sourceHash": "9d5ab1a8f0e2517e",
    "title": "Outreach and Evangelism Research",
    "description": "Research plan for outreach events, invite workflows, follow-up, and evangelism support.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-outreach-evangelism-research",
      "Outreach and Evangelism Research",
      "outreach-evangelism-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "ownerId",
      "nextAction",
      "closureReason"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Define a repeatable workflow for outreach efforts that invite people into church life and support consistent follow-up.",
    "outputExpectations": [
      "an outreach funnel or workflow map",
      "recommended fields for contact capture",
      "follow-up timing and ownership rules",
      "volunteer support needs and messaging guidelines",
      "unresolved questions for ministry leadership"
    ]
  },
  {
    "workflowId": "research.do-prayer-ministry-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-prayer-ministry-research.md",
    "sourceHash": "ace90492c0467348",
    "title": "Prayer Ministry Research",
    "description": "Research notes for prayer request intake, assignment, confidentiality, and follow-up.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-prayer-ministry-research",
      "Prayer Ministry Research",
      "prayer-ministry-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "self-harm",
      "abuse"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Define how prayer requests are received, reviewed, assigned, and followed up while protecting confidentiality and honoring ministry boundaries.",
    "outputExpectations": [
      "a prayer request lifecycle map",
      "confidentiality rules and access assumptions",
      "assignment and response workflow notes",
      "escalation criteria for urgent cases",
      "unresolved questions for ministry leaders"
    ]
  },
  {
    "workflowId": "research.do-publishing-and-release-workflow-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-publishing-and-release-workflow-research.md",
    "sourceHash": "2e3a62b49491fb56",
    "title": "Publishing & Release Workflow Research",
    "description": "Research brief for documenting drafting, review, publishing, and release practices for Herald content and automations.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-publishing-and-release-workflow-research",
      "Publishing & Release Workflow Research",
      "publishing-and-release-workflow-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Document how content or automation changes move from draft to release so teams can publish consistently and safely.",
    "outputExpectations": [
      "A step-by-step release workflow summary.",
      "A list of approval gates, required artifacts, and failure/rollback paths.",
      "Open questions about cadence, ownership, and automation opportunities."
    ]
  },
  {
    "workflowId": "research.do-reporting-analytics-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-reporting-analytics-research.md",
    "sourceHash": "a398f35792696bf9",
    "title": "Reporting and Analytics Research",
    "description": "Research brief for measurement strategy, reporting needs, dashboards, and analytics governance for Do automation.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-reporting-analytics-research",
      "Reporting and Analytics Research",
      "reporting-analytics-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "confidentiality",
      "ownerId",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Clarify which metrics matter, who needs them, and how reporting should support operational and ministry decisions.",
    "outputExpectations": [
      "A prioritized metric list with definitions",
      "Suggested dashboard/report views by audience",
      "Data source and trust-level notes",
      "Open questions for analytics implementation or governance"
    ]
  },
  {
    "workflowId": "research.do-retention-archival-lifecycle-end-state-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-retention-archival-lifecycle-end-state-research.md",
    "sourceHash": "d1682d48f36f0648",
    "title": "Retention, Archival, and Lifecycle End-State Research",
    "description": "Research brief for retention rules, archival states, deletion, and record end-state handling.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-retention-archival-lifecycle-end-state-research",
      "Retention, Archival, and Lifecycle End-State Research",
      "retention-archival-lifecycle-end-state-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Define how content moves through its full lifecycle, including active use, archival, legal hold, deletion, and other end-state outcomes.",
    "outputExpectations": [
      "A lifecycle policy summary with state definitions.",
      "A retention and disposition matrix by content type.",
      "An archival and restore checklist.",
      "A note describing legal hold, deletion, and exception handling."
    ]
  },
  {
    "workflowId": "research.do-search-navigation-discovery-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-search-navigation-discovery-research.md",
    "sourceHash": "9e9b925e5540bbda",
    "title": "Search, Navigation, and Discovery Research",
    "description": "Research brief for search behavior, browse paths, navigation structure, and content discovery across the Do experience.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-search-navigation-discovery-research",
      "Search, Navigation, and Discovery Research",
      "search-navigation-discovery-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Determine how users should find content quickly, move through related resources, and discover relevant next steps without needing support.",
    "outputExpectations": [
      "Recommended navigation structure and labels",
      "Search/filter requirements with priority levels",
      "Discovery aids such as related links, featured content, or prompts",
      "Open questions that need product or content owner decisions"
    ]
  },
  {
    "workflowId": "research.do-security-access-sensitive-data-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-security-access-sensitive-data-research.md",
    "sourceHash": "8c260f9f1d05aeb7",
    "title": "Security, Access & Sensitive Data Research",
    "description": "Research brief for understanding access control, permissions, and handling of sensitive or confidential data.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-security-access-sensitive-data-research",
      "Security, Access & Sensitive Data Research",
      "security-access-sensitive-data-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "confidentiality",
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Establish how Herald protects sensitive information, controls access, and documents security expectations for contributors and operators.",
    "outputExpectations": [
      "A sensitivity classification summary with recommended handling rules.",
      "A permissions and access matrix for the main roles and data categories.",
      "A list of security risks, unanswered questions, and must-not-break assumptions."
    ]
  },
  {
    "workflowId": "research.do-spiritual-care-research-planning",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-spiritual-care-research-planning.md",
    "sourceHash": "c9593cd5b371679d",
    "title": "Spiritual Care Research Planning",
    "description": "Workflow-first audit plan for translating imperfect spiritual-care workflows into decisions using the care taxonomy.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-research-planning",
      "Spiritual Care Research Planning",
      "research-planning",
      "spiritual-care-research-planning"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This document defines how to audit the spiritual-care workflows in the FlockOS/New_Covenant codebase, identify gaps, and turn those findings into decisions that can be reflected in the `care/` and `cases/` documentation.\n\nThe research goal is not to make the code feel ideal on the first pass. The goal is to observe what actually exists, trace the full workflow path, compare it with the spiritual-care taxonomy, and produce explicit decisions about what should be kept, clarified, renamed, split, merged, deferred, or escalated.\n\nThis research should cover the full lifecycle of a care request, not just isolated helpers or UI screens. A useful audit follows the request from entry point to closure and records what happened at each step.\n\nTypical audit surfaces include:\n\n- The Fold member and care UI\n- TheLife care hub helpers\n- The Good Shepherd next-step surfaces\n- Flock feed and inbox-style experiences\n- Spiritual-care event types such as `care_create`, `care_update`, `care_resolve`, `care_interaction`, `prayer`, `prayer_reply`, and `reconciliation`\n- Note, attachment, and prayer-handling paths\n- Handoff, triage, escalation, follow-up, and closure flows",
    "outputExpectations": [
      "A source-backed summary of how spiritual-care workflows currently behave",
      "A workflow-by-workflow trace showing how care moves through the system",
      "A gap list showing what is missing, inconsistent, unclear, or misrouted",
      "A decision log translating each gap into a concrete planning choice",
      "Cross-references to the `care/` and `cases/` docs that should be updated next",
      "A prioritized follow-up list for the next review cycle"
    ]
  },
  {
    "workflowId": "research.do-spiritual-care-workflow-map",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-spiritual-care-workflow-map.md",
    "sourceHash": "9393f0bd2496eb64",
    "title": "Spiritual Care Workflow Map",
    "description": "Folder map for spiritual-care care docs and case-level care taxonomy.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-spiritual-care-workflow-map",
      "Spiritual Care Workflow Map",
      "workflow-map",
      "spiritual-care-workflow-map"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "safetyScreen",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Read the `care/` docs first when you need shared process rules that apply across every spiritual-care group.",
      "Use the `cases/` docs when you need the workflow for a specific spiritual-care group or care type.",
      "Treat each case doc as the home for one group, and keep the exact care types listed inside that group instead of splitting them into extra folders.",
      "Match each care request to the correct group before reviewing details, so the taxonomy stays consistent across the library.",
      "Use this map to spot coverage gaps, duplicate ideas, or misplaced care types before changing any planning decision.",
      "Keep the folder structure flat at the top level and preserve the predictable filename pattern for future review."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis",
      "safety"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This doc shows how the `documentation/do` library is organized for fast review. The `care/` folder holds shared spiritual-care process guidance, while the `cases/` folder holds the nine spiritual-care groups and their exact care types.\n\nUse this map to quickly find the right doc for a workflow question, to confirm where a care type belongs, and to keep the folder flat and predictable at the top level.\n\n### Folder Structure\n\n```text\ndocumentation/do/\n├── README.md\n├── research/\n│   ├── do-spiritual-care-research-planning.md\n│   └── do-spiritual-care-workflow-map.md\n├── care/\n│   ├── do-spiritual-care-intake-triage.md\n│   ├── do-spiritual-care-risk-escalation.md\n│   ├── do-spiritual-care-follow-up-timelines.md\n│   └── do-spiritual-care-scripture-prayer.md\n└── cases/\n    ├── do-spiritual-care-crisis-safety.md\n    ├── do-spiritual-care-medical-physical.md\n    ├── do-spiritual-care-grief-loss.md\n    ├── do-spiritual-care-relationships.md\n    ├── do-spiritual-care-addiction-recovery.md\n    ├── do-spiritual-care-mental-emotional-health.md\n    ├── do-spiritual-care-discipleship-growth.md\n    ├── do-spiritual-care-life-situations.md\n    └── do-spiritual-care-general.md\n```",
    "outputExpectations": [
      "A fast reference for where to look first in the spiritual-care library.",
      "A clear separation between shared `care/` guidance and group-specific `cases/` guidance.",
      "A complete mapping of the nine spiritual-care groups and their exact care types.",
      "Predictable file paths that support quick scanning and side-by-side review.",
      "A stable structure that keeps future additions easy to place and easy to find."
    ]
  },
  {
    "workflowId": "research.do-taxonomy-terminology-naming-governance-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-taxonomy-terminology-naming-governance-research.md",
    "sourceHash": "2d1a118a3b753b63",
    "title": "Taxonomy, Terminology, and Naming Governance Research",
    "description": "Research brief for standardizing terminology, naming, and governance across Herald docs and workflows.",
    "family": "research",
    "kind": "reference",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-taxonomy-terminology-naming-governance-research",
      "Taxonomy, Terminology, and Naming Governance Research",
      "taxonomy-terminology-naming-governance-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Define a shared vocabulary and naming standard so people can find, understand, and maintain content without guessing what a term means or which label is current.",
    "outputExpectations": [
      "A concise glossary of approved terms.",
      "A naming convention summary with examples.",
      "A deprecation list for terms that should no longer be used.",
      "A governance note identifying who can approve terminology changes."
    ]
  },
  {
    "workflowId": "research.do-teaching-content-pipeline-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-teaching-content-pipeline-research.md",
    "sourceHash": "ae120fd64cac7d31",
    "title": "Teaching Content Pipeline Research",
    "description": "Research brief for documenting how teaching content is planned, created, reviewed, prepared, and distributed.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-teaching-content-pipeline-research",
      "Teaching Content Pipeline Research",
      "teaching-content-pipeline-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Map the end-to-end pipeline for teaching content so Herald can support consistent creation, review, reuse, and delivery.",
    "outputExpectations": [
      "A pipeline summary from idea to published teaching asset.",
      "A list of reusable asset types, review checkpoints, and dependencies.",
      "Recommendations for standard templates or metadata that would reduce friction."
    ]
  },
  {
    "workflowId": "research.do-template-scaffold-generator-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-template-scaffold-generator-research.md",
    "sourceHash": "4da9ee007d12f3a6",
    "title": "Template, Scaffold, and Generator Research",
    "description": "Research brief for reusable templates, starter scaffolds, and content generators.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-template-scaffold-generator-research",
      "Template, Scaffold, and Generator Research",
      "template-scaffold-generator-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Standardize how new docs, workflows, and reusable assets are created so teams can start from a predictable baseline instead of recreating structure each time.",
    "outputExpectations": [
      "A template catalog with purpose, owner, and use case.",
      "A generator spec describing inputs, outputs, and defaults.",
      "Standard frontmatter or metadata blocks for new files.",
      "A simple usage guide for choosing the right scaffold."
    ]
  },
  {
    "workflowId": "research.do-volunteering-serving-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-volunteering-serving-research.md",
    "sourceHash": "70eec21bf433a646",
    "title": "Volunteering and Serving Research",
    "description": "Research plan for volunteer recruitment, onboarding, scheduling, and service coordination.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-volunteering-serving-research",
      "Volunteering and Serving Research",
      "volunteering-serving-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "safeContactMethod",
      "ownerId",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Define a practical workflow for recruiting, onboarding, scheduling, and supporting volunteers across ministry serving roles.",
    "outputExpectations": [
      "a clear volunteer lifecycle",
      "recommended data fields for volunteer records",
      "scheduling and reminder rules",
      "handoff points between ministry leaders and admins",
      "open questions and implementation risks"
    ]
  },
  {
    "workflowId": "research.do-workflow-inventory-surface-mapping",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-workflow-inventory-surface-mapping.md",
    "sourceHash": "b9d0681c22508c1f",
    "title": "Workflow Inventory & Surface Mapping",
    "description": "Research brief for mapping current ministry and operations workflows, user-facing surfaces, and system touchpoints.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-workflow-inventory-surface-mapping",
      "Workflow Inventory & Surface Mapping",
      "workflow-inventory-surface-mapping"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Build a shared inventory of the real-world workflows that Herald supports and the surfaces where those workflows are initiated, reviewed, updated, or completed.",
    "outputExpectations": [
      "A concise inventory table with workflow name, surface, owner, trigger, and related systems.",
      "A short list of high-risk gaps, duplicates, or undocumented handoffs.",
      "Follow-up questions that should be answered before design or implementation work begins."
    ]
  },
  {
    "workflowId": "research.do-worship-planning-service-flow-research",
    "sourcePath": "New_Covenant/iris/docs/do/research/do-worship-planning-service-flow-research.md",
    "sourceHash": "8f1a4f8eb72b8b9e",
    "title": "Worship Planning and Service Flow Research",
    "description": "Research plan for service planning, worship set coordination, and Sunday flow management.",
    "family": "research",
    "kind": "research-brief",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "do-worship-planning-service-flow-research",
      "Worship Planning and Service Flow Research",
      "worship-planning-service-flow-research"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "safeContactMethod",
      "nextAction",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Define a reliable workflow for planning worship services from early preparation through rehearsal, execution, and follow-up.",
    "outputExpectations": [
      "a worship planning workflow",
      "a service-order or run-of-show structure",
      "team assignment and communication checkpoints",
      "deadline guidance for songs, slides, media, and rehearsals",
      "open questions for worship leadership and production teams"
    ]
  },
  {
    "workflowId": "research.readme",
    "sourcePath": "New_Covenant/iris/docs/do/research/README.md",
    "sourceHash": "825023c2757bfa07",
    "title": "Research Docs",
    "description": "Index of active research briefs used to shape Herald automation and documentation decisions.",
    "family": "research",
    "kind": "index",
    "group": "research",
    "groupLabel": "Research",
    "caseType": "",
    "aliases": [
      "readme",
      "Research Docs",
      "research-docs-index"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": false,
    "requiredIntakeFields": [],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This folder collects short, decision-oriented research briefs that define naming, workflow, integration, retention, and content management choices for Herald.",
    "outputExpectations": []
  },
  {
    "workflowId": "security.do-7-tier-permissions-model",
    "sourcePath": "New_Covenant/iris/docs/do/security/do-7-tier-permissions-model.md",
    "sourceHash": "5f25c3ad290d8fb5",
    "title": "Do 7-Tier Permissions Model",
    "description": "Proposed seven-tier permission ladder for ministry automation, based on the current GAS backend role and module matrix.",
    "family": "security",
    "kind": "security-policy",
    "group": "security",
    "groupLabel": "Security",
    "caseType": "",
    "aliases": [
      "do-7-tier-permissions-model",
      "Do 7-Tier Permissions Model",
      "7-tier-permissions-model"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This document shows what a 7-tier permissions system would look like for the current GAS backend.\n\nThe current master code already uses:\n- `ROLE_LEVELS` for backend authorization,\n- `EXP_ROLE_LEVELS` for the app-facing role ladder,\n- and `MODULE_PERMISSIONS` for module ceilings.\n\nToday the system is effectively a **0–5 ladder plus a lead-pastor layer plus a seed-admin bypass**.  \nA true 7-tier model would make those top two layers explicit as **Tier 6** and **Tier 7**.",
    "outputExpectations": []
  },
  {
    "workflowId": "security.do-authentication-best-practices",
    "sourcePath": "New_Covenant/iris/docs/do/security/do-authentication-best-practices.md",
    "sourceHash": "8408755bf903a1a0",
    "title": "Do Authentication Best Practices",
    "description": "Authentication, access-control, and account-safety guidance for safeguarding ministry data and automation workflows.",
    "family": "security",
    "kind": "security-policy",
    "group": "security",
    "groupLabel": "Security",
    "caseType": "",
    "aliases": [
      "do-authentication-best-practices",
      "Do Authentication Best Practices",
      "authentication-best-practices"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent",
      "confidentiality",
      "safetyScreen",
      "ownerId",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "safety",
      "abuse",
      "end-of-life",
      "emergency-services"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide when you are designing or reviewing authentication for ministry automation, data access, admin tools, or workflow handoffs.\n\nThe goal is to protect people, data, and ministry operations by making identity, access, and audit behavior clear and conservative.",
    "outputExpectations": []
  },
  {
    "workflowId": "security.do-background-screening-and-checkr",
    "sourcePath": "New_Covenant/iris/docs/do/security/do-background-screening-and-checkr.md",
    "sourceHash": "6cf3778d9a04d181",
    "title": "Do Background Screening and Checkr Integration",
    "description": "Application-wide background screening logic for ministry access, with optional Checkr integration when activated.",
    "family": "security",
    "kind": "security-policy",
    "group": "security",
    "groupLabel": "Security",
    "caseType": "",
    "aliases": [
      "do-background-screening-and-checkr",
      "Do Background Screening and Checkr Integration",
      "background-screening-and-checkr"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 5,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "consent"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide to handle background-screening logic for the application as a whole.\n\nThis is not just an HR concern. In this system, background screening is part of the security model because it can affect:\n- who may onboard,\n- who may access sensitive workflows,\n- who may serve in higher-trust roles,\n- and how the application decides whether to grant or withhold elevated access.\n\nWhen activated, the application can connect to **Checkr** through API-based screening workflows. When Checkr is not activated, the system should still have a clear manual review path.",
    "outputExpectations": []
  },
  {
    "workflowId": "security.readme",
    "sourcePath": "New_Covenant/iris/docs/do/security/README.md",
    "sourceHash": "59779d0cea8e045d",
    "title": "Do Security",
    "description": "Security planning docs for authentication, access control, and data safeguarding in ministry workflows.",
    "family": "security",
    "kind": "index",
    "group": "security",
    "groupLabel": "Security",
    "caseType": "",
    "aliases": [
      "readme",
      "Do Security"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 5,
    "screeningRequired": true,
    "requiredIntakeFields": [
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this folder for authentication, authorization, and data-protection best practices that support the ministry automation workspace.",
    "outputExpectations": []
  },
  {
    "workflowId": "teach.do-bible-study-lesson",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-bible-study-lesson.md",
    "sourceHash": "544e12ba93c649ea",
    "title": "Bible Study Lesson",
    "description": "Prepare an interactive Bible study lesson for groups, classes, and discipleship settings.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-bible-study-lesson",
      "Bible Study Lesson",
      "bible-study-lesson"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Define the learning context before outlining the lesson. Note the group size, spiritual maturity, time limit, and whether the lesson will be led live, shared as a facilitator guide, or distributed through the ministry system for collaborative editing. Choose a passage that fits the group’s needs and participation level.",
      "Study the passage with observation, interpretation, and application in view. Identify repeated words, structure, key terms, cross-references, and the main teaching point. Use word-study and passage-guide tools so the lesson stays text-driven and not opinion-driven.",
      "Build the lesson for interaction. Include an opener, a reading of the text, guided questions, teaching notes, and a response segment with prayer or practice. Make room for questions, testimonies, and discussion so the lesson feels participatory rather than lecture-only.",
      "Emphasize clarity, disciple-making, and real-life application. Help the group see what the passage says, what it means, and how obedience looks in ordinary ministry life. Avoid overloading the lesson with too much data, forcing a single answer for every person, or drifting into a sermon that leaves no room for dialogue.",
      "Add FEED/TheHarvest support details where the lesson will be used. Note whether handouts, slides, leader notes, or follow-up prompts are attached, and specify how the file should be shared in real time with other facilitators. If the lesson is part of a series, connect it to the broader plan and mention what comes before and after it.",
      "Version and archive the lesson carefully. Save the working copy with the lesson title, date, and version, and record feedback after the group meets so revisions can be made for future use. Mark the final copy as leader-ready, participant-ready, or archive-only so the ministry team knows how it should be reused."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this format when the goal is guided learning rather than a sermon delivery: small groups, discipleship classes, FEED training rooms, TheHarvest study gatherings, new-member classes, and other collaborative teaching spaces. It should help people observe the text, understand it, discuss it, and apply it together.",
    "outputExpectations": [
      "A lesson header that identifies the passage, group setting, and intended learners.",
      "A text-based teaching outline with discussion prompts and application notes.",
      "Facilitator guidance for pacing, participation, and follow-up prayer.",
      "FEED/TheHarvest sharing notes, including attachments, access level, and collaboration status.",
      "A version record that indicates whether the lesson is draft, finalized, or archived."
    ]
  },
  {
    "workflowId": "teach.do-biographical-bible-study",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-biographical-bible-study.md",
    "sourceHash": "9c42abb2836bf131",
    "title": "Biographical Bible Study",
    "description": "Biographical Bible study method for tracing people, character movement, and discipleship implications.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-biographical-bible-study",
      "Biographical Bible Study",
      "biographical-bible-study"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Identify the person you want to study and collect every relevant biblical reference so the study is based on the full canonical witness rather than a single favorite story.",
      "Arrange the references in narrative order where possible, then note major events, relationships, decisions, crises, and repeated patterns that shape the person’s story.",
      "Distinguish between what the text actually says, what the text implies, and what you may be tempted to speculate, especially when the person’s motives are only partly revealed.",
      "Read the person’s life in relation to God’s redemptive purposes, so you can see whether the narrative emphasizes faith, warning, leadership, repentance, covenant faithfulness, or another discipleship theme.",
      "Turn the findings into sermon prep, Bible study, and teaching-plan creation by highlighting the person’s role in the passage, the theological lessons the text draws from the life, and the application that best fits the congregation or group.",
      "Check the final summary for guardrails, making sure the study does not flatten the person into a hero, villain, or personality sketch detached from the text’s actual theology."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use a biographical Bible study when a person’s life, calling, failure, repentance, leadership, or faith journey is central to the teaching goal. This method helps you trace how a biblical figure is presented across the canon, how the text interprets that person, and how the life story can support sermon prep, Bible study, and teaching-plan creation without turning the narrative into a shallow moral example.",
    "outputExpectations": [
      "A reference map that lists the key passages tied to the person’s life and development.",
      "A character and timeline summary that highlights major turning points, relationships, and repeated patterns.",
      "A theological reading of how the text presents the person within God’s larger story.",
      "Sermon, Bible study, or teaching-plan takeaways that connect the biography to discipleship and ministry needs.",
      "A caution list that marks speculation, missing data, and places where the biography should not be used as a stand-alone proof for application."
    ]
  },
  {
    "workflowId": "teach.do-book-study",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-book-study.md",
    "sourceHash": "384bf9fd91c51c3b",
    "title": "Book Study",
    "description": "Focused whole-book study method for sermon prep, Bible study, and teaching-plan creation.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-book-study",
      "Book Study",
      "book-study"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Define the scope of the book study by naming the biblical book, the audience, and the ministry question you are trying to answer.",
      "Read the book repeatedly in context, noting major sections, repeated words, transitions, and turning points without stopping to build the final outline too early.",
      "Map the book’s flow of thought so you can identify how each passage contributes to the book’s purpose, tone, and theological emphasis.",
      "Gather supporting observations from related study methods only after the book-level reading is clear, so word study, passage guide work, and cultural notes serve the book’s message instead of replacing it.",
      "Translate the findings into sermon prep, Bible study, and teaching-plan creation by naming the book’s big idea, key movements, application threads, and the order in which you should teach the material.",
      "Review the summary with your team or collaborators, noting any open questions, interpretive uncertainties, or places where the book-level reading should be revisited before finalizing the series or lesson plan."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use a book study when the teaching need is bigger than a single passage and you need the message of an entire biblical book to shape interpretation, sermon planning, and group learning. This method helps you see the book’s argument, repeated themes, structure, and pastoral movement before you build a sermon or teaching plan from smaller units.",
    "outputExpectations": [
      "A concise book map that names the book’s purpose, structure, and major sections.",
      "A short summary of the book’s central message and the ministry question it answers.",
      "Passage-level notes showing how key texts support the book-level argument.",
      "Teaching and sermon implications that can be used in outline building or lesson planning.",
      "A clear list of assumptions, uncertainties, and guardrails so the study is not overextended or used as a proof-texting shortcut."
    ]
  },
  {
    "workflowId": "teach.do-canonical-redemptive-historical-study",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-canonical-redemptive-historical-study.md",
    "sourceHash": "f793bd12ed8dcf51",
    "title": "Canonical Redemptive-Historical Study",
    "description": "Read a passage within the whole Bible’s storyline, covenant flow, and redemptive purpose.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-canonical-redemptive-historical-study",
      "Canonical Redemptive-Historical Study",
      "canonical-redemptive-historical-study"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "ownerId",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Locate the passage in the Bible’s storyline. Identify where the text sits in the book, the covenant history, and the broader movement of Scripture. Note whether it belongs to promise, law, wisdom, exile, fulfillment, apostolic teaching, or another major redemptive moment.",
      "Trace the canonical connections. Look for themes, promises, patterns, types, institutions, and repeated language that reappear elsewhere in Scripture. Use the canon to clarify the passage, but keep the immediate context in control.",
      "Identify the redemptive contribution. Ask how the passage reveals God’s character, human need, covenant faithfulness, judgment, mercy, or the advance of the kingdom. State what the passage contributes to the unfolding story instead of reducing it to a single timeless principle.",
      "Connect to Christ and the New Covenant carefully. Show how the text is fulfilled, intensified, or clarified in Christ without flattening every detail into a direct allegory. Keep the movement from the original setting to Christ to the church explicit and text-based.",
      "Form sermon-ready applications. Translate the redemptive meaning into worship, discipleship, mission, and pastoral care for the local church. Make sure the application follows the passage’s place in the storyline, not just a topical theme imported from outside.",
      "Store the canonical map for reuse. Save the storyline notes, cross-references, covenant links, and Christ connection in the shared sermon record. Tag the file so it can inform sermon construction, version history, and realtime collaboration without redoing the redemptive mapping later."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use the canonical redemptive-historical method to place a passage inside the full story of Scripture: creation, fall, promise, redemption, consummation, and the New Covenant life of God’s people. This method helps the teacher see how a passage contributes to the whole canon, points to Christ faithfully, and avoids forced allegory or disconnected moral lessons. It also produces sermon notes that can be stored, reviewed, and shared across teaching plans and service planning.",
    "outputExpectations": [
      "A canonical location note showing how the passage fits within the book and the whole Bible.",
      "A redemptive-historical summary that names the passage’s role in God’s unfolding plan.",
      "A faithful Christ connection that avoids allegory, overstatement, or detached moralism.",
      "Application notes that move from the canonical meaning to local-church ministry and discipleship.",
      "A stored study map with cross-references and storyline tags for later sermon prep and review."
    ]
  },
  {
    "workflowId": "teach.do-congregational-handout-and-notes",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-congregational-handout-and-notes.md",
    "sourceHash": "7a4f68ae7943840e",
    "title": "Congregational Handout and Notes",
    "description": "Prepare congregational handouts and leader notes that reinforce the sermon without crowding the spoken message.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-congregational-handout-and-notes",
      "Congregational Handout and Notes",
      "congregational-handout-and-notes"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Decide who the handout serves.",
      "Pull only the essentials from the sermon draft.",
      "Keep the spoken message lean and the notes useful.",
      "Add space for response and follow-up.",
      "Separate public notes from leader-only notes.",
      "Share the handout with the live sermon workspace."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide to prepare printed or digital handouts, leader notes, and reflection space that help the congregation follow the sermon after it is delivered. It protects the clarity of the spoken message while capturing supporting material that belongs in notes, not in the pulpit. It also keeps the handout aligned with the final sermon package so other leaders can view, comment on, and use it in real time for teaching, discussion, and follow-up care.",
    "outputExpectations": [
      "A congregation-facing handout that highlights the sermon’s main idea and response.",
      "Leader notes that preserve extra detail without overloading the spoken message.",
      "Reflection or discussion space that helps people engage the sermon after delivery.",
      "Clear separation between what is spoken, what is printed, and what is leader-only.",
      "A final sermon package asset that can be reused in real time by other ministry leaders."
    ]
  },
  {
    "workflowId": "teach.do-cultural-background-study",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-cultural-background-study.md",
    "sourceHash": "3d0dfd66232d3b26",
    "title": "Cultural Background Study",
    "description": "Cultural and background study method for clarifying historical, social, and audience context.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-cultural-background-study",
      "Cultural Background Study",
      "cultural-background-study"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Name the exact background question you need to answer, such as a social custom, historical event, political situation, geographic setting, economic practice, or audience concern.",
      "Gather background information from reliable sources and keep track of whether each detail is certain, likely, or still debated.",
      "Compare the background data with the biblical text to see what is directly supported, what is only explanatory, and what would be speculative if pushed too far.",
      "Use the context to clarify the original audience’s experience, the force of the author’s language, and the practical meaning of the passage in its first setting.",
      "Convert the findings into sermon prep, Bible study, and teaching-plan creation by showing how the background supports the text’s main emphasis, helps answer questions, or removes confusion for modern listeners.",
      "Review the final notes for guardrails so background material stays in service to the text, does not become a replacement for exegesis, and does not claim more certainty than the evidence allows."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use a cultural and background study when the text contains customs, geography, social structures, political pressures, or historical settings that affect how the passage should be heard. This method helps you clarify the world behind the text so your sermon prep, Bible study, and teaching-plan creation are grounded in context without letting background material take control of the passage’s main point.",
    "outputExpectations": [
      "A short background brief that names the question, the setting, and the relevant evidence.",
      "A list that separates certain facts, plausible inferences, and open questions.",
      "Explanatory notes showing how the background clarifies the passage without replacing interpretation.",
      "Teaching and sermon implications that help a congregation or group hear the text more faithfully.",
      "A caution section that identifies speculative claims, weak sources, and any background detail that should stay secondary to the passage itself."
    ]
  },
  {
    "workflowId": "teach.do-devotional-message",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-devotional-message.md",
    "sourceHash": "45ad267ff3112e42",
    "title": "Devotional Message",
    "description": "Prepare a short devotional message for reflection, encouragement, and prayer.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-devotional-message",
      "Devotional Message",
      "devotional-message"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Choose a brief passage, a single verse, or a tightly focused theme from Scripture. State the audience, the time available, and whether the devotion will be spoken live, shared in writing, or used in a ministry app or feed. Keep the scope small enough to be absorbed quickly.",
      "Study the text for one primary insight and one clear response. Use passage and word study tools as needed, but do not build a large argument or load the devotion with multiple branches of thought. The goal is clarity, not volume.",
      "Shape the message in a simple devotional flow: read the text, reflect on its meaning, connect it to daily life, and end in prayer or a practical charge. Keep the outline easy to follow and easy to repeat in conversation.",
      "Emphasize intimacy, gratitude, dependence, and obedience. Use warm language, concrete examples, and a tone that helps people slow down before God. Avoid heavy technical detail, controversial side issues, or a try-hard inspirational style that sounds detached from the text.",
      "Tie the devotion to the ministry rhythm it supports. Note if it opens a FEED gathering, accompanies a TheHarvest update, supports a prayer set, or is being posted as a short collaborative encouragement. Include any sharing instructions that help the team publish or reuse it consistently.",
      "Save and review the devotional with version awareness. Store the draft in the proper ministry folder with title, date, and version note, then share it for quick review if others will read or edit it. Mark whether the final copy is public, internal, or archived for later reuse."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this format for brief teaching moments such as staff devotionals, morning reflections, small-group openings, midweek encouragement, or short FEED/TheHarvest touchpoints. It should help listeners linger with one passage, one truth, and one practical response without becoming a full sermon or a lecture.",
    "outputExpectations": [
      "A short context note naming the audience, setting, and intended length.",
      "One passage or theme with a single central insight.",
      "A brief devotional flow that includes reflection and application.",
      "FEED/TheHarvest sharing and publication notes, including version and visibility.",
      "A closing prayer prompt or response line that can be used immediately."
    ]
  },
  {
    "workflowId": "teach.do-doctrinal-sermon",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-doctrinal-sermon.md",
    "sourceHash": "3fd0fe5eb8369f27",
    "title": "Doctrinal Sermon",
    "description": "Doctrinal sermon workflow for teaching a biblical doctrine clearly, carefully, and in New Covenant context.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-doctrinal-sermon",
      "Doctrinal Sermon",
      "doctrinal-sermon"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Name the doctrine precisely and define the teaching question. Clarify what the sermon affirms, what it rejects, and why the doctrine matters for the church’s faithfulness and everyday ministry.",
      "Gather the key biblical texts that speak most clearly to the doctrine. Read them in context and let Scripture establish the boundaries of the teaching instead of relying on theological shorthand alone.",
      "Organize the sermon by biblical development. Show how the doctrine appears in promise, pattern, fulfillment, and church application, especially where the New Covenant gives clarity or completion.",
      "Keep the sermon pastoral and practical. Explain how the doctrine shapes worship, repentance, assurance, holiness, community life, service planning, and shared ministry decisions inside The Harvest.",
      "Guard against abstraction, speculation, and over-systematizing. Avoid treating the doctrine as a detached concept; instead, keep the language biblical, the arguments traceable, and the applications grounded in the actual text.",
      "Store the draft in The Harvest with the supporting passages, outline, and revision notes. Share it with the teaching team through the relevant service plan or event record so the doctrine can be reviewed, edited, and reused consistently."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use a doctrinal sermon when the church needs a focused teaching message on a core truth of the faith, such as the Trinity, justification, sanctification, the church, the Holy Spirit, the kingdom of God, or the New Covenant itself. This format serves discipleship, leadership training, and FEED planning when the goal is clarity about what Scripture teaches across many passages.\n\nA doctrinal sermon should not feel abstract or disconnected from life. It should show how the doctrine is rooted in Scripture, shaped by the whole canon, fulfilled in Christ, and lived out in the congregation through worship, obedience, and mission.",
    "outputExpectations": [
      "A clearly defined doctrine with a biblically grounded purpose.",
      "Supporting passages handled in context and arranged by theological movement.",
      "A sermon outline that shows development from Scripture to church life.",
      "Applications that connect doctrine to worship, discipleship, and ministry practice.",
      "A shared The Harvest record with linked notes, passages, and revision history."
    ]
  },
  {
    "workflowId": "teach.do-evangelistic-sermon",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-evangelistic-sermon.md",
    "sourceHash": "1bc328e90ef73633",
    "title": "Evangelistic Sermon",
    "description": "Prepare a gospel-forward sermon for seekers, new believers, and outreach settings.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-evangelistic-sermon",
      "Evangelistic Sermon",
      "evangelistic-sermon"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "safeContactMethod",
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Define the audience and moment before drafting the sermon. Note whether this is for a TheHarvest service, a FEED outreach gathering, a mixed congregation, or an invitation-focused closing. State the response you want the hearer to understand, not just the subject you want to cover.",
      "Study one primary passage and trace the gospel movement in it. Use passage-guide and word-study work to identify the human problem, God’s holiness, Christ’s saving work, and the response the text calls for. Avoid building the message around a vague theme or a moral lesson detached from the passage.",
      "Shape the sermon around a simple, memorable flow. A common pattern is text, human need, Christ’s answer, and invitation, with a brief conclusion that restates the gospel. Keep the outline clear enough that a first-time hearer can follow it without insider knowledge.",
      "Emphasize clarity, hope, and urgency. Explain biblical terms, use concrete illustrations, and speak directly to conscience and trust in Christ. Avoid jargon, side debates, clever detours, manipulation, or pressure tactics that confuse the gospel appeal.",
      "Prepare the response section and follow-up plan together. Include a clear call to repentance and faith, prayer ministry instructions, baptism or counseling next steps, and any FEED or TheHarvest follow-up assignments. If the sermon will be shared in the ministry system, mark any sensitive notes separately from the public draft.",
      "Store, share, and review the sermon in real time. Save the working draft with date, venue, and version notes, then share it in the collaborative ministry workspace so reviewers can comment before delivery. After the event, archive the delivered version, log revisions, and keep a record of what follow-up communication was triggered."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this format when the primary aim is to proclaim Christ clearly to people who may not yet believe, especially in FEED gatherings, TheHarvest events, baptism services, outreach nights, and other public ministry moments. It should remove unnecessary barriers, present the gospel plainly, and end with a real invitation to repentance and faith.",
    "outputExpectations": [
      "A short header note naming the target audience, ministry setting, and intended response.",
      "A clear gospel-centered outline with one main point and a simple progression.",
      "The core invitation language for repentance, faith, and next-step counseling.",
      "FEED/TheHarvest storage and sharing notes, including version label and access considerations.",
      "A final review note identifying what was changed, what was delivered, and what follow-up remains."
    ]
  },
  {
    "workflowId": "teach.do-expository-sermon",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-expository-sermon.md",
    "sourceHash": "903436415028196a",
    "title": "Expository Sermon",
    "description": "Expository sermon workflow for preaching one passage with faithful context and clear application.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-expository-sermon",
      "Expository Sermon",
      "expository-sermon"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Select one primary passage and define its natural boundaries before writing anything else. Confirm the genre, immediate context, and major argument so the sermon stays anchored in the text instead of in a theme you already wanted to preach.",
      "Work through passage study, word study, and context notes together. Identify the main idea, the flow of thought, repeated terms, contrasts, commands, promises, and any New Covenant fulfillment that clarifies the passage’s meaning.",
      "Build the sermon around the passage’s own structure. Let the outline follow the text’s movements, not a topical list, and make sure each point serves the author’s intent rather than becoming a separate mini-sermon.",
      "Shape application from the text’s logic and the congregation’s real life. Keep the application specific, pastoral, and ministry-aware, with room for FEED collaborators to add illustrations, service-plan connections, or discipleship follow-up later.",
      "Check Scripture fidelity before sharing. Compare the sermon against the passage, the broader biblical witness, and the New Covenant framework so the message stays Christ-centered, balanced, and free from overstatement.",
      "Store and share the finished draft in The Harvest as the sermon record for the relevant event or service plan. Attach the outline, study notes, and version history so other leaders can review, revise, and reuse the work in real time."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use an expository sermon when the goal is to let one passage set the agenda for the message. This is the strongest default for FEED-aligned teaching because it keeps the preacher tethered to Scripture, helps the congregation hear the text in context, and supports shared study in The Harvest without drifting into personal opinion or proof-texting.\n\nAn expository sermon should show what the passage says, what it meant to the original audience, how it fits the New Covenant storyline, and how it calls the church to respond today.",
    "outputExpectations": [
      "One primary text with a clear big idea, stated in plain language.",
      "An outline that follows the passage’s structure and preserves the author’s flow.",
      "Applications that arise from the text, not from imported assumptions.",
      "A brief note on how the sermon connects to the New Covenant and discipleship.",
      "A shared draft stored in The Harvest and linked to the related service plan or event."
    ]
  },
  {
    "workflowId": "teach.do-historical-grammatical-study",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-historical-grammatical-study.md",
    "sourceHash": "cc6e2d678e90fd36",
    "title": "Historical-Grammatical Study",
    "description": "Study Scripture by authorial intent, historical context, grammar, and genre before sermon preparation.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-historical-grammatical-study",
      "Historical-Grammatical Study",
      "historical-grammatical-study"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Define the text and translation base. Choose the passage boundaries, note the genre, and record the translation or original-language text you are working from. Identify any textual issues, paragraph breaks, or discourse markers that shape the unit.",
      "Reconstruct the historical setting. Gather what is known about the author, audience, occasion, geography, covenant moment, and social setting. Note anything that clarifies why the passage was written and what problem or hope it addresses.",
      "Analyze grammar and syntax. Track sentence flow, clause relationships, key verbs, subjects, objects, modifiers, and connective words. Use word studies only when they serve the sentence and paragraph, not as isolated definitions detached from usage.",
      "Read for authorial intent. Ask what claim the passage makes, what response it seeks, and how the argument develops from beginning to end. Let the text’s logic control your conclusions instead of importing a topic and forcing the passage to fit it.",
      "Check theological and interpretive guardrails. Compare the findings with the broader teaching of Scripture, but do not flatten the passage into a generic doctrinal statement. Avoid proof-texting, anachronistic applications, and unsupported leaps from original audience to modern audience.",
      "Export and store the study notes. Save historical notes, grammatical observations, interpretive conclusions, and follow-up questions in the shared teaching record. Link the work to the passage guide, sermon outline, and review/versioning process so collaborators can trace every conclusion back to the source text."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use the historical-grammatical method to understand what the biblical author meant to the original audience in the original context. This approach protects the church from anachronism, proof-texting, and creative readings that ignore grammar, history, or literary purpose. It also produces precise notes that can move directly into sermon construction and shared study storage.",
    "outputExpectations": [
      "A passage-specific historical context summary that supports the interpretation without overclaiming.",
      "A grammar and syntax outline that shows how the author’s argument or instructions move.",
      "A short statement of authorial intent that reflects the passage’s immediate purpose.",
      "A list of interpretive guardrails that prevents anachronism, proof-texting, and forced readings.",
      "A stored study artifact that can be reused in sermon prep, realtime collaboration, and later revision."
    ]
  },
  {
    "workflowId": "teach.do-inductive-bible-study",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-inductive-bible-study.md",
    "sourceHash": "a38bf38db37c8138",
    "title": "Inductive Bible Study",
    "description": "Use observation, interpretation, and application to study a passage for sermon prep and shared teaching notes.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-inductive-bible-study",
      "Inductive Bible Study",
      "inductive-bible-study"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "nextAction",
      "dueDate",
      "closureReason"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Set the boundaries of the passage. Identify the natural unit, the surrounding context, the genre, and any repeated scene or argument markers. Note the translation you are using and record any alternate renderings that matter for the study.",
      "Observe the text in detail. Mark repeated words, contrasts, comparisons, commands, promises, questions, action verbs, transitions, and changes in speaker or audience. Record what is explicitly present before drawing conclusions.",
      "Interpret within context. Ask what the author is saying to the original audience and why. Let the immediate paragraph, the book’s flow, and the larger canonical setting shape the meaning. Compare Scripture with Scripture, but do not use cross-references to override the passage itself.",
      "Test the main idea. Summarize the passage in one or two sentences, then check whether that summary matches the grammar, structure, and emphasis of the text. If the summary depends on a detail the passage does not stress, revise it.",
      "Move to application carefully. Derive applications for the individual believer, the church, and the mission of God. Keep application concrete, faithful to the passage, and proportionate to the text. Avoid jumping straight to moral advice when the passage is primarily about God’s action, covenant faithfulness, or gospel announcement.",
      "Store the study for sermon prep. Save observations, interpretive notes, applications, and open questions in the shared sermon or teaching record. Tag the study with the passage, date, series name, and version so it can feed the passage guide, outline, review, and realtime collaboration workflow."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use the inductive method to move from the text to the message without skipping the text. This study style starts with close observation, then careful interpretation, and finally specific application. It is especially useful when preparing sermons, passage guides, and shared teaching notes because it creates a clear paper trail from what the passage says to what the church should do with it.",
    "outputExpectations": [
      "A clear observation list showing key words, structure, and context clues from the passage.",
      "A concise interpretive summary that stays anchored to the text and avoids speculation.",
      "A practical application set that includes personal, congregational, and missional implications.",
      "Notes that identify any cross-references, uncertainties, or alternate readings worth revisiting.",
      "A stored, shareable study record that can be reused in sermon prep, versioning, and follow-up discussion."
    ]
  },
  {
    "workflowId": "teach.do-narrative-sermon",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-narrative-sermon.md",
    "sourceHash": "2e3debf9bd818b7f",
    "title": "Narrative Sermon",
    "description": "Narrative sermon workflow for preaching biblical stories with plot, theology, and faithful application.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-narrative-sermon",
      "Narrative Sermon",
      "narrative-sermon"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Identify the scene, setting, conflict, and resolution of the passage. Determine the story unit carefully so the sermon follows the text’s movement rather than flattening it into unrelated moral points.",
      "Trace the characters and their roles in the narrative. Ask what the text reveals about God, covenant faithfulness, human weakness, sin, repentance, faith, and the unfolding New Covenant hope.",
      "Build the sermon around the story’s tension and turning points. Use an outline that tracks the plot, then move from the story’s original meaning to its Christ-centered fulfillment and present-day discipleship application.",
      "Preserve the theological force of the narrative. Avoid moralizing the story into “be like this person” unless the text actually calls for imitation; instead, show how the passage reveals God’s character and the need for grace.",
      "Check the sermon for Scripture fidelity and continuity with the larger biblical storyline. Make sure the narrative reading agrees with the immediate context, the canon as a whole, and the New Covenant framework for the church.",
      "Store the finished sermon, scene notes, and any collaboration comments in The Harvest. Link the draft to the related event or service plan so other leaders can review timing, emphasis, and follow-up needs in real time."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use a narrative sermon when the biblical text is told as a story, episode, or sequence of events and the sermon should honor the way the Bible itself presents the message. This approach is especially helpful for preaching Genesis, Samuel, Kings, the Gospels, Acts, and other passages where plot, conflict, reversal, and resolution carry the theological weight.\n\nA narrative sermon helps the church hear the story the way Scripture tells it, instead of reducing the text to isolated lessons. It also fits FEED and The Harvest workflows because story-based teaching can be mapped to events, service plans, and follow-up discipleship in a collaborative way.",
    "outputExpectations": [
      "A clearly bounded story unit with its main narrative tension identified.",
      "An outline that follows plot progression, not a forced topical grid.",
      "Christ-centered interpretation that respects the original scene and setting.",
      "Practical application that flows from the story’s theology.",
      "A shared draft in The Harvest with notes for service planning and revision."
    ]
  },
  {
    "workflowId": "teach.do-passage-guide-workflow",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-passage-guide-workflow.md",
    "sourceHash": "a04ac23b97644138",
    "title": "Passage Guide Workflow",
    "description": "Build a passage guide around a biblical text for FEED-style sermon preparation, including themes, related scriptures, theological guardrails, and application points.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-passage-guide-workflow",
      "Passage Guide Workflow",
      "passage-guide-workflow"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "presentingNeed",
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Define the passage and ministry setting.",
      "Observe the text carefully and name the major movements.",
      "Draw out the theological meaning of the passage.",
      "Gather related scriptures with discipline and context.",
      "Set theological guardrails before application.",
      "Shape application points and package the guide for reuse."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This guide helps a teaching minister study one passage deeply enough to preach it faithfully, teach it clearly, and store it in the ministry system for future reuse.\n\nThe goal is not to gather loose notes. The goal is to build a text-centered passage guide that moves from observation to interpretation to application while staying aligned with the New Covenant teaching workflow and FEED-style sermon preparation.\n\nUse this when a passage will become a sermon, lesson, devotional, or ministry response and you need a dependable study trail that can be shared, reviewed, and reused in real time.",
    "outputExpectations": [
      "A clearly identified passage range with translation, context, and study purpose.",
      "A text-centered summary of the passage’s main theme and supporting themes.",
      "A disciplined list of related scriptures, separated by direct support and broader parallels.",
      "A theological guardrail section that prevents misuse, overstatement, or proof-texting.",
      "A practical application section ready for sermon prep, teaching plans, and shared ministry use."
    ]
  },
  {
    "workflowId": "teach.do-pastoral-exhortation",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-pastoral-exhortation.md",
    "sourceHash": "ba2f600d2c86b42c",
    "title": "Pastoral Exhortation",
    "description": "Prepare a shepherding message that comforts, corrects, and strengthens the church.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-pastoral-exhortation",
      "Pastoral Exhortation",
      "pastoral-exhortation"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "confidential",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "confidentiality",
      "ownerId",
      "nextAction",
      "closureReason"
    ],
    "safetyScreenFields": [
      "immediateDanger",
      "selfHarmRisk",
      "harmToOthersRisk",
      "abuseOrCoercion",
      "medicalEmergency"
    ],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Identify the pastoral burden before shaping the message. State who is being addressed, what burden is present, and whether the moment is private-care adjacent, congregational, or crisis-related. Choose a passage that truly speaks to that need instead of forcing a text to fit a prewritten concern.",
      "Study the passage for both doctrine and shepherding tone. Use historical-grammatical and canonical work to see what God is saying, then ask how that truth comforts, warns, restores, or steadies the flock. Avoid flattening the passage into generic advice or using it as a pretext for personal frustration.",
      "Build the message around diagnosis, gospel assurance, and obedient response. A helpful flow is: name the burden, show the Lord’s truth, call for a specific response, and close in prayer or blessing. Keep the movement gentle and direct so hearers know where to take the next step.",
      "Emphasize tenderness, specificity, and credibility. Speak plainly, apply the text to the real life of the church, and point to Christ as the shepherd who restores. Avoid public shaming, speculative details, unresolved counseling content, and language that sounds punitive rather than pastoral.",
      "Coordinate ministry care and collaboration. Note whether the exhortation is meant to accompany visitation, prayer ministry, a TheHarvest response moment, or a FEED care plan. If the message includes confidential context, flag it for restricted sharing and separate it from the public version.",
      "Store, share, and version the file responsibly. Save the draft with date, context, and version number, share it in the real-time collaboration space for pastoral review, and record what changed after feedback. If the exhortation is reused later, keep the earlier version archived so the ministry trail remains clear."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [
      "crisis"
    ],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this format when the church needs a shepherd’s word more than a broad teaching session: times of grief, conflict, moral drifting, fatigue, transition, repentance, or renewed courage. It should speak with truth and tenderness, align with the gospel, and connect to care pathways in FEED, TheHarvest, and the wider ministry system.",
    "outputExpectations": [
      "A pastoral context note that names the burden, audience, and ministry setting.",
      "A text-driven outline that moves from truth to comfort or correction to response.",
      "One or more direct exhortations that are practical, gospel-shaped, and specific.",
      "FEED/TheHarvest care notes showing where prayer, follow-up, or confidentiality applies.",
      "A storage and revision note that identifies the version, access level, and archive location."
    ]
  },
  {
    "workflowId": "teach.do-sermon-archive-and-retrieval",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-sermon-archive-and-retrieval.md",
    "sourceHash": "2558270975908901",
    "title": "Sermon Archive and Retrieval",
    "description": "Archive completed sermons and make them easy to find, reopen, and reuse.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-sermon-archive-and-retrieval",
      "Sermon Archive and Retrieval",
      "sermon-archive-and-retrieval"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Confirm the sermon package is complete, including the manuscript, slide-and-notes sync, response and prayer plan, and any version or review history.",
      "Assign archive metadata such as sermon title, series, passage, date, speaker, service context, and helpful tags for future searching.",
      "Place the final files in the shared archive location using the agreed naming convention so collaborators can locate the package quickly.",
      "Record a short retrieval summary with keywords, related passages, and any follow-up notes that would help a future team reopen the sermon.",
      "Verify the archive entry is discoverable and that any linked materials still point to the correct final versions.",
      "Document how a collaborator can duplicate, reopen, or adapt the sermon safely while preserving the archived original."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Store completed sermons in a way that preserves the final package, keeps the team’s history intact, and makes later retrieval simple for review, reuse, or adaptation. This workflow supports orderly collaboration by making final files discoverable without losing the context of how they were built.",
    "outputExpectations": [
      "A completed archive record with metadata and storage location.",
      "Final file names and tags that make the sermon easy to retrieve later.",
      "A brief summary or index note for future reuse and review.",
      "A status note confirming the sermon is complete and archived.",
      "Collaboration guidance for reopening, copying, or adapting the sermon package."
    ]
  },
  {
    "workflowId": "teach.do-sermon-construction-outline",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-sermon-construction-outline.md",
    "sourceHash": "e15c66ddb0fd797e",
    "title": "Sermon Construction Outline",
    "description": "Construct a FEED-style sermon outline from a studied passage, including thesis, outline shape, introduction, transitions, illustration selection, application, closing call, and reuse storage.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-sermon-construction-outline",
      "Sermon Construction Outline",
      "sermon-construction-outline"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "memberId",
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Lock the thesis and main idea in one sentence.",
      "Choose an outline shape that follows the passage.",
      "Write an introduction that creates attention and context.",
      "Craft transitions that show the sermon’s movement.",
      "Select illustrations and applications that serve the text.",
      "Write the closing call and store the sermon for reuse."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This outline helps turn careful passage study into a preach-ready sermon that is clear, biblical, and reusable.\n\nIt is built for FEED-style sermon preparation: the text is studied first, the thesis is stated plainly, the outline follows the passage’s own movement, and the finished sermon is stored so it can be shared, reviewed, and reused in the ministry system.\n\nUse this when the passage guide is complete and you are ready to shape the sermon into a public teaching flow.",
    "outputExpectations": [
      "A single-sentence thesis or main idea that governs the entire sermon.",
      "A text-shaped outline with clear main points and logical transitions.",
      "An introduction that creates context, attention, and a path into the passage.",
      "Illustrations and applications matched to the text and ministry audience.",
      "A closing call plus a stored sermon record that can be reused in teaching plans and shared ministry workflows."
    ]
  },
  {
    "workflowId": "teach.do-sermon-cross-references-and-footnotes",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-sermon-cross-references-and-footnotes.md",
    "sourceHash": "10a17140f39153e7",
    "title": "Sermon Cross-References and Footnotes",
    "description": "Organize sermon cross-references and footnotes so supporting Scripture and citations strengthen the message.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-sermon-cross-references-and-footnotes",
      "Sermon Cross-References and Footnotes",
      "sermon-cross-references-and-footnotes"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Gather the supporting passages from study and outline work.",
      "Rank the references by usefulness.",
      "Decide where each reference belongs.",
      "Check each reference for context and clarity.",
      "Link references to sermon application and handouts.",
      "Share the reference set in real time."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide to collect, test, and place cross-references, Scripture parallels, and footnotes that support the sermon without distracting from the text. It helps the preacher decide what should be said aloud, what should be footnoted, and what should remain in working notes or handouts. It also keeps the supporting references visible in real time so other leaders can review the final sermon package and reuse the same biblical supports in teaching, service planning, or follow-up.",
    "outputExpectations": [
      "A vetted list of cross-references that reinforce the sermon’s main claim.",
      "Footnotes or citations that preserve detail without crowding the spoken message.",
      "Notes that explain why a reference is included and where it should appear.",
      "A clean distinction between primary spoken references and secondary supporting material.",
      "A shared reference set that other leaders can view and update in real time."
    ]
  },
  {
    "workflowId": "teach.do-sermon-illustrations-and-application",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-sermon-illustrations-and-application.md",
    "sourceHash": "82b3f548bfbb570a",
    "title": "Sermon Illustrations and Application",
    "description": "Choose sermon illustrations and application pathways that serve the text, the congregation, and the final sermon package.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-sermon-illustrations-and-application",
      "Sermon Illustrations and Application",
      "sermon-illustrations-and-application"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Start with the passage, big idea, and sermon aim from the study flow, passage guide, and sermon outline.",
      "Sort the applications by audience and obedience category.",
      "Choose illustrations that clarify the text instead of replacing it.",
      "Separate spoken content from support content.",
      "Test the application against pastoral and ministry realities.",
      "Share the application set in the real-time sermon workspace."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide to turn faithful exegesis into clear, pastoral application and memorable illustrations. It helps the preacher decide what should be spoken from the pulpit, what should remain in sermon notes, and what should be shared with other leaders in real time as part of the final sermon package. It should keep the sermon rooted in the passage, aligned with New Covenant discipleship, and practical for the congregation, service plan, and follow-up ministry.",
    "outputExpectations": [
      "A short list of sermon-safe illustrations that directly support the main point.",
      "A clear application ladder that moves from personal conviction to congregational obedience.",
      "Notes that distinguish what is spoken aloud from what stays in the working draft.",
      "Leader-facing comments that help ministry teams respond consistently in real time.",
      "A final sermon package section that ties application to the passage, series aim, and follow-up care."
    ]
  },
  {
    "workflowId": "teach.do-sermon-manuscript-drafting",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-sermon-manuscript-drafting.md",
    "sourceHash": "9525211c62feb53b",
    "title": "Sermon Manuscript Drafting",
    "description": "Draft a delivery-ready sermon manuscript from the approved outline and study work.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-sermon-manuscript-drafting",
      "Sermon Manuscript Drafting",
      "sermon-manuscript-drafting"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "ownerId",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Start with the approved passage guide, outline, and study notes so the manuscript follows the agreed main idea, structure, and pastoral aim.",
      "Draft the sermon in a spoken-first voice with a clear introduction, transitions, main points, illustrations, and conclusion that can be preached without heavy rewriting.",
      "Keep the wording text-grounded and congregation-aware, preserving the passage meaning while making the call to faith, obedience, comfort, or correction explicit.",
      "Mark places that need shared review, such as uncertain phrasing, alternate illustrations, timing concerns, or theological emphasis that should be confirmed by collaborators.",
      "Revise for delivery by smoothing cadence, trimming repetition, tightening applications, and matching the manuscript to the expected length of the service.",
      "Save the manuscript with final metadata and version context so it can be shared, synced with slides and notes, and archived as part of the finished sermon package."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Turn the approved passage work and sermon outline into a full manuscript that is faithful to the text, clear for the congregation, and ready for collaborative review before delivery. This workflow keeps the final wording aligned with the New Covenant teaching emphasis, the service plan, and the rest of the sermon package.",
    "outputExpectations": [
      "A complete sermon manuscript with title, passage, date, and service or series metadata.",
      "Clear transitions, main points, and application movement that match the approved outline.",
      "Spoken-language phrasing that supports preaching, listening, and real-time collaboration.",
      "Review flags or comments for any open items that still need team confirmation.",
      "A final manuscript file ready to sync with slides, notes, response planning, and archive storage."
    ]
  },
  {
    "workflowId": "teach.do-sermon-response-and-prayer-planning",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-sermon-response-and-prayer-planning.md",
    "sourceHash": "45e96427afa4d4c0",
    "title": "Sermon Response and Prayer Planning",
    "description": "Plan sermon response moments, invitations, and prayer elements for the service.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-sermon-response-and-prayer-planning",
      "Sermon Response and Prayer Planning",
      "sermon-response-and-prayer-planning"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Identify the response direction from the passage, the sermon aim, and the sermon type so the ending fits the message rather than feeling added on.",
      "Draft the response sequence, choosing the right elements such as invitation, confession, assurance, prayer, testimony, or commissioning.",
      "Write prayer prompts or full prayer language that matches the congregation’s needs, the season of the church, and the pastoral tone of the service.",
      "Coordinate the response wording with the manuscript and slides so the transition into prayer or invitation feels natural and well timed.",
      "Confirm who will lead each response or prayer element, how cues will be shared, and what needs to be visible to the congregation versus spoken by the leader.",
      "Save the final response plan as part of the sermon package so it can be reviewed, shared live, and reopened later with the rest of the teaching materials."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Design the response moment that follows the sermon so the congregation has a clear, pastoral, and Scripture-shaped path toward repentance, faith, encouragement, commissioning, or intercession. This keeps the message connected to prayer, the service flow, and the New Covenant emphasis on discipleship and transformed life.",
    "outputExpectations": [
      "An ordered response plan with timing and service placement.",
      "Prayer prompts or prepared prayer language suited to the sermon’s pastoral goal.",
      "Leader and cue notes for the people involved in the response moment.",
      "Alignment notes showing how the response connects to the manuscript and slides.",
      "A final response packet ready for collaboration, live use, and archival storage."
    ]
  },
  {
    "workflowId": "teach.do-sermon-review-and-versioning",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-sermon-review-and-versioning.md",
    "sourceHash": "60ea9c02090679f7",
    "title": "Sermon Review and Versioning",
    "description": "Review sermons with peer feedback, controlled revisions, approval gates, and version synchronization close to delivery.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-sermon-review-and-versioning",
      "Sermon Review and Versioning",
      "sermon-review-and-versioning"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId",
      "closureReason"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Assign the sermon to the proper reviewers early, making sure at least one trusted peer or ministry leader can check the passage, doctrine, clarity, tone, and alignment with the church’s teaching approach.",
      "Collect feedback in one place and separate major concerns from minor wording edits so the author can revise quickly without losing sight of the message’s main burden.",
      "Apply revisions with clear version labels, noting what changed, why it changed, and whether the change affects the sermon outline, supporting verses, illustrations, or delivery notes.",
      "Use approval gates before moving the sermon forward: draft review, doctrinal or ministry review, delivery approval, and final release for live use should each be explicit so nothing is assumed.",
      "Hand off the approved version to the live delivery plan only after the final text is confirmed; if slides, notes, FEED summaries, or service plans exist, update them together so the sermon package stays synchronized.",
      "When the sermon changes close to delivery, push the update through the same shared version, notify the right leaders immediately, and verify that every downstream copy matches the approved text before the service begins, including any ministry hub or Harvest-linked display."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This guide explains how a sermon moves through peer review, revision, approval, and final handoff for live delivery in the Harvest teaching workflow. It also explains how to keep the latest text synchronized when changes happen close to the teaching moment so the preacher, planners, FEED viewers, and support leaders are all working from the same approved wording.",
    "outputExpectations": [
      "Peer review is completed by the right ministry leaders before the sermon is treated as final.",
      "Feedback is captured in a way that makes revision easy and keeps the sermon’s purpose intact.",
      "Version labels and change notes make it clear which text is current and why it was updated.",
      "Approval gates protect doctrine, tone, and delivery readiness before the sermon reaches live use.",
      "Late changes are synchronized across all sermon materials so the team does not deliver conflicting versions."
    ]
  },
  {
    "workflowId": "teach.do-sermon-series-planning",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-sermon-series-planning.md",
    "sourceHash": "4147737671d23b96",
    "title": "Sermon Series Planning",
    "description": "Plan sermon series with text progression, ministry alignment, and real-time collaboration for the teaching team.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-sermon-series-planning",
      "Sermon Series Planning",
      "sermon-series-planning"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "ownerId",
      "dueDate"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Define the pastoral burden and series aim.",
      "Map the text progression across the series.",
      "Decide the sermon type and response for each week.",
      "Plan supporting materials in advance.",
      "Align the series with ministry timing and church life.",
      "Publish the series plan in shared, real-time form."
    ],
    "followUpCadence": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "overdueRule": {
      "cadence": "weekly-or-biweekly",
      "dueWithinDays": 14,
      "overdueAfterDays": 14
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use this guide to shape a sermon series before individual messages are finalized. It connects the series theme, weekly texts, service plans, and teaching goals so the final sermon package is coherent across sermons, handouts, notes, and leader workflows. It should reflect New Covenant teaching priorities, the church calendar, and the practical rhythms of events, sermons, and service plans in The Harvest.",
    "outputExpectations": [
      "A week-by-week map showing text, theme, and main response.",
      "A series-level aim that explains why the messages belong together.",
      "Leader-ready notes that connect the series to services, events, and discipleship pathways.",
      "A planning view that shows which content belongs in the spoken sermon and which belongs in supporting notes.",
      "A shared working draft that other leaders can review and update in real time."
    ]
  },
  {
    "workflowId": "teach.do-sermon-slides-and-notes-sync",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-sermon-slides-and-notes-sync.md",
    "sourceHash": "a869395f2a0b8cab",
    "title": "Sermon Slides and Notes Sync",
    "description": "Align sermon slides and speaker notes with the final manuscript and service flow.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-sermon-slides-and-notes-sync",
      "Sermon Slides and Notes Sync",
      "sermon-slides-and-notes-sync"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Map the manuscript into a slide sequence, keeping one idea, verse, or service movement per slide whenever possible.",
      "Convert headings, main points, and key texts into concise on-slide language that is readable at a glance from the room.",
      "Put delivery cues, quotations, and explanatory details in speaker notes so the presenter can preach with confidence without crowding the slides.",
      "Check that the slide order, note references, and manuscript transitions all match, especially where the sermon turns toward application, invitation, or response.",
      "Review the deck for timing, font size, contrast, and device readability so it functions well in real time and on shared screens.",
      "Save the synced slide-and-notes package with version context so collaborators can comment, revise, and reuse it as part of the final sermon bundle."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Keep the slide deck, preacher notes, and manuscript in step so the congregation sees concise, readable content while the preacher has the full delivery cues needed for a smooth service. This workflow supports shared editing, quick updates, and a final package that can be used live without confusion.",
    "outputExpectations": [
      "A slide outline that mirrors the sermon structure and service order.",
      "Speaker notes tied to each slide or section with any needed delivery cues.",
      "Concise on-screen wording that is readable and congregation-friendly.",
      "A sync check listing any mismatches, approved deviations, or pending review items.",
      "A final slide/notes package ready for live use and real-time sharing."
    ]
  },
  {
    "workflowId": "teach.do-sermon-storage-and-realtime-sharing",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-sermon-storage-and-realtime-sharing.md",
    "sourceHash": "64a70584fba5ba29",
    "title": "Sermon Storage and Real-Time Sharing",
    "description": "Store sermons in the system with clear metadata, draft and publish states, revision history, and real-time visibility for approved leaders.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-sermon-storage-and-realtime-sharing",
      "Sermon Storage and Real-Time Sharing",
      "sermon-storage-and-realtime-sharing"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "confidentiality",
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Save each sermon in the system as the primary teaching record, tied to the correct series, date, speaker, passage, and ministry context so it can be found later without guesswork, whether the record starts in teaching_plans.js, a Harvest sermon entry, or a linked ministry hub item.",
      "Include complete metadata at the time of storage: sermon title, scripture text, delivery date, audience, ministry owner, tags, status, reviewer names, and any links to Harvest plans, service plans, FEED visibility, or related teaching notes.",
      "Keep the sermon in draft while it is being shaped, and only move it to publish when the content is ready for wider use; drafts should remain visible only to the author, assigned reviewers, and authorized ministry leaders.",
      "Record every change as part of revision history so the team can see what changed, who changed it, when it changed, and why it changed, especially when edits affect the final delivery or published notes.",
      "Share the sermon in real time only with approved leaders who need it for planning, review, or support; use live visibility for coordination through FEED or the ministry hub, but do not broaden access to people who are not part of the teaching workflow.",
      "When a sermon is published, keep the published version clearly labeled and preserve earlier drafts for reference so the team can compare versions, recover prior wording, and confirm what was approved for delivery."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This guide explains how to store a sermon as the canonical teaching record in the teaching plans area, keep it safe through the editing process, and share it in real time with the right ministry leaders when needed. The goal is to make sure every sermon is findable, reviewable, and ready for ministry use without exposing unfinished material beyond the proper circle of trust, whether it is living in teaching_plans.js, the Harvest sermon workflow, or a ministry hub view.",
    "outputExpectations": [
      "A single canonical sermon record exists in the system and is easy to locate by title, date, series, or passage.",
      "Metadata is complete enough for ministry leaders to understand the sermon without extra back-and-forth.",
      "Draft content stays private to the right reviewers until it is intentionally published.",
      "Revision history shows who changed the sermon and what changed over time.",
      "Approved leaders can see real-time updates when a sermon must be shared for planning or coordination."
    ]
  },
  {
    "workflowId": "teach.do-sermon-study-flow",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-sermon-study-flow.md",
    "sourceHash": "ccb46ac2641e456d",
    "title": "Sermon Study Flow",
    "description": "Passage-to-sermon workflow for Bible study, application, and handoff.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-sermon-study-flow",
      "Sermon Study Flow",
      "sermon-study-flow"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Select a passage that matches the ministry need, preaching calendar, or pastoral concern, and state why this text is the right starting point.",
      "Read the surrounding context so you understand the book, genre, audience, historical setting, and flow of thought before making conclusions.",
      "Observe what the passage actually says by tracking repeated words, structure, commands, contrasts, transitions, and major themes.",
      "Interpret the meaning carefully by asking what the passage meant to the original audience and how the argument of Scripture supports that reading.",
      "Move from interpretation to application by naming the faithful response, the teaching emphasis, and any ministry action that should follow.",
      "Pray over the study, then hand off a concise summary with the passage, main idea, supporting notes, open questions, and any real-time collaboration items."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This document guides a practical sermon study workflow from selecting a passage to handing off a clear teaching brief. It keeps the study process grounded in Scripture, ministry-aware, and easy for others to review or continue in real time.",
    "outputExpectations": [
      "A clearly selected passage with a stated study purpose.",
      "Context notes that anchor the sermon in the book and the flow of Scripture.",
      "Observation and interpretation notes that show how the main idea was formed.",
      "Application points that are pastoral, concrete, and faithful to the text.",
      "A prayerful handoff summary that others can review, store, and continue without losing the study trail."
    ]
  },
  {
    "workflowId": "teach.do-syntactical-study",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-syntactical-study.md",
    "sourceHash": "ba61dde1262c7a97",
    "title": "Syntactical Study",
    "description": "Syntactical study method for tracing clause structure, grammar, and argument flow.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-syntactical-study",
      "Syntactical Study",
      "syntactical-study"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Define the study unit and compare translations so you can see where punctuation, clause breaks, or interpretive decisions differ across English renderings.",
      "Mark the syntax of the passage by identifying main clauses, dependent clauses, conjunctions, pronouns, modifiers, imperatives, and repeated structural markers that guide the argument.",
      "Observe emphasis, contrast, cause and effect, sequence, condition, purpose, and result so you can see how the author builds meaning from one thought to the next.",
      "Test the proposed meaning against the larger context, making sure the grammar supports the interpretation and does not force the text into a conclusion the passage itself does not carry.",
      "Translate the findings into sermon prep, Bible study, and teaching-plan creation by identifying the main idea, the supporting subpoints, and the most faithful way to explain the passage to the congregation or group.",
      "Review the study for guardrails, documenting where grammatical judgments are strong, where they are tentative, and where syntax should inform interpretation without becoming a technical distraction."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": false,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use a syntactical study when the meaning of a passage turns on sentence structure, clause relationships, connectors, word order, or the author’s flow of argument. This method helps you read the text carefully at the grammar level so sermon prep, Bible study, and teaching-plan creation are shaped by the passage’s actual logic rather than by assumptions or isolated word meanings.",
    "outputExpectations": [
      "A clause-by-clause or sentence-level map of the passage’s structure.",
      "Notes on key connectors, emphases, and grammatical relationships that affect meaning.",
      "A statement of the passage’s main idea that follows the text’s own flow of thought.",
      "Sermon, Bible study, or teaching-plan implications that preserve the passage’s argument and application.",
      "A caution list that identifies uncertain grammatical calls, translation differences, and places where syntax should not be overstated."
    ]
  },
  {
    "workflowId": "teach.do-thematic-bible-study",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-thematic-bible-study.md",
    "sourceHash": "a957f6f34125e8f0",
    "title": "Thematic Bible Study",
    "description": "Trace a doctrine or topic across Scripture without proof-texting, then turn it into sermon-ready teaching notes.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-thematic-bible-study",
      "Thematic Bible Study",
      "thematic-bible-study"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Define the theme narrowly. State the doctrine, question, or ministry topic you are studying, and decide what is in scope and what is not. A focused theme produces better study notes than an overly broad one.",
      "Gather seed texts and major texts. Start with the clearest passages, not just the easiest ones. Note where the topic appears explicitly, where it is implied, and where related language or concepts appear in the canon.",
      "Read every text in context. Examine each passage in its own paragraph, book, and covenant setting before drawing conclusions. Do not build the theme from isolated phrases, and do not treat a verse as proof if the passage is making a different point.",
      "Synthesize the whole-Bible witness. Compare the texts, identify patterns, tensions, developments, and fulfillment in Christ and the New Covenant. Record where Scripture speaks with one voice and where the theme must be handled carefully to avoid oversimplifying.",
      "Translate the theme into ministry use. Turn the synthesis into sermon points, doctrinal statements, discipleship guidance, or pastoral application. Make the teaching concrete enough for real people and honest enough to preserve the complexity of the biblical witness.",
      "Store the theme map for shared use. Save the text list, context notes, doctrinal synthesis, and application direction in the teaching record. Tag the file by topic, series, and date so it can support sermon prep, handouts, service planning, and future versioning."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use the thematic method when you need to trace a topic, doctrine, or ministry concern across multiple passages of Scripture. The goal is not to collect verses quickly, but to hear the whole counsel of God on a subject while keeping each text in context. This approach is especially helpful for topical sermons, doctrinal teaching, discipleship materials, and shared study records that need to survive revision and collaboration.",
    "outputExpectations": [
      "A narrow, clearly defined theme with scope notes and study boundaries.",
      "A curated list of texts that prioritizes clarity, context, and canonical weight.",
      "A synthesis that reflects the whole-Bible teaching on the theme without proof-texting.",
      "A ministry-ready summary that can become a sermon, handout, or discipleship resource.",
      "A stored reference map that links each text to its context, contribution, and revision history."
    ]
  },
  {
    "workflowId": "teach.do-topical-sermon",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-topical-sermon.md",
    "sourceHash": "dd869ec95576d280",
    "title": "Topical Sermon",
    "description": "Topical sermon workflow for teaching one biblical theme through multiple passages without losing textual faithfulness.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-topical-sermon",
      "Topical Sermon",
      "topical-sermon"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "presentingNeed",
      "ownerId",
      "nextAction"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Define the topic in biblical terms before gathering verses. Clarify the question the sermon is answering, the audience need, and the specific pastoral purpose so the message does not become vague or overly broad.",
      "Gather multiple passages from across Scripture, giving priority to clear, representative texts. Use the passages to build the doctrine or theme, not merely to decorate a prewritten opinion.",
      "Organize the sermon into a theological progression. Lead the listener from definition to biblical witness, then to New Covenant fulfillment, and finally to concrete discipleship and ministry response.",
      "Guard against proof-texting and context stripping. Read every verse in its immediate setting, note any genre differences, and avoid using a passage in a way that contradicts its original meaning.",
      "Keep the sermon practical and collaborative. Add application points, examples, and ministry follow-up in ways that can be refined by other The Harvest contributors without changing the core biblical claim.",
      "Store the sermon draft, supporting texts, and revision notes in The Harvest under the associated sermon or service plan. Use a clear topic label so leaders can retrieve it later for teaching plans, events, or future series work."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "Use a topical sermon when the ministry need is to speak clearly about a theme that appears across Scripture, such as prayer, generosity, holiness, justice, or perseverance. This format is useful for discipleship series, event-based teaching, and FEED planning when the congregation needs a clear biblical synthesis rather than a single-passage exposition.\n\nA topical sermon must still be governed by Scripture. The aim is not to collect favorite verses, but to trace a biblically defined theme through the whole counsel of God and present it in a way that fits the New Covenant and the life of the church.",
    "outputExpectations": [
      "A biblically defined topic with a precise teaching aim.",
      "A curated set of passages that support the theme in context.",
      "A sermon structure that moves from Scripture to doctrine to application.",
      "Clear safeguards against proof-texting, oversimplification, and context loss.",
      "A shared ministry record in The Harvest with linked notes and revision history."
    ]
  },
  {
    "workflowId": "teach.do-word-study-exegesis",
    "sourcePath": "New_Covenant/iris/docs/do/teach/do-word-study-exegesis.md",
    "sourceHash": "5494d69b06e1eabd",
    "title": "Word Study and Exegesis",
    "description": "Original-language and lexical study guide for careful exegesis.",
    "family": "teach",
    "kind": "teaching-process",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "do-word-study-exegesis",
      "Word Study and Exegesis",
      "word-study-exegesis"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [
      "Identify the key terms in the passage that actually shape the meaning, and ignore words that are interesting but not central to the argument.",
      "Check the original-language form, lemma, grammar, and syntax so the study begins with the text, not with a dictionary entry.",
      "Use trusted lexical tools and reference works to understand the normal range of meaning, paying attention to context, genre, and usage.",
      "Compare the term across Scripture and note how the same word or idea functions in similar passages, translations, and covenant settings.",
      "Guard against proof-texting, root fallacies, and overconfident claims by letting the immediate passage and the larger canon set the limits of the study.",
      "Summarize the findings in a way that can be shared, reviewed, and stored with the sermon plan, including any open questions or confidence notes."
    ],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This document supports careful word study for sermon preparation without drifting into speculation or proof-texting. It helps the team handle original-language details responsibly, compare Scripture with Scripture, and keep the final teaching clear for shared ministry use.",
    "outputExpectations": [
      "A short list of truly important key terms from the passage.",
      "Lexical and grammatical notes that support the sermon without overloading it.",
      "Cross-references that show how Scripture helps define the term in context.",
      "A clear warning against proof-texting, etymology errors, and isolated word claims.",
      "A handoff-ready summary that can be stored with the teaching plan and reviewed in real time."
    ]
  },
  {
    "workflowId": "teach.readme",
    "sourcePath": "New_Covenant/iris/docs/do/teach/README.md",
    "sourceHash": "8fc105b867100508",
    "title": "Teach Workflows",
    "description": "This directory contains the teaching and sermon-preparation workflows used to move from study to a finished, shareable sermon package. The docs are organized around interpretation, construction, packaging, collaboration, and archive retrieval so teams can work in real time without losing version context.",
    "family": "teach",
    "kind": "index",
    "group": "teach",
    "groupLabel": "Teach",
    "caseType": "",
    "aliases": [
      "readme",
      "Teach Workflows"
    ],
    "defaultPriority": "normal",
    "defaultUrgency": "standard",
    "confidentialityLevel": "internal",
    "minimumRoleTier": 3,
    "screeningRequired": false,
    "requiredIntakeFields": [
      "ownerId"
    ],
    "safetyScreenFields": [],
    "consentFields": [
      "permissionToRecord",
      "permissionToShareWithCareTeam",
      "safeContactConfirmed"
    ],
    "routingRules": [],
    "followUpCadence": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "overdueRule": {
      "cadence": "standard",
      "dueWithinDays": 5,
      "overdueAfterDays": 5
    },
    "escalationTriggers": [],
    "handoffRequirements": [
      "currentOwner",
      "receivingOwner",
      "handoffReason",
      "firstAction",
      "acceptedAt"
    ],
    "closureChecklist": [],
    "reopenConditions": [
      "renewed-risk",
      "renewed-request",
      "worsening-symptoms",
      "missed-referral"
    ],
    "scripturePrayerSupport": true,
    "notesTemplate": "",
    "watchFor": [],
    "purpose": "This directory contains the teaching and sermon-preparation workflows used to move from study to a finished, shareable sermon package. The docs are organized around interpretation, construction, packaging, collaboration, and archive retrieval so teams can work in real time without losing version context.",
    "outputExpectations": []
  }
];

export default DO_WORKFLOWS;
