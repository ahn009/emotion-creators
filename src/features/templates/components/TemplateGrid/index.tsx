// Template Grid for displaying all templates

import { TemplateCard } from '../TemplateCard';
import { TEMPLATES } from '@/features/templates/constants';
import { TemplateType } from '@/features/templates/types/template.types';

interface TemplateGridProps {
  selectedTemplate: TemplateType;
  onSelect: (template: TemplateType) => void;
}

export const TemplateGrid = ({ selectedTemplate, onSelect }: TemplateGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {TEMPLATES.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selectedTemplate === template.id}
          onClick={() => onSelect(template.id)}
        />
      ))}
    </div>
  );
};
