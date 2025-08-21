import React from 'react';
import { CVData, CVCustomization } from '@/types/cv';

interface CVTemplate1Props {
  data: CVData;
  customization?: CVCustomization;
}

export const CVTemplate1: React.FC<CVTemplate1Props> = ({ data, customization }) => {
  const { personalInfo, formations, experiences, languages, certifications, skills, interests, references } = data;
  
  const defaultCustomization: CVCustomization = {
    nameColor: '#094102',
    jobTitleColor: '#666666',
    sectionTitleColor: '#094102',
    companyColor: '#333333',
    levelBarColor: '#094102',
    leftColumnBgColor: '#eaf5ed',
    leftColumnTitleColor: '#094102',
    leftColumnLabelColor: '#333333',
    leftColumnTextColor: '#333333',
    photoRounded: true,
    showTimeline: false,
    lineBreakAfterLabels: true,
    nameUppercase: false,
    alignProfileJustify: true,
    hideInfoIcons: false,
    reduceLicenseDisplay: false,
    textFont: 'OpenSans',
    textSize: '14px',
    nameSize: '32px',
    titleFont: 'VisbyCF',
    titleSize: '18px',
    blockMargins: '20px',
    contentMargins: '10px',
    verticalPadding: '20px',
    horizontalPadding: '20px',
    dateFormat: 'Par défaut'
  };
  
  const config = { ...defaultCustomization, ...customization };
  
  // Styles CSS intégrés pour éviter les problèmes de Tailwind dans html2canvas
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    maxWidth: '210mm', // Largeur A4
    minHeight: '297mm', // Hauteur A4
    backgroundColor: 'white',
    fontFamily: config.textFont === 'OpenSans' ? 'Arial, sans-serif' : 'Arial, sans-serif',
    fontSize: config.textSize,
    lineHeight: '1.5',
    color: '#000000',
    overflow: 'hidden',
    boxSizing: 'border-box'
  };

  const sidebarStyle: React.CSSProperties = {
    width: '33.333333%',
    backgroundColor: config.leftColumnBgColor,
    padding: `${config.verticalPadding} ${config.horizontalPadding}`,
    boxSizing: 'border-box'
  };

  const mainContentStyle: React.CSSProperties = {
    width: '66.666667%',
    padding: `${config.verticalPadding} ${config.horizontalPadding}`,
    boxSizing: 'border-box'
  };

  const blockStyle: React.CSSProperties = {
    marginBottom: config.blockMargins
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: config.titleSize,
    fontWeight: 'bold',
    borderBottom: `2px solid ${config.sectionTitleColor}`,
    paddingBottom: '4px',
    marginBottom: config.contentMargins,
    color: config.sectionTitleColor
  };

  const leftColumnTitleStyle: React.CSSProperties = {
    fontSize: config.titleSize,
    fontWeight: 'bold',
    borderBottom: `2px solid ${config.leftColumnTitleColor}`,
    paddingBottom: '4px',
    marginBottom: config.contentMargins,
    color: config.leftColumnTitleColor
  };

  const photoStyle: React.CSSProperties = {
    width: '128px',
    height: '128px',
    margin: '0 auto',
    objectFit: 'cover',
    border: '4px solid white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: config.photoRounded ? '50%' : '8px'
  };

  const photoPlaceholderStyle: React.CSSProperties = {
    width: '128px',
    height: '128px',
    backgroundColor: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    color: '#6b7280',
    fontSize: '12px',
    border: '4px solid white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: config.photoRounded ? '50%' : '8px'
  };

  return (
    <div 
      className="cv-template cv-template-1"
      data-cv-template="1"
      style={containerStyle}
    >
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        {/* Photo */}
        <div style={blockStyle}>
          {personalInfo.photo ? (
            <img 
              src={personalInfo.photo} 
              alt="Photo profil" 
              style={photoStyle}
            />
          ) : (
            <div style={photoPlaceholderStyle}>
              Photo
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div style={blockStyle}>
          <h2 style={leftColumnTitleStyle}>
            Informations
          </h2>
          <div>
            {personalInfo.phone && (
              <div 
                style={{ 
                  color: config.leftColumnTextColor,
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {!config.hideInfoIcons && <span>📞</span>} {personalInfo.phone}
              </div>
            )}
            {personalInfo.email && (
              <div 
                style={{ 
                  color: config.leftColumnTextColor,
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {!config.hideInfoIcons && <span>✉️</span>} {personalInfo.email}
              </div>
            )}
            {personalInfo.address && (
              <div 
                style={{ 
                  color: config.leftColumnTextColor,
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {!config.hideInfoIcons && <span>📍</span>} {personalInfo.address}
              </div>
            )}
            {personalInfo.age && (
              <div 
                style={{ 
                  color: config.leftColumnTextColor,
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {!config.hideInfoIcons && <span>🎂</span>} {personalInfo.age} ans
              </div>
            )}
            {personalInfo.license && (
              <div 
                style={{ 
                  color: config.leftColumnTextColor,
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {!config.hideInfoIcons && <span>🚗</span>} {config.reduceLicenseDisplay ? 'Permis B' : personalInfo.license}
              </div>
            )}
          </div>
        </div>

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div style={blockStyle}>
            <h2 style={leftColumnTitleStyle}>
              Langues
            </h2>
            <div>
              {languages.map(language => language.name && (
                <div key={language.id} style={{ color: config.leftColumnTextColor, marginBottom: '4px' }}>
                  {language.name} : {language.level}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && (skills.softSkills?.length > 0 || skills.hardSkills?.length > 0) && (
          <div style={blockStyle}>
            <h2 style={leftColumnTitleStyle}>
              Compétences
            </h2>
            {skills.softSkills && skills.softSkills.length > 0 && (
              <div style={{ marginBottom: config.contentMargins }}>
                <h3 style={{ fontWeight: '600', marginBottom: '4px', color: config.leftColumnTextColor }}>
                  Soft Skills
                </h3>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  {skills.softSkills.map((skill, index) => (
                    <li key={index} style={{ color: config.leftColumnTextColor, marginBottom: '4px' }}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {skills.hardSkills && skills.hardSkills.length > 0 && (
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '4px', color: config.leftColumnTextColor }}>
                  Hard Skills
                </h3>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  {skills.hardSkills.map((skill, index) => (
                    <li key={index} style={{ color: config.leftColumnTextColor, marginBottom: '4px' }}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div style={blockStyle}>
            <h2 style={leftColumnTitleStyle}>
              Certifications
            </h2>
            <div>
              {certifications.map(cert => cert.name && (
                <div key={cert.id} style={{ color: config.leftColumnTextColor, marginBottom: '4px' }}>
                  {cert.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {interests && interests.length > 0 && (
          <div>
            <h2 style={leftColumnTitleStyle}>
              Centres d'intérêt
            </h2>
            <div>
              {interests.map((interest, index) => (
                <div key={index} style={{ color: config.leftColumnTextColor, marginBottom: '4px' }}>
                  {interest}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main style={mainContentStyle}>
        {/* Header */}
        <header style={blockStyle}>
          <h1 
            style={{ 
              fontSize: config.nameSize,
              color: config.nameColor,
              fontWeight: 'bold',
              marginBottom: '8px',
              textTransform: config.nameUppercase ? 'uppercase' : 'none'
            }}
          >
            {personalInfo.firstName || 'Votre'}{' '}
            <span style={{ color: config.nameColor }}>{personalInfo.lastName || 'Nom'}</span>
          </h1>
          {personalInfo.jobTitle && (
            <h2 
              style={{ 
                fontSize: '20px',
                color: config.jobTitleColor,
                fontWeight: 'normal'
              }}
            >
              {personalInfo.jobTitle}
            </h2>
          )}
        </header>

        {/* Profile */}
        {personalInfo.profile && (
          <section style={blockStyle}>
            <h2 style={sectionTitleStyle}>
              Profil
            </h2>
            <p style={{ textAlign: config.alignProfileJustify ? 'justify' : 'left' }}>
              {personalInfo.profile}
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {experiences && experiences.length > 0 && (
          <section style={blockStyle}>
            <h2 style={sectionTitleStyle}>
              Expériences professionnelles
            </h2>
            {experiences.map(exp => exp.title && (
              <article key={exp.id} style={{ marginBottom: config.contentMargins }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '4px', color: config.companyColor, flex: 1 }}>
                    {exp.title}
                  </h3>
                  {exp.period && (
                    <span style={{ fontWeight: 'normal', color: '#6b7280', marginLeft: '10px' }}>
                      {exp.period}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <p style={{ fontWeight: '500', marginBottom: '4px', color: config.companyColor }}>
                    {exp.company}
                  </p>
                )}
                {exp.description && (
                  <div style={{ textAlign: 'justify' }}>
                    {exp.description.split('\n').map((line, index) => {
                      const trimmedLine = line.trim();
                      if (!trimmedLine) return null;
                      const formattedLine = trimmedLine.startsWith('•') ? trimmedLine : `• ${trimmedLine}`;
                      return (
                        <p key={index} style={{ marginBottom: '4px' }}>
                          {formattedLine}
                        </p>
                      );
                    })}
                  </div>
                )}
              </article>
            ))}
          </section>
        )}

        {/* Education */}
        {formations && formations.length > 0 && (
          <section style={blockStyle}>
            <h2 style={sectionTitleStyle}>
              Formations
            </h2>
            {formations.map(formation => formation.title && (
              <article key={formation.id} style={{ marginBottom: config.contentMargins }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '4px', color: config.companyColor, flex: 1 }}>
                    {formation.title}
                  </h3>
                  {formation.period && (
                    <span style={{ fontWeight: 'normal', color: '#6b7280', marginLeft: '10px' }}>
                      {formation.period}
                    </span>
                  )}
                </div>
                {formation.description && (
                  <p style={{ textAlign: 'justify' }}>{formation.description}</p>
                )}
              </article>
            ))}
          </section>
        )}

        {/* References */}
        {references && references.length > 0 && (
          <section>
            <h2 style={sectionTitleStyle}>
              Références
            </h2>
            {references.map(ref => ref.name && (
              <p key={ref.id} style={{ marginBottom: '4px' }}>
                {ref.name}{ref.title && ` - ${ref.title}`}
              </p>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};
