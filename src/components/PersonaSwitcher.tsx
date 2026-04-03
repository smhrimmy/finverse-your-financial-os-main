import { useFinverseStore } from '@/store/useFinverseStore';
import { type PersonaType } from '@/data/personas';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const personaOptions: { value: PersonaType; label: string; emoji: string }[] = [
  { value: 'salaried', label: 'Salaried', emoji: '👨‍💼' },
  { value: 'high_earner', label: 'High Earner', emoji: '👩‍💻' },
  { value: 'fresher', label: 'Fresher', emoji: '🧑‍🎓' },
  { value: 'business_owner', label: 'Business', emoji: '👩‍💼' },
];

const PersonaSwitcher = () => {
  const { activePersona, setActivePersona } = useFinverseStore();
  const [open, setOpen] = useState(false);
  const current = personaOptions.find((p) => p.value === activePersona)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/20"
      >
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">DEV</span>
        <span>{current.emoji} {current.label}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl glass-strong p-2 shadow-2xl">
          {personaOptions.map((p) => (
            <button
              key={p.value}
              onClick={() => { setActivePersona(p.value); setOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                activePersona === p.value
                  ? 'bg-primary/20 text-primary'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="text-lg">{p.emoji}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonaSwitcher;
