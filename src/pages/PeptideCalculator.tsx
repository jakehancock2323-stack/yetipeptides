import { useState } from 'react';
import { Calculator, Copy, RotateCcw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type SyringeSize = '0.3ml-30units' | '0.5ml-50units' | '1ml-100units' | '3ml-100units';

export default function PeptideCalculator() {
  const { toast } = useToast();
  
  // Input states
  const [syringeSize, setSyringeSize] = useState<SyringeSize>('1ml-100units');
  const [peptideWeight, setPeptideWeight] = useState<string>('');
  const [bacWater, setBacWater] = useState<string>('');
  const [desiredDosageMg, setDesiredDosageMg] = useState<string>('');
  const [desiredDosageMcg, setDesiredDosageMcg] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  // Output states
  const [requiredVolumeMl, setRequiredVolumeMl] = useState<number>(0);
  const [requiredVolumeIU, setRequiredVolumeIU] = useState<number>(0);
  const [syringeUnits, setSyringeUnits] = useState<number>(100);
  const [syringeMaxMl, setSyringeMaxMl] = useState<number>(1);

  // Get syringe specifications
  const getSyringeSpecs = (size: SyringeSize) => {
    switch (size) {
      case '0.3ml-30units':
        return { maxMl: 0.3, units: 30 };
      case '0.5ml-50units':
        return { maxMl: 0.5, units: 50 };
      case '1ml-100units':
        return { maxMl: 1.0, units: 100 };
      case '3ml-100units':
        return { maxMl: 3.0, units: 100 };
      default:
        return { maxMl: 1.0, units: 100 };
    }
  };

  const handleCalculate = () => {
    const weight = parseFloat(peptideWeight);
    const water = parseFloat(bacWater);
    
    // Determine desired dose in mg
    let doseMg = 0;
    if (desiredDosageMg) {
      doseMg = parseFloat(desiredDosageMg);
    } else if (desiredDosageMcg) {
      doseMg = parseFloat(desiredDosageMcg) / 1000;
    }

    // Validation
    if (isNaN(weight) || weight <= 0 || isNaN(water) || water <= 0 || doseMg <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all required fields with valid numbers",
        variant: "destructive"
      });
      return;
    }

    // Calculate concentration (mg/mL)
    const concentration = weight / water;
    
    // Calculate required volume (mL)
    const volumeMl = doseMg / concentration;
    
    // Get syringe specs
    const specs = getSyringeSpecs(syringeSize);
    
    // Calculate IU (units on syringe)
    const volumeIU = (volumeMl / specs.maxMl) * specs.units;

    setRequiredVolumeMl(volumeMl);
    setRequiredVolumeIU(volumeIU);
    setSyringeUnits(specs.units);
    setSyringeMaxMl(specs.maxMl);
    setShowResults(true);
  };

  const handleReset = () => {
    setSyringeSize('1ml-100units');
    setPeptideWeight('');
    setBacWater('');
    setDesiredDosageMg('');
    setDesiredDosageMcg('');
    setShowResults(false);
    setRequiredVolumeMl(0);
    setRequiredVolumeIU(0);
  };

  const handleCopyResults = () => {
    const resultsText = `Required volume: ${requiredVolumeMl.toFixed(3)} mL\nDraw up: ${requiredVolumeIU.toFixed(1)} IU on a ${syringeUnits}-unit syringe`;
    navigator.clipboard.writeText(resultsText);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  // Calculate fill percentage for syringe visualization
  const fillPercentage = showResults ? Math.min((requiredVolumeIU / syringeUnits) * 100, 100) : 0;

  return (
    <div className="min-h-screen flex flex-col winter-gradient">
      <Snowfall />
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--ice-blue))] via-[hsl(var(--glacier))] to-[hsl(var(--aurora))] bg-clip-text text-transparent">
              Peptide Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate peptide concentration, dosing volumes, and doses per vial for your research needs.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border/50 max-w-2xl mx-auto">
              <p className="text-sm text-foreground/80">
                ⚠️ This tool is for research-use calculations only. It does not provide medical or dosing advice.
              </p>
            </div>
          </div>

          {/* Calculator Card */}
          <Card className="frosted-glass ice-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[hsl(var(--ice-blue))]">
                <Calculator className="w-6 h-6" />
                Peptide Dosage Calculator
              </CardTitle>
              <CardDescription>
                Calculate the correct draw volume on your syringe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Syringe Size */}
              <div className="space-y-2">
                <Label htmlFor="syringeSize" className="text-base font-semibold">
                  Syringe Size (Normally 1 mL):
                </Label>
                <Select value={syringeSize} onValueChange={(v: SyringeSize) => setSyringeSize(v)}>
                  <SelectTrigger id="syringeSize" className="bg-input/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.3ml-30units">0.3 mL (30 units)</SelectItem>
                    <SelectItem value="0.5ml-50units">0.5 mL (50 units)</SelectItem>
                    <SelectItem value="1ml-100units">1 mL (100 units)</SelectItem>
                    <SelectItem value="3ml-100units">3 mL (100 units)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Peptide Weight */}
              <div className="space-y-2">
                <Label htmlFor="peptideWeight" className="text-base font-semibold">
                  Peptide Weight (mg):
                </Label>
                <Input
                  id="peptideWeight"
                  type="number"
                  placeholder="10"
                  value={peptideWeight}
                  onChange={(e) => setPeptideWeight(e.target.value)}
                  min="0"
                  step="any"
                  className="bg-input/50"
                />
              </div>

              {/* Bacteriostatic Water */}
              <div className="space-y-2">
                <Label htmlFor="bacWater" className="text-base font-semibold">
                  Bacteriostatic Water (mL) - How much BAC water will you add?:
                </Label>
                <Input
                  id="bacWater"
                  type="number"
                  placeholder="1"
                  value={bacWater}
                  onChange={(e) => setBacWater(e.target.value)}
                  min="0"
                  step="any"
                  className="bg-input/50"
                />
              </div>

              {/* Desired Dosage (mg) */}
              <div className="space-y-2">
                <Label htmlFor="desiredDosageMg" className="text-base font-semibold">
                  Desired Dosage (mg) - What will your regular dosage be?:
                </Label>
                <Input
                  id="desiredDosageMg"
                  type="number"
                  placeholder="1"
                  value={desiredDosageMg}
                  onChange={(e) => {
                    setDesiredDosageMg(e.target.value);
                    if (e.target.value) setDesiredDosageMcg('');
                  }}
                  min="0"
                  step="any"
                  className="bg-input/50"
                />
              </div>

              {/* Desired Dosage (mcg) */}
              <div className="space-y-2">
                <Label htmlFor="desiredDosageMcg" className="text-base font-semibold">
                  Desired Dosage (mcg) - For lower dosage peptides:
                </Label>
                <Input
                  id="desiredDosageMcg"
                  type="number"
                  placeholder="Leave blank if using mg"
                  value={desiredDosageMcg}
                  onChange={(e) => {
                    setDesiredDosageMcg(e.target.value);
                    if (e.target.value) setDesiredDosageMg('');
                  }}
                  min="0"
                  step="any"
                  className="bg-input/50"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleCalculate}
                  variant="default"
                  className="flex-1 ice-glow"
                >
                  Calculate
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="ice-glow hover:bg-muted"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          {showResults && (
            <Card className="frosted-glass ice-glow mt-6">
              <CardHeader>
                <CardTitle className="text-[hsl(var(--glacier))]">Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Text Results */}
                <div className="space-y-3">
                  <div className="text-lg">
                    <span className="text-muted-foreground">Required volume: </span>
                    <span className="font-bold text-[hsl(var(--ice-blue))]">
                      {requiredVolumeMl.toFixed(3)} mL
                    </span>
                  </div>
                  <div className="text-lg">
                    <span className="text-muted-foreground">Draw up: </span>
                    <span className="font-bold text-[hsl(var(--ice-blue))]">
                      {requiredVolumeIU.toFixed(1)} IU
                    </span>
                    <span className="text-muted-foreground"> on a {syringeUnits}-unit syringe</span>
                  </div>
                </div>

                {/* Visual Syringe */}
                <div className="space-y-3 pt-4">
                  <Label>Visual Guide:</Label>
                  <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-2xl">
                      {/* Syringe Container */}
                      <div className="relative h-16 rounded-r-lg border-2 border-[hsl(var(--ice-blue))] bg-card/50 overflow-hidden">
                        {/* Filled portion */}
                        <div 
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--glacier))] transition-all duration-500 opacity-60"
                          style={{ width: `${fillPercentage}%` }}
                        />
                        
                        {/* Measurement lines */}
                        <div className="absolute inset-0 flex">
                          {Array.from({ length: syringeUnits / 10 + 1 }).map((_, i) => {
                            const position = (i / (syringeUnits / 10)) * 100;
                            return (
                              <div
                                key={i}
                                className="absolute h-full border-l border-border/30"
                                style={{ left: `${position}%` }}
                              >
                                <span className="absolute -bottom-6 -translate-x-1/2 text-xs text-muted-foreground">
                                  {i * 10}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Label showing IU value */}
                      <div className="text-center mt-10 pt-2">
                        <span className="text-xl font-bold text-[hsl(var(--ice-blue))]">
                          {requiredVolumeIU.toFixed(2)} IU
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Copy Button */}
                <Button
                  onClick={handleCopyResults}
                  variant="outline"
                  className="w-full ice-glow"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Results to Clipboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
