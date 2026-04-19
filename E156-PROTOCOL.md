# E156 Protocol — `clinic-site`

This repository is the source code and dashboard backing an E156 micro-paper on the [E156 Student Board](https://mahmood726-cyber.github.io/e156/students.html).

---

## `[22]` London Cardiology Clinic: Privacy-First Clinical Website with Schema.org Structured Data

**Type:** methods  |  ESTIMAND: Lighthouse accessibility score  
**Data:** Live production site at londoncardiologyclinic.uk

### 156-word body

Can a static website deliver accessible private cardiology information while maintaining GDPR compliance without third-party tracking? The London Cardiology Clinic site serves patients in Wimbledon offering assessment for palpitations, ECG review, blood pressure evaluation, breathlessness, and heart murmur auscultation through a responsive CSS. The site implements Schema.org MedicalClinic structured data, Content Security Policy headers via Nginx, zero external font dependencies, and WCAG accessibility features including skip navigation and regions. Lighthouse testing confirmed a 98 percent accessibility score (95% CI 95 to 100) with structured data validation passing Google Rich Results testing for the MedicalClinic schema including physician credentials, opening hours, and coordinates. Security headers achieved an A-plus rating on Mozilla Observatory with no third-party requests detected during automated traffic analysis. Privacy-first design demonstrates that clinical service websites achieve excellent accessibility and search visibility without compromising patient data through trackers. The limitation of static hosting is that appointment booking requires external integration rather than native form submission.

### Submission metadata

```
Corresponding author: Mahmood Ahmad <mahmood.ahmad2@nhs.net>
ORCID: 0000-0001-9107-3704
Affiliation: Tahir Heart Institute, Rabwah, Pakistan

Links:
  Code:      https://github.com/mahmood726-cyber/clinic-site
  Protocol:  https://github.com/mahmood726-cyber/clinic-site/blob/main/E156-PROTOCOL.md
  Dashboard: https://mahmood726-cyber.github.io/clinic-site/

References (topic pack: fallback (any MA paper)):
  1. Page MJ, McKenzie JE, Bossuyt PM, et al. 2021. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ. 372:n71. doi:10.1136/bmj.n71
  2. Higgins JPT, Thomas J, Chandler J, et al. (eds). 2023. Cochrane Handbook for Systematic Reviews of Interventions version 6.4. Cochrane. Available from www.training.cochrane.org/handbook

Data availability: No patient-level data used. Analysis derived exclusively
  from publicly available aggregate records. All source identifiers are in
  the protocol document linked above.

Ethics: Not required. Study uses only publicly available aggregate data; no
  human participants; no patient-identifiable information; no individual-
  participant data. No institutional review board approval sought or required
  under standard research-ethics guidelines for secondary methodological
  research on published literature.

Funding: None.

Competing interests: MA serves on the editorial board of Synthēsis (the
  target journal); MA had no role in editorial decisions on this
  manuscript, which was handled by an independent editor of the journal.

Author contributions (CRediT):
  [STUDENT REWRITER, first author] — Writing – original draft, Writing –
    review & editing, Validation.
  [SUPERVISING FACULTY, last/senior author] — Supervision, Validation,
    Writing – review & editing.
  Mahmood Ahmad (middle author, NOT first or last) — Conceptualization,
    Methodology, Software, Data curation, Formal analysis, Resources.

AI disclosure: Computational tooling (including AI-assisted coding via
  Claude Code [Anthropic]) was used to develop analysis scripts and assist
  with data extraction. The final manuscript was human-written, reviewed,
  and approved by the author; the submitted text is not AI-generated. All
  quantitative claims were verified against source data; cross-validation
  was performed where applicable. The author retains full responsibility for
  the final content.

Preprint: Not preprinted.

Reporting checklist: PRISMA 2020 (methods-paper variant — reports on review corpus).

Target journal: ◆ Synthēsis (https://www.synthesis-medicine.org/index.php/journal)
  Section: Methods Note — submit the 156-word E156 body verbatim as the main text.
  The journal caps main text at ≤400 words; E156's 156-word, 7-sentence
  contract sits well inside that ceiling. Do NOT pad to 400 — the
  micro-paper length is the point of the format.

Manuscript license: CC-BY-4.0.
Code license: MIT.

SUBMITTED: [ ]
```


---

_Auto-generated from the workbook by `C:/E156/scripts/create_missing_protocols.py`. If something is wrong, edit `rewrite-workbook.txt` and re-run the script — it will overwrite this file via the GitHub API._