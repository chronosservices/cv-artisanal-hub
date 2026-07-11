import React from 'react';
import { CVData, CVCustomization } from '@/types/cv';

interface CVTemplate3Props {
  data: CVData;
  customization?: CVCustomization;
}

/**
 * Template 3 — Modern Minimal (single column, editorial style)
 * Clean typography-driven CV with skill bars and orange accent.
 */
export const CVTemplate3: React.FC<CVTemplate3Props> = ({ data, customization }) => {
  const { personalInfo, formations, experiences, languages, certifications, skills, interests, references } = data;

  const accent = customization?.nameColor || '#FF5700';
  const dark = '#0f172a';
  const muted = '#64748b';
  const border = '#e2e8f0';

  const container: React.CSSProperties = {
    width: '210mm',
    minHeight: '297mm',
    background: 'white',
    color: dark,
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    fontSize: '11px',
    lineHeight: 1.55,
    padding: '18mm 16mm',
    boxSizing: 'border-box',
  };

  const h1: React.CSSProperties = {
    fontSize: customization?.nameSize || '32px',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    color: dark,
    margin: 0,
    textTransform: customization?.nameUppercase ? 'uppercase' : 'none',
  };

  const subtitle: React.CSSProperties = {
    fontSize: '13px',
    color: accent,
    fontWeight: 500,
    letterSpacing: '0.02em',
    marginTop: '4px',
    textTransform: 'uppercase',
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: dark,
    marginBottom: '10px',
    paddingBottom: '6px',
    borderBottom: `2px solid ${accent}`,
    display: 'inline-block',
  };

  const contactRow: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '14px',
    marginTop: '14px',
    fontSize: '11px',
    color: muted,
  };

  const twoCol: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginTop: '22px',
  };

  const article: React.CSSProperties = { marginBottom: '14px' };
  const jobTitle: React.CSSProperties = { fontSize: '12px', fontWeight: 700, color: dark, margin: 0 };
  const jobMeta: React.CSSProperties = { fontSize: '10.5px', color: muted, marginTop: '2px', marginBottom: '4px' };

  const skillBar = (label: string, level = 4) => (
    <div key={label} style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', marginBottom: '3px' }}>
        <span style={{ color: dark, fontWeight: 500 }}>{label}</span>
        <span style={{ color: muted }}>{['Débutant', 'Notions', 'Intermédiaire', 'Avancé', 'Expert'][level - 1] || 'Avancé'}</span>
      </div>
      <div style={{ height: '4px', background: border, borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${(level / 5) * 100}%`, height: '100%', background: accent }} />
      </div>
    </div>
  );

  return (
    <div className="cv-template cv-template-3" data-cv-template="3" style={container}>
      {/* HEADER */}
      <header style={{ borderBottom: `1px solid ${border}`, paddingBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt=""
              style={{
                width: '80px',
                height: '80px',
                borderRadius: customization?.photoRounded === false ? '8px' : '50%',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={h1}>
              {personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}
            </h1>
            {personalInfo.jobTitle && <div style={subtitle}>{personalInfo.jobTitle}</div>}
          </div>
        </div>
        <div style={contactRow}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>·  {personalInfo.phone}</span>}
          {personalInfo.address && <span>·  {personalInfo.address}</span>}
          {personalInfo.age && <span>·  {personalInfo.age} ans</span>}
          {personalInfo.license && <span>·  {personalInfo.license}</span>}
        </div>
      </header>

      {/* PROFIL */}
      {personalInfo.profile && (
        <section style={{ marginTop: '22px' }}>
          <h2 style={sectionTitle}>Profil</h2>
          <p style={{ textAlign: customization?.alignProfileJustify !== false ? 'justify' : 'left', color: dark, margin: 0 }}>
            {personalInfo.profile}
          </p>
        </section>
      )}

      <div style={twoCol}>
        {/* LEFT COL */}
        <div>
          {experiences.some((e) => e.title) && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={sectionTitle}>Expérience</h2>
              {experiences.filter((e) => e.title).map((exp) => (
                <article key={exp.id} style={article}>
                  <h3 style={jobTitle}>{exp.title}</h3>
                  <div style={jobMeta}>
                    {exp.company}{exp.company && exp.period ? ' — ' : ''}{exp.period}
                  </div>
                  {exp.description && (
                    <div style={{ color: muted, fontSize: '11px' }}>
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <div key={i} style={{ marginBottom: '2px' }}>
                          {line.trim().startsWith('•') ? line : `• ${line.trim()}`}
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </section>
          )}

          {formations.some((f) => f.title) && (
            <section>
              <h2 style={sectionTitle}>Formation</h2>
              {formations.filter((f) => f.title).map((f) => (
                <article key={f.id} style={article}>
                  <h3 style={jobTitle}>{f.title}</h3>
                  <div style={jobMeta}>{f.period}</div>
                  {f.description && <div style={{ color: muted, fontSize: '11px' }}>{f.description}</div>}
                </article>
              ))}
            </section>
          )}
        </div>

        {/* RIGHT COL */}
        <div>
          {(skills.hardSkills.length > 0 || skills.softSkills.length > 0) && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={sectionTitle}>Compétences</h2>
              {skills.hardSkills.map((s) => skillBar(s, 4))}
              {skills.softSkills.map((s) => skillBar(s, 4))}
            </section>
          )}

          {languages.some((l) => l.name) && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={sectionTitle}>Langues</h2>
              {languages.filter((l) => l.name).map((l) => (
                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '11px' }}>
                  <span style={{ color: dark, fontWeight: 500 }}>{l.name}</span>
                  <span style={{ color: muted }}>{l.level}</span>
                </div>
              ))}
            </section>
          )}

          {certifications.some((c) => c.name) && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={sectionTitle}>Certifications</h2>
              {certifications.filter((c) => c.name).map((c) => (
                <div key={c.id} style={{ marginBottom: '4px', fontSize: '11px', color: dark }}>· {c.name}</div>
              ))}
            </section>
          )}

          {interests.length > 0 && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={sectionTitle}>Centres d'intérêt</h2>
              <div style={{ color: muted, fontSize: '11px' }}>{interests.join(' · ')}</div>
            </section>
          )}

          {references.some((r) => r.name) && (
            <section>
              <h2 style={sectionTitle}>Références</h2>
              {references.filter((r) => r.name).map((r) => (
                <div key={r.id} style={{ marginBottom: '4px', fontSize: '11px' }}>
                  <span style={{ color: dark, fontWeight: 500 }}>{r.name}</span>
                  {r.title && <span style={{ color: muted }}> — {r.title}</span>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
