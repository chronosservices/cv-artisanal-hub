import { useState } from 'react';
import { CVData, TemplateType } from '@/types/cv';

const initialData: CVData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    license: '',
    photo: '',
    profile: ''
  },
  formations: [
    {
      id: '1',
      title: '',
      period: '',
      description: ''
    }
  ],
  experiences: [
    {
      id: '1',
      title: '',
      company: '',
      period: '',
      description: ''
    }
  ],
  languages: [
    {
      id: '1',
      name: '',
      level: 'Courant'
    }
  ],
  certifications: [
    {
      id: '1',
      name: ''
    }
  ],
  references: [
    {
      id: '1',
      name: '',
      title: ''
    }
  ],
  skills: {
    softSkills: [],
    hardSkills: []
  },
  interests: []
};

export const useCVData = () => {
  const [data, setData] = useState<CVData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(1);

  const loadExampleData = () => {
    const exampleData: CVData = {
      personalInfo: {
        firstName: 'Sacha',
        lastName: 'Diarra',
        jobTitle: 'Chargée de communication',
        email: 'hello@reallygreatsite.com',
        phone: '+225-456-7890',
        address: '123 Anywhere St., City',
        age: '24',
        license: 'Permis B - Véhicule',
        photo: '',
        profile: 'Passionnée par la communication et le marketing digital, je possède une expérience en gestion de projets, création de contenu et stratégies de médias sociaux. Ma créativité et mon sens de l\'organisation sont mes atouts dans le développement de campagnes impactantes.'
      },
      formations: [
        {
          id: '1',
          title: 'Master Communication',
          period: '2021 - 2023',
          description: 'Spécialisation en communication digitale et médias sociaux.'
        },
        {
          id: '2',
          title: 'Licence Marketing et Communication',
          period: '2020 - 2021',
          description: 'Participation à un projet collectif de création d\'une campagne publicitaire.'
        }
      ],
      experiences: [
        {
          id: '1',
          title: 'Chargée de communication et marketing',
          company: 'Nom de l\'entreprise - Any City',
          period: '2021 - 2023',
          description: '• Gestion et optimisation des campagnes publicitaires sur les réseaux sociaux\n• Création de contenu visuel et rédactionnel engageant\n• Analyse des données de performance et ajustement des stratégies marketing'
        },
        {
          id: '2',
          title: 'Community Manager',
          company: 'Nom de l\'entreprise - Any City',
          period: '2020 - 2021',
          description: '• Planification et exécution d\'événements médiatiques\n• Rédaction de communiqués de presse et gestion des relations presse\n• Développement de relations avec les influenceurs et partenaires'
        }
      ],
      languages: [
        {
          id: '1',
          name: 'Français',
          level: 'Courant'
        },
        {
          id: '2',
          name: 'Anglais',
          level: 'Courant'
        },
        {
          id: '3',
          name: 'Espagnol',
          level: 'Niveau scolaire'
        }
      ],
      certifications: [
        {
          id: '1',
          name: 'Google Analytics Certified'
        },
        {
          id: '2',
          name: 'Facebook Marketing Professional'
        }
      ],
      references: [
        {
          id: '1',
          name: 'Shella Bawar',
          title: 'Tesda Trainer'
        },
        {
          id: '2',
          name: 'Maria Encarnacion Rojo',
          title: 'General Manager'
        }
      ],
      skills: {
        softSkills: ['Esprit d\'équipe', 'Rigoureuse', 'Organisée'],
        hardSkills: ['Marketing Digital', 'Réseaux Sociaux', 'Google Analytics', 'Créativité']
      },
      interests: ['🎵 Musique', '✈️ Voyage', '⚽ Sport', '🧵 Couture']
    };

    setData(exampleData);
  };

  return {
    data,
    setData,
    selectedTemplate,
    setSelectedTemplate,
    loadExampleData
  };
};