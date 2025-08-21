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
  
  const customStyles = {
    '--name-color': config.nameColor,
    '--job-title-color': config.jobTitleColor,
    '--section-title-color': config.sectionTitleColor,
    '--company-color': config.companyColor,
    '--level-bar-color': config.levelBarColor,
    '--left-column-bg': config.leftColumnBgColor,
    '--left-column-title-color': config.leftColumnTitleColor,
    '--left-column-text-color': config.leftColumnTextColor,
    '--text-size': config.textSize,
    '--name-size': config.nameSize,
    '--title-size': config.titleSize,
    '--block-margins': config.blockMargins,
    '--content-margins': config.contentMargins,
    '--vertical-padding': config.verticalPadding,
    '--horizontal-padding': config.horizontalPadding,
  } as React.CSSProperties;

  return (
    <div 
      className="cv-template-1 flex max-w-4xl bg-white shadow-2xl font-sans leading-relaxed print:shadow-none print:max-w-none overflow-hidden"
      style={{ 
        ...customStyles,
        fontSize: config.textSize,
        fontFamily: config.textFont === 'OpenSans' ? 'system-ui, -apple-system, sans-serif' : config.textFont,
        minHeight: 'fit-content',
        height: 'auto'
      }}
    >
      {/* Sidebar */}
      <aside 
        className="w-1/3 p-6 print:w-1/3" 
        style={{ 
          backgroundColor: config.leftColumnBgColor,
          padding: `${config.verticalPadding} ${config.horizontalPadding}`
        }}
      >
        {/* Photo */}
        <div className="photo" style={{ marginBottom: config.blockMargins }}>
          {personalInfo.photo ? (
            <img 
              src={personalInfo.photo} 
              alt="Photo profil" 
              className={`w-32 h-32 mx-auto object-cover border-4 border-white shadow-lg ${config.photoRounded ? 'rounded-full' : 'rounded-lg'}`}
            />
          ) : (
            <div className={`w-32 h-32 bg-gray-200 flex items-center justify-center mx-auto text-gray-500 text-xs border-4 border-white shadow-lg ${config.photoRounded ? 'rounded-full' : 'rounded-lg'}`}>
              Photo
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="block" style={{ marginBottom: config.blockMargins }}>
          <h2 
            className="font-bold border-b-2 pb-1"
            style={{ 
              color: config.leftColumnTitleColor,
              fontSize: config.titleSize,
              marginBottom: config.contentMargins,
              borderBottomColor: config.leftColumnTitleColor
            }}
          >
            Informations
          </h2>
          <div className="space-y-2">
            {personalInfo.phone && (
              <div className="flex items-center gap-2" style={{ color: config.leftColumnTextColor }}>
                {!config.hideInfoIcons && '📞'} {personalInfo.phone}
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-2" style={{ color: config.leftColumnTextColor }}>
                {!config.hideInfoIcons && '✉️'} {personalInfo.email}
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-2" style={{ color: config.leftColumnTextColor }}>
                {!config.hideInfoIcons && '📍'} {personalInfo.address}
              </div>
            )}
            {personalInfo.age && (
              <div className="flex items-center gap-2" style={{ color: config.leftColumnTextColor }}>
                {!config.hideInfoIcons && '🎂'} {personalInfo.age} ans
              </div>
            )}
            {personalInfo.license && (
              <div className="flex items-center gap-2" style={{ color: config.leftColumnTextColor }}>
                {!config.hideInfoIcons && '🚗'} {config.reduceLicenseDisplay ? 'Permis B' : personalInfo.license}
              </div>
            )}
          </div>
        </div>

        {/* Languages */}
        {languages.length > 0 && (
          <div className="block" style={{ marginBottom: config.blockMargins }}>
            <h2 
              className="font-bold border-b-2 pb-1"
              style={{ 
                color: config.leftColumnTitleColor,
                fontSize: config.titleSize,
                marginBottom: config.contentMargins,
                borderBottomColor: config.leftColumnTitleColor
              }}
            >
              Langues
            </h2>
            <div className="space-y-1">
              {languages.map(language => language.name && (
                <div key={language.id} style={{ color: config.leftColumnTextColor }}>
                  {language.name} : {language.level}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(skills.softSkills.length > 0 || skills.hardSkills.length > 0) && (
          <div className="block" style={{ marginBottom: config.blockMargins }}>
            <h2 
              className="font-bold border-b-2 pb-1"
              style={{ 
                color: config.leftColumnTitleColor,
                fontSize: config.titleSize,
                marginBottom: config.contentMargins,
                borderBottomColor: config.leftColumnTitleColor
              }}
            >
              Compétences
            </h2>
            {skills.softSkills.length > 0 && (
              <div style={{ marginBottom: config.contentMargins }}>
                <h3 className="font-semibold mb-1" style={{ color: config.leftColumnTextColor }}>Soft Skills</h3>
                <ul className="list-disc list-inside space-y-1">
                  {skills.softSkills.map((skill, index) => (
                    <li key={index} style={{ color: config.leftColumnTextColor }}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            {skills.hardSkills.length > 0 && (
              <div>
                <h3 className="font-semibold mb-1" style={{ color: config.leftColumnTextColor }}>Hard Skills</h3>
                <ul className="list-disc list-inside space-y-1">
                  {skills.hardSkills.map((skill, index) => (
                    <li key={index} style={{ color: config.leftColumnTextColor }}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="block" style={{ marginBottom: config.blockMargins }}>
            <h2 
              className="font-bold border-b-2 pb-1"
              style={{ 
                color: config.leftColumnTitleColor,
                fontSize: config.titleSize,
                marginBottom: config.contentMargins,
                borderBottomColor: config.leftColumnTitleColor
              }}
            >
              Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map(cert => cert.name && (
                <div key={cert.id} style={{ color: config.leftColumnTextColor }}>{cert.name}</div>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <div className="block">
            <h2 
              className="font-bold border-b-2 pb-1"
              style={{ 
                color: config.leftColumnTitleColor,
                fontSize: config.titleSize,
                marginBottom: config.contentMargins,
                borderBottomColor: config.leftColumnTitleColor
              }}
            >
              Centres d'intérêt
            </h2>
            <div className="space-y-1">
              {interests.map((interest, index) => (
                <div key={index} style={{ color: config.leftColumnTextColor }}>{interest}</div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main 
        className="w-2/3 print:w-2/3" 
        style={{ padding: `${config.verticalPadding} ${config.horizontalPadding}` }}
      >
        {/* Header */}
        <header style={{ marginBottom: config.blockMargins }}>
          <h1 
            className={`font-bold mb-2 ${config.nameUppercase ? 'uppercase' : ''}`}
            style={{ 
              fontSize: config.nameSize,
              color: config.nameColor
            }}
          >
            {personalInfo.firstName || 'Votre'}{' '}
            <span style={{ color: config.nameColor }}>{personalInfo.lastName || 'Nom'}</span>
          </h1>
          {personalInfo.jobTitle && (
            <h2 
              className="font-normal"
              style={{ 
                fontSize: '20px',
                color: config.jobTitleColor
              }}
            >
              {personalInfo.jobTitle}
            </h2>
          )}
        </header>

        {/* Profile */}
        {personalInfo.profile && (
          <section style={{ marginBottom: config.blockMargins }}>
            <h2 
              className="font-bold border-b-2 pb-1"
              style={{ 
                fontSize: config.titleSize,
                color: config.sectionTitleColor,
                borderBottomColor: config.sectionTitleColor,
                marginBottom: config.contentMargins
              }}
            >
              Profil
            </h2>
            <p className={config.alignProfileJustify ? 'text-justify' : ''}>{personalInfo.profile}</p>
          </section>
        )}

        {/* Professional Experience */}
        {experiences.length > 0 && (
          <section style={{ marginBottom: config.blockMargins }}>
            <h2 
              className="font-bold border-b-2 pb-1"
              style={{ 
                fontSize: config.titleSize,
                color: config.sectionTitleColor,
                borderBottomColor: config.sectionTitleColor,
                marginBottom: config.contentMargins
              }}
            >
              Expériences professionnelles
            </h2>
            {experiences.map(exp => exp.title && (
              <article key={exp.id} style={{ marginBottom: config.contentMargins }}>
                <h3 className="font-bold mb-1" style={{ color: config.companyColor }}>
                  {exp.title}
                  {exp.period && <span className="float-right font-normal text-gray-600">{exp.period}</span>}
                </h3>
                {exp.company && <p className="font-medium mb-1" style={{ color: config.companyColor }}>{exp.company}</p>}
                {exp.description && (
                  <div className="text-justify">
                    {exp.description.split('\n').map((line, index) => {
                      const trimmedLine = line.trim();
                      if (!trimmedLine) return null;
                      const formattedLine = trimmedLine.startsWith('•') ? trimmedLine : `• ${trimmedLine}`;
                      return <p key={index} className="mb-1">{formattedLine}</p>;
                    })}
                  </div>
                )}
              </article>
            ))}
          </section>
        )}

        {/* Education */}
        {formations.length > 0 && (
          <section style={{ marginBottom: config.blockMargins }}>
            <h2 
              className="font-bold border-b-2 pb-1"
              style={{ 
                fontSize: config.titleSize,
                color: config.sectionTitleColor,
                borderBottomColor: config.sectionTitleColor,
                marginBottom: config.contentMargins
              }}
            >
              Formations
            </h2>
            {formations.map(formation => formation.title && (
              <article key={formation.id} style={{ marginBottom: config.contentMargins }}>
                <h3 className="font-bold mb-1" style={{ color: config.companyColor }}>
                  {formation.title}
                  {formation.period && <span className="float-right font-normal text-gray-600">{formation.period}</span>}
                </h3>
                {formation.description && <p className="text-justify">{formation.description}</p>}
              </article>
            ))}
          </section>
        )}

        {/* References */}
        {references.length > 0 && (
          <section>
            <h2 
              className="font-bold border-b-2 pb-1"
              style={{ 
                fontSize: config.titleSize,
                color: config.sectionTitleColor,
                borderBottomColor: config.sectionTitleColor,
                marginBottom: config.contentMargins
              }}
            >
              Références
            </h2>
            {references.map(ref => ref.name && (
              <p key={ref.id} className="mb-1">
                {ref.name}{ref.title && ` - ${ref.title}`}
              </p>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};