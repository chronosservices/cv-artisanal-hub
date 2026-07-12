import React from 'react';
import { CVData, CVCustomization } from '@/types/cv';

interface Props { data: CVData; customization?: CVCustomization; }

/**
 * Template 5 — Classic Monochrome (editorial serif)
 * Serif typography, thin rules, centered header block, single column body
 * with subtle two-column details section. Timeless, print-first.
 */
export const CVTemplate5: React.FC<Props> = ({ data, customization }) => {
  const { personalInfo, formations, experiences, languages, certifications, skills, interests, references } = data;

  const ink = customization?.nameColor || '#111111';
  const muted = '#5b5b5b';
  const rule = '#111111';

  const container: React.CSSProperties = {
    width: '210mm', minHeight: '297mm', background: 'white',
    fontFamily: '"Georgia", "Times New Roman", serif',
    fontSize: '11.5px', lineHeight: 1.6, color: ink,
    padding: '20mm 20mm', boxSizing: 'border-box',
  };

  const h1: React.CSSProperties = {
    fontSize: customization?.nameSize || '34px', fontWeight: 400,
    margin: 0, letterSpacing: '0.08em', textAlign: 'center',
    textTransform: 'uppercase',
  };

  const jt: React.CSSProperties = {
    textAlign: 'center', fontStyle: 'italic', color: muted,
    marginTop: '6px', fontSize: '13px',
  };

  const contactRow: React.CSSProperties = {
    textAlign: 'center', fontSize: '10.5px', color: muted,
    marginTop: '10px', letterSpacing: '0.04em',
  };

  const rule1: React.CSSProperties = { border: 'none', borderTop: `1px solid ${rule}`, margin: '16px 0' };

  const sectionTitle: React.CSSProperties = {
    fontSize: '12px', fontWeight: 700, letterSpacing: '0.24em',
    textTransform: 'uppercase', textAlign: 'center',
    margin: '0 0 12px', color: ink,
  };

  const twoCol: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' };

  return (
    <div className="cv-template cv-template-5" data-cv-template="5" style={container}>
      <header>
        {personalInfo.photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
            <img src={personalInfo.photo} alt=""
              style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
        )}
        <h1 style={h1}>{personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}</h1>
        {personalInfo.jobTitle && <div style={jt}>{personalInfo.jobTitle}</div>}
        <div style={contactRow}>
          {[personalInfo.email, personalInfo.phone, personalInfo.address].filter(Boolean).join('  ·  ')}
        </div>
      </header>

      <hr style={rule1} />

      {personalInfo.profile && (
        <section style={{ marginBottom: '10px' }}>
          <h2 style={sectionTitle}>Profil</h2>
          <p style={{ margin: 0, textAlign: 'justify', fontStyle: 'italic', color: muted }}>{personalInfo.profile}</p>
        </section>
      )}

      <hr style={rule1} />

      {experiences.some(e => e.title) && (
        <section style={{ marginBottom: '10px' }}>
          <h2 style={sectionTitle}>Expérience professionnelle</h2>
          {experiences.filter(e => e.title).map(exp => (
            <article key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700 }}>{exp.title}</h3>
                <span style={{ color: muted, fontStyle: 'italic', whiteSpace: 'nowrap' }}>{exp.period}</span>
              </div>
              {exp.company && <div style={{ color: muted, fontSize: '11px', marginBottom: '4px' }}>{exp.company}</div>}
              {exp.description && (
                <div>
                  {exp.description.split('\n').filter(Boolean).map((l, i) => (
                    <div key={i}>{l.trim().startsWith('•') ? l : `— ${l.trim()}`}</div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>
      )}

      {formations.some(f => f.title) && (
        <>
          <hr style={rule1} />
          <section style={{ marginBottom: '10px' }}>
            <h2 style={sectionTitle}>Formation</h2>
            {formations.filter(f => f.title).map(f => (
              <article key={f.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700 }}>{f.title}</h3>
                  <span style={{ color: muted, fontStyle: 'italic', whiteSpace: 'nowrap' }}>{f.period}</span>
                </div>
                {f.description && <div style={{ color: muted, fontSize: '11px' }}>{f.description}</div>}
              </article>
            ))}
          </section>
        </>
      )}

      <hr style={rule1} />

      <div style={twoCol}>
        <div>
          {(skills.hardSkills.length > 0 || skills.softSkills.length > 0) && (
            <section style={{ marginBottom: '10px' }}>
              <h2 style={{ ...sectionTitle, textAlign: 'left' }}>Compétences</h2>
              <div>{[...skills.hardSkills, ...skills.softSkills].join(' · ')}</div>
            </section>
          )}
          {interests.length > 0 && (
            <section>
              <h2 style={{ ...sectionTitle, textAlign: 'left' }}>Centres d'intérêt</h2>
              <div style={{ color: muted }}>{interests.join(' · ')}</div>
            </section>
          )}
        </div>
        <div>
          {languages.some(l => l.name) && (
            <section style={{ marginBottom: '10px' }}>
              <h2 style={{ ...sectionTitle, textAlign: 'left' }}>Langues</h2>
              {languages.filter(l => l.name).map(l => (
                <div key={l.id}>{l.name} <span style={{ color: muted, fontStyle: 'italic' }}>— {l.level}</span></div>
              ))}
            </section>
          )}
          {certifications.some(c => c.name) && (
            <section>
              <h2 style={{ ...sectionTitle, textAlign: 'left' }}>Certifications</h2>
              {certifications.filter(c => c.name).map(c => (
                <div key={c.id}>· {c.name}</div>
              ))}
            </section>
          )}
          {references.some(r => r.name) && (
            <section style={{ marginTop: '10px' }}>
              <h2 style={{ ...sectionTitle, textAlign: 'left' }}>Références</h2>
              {references.filter(r => r.name).map(r => (
                <div key={r.id}><strong>{r.name}</strong>{r.title && <span style={{ color: muted }}> — {r.title}</span>}</div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};