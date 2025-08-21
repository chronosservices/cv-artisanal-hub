export interface CustomizationOptions {
  // Colors
  nameColor: string;
  jobTitleColor: string;
  sectionTitleColor: string;
  companyColor: string;
  levelBarColor: string;
  leftColumnBgColor: string;
  leftColumnTitleColor: string;
  leftColumnLabelColor: string;
  leftColumnTextColor: string;
  leftColumnLevelColor: string;

  // Layout
  photoRounded: boolean;
  showTimeline: boolean;
  lineBreakAfterLabels: boolean;
  nameUppercase: boolean;
  alignProfileJustify: boolean;
  hideInfoIcons: boolean;
  reduceLicenseDisplay: boolean;

  // Typography
  textFont: string;
  textFontWeight: string;
  textSize: string;
  nameSize: string;
  titleFont: string;
  titleFontWeight: string;
  titleSize: string;

  // Spacing
  blockMargins: string;
  contentMargins: string;
  verticalPadding: string;
  horizontalPadding: string;

  // Date Format
  dateFormat: string;
}

export const defaultCustomization: CustomizationOptions = {
  // Colors
  nameColor: '#094102',
  jobTitleColor: '#666666',
  sectionTitleColor: '#094102',
  companyColor: '#333333',
  levelBarColor: '#094102',
  leftColumnBgColor: '#eaf5ed',
  leftColumnTitleColor: '#094102',
  leftColumnLabelColor: '#333333',
  leftColumnTextColor: '#333333',
  leftColumnLevelColor: '#094102',

  // Layout
  photoRounded: true,
  showTimeline: false,
  lineBreakAfterLabels: true,
  nameUppercase: false,
  alignProfileJustify: true,
  hideInfoIcons: false,
  reduceLicenseDisplay: false,

  // Typography
  textFont: 'OpenSans',
  textFontWeight: 'Normal',
  textSize: '14px',
  nameSize: '32px',
  titleFont: 'VisbyCF',
  titleFontWeight: 'Très gras',
  titleSize: '18px',

  // Spacing
  blockMargins: '20px',
  contentMargins: '10px',
  verticalPadding: '20px',
  horizontalPadding: '20px',

  // Date Format
  dateFormat: 'Par défaut'
};