import React from 'react';
import { CVData, CVCustomization } from '@/types/cv';

interface Props { data: CVData; customization?: CVCustomization; }

/**
 * Template 4 — Élégant Dark Header
 * Inspired by APEC "Élégant": bold dark top band with name + job title,
 * two-column body below, refined typography, subtle dividers.
 */
export const CVTemplate4: React.FC<Props> = ({ data, customization }) => {
  const { personalInfo, formations, experiences, languages, certifications, skills, interests, references } = data;

  const dark = customization?.nameColor || '#0f172a';
  const accent = customization?.sectionTitleColor || '#c9a24a';
  const text = '#1f2937';
  const muted = '#6b7280';
  const border = '#e5e7eb';

  const container: React.CSSProperties = {
    width: '210mm', minHeight: '297mm', background: 'white',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontSize: '11px', lineHeight: 1.55, color: text, boxSizing: 'border-box',
  };

  const header: React.CSSProperties = {
    background: dark, color: '#fff',
    padding: '22mm 16mm 14mm',
    display: 'flex', alignItems: 'center', gap: '20px',
  };

  const h1: React.CSSProperties = {
    fontSize: customization?.nameSize || '30px', fontWeight: 300,
    margin: 0, letterSpacing: '0.04em',
    textTransform: customization?.nameUppercase !== false ? 'uppercase' : 'none',
  };

  const jt: React.CSSProperties = {
    marginTop: '6px', color: accent, fontSize: '13px',
    letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500,
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: '11px', fontWeight: 700, color: dark,
    letterSpacing: '0.2em', textTransform: 'uppercase',
    marginBottom: '10px', paddingBottom: '5px',
    borderBottom: `1px solid ${accent}`,
  };

  const body: React.CSSProperties = {
    display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '18px',
    padding: '14mm 16mm',
  };

  const label: React.CSSProperties = { fontSize: '9.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, marginBottom: '2px' };

  return (
    <div className="cv-template cv-template-4" data-cv-template="4" style={container}>
      <div style={header}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt=""
            style={{ width: '90px', height: '90px', objectFit: 'cover',
              borderRadius: customization?.photoRounded === false ? '6px' : '50%',
              border: `2px solid ${accent}`, flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={h1}>
            {personalInfo.firstName || 'Prénom'} <span style={{ fontWeight: 700 }}>{personalInfo.lastName || 'Nom'}</span>
          </h1>
          {personalInfo.jobTitle && <div style={jt}>{personalInfo.jobTitle}</div>}
        </div>
      </div>

      <div style={body}>
        {/* LEFT */}
        <aside>
          <section style={{ marginBottom: '18px' }}>
            <h2 style={sectionTitle}>Contact</h2>
            {personalInfo.email && (<div style={{ marginBottom: '8px' }}><div style={label}>Email</div>{personalInfo.email}</div>)}
            {personalInfo.phone && (<div style={{ marginBottom: '8px' }}><div style={label}>Téléphone</div>{personalInfo.phone}</div>)}
            {personalInfo.address && (<div style={{ marginBottom: '8px' }}><div style={label}>Adresse</div>{personalInfo.address}</div>)}
            {personalInfo.license && (<div style={{ marginBottom: '8px' }}><div style={label}>Permis</div>{personalInfo.license}</div>)}
          </section>

          {(skills.hardSkills.length > 0 || skills.softSkills.length > 0) && (
            <section style={{ marginBottom: '18px' }}>
              <h2 style={sectionTitle}>Compétences</h2>
              {[...skills.hardSkills, ...skills.softSkills].map((s, i) => (
                <div key={i} style={{ marginBottom: '6px' }}>
                  <div style={{ fontSize: '11px', marginBottom: '3px' }}>{s}</div>
                  <div style={{ height: '3px', background: border, borderRadius: '2px' }}>
                    <div style={{ width: '85%', height: '100%', background: accent, borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </section>
          )}

          {languages.some(l => l.name) && (
            <section style={{ marginBottom: '18px' }}>
              <h2 style={sectionTitle}>Langues</h2>
              {languages.filter(l => l.name).map(l => (
                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 500 }}>{l.name}</span>
                  <span style={{ color: muted }}>{l.level}</span>
                </div>
              ))}
            </section>
          )}

          {interests.length > 0 && (
            <section style={{ marginBottom: '18px' }}>
              <h2 style={sectionTitle}>Centres d'intérêt</h2>
              <div style={{ color: muted }}>{interests.join(' · ')}</div>
            </section>
          )}

          {certifications.some(c => c.name) && (
            <section>
              <h2 style={sectionTitle}>Certifications</h2>
              {certifications.filter(c => c.name).map(c => (
                <div key={c.id} style={{ marginBottom: '4px' }}>· {c.name}</div>
              ))}
            </section>
          )}
        </aside>

        {/* RIGHT */}
        <main>
          {personalInfo.profile && (
            <section style={{ marginBottom: '18px' }}>
              <h2 style={sectionTitle}>Profil</h2>
              <p style={{ margin: 0, textAlign: 'justify' }}>{personalInfo.profile}</p>
            </section>
          )}

          {experiences.some(e => e.title) && (
            <section style={{ marginBottom: '18px' }}>
              <h2 style={sectionTitle}>Expériences</h2>
              {experiences.filter(e => e.title).map(exp => (
                <article key={exp.id} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: dark }}>{exp.title}</h3>
                    <span style={{ color: accent, fontSize: '10.5px', whiteSpace: 'nowrap', fontWeight: 600 }}>{exp.period}</span>
                  </div>
                  {exp.company && <div style={{ color: muted, fontSize: '11px', marginBottom: '4px', fontStyle: 'italic' }}>{exp.company}</div>}
                  {exp.description && (
                    <div>
                      {exp.description.split('\n').filter(Boolean).map((l, i) => (
                        <div key={i} style={{ marginBottom: '2px' }}>{l.trim().startsWith('•') ? l : `• ${l.trim()}`}</div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </section>
          )}

          {formations.some(f => f.title) && (
            <section style={{ marginBottom: '18px' }}>
              <h2 style={sectionTitle}>Formations</h2>
              {formations.filter(f => f.title).map(f => (
                <article key={f.id} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: dark }}>{f.title}</h3>
                    <span style={{ color: accent, fontSize: '10.5px', whiteSpace: 'nowrap', fontWeight: 600 }}>{f.period}</span>
                  </div>
                  {f.description && <div style={{ color: muted, fontSize: '11px' }}>{f.description}</div>}
                </article>
              ))}
            </section>
          )}

          {references.some(r => r.name) && (
            <section>
              <h2 style={sectionTitle}>Références</h2>
              {references.filter(r => r.name).map(r => (
                <div key={r.id} style={{ marginBottom: '3px' }}>
                  <strong>{r.name}</strong>{r.title && <span style={{ color: muted }}> — {r.title}</span>}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};