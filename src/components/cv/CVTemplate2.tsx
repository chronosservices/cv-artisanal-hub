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
  
  return (
    <div className="cv-template-2 flex max-w-4xl bg-white shadow-2xl font-sans text-sm leading-relaxed">
      {/* Sidebar */}
      <aside className="w-1/3 bg-slate-800 text-white p-6">
        {/* Photo */}
        <div className="photo mb-6">
          {personalInfo.photo ? (
            <img 
              src={personalInfo.photo} 
              alt="Photo profil" 
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mx-auto text-gray-600 text-xs border-4 border-white shadow-lg">
              Photo
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="block mb-6">
          <h2 className="text-white font-bold text-base mb-3 border-b border-white pb-1">
            Contact
          </h2>
          <div className="space-y-2 text-xs">
            {personalInfo.phone && <div className="flex items-center gap-2">📞 {personalInfo.phone}</div>}
            {personalInfo.email && <div className="flex items-center gap-2">✉️ {personalInfo.email}</div>}
            {personalInfo.address && <div className="flex items-center gap-2">📍 {personalInfo.address}</div>}
            {personalInfo.age && <div className="flex items-center gap-2">🎂 {personalInfo.age} ans</div>}
            {personalInfo.license && <div className="flex items-center gap-2">🚗 {personalInfo.license}</div>}
          </div>
        </div>

        {/* Education in Sidebar */}
        {formations.length > 0 && (
          <div className="block mb-6">
            <h2 className="text-white font-bold text-base mb-3 border-b border-white pb-1">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {formations.map(formation => formation.title && (
                <div key={formation.id}>
                  {formation.period && <div className="font-semibold">{formation.period}</div>}
                  <div>{formation.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(skills.softSkills.length > 0 || skills.hardSkills.length > 0) && (
          <div className="block mb-6">
            <h2 className="text-white font-bold text-base mb-3 border-b border-white pb-1">
              Skills
            </h2>
            <ul className="list-disc list-inside text-xs space-y-1">
              {[...skills.softSkills, ...skills.hardSkills].map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="block">
            <h2 className="text-white font-bold text-base mb-3 border-b border-white pb-1">
              Certification
            </h2>
            <div className="space-y-1 text-xs">
              {certifications.map(cert => cert.name && (
                <div key={cert.id}>{cert.name}</div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {personalInfo.firstName || 'Votre'}{' '}
            <span className="text-slate-800">{personalInfo.lastName || 'Nom'}</span>
          </h1>
          {personalInfo.jobTitle && (
            <h2 className="text-xl text-gray-600 font-normal">{personalInfo.jobTitle}</h2>
          )}
        </header>

        {/* Profile */}
        {personalInfo.profile && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-800 pb-1 mb-3">
              Profile
            </h2>
            <p className="text-justify">{personalInfo.profile}</p>
          </section>
        )}

        {/* Professional Experience */}
        {experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-800 pb-1 mb-3">
              Work Experience
            </h2>
            {experiences.map(exp => exp.title && (
              <article key={exp.id} className="mb-4">
                <h3 className="font-bold text-gray-800 mb-1">
                  {exp.title}
                  {exp.period && <span className="float-right font-normal text-gray-600">{exp.period}</span>}
                </h3>
                {exp.company && <p className="text-gray-700 font-medium mb-1">{exp.company}</p>}
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

        {/* References */}
        {references.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-800 pb-1 mb-3">
              References
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