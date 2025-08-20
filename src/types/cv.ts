export interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  age: string;
  license: string;
  photo: string;
  profile: string;
}

export interface Formation {
  id: string;
  title: string;
  period: string;
  description: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Certification {
  id: string;
  name: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
}

export interface Skills {
  softSkills: string[];
  hardSkills: string[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  formations: Formation[];
  experiences: Experience[];
  languages: Language[];
  certifications: Certification[];
  references: Reference[];
  skills: Skills;
  interests: string[];
}

export type TemplateType = 1 | 2;