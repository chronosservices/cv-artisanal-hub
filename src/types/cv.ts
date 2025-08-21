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

export interface CVCustomization {
  nameColor: string;
  jobTitleColor: string;
  sectionTitleColor: string;
  companyColor: string;
  levelBarColor: string;
  leftColumnBgColor: string;
  leftColumnTitleColor: string;
  leftColumnLabelColor: string;
  leftColumnTextColor: string;
  photoRounded: boolean;
  showTimeline: boolean;
  lineBreakAfterLabels: boolean;
  nameUppercase: boolean;
  alignProfileJustify: boolean;
  hideInfoIcons: boolean;
  reduceLicenseDisplay: boolean;
  textFont: string;
  textSize: string;
  nameSize: string;
  titleFont: string;
  titleSize: string;
  blockMargins: string;
  contentMargins: string;
  verticalPadding: string;
  horizontalPadding: string;
  dateFormat: string;
}

export type TemplateType = 1 | 2;