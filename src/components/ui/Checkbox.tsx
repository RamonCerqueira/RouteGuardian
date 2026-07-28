import React from 'react';
import { Check, UploadCloud } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, description, className = '', checked, onChange, ...props }) => {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none group">
      <div className="relative flex items-center mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
          {...props}
        />
        <div className="w-5 h-5 rounded-lg border border-slate-700 bg-slate-900 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all duration-200 flex items-center justify-center group-hover:border-slate-500">
          <Check className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
      </div>
      <div>
        {label && <span className="text-sm font-medium text-slate-200 group-hover:text-white">{label}</span>}
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
    </label>
  );
};

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, description }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      {(label || description) && (
        <div>
          {label && <span className="text-sm font-medium text-slate-200">{label}</span>}
          {description && <p className="text-xs text-slate-400">{description}</p>}
        </div>
      )}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          checked ? 'bg-indigo-600' : 'bg-slate-800'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  label?: string;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, label, accept }) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onFileSelect) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full space-y-1.5">
      {label && <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">{label}</label>}
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900/60 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-slate-900 group">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400 group-hover:text-indigo-400">
          <UploadCloud className="w-8 h-8 mb-2 transition-transform group-hover:scale-110" />
          <p className="text-xs font-semibold">Clique para enviar ou arraste o arquivo aqui</p>
          <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, PDF, CSV até 10MB</p>
        </div>
        <input type="file" className="hidden" accept={accept} onChange={handleFile} />
      </label>
    </div>
  );
};
