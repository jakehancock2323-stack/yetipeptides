import { useState, useEffect } from 'react';
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

export default function PeptideCalculator() {
  const { toast } = useToast();
  
  // Input states
  const [productName, setProductName] = useState('');
  const [peptideMass, setPeptideMass] = useState<string>('');
  const [peptideMassUnit, setPeptideMassUnit] = useState<'mg' | 'mcg'>('mg');
  const [numberOfVials, setNumberOfVials] = useState<string>('1');
  const [reconVolume, setReconVolume] = useState<string>('');
  const [desiredDose, setDesiredDose] = useState<string>('');
  const [desiredDoseUnit, setDesiredDoseUnit] = useState<'mg' | 'mcg'>('mg');

  // Output states
  const [concentration, setConcentration] = useState<string>('—');
  const [doseVolume, setDoseVolume] = useState<string>('—');
  const [dosesPerVial, setDosesPerVial] = useState<string>('—');
  const [totalDoses, setTotalDoses] = useState<string>('—');
  const [summary, setSummary] = useState<string>('');
  const [showWarning, setShowWarning] = useState(false);

  // Convert to mg for calculations
  const convertToMg = (value: number, unit: 'mg' | 'mcg') => {
    return unit === 'mcg' ? value / 1000 : value;
  };

  // Perform calculations
  useEffect(() => {
    const mass = parseFloat(peptideMass);
    const volume = parseFloat(reconVolume);
    const dose = parseFloat(desiredDose);
    const vials = parseInt(numberOfVials);

    // Validation
    if (isNaN(mass) || mass <= 0 || isNaN(volume) || volume <= 0 || isNaN(vials) || vials <= 0) {
      setConcentration('—');
      setDoseVolume('—');
      setDosesPerVial('—');
      setTotalDoses('—');
      setSummary('');
      setShowWarning(false);
      return;
    }

    // Convert to mg
    const massInMg = convertToMg(mass, peptideMassUnit);
    const doseInMg = isNaN(dose) || dose <= 0 ? 0 : convertToMg(dose, desiredDoseUnit);

    // Calculate concentration (mg/mL)
    const concMgMl = massInMg / volume;
    setConcentration(concMgMl.toFixed(3));

    // Calculate dose volume if dose is provided
    if (doseInMg > 0) {
      const doseVol = doseInMg / concMgMl;
      setDoseVolume(doseVol.toFixed(3));

      // Calculate doses per vial
      const dosesPerVialCalc = massInMg / doseInMg;
      setDosesPerVial(dosesPerVialCalc.toFixed(2));

      // Calculate total doses
      const totalDosesCalc = dosesPerVialCalc * vials;
      setTotalDoses(totalDosesCalc.toFixed(2));

      // Check if dose exceeds mass
      if (doseInMg > massInMg) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }

      // Generate summary
      const productText = productName ? `${productName}: ` : '';
      const summaryText = `${productText}${mass} ${peptideMassUnit} per vial with ${volume} mL reconstitution gives ${concMgMl.toFixed(3)} mg/mL concentration. Desired dose of ${dose} ${desiredDoseUnit} requires ${doseVol.toFixed(3)} mL. Each vial provides ${dosesPerVialCalc.toFixed(2)} doses, totaling ${totalDosesCalc.toFixed(2)} doses across ${vials} vial${vials > 1 ? 's' : ''}.`;
      setSummary(summaryText);
    } else {
      setDoseVolume('—');
      setDosesPerVial('—');
      setTotalDoses('—');
      setSummary('');
      setShowWarning(false);
    }
  }, [productName, peptideMass, peptideMassUnit, numberOfVials, reconVolume, desiredDose, desiredDoseUnit]);

  const handleReset = () => {
    setProductName('');
    setPeptideMass('');
    setPeptideMassUnit('mg');
    setNumberOfVials('1');
    setReconVolume('');
    setDesiredDose('');
    setDesiredDoseUnit('mg');
    setConcentration('—');
    setDoseVolume('—');
    setDosesPerVial('—');
    setTotalDoses('—');
    setSummary('');
    setShowWarning(false);
  };

  const handleCopySummary = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
      toast({
        title: "Copied!",
        description: "Summary copied to clipboard",
      });
    }
  };

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
                Calculator Inputs
              </CardTitle>
              <CardDescription>
                Enter your peptide vial details below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name (Optional)</Label>
                <Input
                  id="productName"
                  type="text"
                  placeholder="e.g., BPC-157"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="bg-input/50"
                />
              </div>

              {/* Peptide Mass */}
              <div className="space-y-2">
                <Label htmlFor="peptideMass">Peptide Mass Per Vial *</Label>
                <div className="flex gap-2">
                  <Input
                    id="peptideMass"
                    type="number"
                    placeholder="10"
                    value={peptideMass}
                    onChange={(e) => setPeptideMass(e.target.value)}
                    min="0"
                    step="any"
                    className="bg-input/50 flex-1"
                  />
                  <Select value={peptideMassUnit} onValueChange={(v: 'mg' | 'mcg') => setPeptideMassUnit(v)}>
                    <SelectTrigger className="w-24 bg-input/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mg">mg</SelectItem>
                      <SelectItem value="mcg">mcg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Number of Vials */}
              <div className="space-y-2">
                <Label htmlFor="numberOfVials">Number of Vials *</Label>
                <Input
                  id="numberOfVials"
                  type="number"
                  placeholder="1"
                  value={numberOfVials}
                  onChange={(e) => setNumberOfVials(e.target.value)}
                  min="1"
                  step="1"
                  className="bg-input/50"
                />
              </div>

              {/* Reconstitution Volume */}
              <div className="space-y-2">
                <Label htmlFor="reconVolume">Reconstitution Volume Per Vial (mL) *</Label>
                <Input
                  id="reconVolume"
                  type="number"
                  placeholder="2.0"
                  value={reconVolume}
                  onChange={(e) => setReconVolume(e.target.value)}
                  min="0"
                  step="any"
                  className="bg-input/50"
                />
              </div>

              {/* Desired Dose */}
              <div className="space-y-2">
                <Label htmlFor="desiredDose">Desired Dose Per Administration</Label>
                <div className="flex gap-2">
                  <Input
                    id="desiredDose"
                    type="number"
                    placeholder="500"
                    value={desiredDose}
                    onChange={(e) => setDesiredDose(e.target.value)}
                    min="0"
                    step="any"
                    className="bg-input/50 flex-1"
                  />
                  <Select value={desiredDoseUnit} onValueChange={(v: 'mg' | 'mcg') => setDesiredDoseUnit(v)}>
                    <SelectTrigger className="w-24 bg-input/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mg">mg</SelectItem>
                      <SelectItem value="mcg">mcg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Warning */}
              {showWarning && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50">
                  <p className="text-sm text-destructive">
                    ⚠️ Warning: Desired dose exceeds peptide mass per vial
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1 ice-glow hover:bg-muted"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="frosted-glass ice-glow mt-6">
            <CardHeader>
              <CardTitle className="text-[hsl(var(--glacier))]">Calculated Results</CardTitle>
              <CardDescription>
                Real-time calculations based on your inputs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                  <p className="text-sm text-muted-foreground mb-1">Concentration</p>
                  <p className="text-2xl font-bold text-[hsl(var(--ice-blue))]">{concentration} mg/mL</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                  <p className="text-sm text-muted-foreground mb-1">Dose Volume Needed</p>
                  <p className="text-2xl font-bold text-[hsl(var(--ice-blue))]">{doseVolume} mL</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                  <p className="text-sm text-muted-foreground mb-1">Doses Per Vial</p>
                  <p className="text-2xl font-bold text-[hsl(var(--glacier))]">{dosesPerVial}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                  <p className="text-sm text-muted-foreground mb-1">Total Doses (All Vials)</p>
                  <p className="text-2xl font-bold text-[hsl(var(--glacier))]">{totalDoses}</p>
                </div>
              </div>

              {/* Summary Box */}
              {summary && (
                <div className="mt-6 space-y-3">
                  <Label>Summary</Label>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-foreground/90 leading-relaxed">{summary}</p>
                  </div>
                  <Button
                    onClick={handleCopySummary}
                    variant="default"
                    className="w-full ice-glow"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Summary to Clipboard
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
