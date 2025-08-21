import React from 'react';
import { CVData, CVCustomization } from '@/types/cv';

interface CVTemplate2Props {
  data: CVData;
  customization?: CVCustomization;
}

export const CVTemplate2: React.FC<CVTemplate2Props> = ({ data, customization }) => {
  const { personalInfo, formations, experiences, languages, certifications, skills, interests, references } = data;
  
  const defaultCustomization: CVCustomization = {
    nameColor: '#0a2342',
    jobTitleColor: '#666666',
    sectionTitleColor: '#0a2342',
    companyColor: '#333333',
    levelBarColor: '#0a2342',
    leftColumnBgColor: '#0a2342',
    leftColumnTitleColor: '#ffffff',
    leftColumnLabelColor: '#ffffff',
    leftColumnTextColor: '#ffffff',
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
    fontFamily: 'Arial, sans-serif',
    fontSize: config.textSize,
    lineHeight: '1.5',
    color: '#000000',
    overflow: 'hidden',
    boxSizing: 'border-box'
  };

  const sidebarStyle: React.CSSProperties = {
    width: '33.333333%',
    backgroundColor: config.leftColumnBgColor,
    color: config.leftColumnTextColor,
    padding: '24px',
    boxSizing: 'border-box'
  };

  const mainContentStyle: React.CSSProperties = {
    width: '66.666667%',
    padding: '32px',
    boxSizing: 'border-box'
  };

  const blockStyle: React.CSSProperties = {
    marginBottom: '24px'
  };

  const sidebarTitleStyle: React.CSSProperties = {
    color: config.leftColumnTitleColor,
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '12px',
    borderBottom: `1px solid ${config.leftColumnTitleColor}`,
    paddingBottom: '4px'
  };

  const mainSectionTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: config.sectionTitleColor,
    borderBottom: `2px solid ${config.sectionTitleColor}`,
    paddingBottom: '4px',
    marginBottom: '12px'
  };

  const photoStyle: React.CSSProperties = {
    width: '128px',
    height: '128px',
    borderRadius: config.photoRounded ? '50%' : '8px',
    margin: '0 auto',
    objectFit: 'cover',
    border: '4px solid white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const photoPlaceholderStyle: React.CSSProperties = {
    width: '128px',
    height: '128px',
    borderRadius: config.photoRounded ? '50%' : '8px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    color: '#6b7280',
    fontSize: '12px',
    border: '4px solid white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div 
      className="cv-template cv-template-2"
      data-cv-template="2"
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
          <h2 style={sidebarTitleStyle}>
            Contact
          </h2>
          <div style={{ fontSize: '12px' }}>
            {personalInfo.phone && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '8px',
                color: config.leftColumnTextColor 
              }}>
                {!config.hideInfoIcons && <span>📞</span>} {personalInfo.phone}
              </div>
            )}
            {personalInfo.email && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '8px',
                color: config.leftColumnTextColor 
              }}>
                {!config.hideInfoIcons && <span>✉️</span>} {personalInfo.email}
              </div>
            )}
            {personalInfo.address && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '8px',
                color: config.leftColumnTextColor 
              }}>
                {!config.hideInfoIcons && <span>📍</span>} {personalInfo.address}
              </div>
            )}
            {personalInfo.age && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '8px',
                color: config.leftColumnTextColor 
              }}>
                {!config.hideInfoIcons && <span>🎂</span>} {personalInfo.age} ans
              </div>
            )}
            {personalInfo.license && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '8px',
                color: config.leftColumnTextColor 
              }}>
                {!config.hideInfoIcons && <span>🚗</span>} {config.reduceLicenseDisplay ? 'Permis B' : personalInfo.license}
              </div>
            )}
          </div>
        </div>

        {/* Education in Sidebar */}
        {formations && formations.length > 0 && (
          <div style={blockStyle}>
            <h2 style={sidebarTitleStyle}>
              Education
            </h2>
            <div style={{ fontSize: '12px' }}>
              {formations.map(formation => formation.title && (
                <div key={formation.id} style={{ marginBottom: '8px', color: config.leftColumnTextColor }}>
                  {formation.period && (
                    <div style={{ fontWeight: '600' }}>{formation.period}</div>
                  )}
                  <div>{formation.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && (skills.softSkills?.length > 0 || skills.hardSkills?.length > 0) && (
          <div style={blockStyle}>
            <h2 style={sidebarTitleStyle}>
              Skills
            </h2>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '20px', 
              fontSize: '12px',
              color: config.leftColumnTextColor
            }}>
              {skills.softSkills && skills.softSkills.map((skill, index) => (
                <li key={`soft-${index}`} style={{ marginBottom: '4px' }}>{skill}</li>
              ))}
              {skills.hardSkills && skills.hardSkills.map((skill, index) => (
                <li key={`hard-${index}`} style={{ marginBottom: '4px' }}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div style={blockStyle}>
            <h2 style={sidebarTitleStyle}>
              Langues
            </h2>
            <div style={{ fontSize: '12px' }}>
              {languages.map(language => language.name && (
                <div key={language.id} style={{ marginBottom: '4px', color: config.leftColumnTextColor }}>
                  {language.name} : {language.level}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h2 style={sidebarTitleStyle}>
              Certification
            </h2>
            <div style={{ fontSize: '12px' }}>
              {certifications.map(cert => cert.name && (
                <div key={cert.id} style={{ marginBottom: '4px', color: config.leftColumnTextColor }}>
                  {cert.name}
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
              fontWeight: 'bold',
              color: '#374151',
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
            <h2 style={mainSectionTitleStyle}>
              Profile
            </h2>
            <p style={{ textAlign: config.alignProfileJustify ? 'justify' : 'left' }}>
              {personalInfo.profile}
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {experiences && experiences.length > 0 && (
          <section style={blockStyle}>
            <h2 style={mainSectionTitleStyle}>
              Work Experience
            </h2>
            {experiences.map(exp => exp.title && (
              <article key={exp.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ 
                    fontWeight: 'bold', 
                    color: config.companyColor,
                    marginBottom: '4px',
                    flex: 1
                  }}>
                    {exp.title}
                  </h3>
                  {exp.period && (
                    <span style={{ 
                      fontWeight: 'normal', 
                      color: '#6b7280',
                      marginLeft: '10px'
                    }}>
                      {exp.period}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <p style={{ 
                    color: '#374151',
                    fontWeight: '500',
                    marginBottom: '4px'
                  }}>
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

        {/* Interests */}
        {interests && interests.length > 0 && (
          <section style={blockStyle}>
            <h2 style={mainSectionTitleStyle}>
              Centres d'intérêt
            </h2>
            <div>
              {interests.map((interest, index) => (
                <span key={index}>
                  {interest}{index < interests.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {references && references.length > 0 && (
          <section>
            <h2 style={mainSectionTitleStyle}>
              References
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
