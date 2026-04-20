import { useState, useMemo } from 'react';
import { Calculator, Copy, RotateCcw, Sparkles, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';
import SEO from '@/components/SEO';
import AnimateOnScroll from '@/components/AnimateOnScroll';
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

// Common BAC water volumes researchers actually use. We pick the BEST from
// this list (smallest volume that gives a clean ~5–25 unit draw), then show
// the next-smaller and next-larger neighbors so users can trade off
// concentration vs. dose precision.
const COMMON_BAC_VOLUMES_ML = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5];
// Preferred draw window — narrow, accurate, easy to read on the syringe.
const IDEAL_UNITS_MIN = 5;
const IDEAL_UNITS_MAX = 25;
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

  // Smart recommendations: pick BEST as the common BAC volume whose draw is
  // closest to the IDEAL_TARGET_UNITS (~10 IU) while staying ≤ MAX (25 IU).
  // Then show the next-smaller and next-larger common volumes as neighbors.
  // Mirrors industry calculators: 3 cards, "Best" centered on the sweet spot.
  const recommendations = useMemo(() => {
    if (effectivePeptideMg <= 0 || dose.mg <= 0) return [];

    const IDEAL_TARGET_UNITS = 10;
    const MAX_UNITS = 25;

    const evaluated = COMMON_BAC_VOLUMES_ML.map(volumeMl => {
      const concentration = effectivePeptideMg / volumeMl; // mg/mL
      const volumePerDoseMl = dose.mg / concentration;
      const units = (volumePerDoseMl / syringeSpec.maxMl) * syringeSpec.units;
      return { volumeMl, units, concentration, fitsSyringe: units > 0 && units <= syringeSpec.units };
    }).filter(o => o.fitsSyringe);

    if (evaluated.length === 0) return [];

    // BEST = closest to IDEAL while ≤ MAX. If everything > MAX, pick smallest draw.
    const underMax = evaluated.filter(o => o.units <= MAX_UNITS);
    const pool = underMax.length > 0 ? underMax : evaluated;
    const best = pool.reduce((a, b) =>
      Math.abs(b.units - IDEAL_TARGET_UNITS) < Math.abs(a.units - IDEAL_TARGET_UNITS) ? b : a
    );
    const bestIdx = evaluated.findIndex(o => o.volumeMl === best.volumeMl);

    const indices = new Set<number>([bestIdx]);
    if (bestIdx - 1 >= 0) indices.add(bestIdx - 1);
    if (bestIdx + 1 < evaluated.length) indices.add(bestIdx + 1);
    if (indices.size < 3) {
      if (bestIdx === 0 && bestIdx + 2 < evaluated.length) indices.add(bestIdx + 2);
      else if (bestIdx === evaluated.length - 1 && bestIdx - 2 >= 0) indices.add(bestIdx - 2);
    }

    return Array.from(indices)
      .sort((a, b) => a - b)
      .map(i => {
        const o = evaluated[i];
        return {
          volumeMl: o.volumeMl,
          units: o.units,
          concentration: o.concentration,
          mcgPerUnit: dose.mcg / o.units,
          isBest: i === bestIdx,
        };
      });
  }, [effectivePeptideMg, dose, syringeSpec]);

  // Active calculation (uses custom volume if provided, else the "Best Precision" 10-unit pick)
  const activeCalc = useMemo(() => {
    const custom = parseFloat(customVolumeMl);
    const fallback =
      recommendations.find(r => r.isBest)?.volumeMl ??
      recommendations[0]?.volumeMl ??
      0;
    const volumeMl = !isNaN(custom) && custom > 0 ? custom : fallback;

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

        <main className="flex-1 container mx-auto px-3 sm:px-4 py-20 sm:py-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <AnimateOnScroll animation="fade-up" className="text-center mb-6 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[hsl(var(--ice-blue))]/10 border border-[hsl(var(--ice-blue))]/30 mb-3 sm:mb-4 animate-fade-in">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[hsl(var(--ice-blue))] animate-pulse" />
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[hsl(var(--ice-blue))]">Research Tool</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[hsl(var(--ice-blue))] via-[hsl(var(--glacier))] to-[hsl(var(--aurora))] bg-clip-text text-transparent leading-tight">
                Peptide Reconstitution Calculator
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
                Calculate concentration, get smart mixing recommendations, and visualize your exact draw on a syringe.
              </p>
              <div className="mt-4 p-3 rounded-lg bg-muted/40 border border-border/40 max-w-2xl mx-auto">
                <p className="text-xs sm:text-sm text-foreground/80">
                  ⚠️ For research-use calculations only. Not medical advice.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="space-y-5">
              {/* Step 1: Syringe size */}
              <AnimateOnScroll animation="fade-up" delay={50}>
                <Card className="frosted-glass ice-glow transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--ice-blue)/0.2)]">
                  <CardContent className="pt-5 sm:pt-6 px-4 sm:px-6">
                    <Select value={syringeSize} onValueChange={(v: SyringeSize) => setSyringeSize(v)}>
                      <SelectTrigger className="bg-input/50 h-12 transition-all hover:border-[hsl(var(--ice-blue))]/60">
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
              </AnimateOnScroll>

              {/* Step 2: Peptide amount */}
              <AnimateOnScroll animation="fade-up" delay={120}>
                <Card className="frosted-glass ice-glow transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--ice-blue)/0.2)]">
                  <CardContent className="pt-5 sm:pt-6 px-4 sm:px-6">
                    <StepHeader number={2} title="Select peptide amount (mg)" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                      {PEPTIDE_AMOUNTS.map((amt, i) => {
                        const isActive = peptideMg === amt;
                        return (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setPeptideMg(amt)}
                            style={{ animationDelay: `${i * 40}ms` }}
                            className={cn(
                              'h-11 sm:h-12 rounded-lg border font-orbitron text-sm font-semibold transition-all duration-200 animate-fade-in hover:scale-105 active:scale-95',
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
                  </CardContent>
                </Card>
              </AnimateOnScroll>

              {/* Step 3: Desired dose */}
              <AnimateOnScroll animation="fade-up" delay={190}>
                <Card className="frosted-glass ice-glow transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--ice-blue)/0.2)]">
                  <CardContent className="pt-5 sm:pt-6 px-4 sm:px-6">
                    <div className="space-y-3">
                      {/* Unit toggle */}
                      <div className="inline-flex w-full sm:w-auto rounded-lg border border-border/50 bg-input/30 p-1">
                        {(['mcg', 'mg'] as DoseUnit[]).map(u => (
                          <button
                            key={u}
                            type="button"
                            onClick={() => setDoseUnit(u)}
                            className={cn(
                              'flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-orbitron font-semibold transition-all duration-200 hover:scale-105 active:scale-95',
                              doseUnit === u
                                ? 'bg-gradient-to-br from-[hsl(var(--ice-blue))]/30 to-[hsl(var(--glacier))]/20 text-[hsl(var(--ice-blue))] shadow-[0_0_10px_hsl(var(--ice-blue)/0.3)]'
                                : 'text-muted-foreground hover:text-foreground'
                            )}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="doseValue" className="flex items-center gap-1.5 text-sm">
                            Dose ({doseUnit})
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-3.5 h-3.5 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>1 mg = 1000 mcg (micrograms)</TooltipContent>
                            </Tooltip>
                          </Label>
                          <Input
                            id="doseValue"
                            type="number"
                            inputMode="decimal"
                            placeholder=""
                            value={doseValue}
                            onChange={(e) => setDoseValue(e.target.value)}
                            min="0"
                            step="any"
                            className="bg-input/50 h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">
                            Equivalent ({doseUnit === 'mcg' ? 'mg' : 'mcg'})
                          </Label>
                          <div className="h-12 px-3 rounded-md bg-input/30 border border-border/50 flex items-center font-orbitron text-[hsl(var(--glacier))] transition-all">
                            <span key={dose.mg} className="animate-fade-in">
                              {dose.mg > 0
                                ? doseUnit === 'mcg'
                                  ? `${dose.mg.toFixed(4)} mg`
                                  : `${dose.mcg.toFixed(2)} mcg`
                                : '—'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>

              {/* Step 4: Mixing volume */}
              <AnimateOnScroll animation="fade-up" delay={260}>
                <Card className="frosted-glass ice-glow transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--ice-blue)/0.2)]">
                  <CardContent className="pt-5 sm:pt-6 px-4 sm:px-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="customVol" className="text-sm">Custom mixing volume (mL)</Label>
                        <Input
                          id="customVol"
                          type="number"
                          inputMode="decimal"
                          placeholder=""
                          value={customVolumeMl}
                          onChange={(e) => setCustomVolumeMl(e.target.value)}
                          min="0"
                          step="any"
                          className="bg-input/50 h-12"
                        />
                      </div>

                      {recommendations.length > 0 && (
                        <div className="animate-fade-in">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-[hsl(var(--glacier))] animate-pulse" />
                            <span className="text-sm font-semibold text-[hsl(var(--glacier))]">
                              Smart mixing recommendations
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {recommendations.map((rec, idx) => {
                              const customVal = parseFloat(customVolumeMl);
                              const isSelected = !isNaN(customVal) && customVal === rec.volumeMl;
                              const isAutoBest = rec.isBest && (isNaN(customVal) || customVolumeMl === '');
                              const highlight = isSelected || isAutoBest;
                              return (
                                <button
                                  key={rec.volumeMl}
                                  type="button"
                                  onClick={() => applyRecommendation(rec.volumeMl)}
                                  style={{ animationDelay: `${idx * 80}ms` }}
                                  className={cn(
                                    'relative p-3 rounded-lg border text-left transition-all duration-200 animate-fade-in hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95',
                                    highlight
                                      ? 'bg-[hsl(var(--ice-blue))]/15 border-[hsl(var(--ice-blue))] shadow-[0_0_15px_hsl(var(--ice-blue)/0.4)]'
                                      : 'bg-input/40 border-border/50 hover:border-[hsl(var(--ice-blue))]/50 hover:shadow-[0_0_15px_hsl(var(--ice-blue)/0.2)]'
                                  )}
                                >
                                  {rec.isBest && (
                                    <span className="absolute -top-2 right-2 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--glacier))] text-[hsl(var(--deep-freeze))] font-bold shadow-[0_0_10px_hsl(var(--ice-blue)/0.6)]">
                                      Best
                                    </span>
                                  )}
                                  <div className="font-orbitron text-lg font-bold text-[hsl(var(--ice-blue))] mb-1.5">
                                    {rec.volumeMl} mL <span className="text-xs text-muted-foreground font-normal">water</span>
                                  </div>
                                  <div className="flex justify-between text-xs text-foreground/80">
                                    <span className="text-muted-foreground">Measure:</span>
                                    <span className="font-semibold text-[hsl(var(--ice-blue))]">{rec.units.toFixed(rec.units % 1 === 0 ? 0 : 1)} IU</span>
                                  </div>
                                  <div className="flex justify-between text-xs text-foreground/80 mt-0.5">
                                    <span className="text-muted-foreground">Sample size:</span>
                                    <span className="font-semibold">{dose.mcg} mcg</span>
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
              </AnimateOnScroll>

              {/* Action buttons */}
              <AnimateOnScroll animation="fade-up" delay={330}>
                <div className="flex gap-3">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 h-12 ice-glow font-orbitron text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(var(--ice-blue)/0.5)] active:scale-95"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="h-12 px-4 transition-all duration-200 hover:scale-105 hover:rotate-[-180deg] active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Results */}
            {showResults && activeCalc && (
              <Card className="frosted-glass ice-glow mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader className="pb-4 px-4 sm:px-6">
                  <CardTitle className="text-[hsl(var(--glacier))] flex items-center gap-2 text-lg sm:text-xl">
                    <Sparkles className="w-5 h-5" />
                    Results
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Using {activeCalc.volumeMl} mL BAC water with {effectivePeptideMg} mg peptide
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 sm:space-y-6 px-4 sm:px-6">
                  {/* Output grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                    <div className="p-2.5 sm:p-3 rounded-lg bg-input/30 border border-border/40 animate-fade-in transition-transform hover:scale-[1.03]" style={{ animationDelay: '0ms' }}>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-1">Concentration</div>
                      <div className="font-orbitron text-base sm:text-lg font-bold text-[hsl(var(--ice-blue))]">
                        {activeCalc.concentration.toFixed(2)}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">mg/mL</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-input/30 border border-border/40 animate-fade-in transition-transform hover:scale-[1.03]" style={{ animationDelay: '80ms' }}>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-1">Dose</div>
                      <div className="font-orbitron text-base sm:text-lg font-bold text-[hsl(var(--ice-blue))]">
                        {dose.mcg}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">mcg</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-gradient-to-br from-[hsl(var(--ice-blue))]/15 to-[hsl(var(--glacier))]/10 border border-[hsl(var(--ice-blue))]/40 animate-scale-in transition-transform hover:scale-[1.05] shadow-[0_0_20px_hsl(var(--ice-blue)/0.2)]" style={{ animationDelay: '160ms' }}>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-1">Draw</div>
                      <div className="font-orbitron text-base sm:text-lg font-bold text-[hsl(var(--ice-blue))]">
                        {activeCalc.units.toFixed(1)}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">units</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-input/30 border border-border/40 animate-fade-in transition-transform hover:scale-[1.03]" style={{ animationDelay: '240ms' }}>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-1">Doses / vial</div>
                      <div className="font-orbitron text-base sm:text-lg font-bold text-[hsl(var(--ice-blue))]">
                        ~{activeCalc.totalDoses}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">doses</div>
                    </div>
                  </div>

                  {/* Ruler-style syringe scale */}
                  <div className="space-y-3 pt-2">
                    <Label className="text-sm">
                      Syringe scale — draw to{' '}
                      <span className="text-[hsl(var(--ice-blue))] font-bold">
                        {activeCalc.units.toFixed(1)} units
                      </span>
                    </Label>

                    <div className="relative px-2 pt-12 pb-8">
                      {/* Callout bracket above draw position */}
                      <div
                        className="absolute top-0 transition-all duration-700 ease-out animate-fade-in"
                        style={{ left: `${fillPercentage}%`, transform: 'translateX(-50%)', animationDelay: '400ms' }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="px-2 py-0.5 rounded-md bg-[hsl(var(--ice-blue))]/15 border border-[hsl(var(--ice-blue))]/60 text-[11px] font-orbitron font-bold text-[hsl(var(--ice-blue))] whitespace-nowrap shadow-[0_0_10px_hsl(var(--ice-blue)/0.4)]">
                            {activeCalc.units.toFixed(1)} U
                          </div>
                          {/* Bracket */}
                          <svg width="40" height="10" viewBox="0 0 40 10" className="text-[hsl(var(--ice-blue))]/70">
                            <path
                              d="M 2 0 L 2 5 L 18 5 L 20 10 L 22 5 L 38 5 L 38 0"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              fill="none"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Tick marks row */}
                      <div className="relative h-6">
                        {Array.from({ length: syringeSpec.units + 1 }).map((_, i) => {
                          const position = (i / syringeSpec.units) * 100;
                          const isMajor = i % 10 === 0;
                          const isMid = i % 5 === 0 && !isMajor;
                          const filled = i <= activeCalc.units;
                          return (
                            <div
                              key={i}
                              className="absolute top-0 animate-fade-in"
                              style={{
                                left: `${position}%`,
                                transform: 'translateX(-50%)',
                                animationDelay: `${i * 8}ms`,
                              }}
                            >
                              <div
                                className={cn(
                                  'w-px transition-all duration-300',
                                  isMajor ? 'h-6' : isMid ? 'h-4' : 'h-2.5',
                                  filled
                                    ? 'bg-[hsl(var(--ice-blue))] shadow-[0_0_4px_hsl(var(--ice-blue))]'
                                    : 'bg-foreground/40'
                                )}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Filled bar from 0 to draw point */}
                      <div className="relative mt-1 h-5 rounded-sm bg-muted/30 overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full bg-[hsl(var(--ice-blue))] transition-all duration-700 ease-out"
                          style={{ width: `${fillPercentage}%` }}
                        />
                      </div>

                      {/* Numeric labels — hide every other on mobile to prevent collision */}
                      <div className="relative h-5 mt-1">
                        {Array.from({ length: syringeSpec.units / 10 + 1 }).map((_, i) => {
                          const value = i * 10;
                          const position = (value / syringeSpec.units) * 100;
                          if (value === 0) return null;
                          // On 100-unit syringe, hide odd labels on mobile (10, 30, 50, 70, 90)
                          const hideOnMobile = syringeSpec.units >= 100 && i % 2 === 1;
                          return (
                            <span
                              key={i}
                              className={cn(
                                'absolute top-0 text-[10px] sm:text-[11px] font-mono text-muted-foreground',
                                hideOnMobile && 'hidden sm:inline'
                              )}
                              style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                            >
                              {value}
                            </span>
                          );
                        })}
                      </div>
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
