import { useState, useEffect } from 'react';
import { CVData, TemplateType } from '@/types/cv';

const STORAGE_KEY = 'cvBuilder_data_v2';
const TEMPLATE_KEY = 'cvBuilder_template_v2';

const initialData: CVData = {
  personalInfo: {
    firstName: '', lastName: '', jobTitle: '', email: '', phone: '',
    address: '', age: '', license: '', photo: '', profile: ''
  },
  formations: [{ id: '1', title: '', period: '', description: '' }],
  experiences: [{ id: '1', title: '', company: '', period: '', description: '' }],
  languages: [{ id: '1', name: '', level: 'Courant' }],
  certifications: [{ id: '1', name: '' }],
  references: [{ id: '1', name: '', title: '' }],
  skills: { softSkills: [], hardSkills: [] },
  interests: []
};

const loadFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const useCVData = () => {
  const [data, setData] = useState<CVData>(() => loadFromStorage(STORAGE_KEY, initialData));
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(
    () => loadFromStorage<TemplateType>(TEMPLATE_KEY, 1)
  );

  // Persist to localStorage on any change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(TEMPLATE_KEY, JSON.stringify(selectedTemplate));
    } catch {}
  }, [selectedTemplate]);

  const loadExampleData = () => {
    setData({
      personalInfo: {
        firstName: 'Marie', lastName: 'Dupont',
        jobTitle: 'Chargée de communication digitale',
        email: 'marie.dupont@email.com', phone: '+33 6 12 34 56 78',
        address: 'Paris, France', age: '28',
        license: 'Permis B',
        photo: '',
        profile: "Passionnée par la communication et le marketing digital, j'accompagne les marques dans le développement de leur présence en ligne à travers des stratégies créatives et data-driven."
      },
      formations: [
        { id: '1', title: 'Master Communication Digitale', period: '2019 - 2021', description: 'CELSA — Sorbonne Université' },
        { id: '2', title: 'Licence Information & Communication', period: '2016 - 2019', description: 'Université Paris-Panthéon-Assas' }
      ],
      experiences: [
        { id: '1', title: 'Chargée de communication senior', company: 'Agence Novéa — Paris', period: '2022 - présent',
          description: "Pilotage de la stratégie éditoriale multi-canal\nGestion d'un budget média de 150K€/an\nManagement d'une équipe de 3 personnes" },
        { id: '2', title: 'Community Manager', company: 'Startup GreenTech — Lyon', period: '2021 - 2022',
          description: "Croissance de la communauté Instagram (+180% en 12 mois)\nCréation de contenu vidéo et rédaction de newsletters" }
      ],
      languages: [
        { id: '1', name: 'Français', level: 'Natif' },
        { id: '2', name: 'Anglais', level: 'Courant' },
        { id: '3', name: 'Espagnol', level: 'Intermédiaire' }
      ],
      certifications: [
        { id: '1', name: 'Google Analytics 4 — Certifié' },
        { id: '2', name: 'HubSpot Content Marketing' }
      ],
      references: [
        { id: '1', name: 'Julien Martin', title: 'Directeur de création — Novéa' }
      ],
      skills: {
        softSkills: ['Leadership', 'Créativité', 'Rigueur', 'Esprit d\'équipe'],
        hardSkills: ['Adobe Creative Suite', 'Google Analytics', 'Meta Ads', 'SEO', 'Notion']
      },
      interests: ['Photographie', 'Voyage', 'Yoga', 'Lecture']
    });
  };

  const resetData = () => {
    setData(initialData);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  return { data, setData, selectedTemplate, setSelectedTemplate, loadExampleData, resetData };
};
