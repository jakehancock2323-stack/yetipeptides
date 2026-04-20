import { useState, useMemo } from 'react';
import { Calculator, Copy, RotateCcw, Sparkles, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type SyringeSize = '0.3' | '0.5' | '1';

const SYRINGE_OPTIONS: { value: SyringeSize; label: string; maxMl: number; units: number }[] = [
  { value: '0.3', label: '0.3 mL (30 units)', maxMl: 0.3, units: 30 },
  { value: '0.5', label: '0.5 mL (50 units)', maxMl: 0.5, units: 50 },
  { value: '1', label: '1 mL (100 units)', maxMl: 1.0, units: 100 },
];

const PEPTIDE_AMOUNTS = [1, 2, 5, 10, 15, 20, 50, 100];

// Target "clean" unit values that make at-a-glance dosing easy on a syringe
const CLEAN_UNIT_TARGETS = [5, 10, 20, 25, 40, 50];
// Practical BAC water volume bounds (mL)
const MIN_VOLUME_ML = 0.5;
const MAX_VOLUME_ML = 5;
type DoseUnit = 'mcg' | 'mg';

interface StepHeaderProps {
  number: number;
  title: string;
}

function StepHeader({ number, title }: StepHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[hsl(var(--ice-blue))] to-[hsl(var(--glacier))] text-[hsl(var(--deep-freeze))] font-bold text-base shadow-[0_0_15px_hsl(var(--ice-blue)/0.5)]">
        {number}
      </div>
      <h3 className="text-lg md:text-xl font-orbitron font-semibold text-[hsl(var(--ice-blue))]">
        {title}
      </h3>
    </div>
  );
}

export default function PeptideCalculator() {
  const { toast } = useToast();

  const [syringeSize, setSyringeSize] = useState<SyringeSize>('1');
  const [peptideMg, setPeptideMg] = useState<number | null>(null);
  const [customPeptideMg, setCustomPeptideMg] = useState<string>('');
  const [doseValue, setDoseValue] = useState<string>('');
  const [doseUnit, setDoseUnit] = useState<DoseUnit>('mcg');
  const [customVolumeMl, setCustomVolumeMl] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  // Resolved peptide amount (custom takes priority if filled)
  const effectivePeptideMg = useMemo(() => {
    const custom = parseFloat(customPeptideMg);
    if (!isNaN(custom) && custom > 0) return custom;
    return peptideMg ?? 0;
  }, [peptideMg, customPeptideMg]);

  const syringeSpec = useMemo(
    () => SYRINGE_OPTIONS.find(s => s.value === syringeSize)!,
    [syringeSize]
  );

  // Convert dose to canonical mg + mcg
  const dose = useMemo(() => {
    const v = parseFloat(doseValue);
    if (isNaN(v) || v <= 0) return { mcg: 0, mg: 0 };
    if (doseUnit === 'mg') return { mg: v, mcg: v * 1000 };
    return { mcg: v, mg: v / 1000 };
  }, [doseValue, doseUnit]);

  // Smart recommendations: derive the EXACT BAC water volume that produces
  // each clean unit target. This is mathematically precise, not a search.
  //
  // Concentration C = peptide_mg / volume_mL
  // Volume per dose (mL) = dose_mg / C = dose_mg * volume_mL / peptide_mg
  // Units on syringe = volume_per_dose_mL * (syringe_units / syringe_maxMl)
  //
  // Solving for volume_mL given a target unit count U:
  //   volume_mL = (peptide_mg * syringe_maxMl * U) / (dose_mg * syringe_units)
  const recommendations = useMemo(() => {
    if (effectivePeptideMg <= 0 || dose.mg <= 0) return [];

    const opts = CLEAN_UNIT_TARGETS.map(targetUnits => {
      const volumeMl =
        (effectivePeptideMg * syringeSpec.maxMl * targetUnits) /
        (dose.mg * syringeSpec.units);
      const concentration = effectivePeptideMg / volumeMl;
      const mcgPerUnit = dose.mcg / targetUnits;
      return { volumeMl, units: targetUnits, mcgPerUnit, concentration };
    })
      // Filter to practical BAC water volumes
      .filter(o => o.volumeMl >= MIN_VOLUME_ML && o.volumeMl <= MAX_VOLUME_ML)
      // Round volume to a sensible 0.05 mL precision and recompute units exactly
      .map(o => {
        const rounded = Math.round(o.volumeMl * 20) / 20; // nearest 0.05 mL
        const concentration = effectivePeptideMg / rounded;
        const volumePerDoseMl = dose.mg / concentration;
        const units = (volumePerDoseMl / syringeSpec.maxMl) * syringeSpec.units;
        return {
          volumeMl: rounded,
          units,
          mcgPerUnit: dose.mcg / units,
          concentration,
        };
      })
      // De-duplicate volumes
      .filter((o, i, arr) => arr.findIndex(x => x.volumeMl === o.volumeMl) === i)
      // Prefer options whose units are closest to a whole number
      .sort((a, b) => {
        const da = Math.abs(a.units - Math.round(a.units));
        const db = Math.abs(b.units - Math.round(b.units));
        return da - db;
      });

    return opts.slice(0, 3);
  }, [effectivePeptideMg, dose, syringeSpec]);

  // Active calculation (uses custom volume if provided, else first recommendation)
  const activeCalc = useMemo(() => {
    const custom = parseFloat(customVolumeMl);
    const volumeMl = !isNaN(custom) && custom > 0
      ? custom
      : recommendations[0]?.volumeMl ?? 0;

    if (volumeMl <= 0 || effectivePeptideMg <= 0 || dose.mg <= 0) return null;

    const concentration = effectivePeptideMg / volumeMl; // mg/mL
    const volumePerDoseMl = dose.mg / concentration;
    const units = (volumePerDoseMl / syringeSpec.maxMl) * syringeSpec.units;
    const totalDoses = Math.floor(effectivePeptideMg / dose.mg);

    return {
      volumeMl,
      concentration,
      volumePerDoseMl,
      units,
      totalDoses,
      mcgPerUnit: dose.mcg / units,
    };
  }, [customVolumeMl, recommendations, effectivePeptideMg, dose, syringeSpec]);

  const handleCalculate = () => {
    if (effectivePeptideMg <= 0) {
      toast({ title: 'Select peptide amount', description: 'Choose or enter a peptide amount in mg.', variant: 'destructive' });
      return;
    }
    if (dose.mg <= 0) {
      toast({ title: 'Enter desired dose', description: `Please enter a desired dose in ${doseUnit}.`, variant: 'destructive' });
      return;
    }
    if (!activeCalc || activeCalc.units > syringeSpec.units) {
      toast({ title: 'Dose too large', description: 'The calculated draw exceeds the syringe size. Try a larger BAC water volume or a bigger syringe.', variant: 'destructive' });
      return;
    }
    setShowResults(true);
  };

  const handleReset = () => {
    setSyringeSize('1');
    setPeptideMg(null);
    setCustomPeptideMg('');
    setDoseValue('');
    setDoseUnit('mcg');
    setCustomVolumeMl('');
    setShowResults(false);
  };

  const handleCopy = () => {
    if (!activeCalc) return;
    const text = [
      `Peptide: ${effectivePeptideMg} mg`,
      `BAC Water: ${activeCalc.volumeMl} mL`,
      `Concentration: ${activeCalc.concentration.toFixed(2)} mg/mL`,
      `Dose: ${dose.mcg} mcg (${dose.mg.toFixed(3)} mg)`,
      `Draw: ${activeCalc.units.toFixed(1)} units on a ${syringeSpec.units}-unit syringe`,
      `Total doses per vial: ~${activeCalc.totalDoses}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: 'Calculation copied to clipboard.' });
  };

  const applyRecommendation = (vol: number) => {
    setCustomVolumeMl(String(vol));
    setShowResults(true);
  };


  const fillPercentage = activeCalc
    ? Math.min((activeCalc.units / syringeSpec.units) * 100, 100)
    : 0;

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col winter-gradient">
        <SEO
          title="Peptide Reconstitution Calculator - Dosage & Mixing Tool"
          description="Free peptide reconstitution and dosage calculator. Smart mixing volume recommendations, syringe visualization, and concentration calculations for research."
          keywords="peptide calculator, peptide reconstitution, research peptide dosing, BAC water mixing calculator, syringe units calculator"
          canonical="https://yetipeptides.com/calculator"
        />
        <Snowfall />
        <Navbar />

        <main className="flex-1 container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--ice-blue))]/10 border border-[hsl(var(--ice-blue))]/30 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
                <span className="text-xs uppercase tracking-widest text-[hsl(var(--ice-blue))]">Research Tool</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--ice-blue))] via-[hsl(var(--glacier))] to-[hsl(var(--aurora))] bg-clip-text text-transparent">
                Peptide Reconstitution Calculator
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Calculate concentration, get smart mixing recommendations, and visualize your exact draw on a syringe.
              </p>
              <div className="mt-4 p-3 rounded-lg bg-muted/40 border border-border/40 max-w-2xl mx-auto">
                <p className="text-sm text-foreground/80">
                  ⚠️ For research-use calculations only. Not medical advice.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Step 1: Syringe size */}
              <Card className="frosted-glass ice-glow">
                <CardContent className="pt-6">
                  <StepHeader number={1} title="Select your syringe size" />
                  <Select value={syringeSize} onValueChange={(v: SyringeSize) => setSyringeSize(v)}>
                    <SelectTrigger className="bg-input/50 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SYRINGE_OPTIONS.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Step 2: Peptide amount */}
              <Card className="frosted-glass ice-glow">
                <CardContent className="pt-6">
                  <StepHeader number={2} title="Select peptide amount (mg)" />
                  <div className="grid grid-cols-4 gap-2 md:gap-3">
                    {PEPTIDE_AMOUNTS.map(amt => {
                      const isActive = peptideMg === amt && !customPeptideMg;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => { setPeptideMg(amt); setCustomPeptideMg(''); }}
                          className={cn(
                            'h-12 rounded-lg border font-orbitron text-sm font-semibold transition-all',
                            isActive
                              ? 'bg-gradient-to-br from-[hsl(var(--ice-blue))]/20 to-[hsl(var(--glacier))]/20 border-[hsl(var(--ice-blue))] text-[hsl(var(--ice-blue))] shadow-[0_0_15px_hsl(var(--ice-blue)/0.4)]'
                              : 'bg-input/40 border-border/50 text-foreground/80 hover:border-[hsl(var(--ice-blue))]/50 hover:text-[hsl(var(--ice-blue))]'
                          )}
                        >
                          {amt}mg
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Label htmlFor="customMg" className="text-sm text-muted-foreground whitespace-nowrap">Or custom (mg):</Label>
                    <Input
                      id="customMg"
                      type="number"
                      placeholder=""
                      value={customPeptideMg}
                      onChange={(e) => { setCustomPeptideMg(e.target.value); if (e.target.value) setPeptideMg(null); }}
                      min="0"
                      step="any"
                      className="bg-input/50"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Step 3: Desired dose */}
              <Card className="frosted-glass ice-glow">
                <CardContent className="pt-6">
                  <StepHeader number={3} title="Enter desired dose" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="doseMcg" className="flex items-center gap-1.5 text-sm">
                        Dose (mcg)
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-3.5 h-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>1 mg = 1000 mcg (micrograms)</TooltipContent>
                        </Tooltip>
                      </Label>
                      <Input
                        id="doseMcg"
                        type="number"
                        placeholder="e.g. 250"
                        value={doseMcg}
                        onChange={(e) => setDoseMcg(e.target.value)}
                        min="0"
                        step="any"
                        className="bg-input/50 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Equivalent (mg)</Label>
                      <div className="h-12 px-3 rounded-md bg-input/30 border border-border/50 flex items-center font-orbitron text-[hsl(var(--glacier))]">
                        {dose.mg > 0 ? `${dose.mg.toFixed(4)} mg` : '—'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 4: Mixing volume */}
              <Card className="frosted-glass ice-glow">
                <CardContent className="pt-6">
                  <StepHeader number={4} title="Mixing volume (BAC water)" />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customVol" className="text-sm">Custom mixing volume (mL)</Label>
                      <Input
                        id="customVol"
                        type="number"
                        placeholder="e.g. 2.0"
                        value={customVolumeMl}
                        onChange={(e) => setCustomVolumeMl(e.target.value)}
                        min="0"
                        step="any"
                        className="bg-input/50 h-12"
                      />
                    </div>

                    {recommendations.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-[hsl(var(--glacier))]" />
                          <span className="text-sm font-semibold text-[hsl(var(--glacier))]">
                            Smart recommendations for easy dosing
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {recommendations.map((rec, idx) => {
                            const isSelected = parseFloat(customVolumeMl) === rec.volumeMl;
                            const isBest = idx === 0 && !isSelected;
                            return (
                              <button
                                key={rec.volumeMl}
                                type="button"
                                onClick={() => applyRecommendation(rec.volumeMl)}
                                className={cn(
                                  'p-3 rounded-lg border text-left transition-all',
                                  isSelected
                                    ? 'bg-[hsl(var(--ice-blue))]/15 border-[hsl(var(--ice-blue))] shadow-[0_0_15px_hsl(var(--ice-blue)/0.4)]'
                                    : 'bg-input/40 border-border/50 hover:border-[hsl(var(--ice-blue))]/50'
                                )}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-orbitron text-base font-bold text-[hsl(var(--ice-blue))]">
                                    {rec.volumeMl} mL
                                  </span>
                                  {isBest && (
                                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[hsl(var(--glacier))]/20 text-[hsl(var(--glacier))]">
                                      Best
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  ≈ <span className="text-foreground/90 font-semibold">{rec.units.toFixed(0)} units</span> per dose
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  1 unit ≈ {rec.mcgPerUnit.toFixed(1)} mcg
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button onClick={handleCalculate} className="flex-1 h-12 ice-glow font-orbitron text-base">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate
                </Button>
                <Button onClick={handleReset} variant="outline" className="h-12 px-4">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Results */}
            {showResults && activeCalc && (
              <Card className="frosted-glass ice-glow mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--glacier))] flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Results
                  </CardTitle>
                  <CardDescription>
                    Using {activeCalc.volumeMl} mL BAC water with {effectivePeptideMg} mg peptide
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Output grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg bg-input/30 border border-border/40">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Concentration</div>
                      <div className="font-orbitron text-lg font-bold text-[hsl(var(--ice-blue))]">
                        {activeCalc.concentration.toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">mg/mL</div>
                    </div>
                    <div className="p-3 rounded-lg bg-input/30 border border-border/40">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Dose</div>
                      <div className="font-orbitron text-lg font-bold text-[hsl(var(--ice-blue))]">
                        {dose.mcg}
                      </div>
                      <div className="text-xs text-muted-foreground">mcg</div>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-br from-[hsl(var(--ice-blue))]/15 to-[hsl(var(--glacier))]/10 border border-[hsl(var(--ice-blue))]/40">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Draw</div>
                      <div className="font-orbitron text-lg font-bold text-[hsl(var(--ice-blue))]">
                        {activeCalc.units.toFixed(1)}
                      </div>
                      <div className="text-xs text-muted-foreground">units</div>
                    </div>
                    <div className="p-3 rounded-lg bg-input/30 border border-border/40">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Doses / vial</div>
                      <div className="font-orbitron text-lg font-bold text-[hsl(var(--ice-blue))]">
                        ~{activeCalc.totalDoses}
                      </div>
                      <div className="text-xs text-muted-foreground">doses</div>
                    </div>
                  </div>

                  {/* Syringe visualization */}
                  <div className="space-y-3 pt-2">
                    <Label className="text-sm">Syringe visual — draw to <span className="text-[hsl(var(--ice-blue))] font-bold">{activeCalc.units.toFixed(1)} units</span></Label>
                    <div className="relative pt-2 pb-10">
                      {/* Plunger end */}
                      <div className="absolute left-0 top-2 bottom-10 w-2 bg-gradient-to-b from-muted to-muted-foreground/30 rounded-l" />
                      {/* Barrel */}
                      <div className="relative ml-2 h-14 rounded-r-xl border-2 border-[hsl(var(--ice-blue))] bg-card/50 overflow-hidden">
                        {/* Fill */}
                        <div
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[hsl(var(--ice-blue))]/70 to-[hsl(var(--glacier))]/70 transition-all duration-700 ease-out"
                          style={{ width: `${fillPercentage}%` }}
                        />
                        {/* Tick marks */}
                        <div className="absolute inset-0">
                          {Array.from({ length: syringeSpec.units / 5 + 1 }).map((_, i) => {
                            const position = (i / (syringeSpec.units / 5)) * 100;
                            const isMajor = i % 2 === 0;
                            return (
                              <div
                                key={i}
                                className={cn(
                                  'absolute top-0 border-l',
                                  isMajor ? 'h-full border-border/60' : 'h-1/2 border-border/30'
                                )}
                                style={{ left: `${position}%` }}
                              >
                                {isMajor && (
                                  <span className="absolute -bottom-6 -translate-x-1/2 text-[10px] text-muted-foreground font-mono">
                                    {i * 5}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {/* Indicator line at draw point */}
                        <div
                          className="absolute top-0 h-full w-0.5 bg-[hsl(var(--aurora))] shadow-[0_0_10px_hsl(var(--aurora))] transition-all duration-700"
                          style={{ left: `${fillPercentage}%` }}
                        >
                          <div className="absolute -top-1 -translate-x-1/2 px-1.5 py-0.5 rounded bg-[hsl(var(--aurora))] text-[10px] font-bold text-white whitespace-nowrap">
                            {activeCalc.units.toFixed(1)}
                          </div>
                        </div>
                      </div>
                      {/* Needle */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-gradient-to-r from-[hsl(var(--ice-blue))] to-transparent" style={{ marginTop: '-12px' }} />
                    </div>
                  </div>

                  {/* Helper text */}
                  <div className="p-3 rounded-lg bg-[hsl(var(--ice-blue))]/5 border border-[hsl(var(--ice-blue))]/20 text-sm text-foreground/80">
                    Add <span className="font-bold text-[hsl(var(--ice-blue))]">{activeCalc.volumeMl} mL</span> of bacteriostatic water to your <span className="font-bold text-[hsl(var(--ice-blue))]">{effectivePeptideMg} mg</span> vial.
                    Each <span className="font-bold text-[hsl(var(--ice-blue))]">{activeCalc.units.toFixed(1)}-unit</span> draw on a {syringeSpec.units}-unit syringe delivers <span className="font-bold text-[hsl(var(--ice-blue))]">{dose.mcg} mcg</span>.
                  </div>

                  <Button onClick={handleCopy} variant="outline" className="w-full">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Results
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </TooltipProvider>
  );
}
