import React from 'react';
import { CVData } from '@/types/cv';

interface CVTemplate1Props {
  data: CVData;
}

export const CVTemplate1: React.FC<CVTemplate1Props> = ({ data }) => {
  const { personalInfo, formations, experiences, languages, certifications, skills, interests, references } = data;
  
  return (
    <div className="cv-template-1 flex max-w-4xl bg-white shadow-2xl font-sans text-sm leading-relaxed">
      {/* Sidebar */}
      <aside className="w-1/3 bg-gradient-to-b from-green-50 to-green-100 p-6">
        {/* Photo */}
        <div className="photo mb-6">
          {personalInfo.photo ? (
            <img 
              src={personalInfo.photo} 
              alt="Photo profil" 
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto text-gray-500 text-xs border-4 border-white shadow-lg">
              Photo
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="block mb-6">
          <h2 className="text-green-700 font-bold text-base mb-3 border-b-2 border-green-700 pb-1">
            Informations
          </h2>
          <div className="space-y-2 text-xs">
            {personalInfo.phone && <div className="flex items-center gap-2">📞 {personalInfo.phone}</div>}
            {personalInfo.email && <div className="flex items-center gap-2">✉️ {personalInfo.email}</div>}
            {personalInfo.address && <div className="flex items-center gap-2">📍 {personalInfo.address}</div>}
            {personalInfo.age && <div className="flex items-center gap-2">🎂 {personalInfo.age} ans</div>}
            {personalInfo.license && <div className="flex items-center gap-2">🚗 {personalInfo.license}</div>}
          </div>
        </div>

        {/* Languages */}
        {languages.length > 0 && (
          <div className="block mb-6">
            <h2 className="text-green-700 font-bold text-base mb-3 border-b-2 border-green-700 pb-1">
              Langues
            </h2>
            <div className="space-y-1 text-xs">
              {languages.map(language => language.name && (
                <div key={language.id}>
                  {language.name} : {language.level}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(skills.softSkills.length > 0 || skills.hardSkills.length > 0) && (
          <div className="block mb-6">
            <h2 className="text-green-700 font-bold text-base mb-3 border-b-2 border-green-700 pb-1">
              Compétences
            </h2>
            {skills.softSkills.length > 0 && (
              <div className="mb-3">
                <h3 className="font-semibold text-xs mb-1">Soft Skills</h3>
                <ul className="list-disc list-inside text-xs space-y-1">
                  {skills.softSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            {skills.hardSkills.length > 0 && (
              <div>
                <h3 className="font-semibold text-xs mb-1">Hard Skills</h3>
                <ul className="list-disc list-inside text-xs space-y-1">
                  {skills.hardSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="block mb-6">
            <h2 className="text-green-700 font-bold text-base mb-3 border-b-2 border-green-700 pb-1">
              Certifications
            </h2>
            <div className="space-y-1 text-xs">
              {certifications.map(cert => cert.name && (
                <div key={cert.id}>{cert.name}</div>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <div className="block">
            <h2 className="text-green-700 font-bold text-base mb-3 border-b-2 border-green-700 pb-1">
              Centres d'intérêt
            </h2>
            <div className="space-y-1 text-xs">
              {interests.map((interest, index) => (
                <div key={index}>{interest}</div>
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
            <span className="text-green-700">{personalInfo.lastName || 'Nom'}</span>
          </h1>
          {personalInfo.jobTitle && (
            <h2 className="text-xl text-gray-600 font-normal">{personalInfo.jobTitle}</h2>
          )}
        </header>

        {/* Profile */}
        {personalInfo.profile && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-green-700 border-b-2 border-green-700 pb-1 mb-3">
              Profil
            </h2>
            <p className="text-justify">{personalInfo.profile}</p>
          </section>
        )}

        {/* Professional Experience */}
        {experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-green-700 border-b-2 border-green-700 pb-1 mb-3">
              Expériences professionnelles
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

        {/* Education */}
        {formations.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-green-700 border-b-2 border-green-700 pb-1 mb-3">
              Formations
            </h2>
            {formations.map(formation => formation.title && (
              <article key={formation.id} className="mb-4">
                <h3 className="font-bold text-gray-800 mb-1">
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
            <h2 className="text-lg font-bold text-green-700 border-b-2 border-green-700 pb-1 mb-3">
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