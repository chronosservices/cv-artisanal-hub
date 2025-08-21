import { useState } from 'react';
import { CVCustomization } from '@/types/cv';

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

export const useCVCustomization = () => {
  const [customization, setCustomization] = useState<CVCustomization>(defaultCustomization);

  const resetToDefault = () => {
    setCustomization(defaultCustomization);
  };

  return {
    customization,
    setCustomization,
    resetToDefault
  };
};