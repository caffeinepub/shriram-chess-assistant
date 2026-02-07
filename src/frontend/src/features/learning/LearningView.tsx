import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import Chessboard from './Chessboard';
import MoveStepper from './MoveStepper';
import { examples, type ChessExample } from './examples';
import { validateAllExamples, type ValidationError } from './exampleValidation';

const isDevelopment = import.meta.env.DEV;

export default function LearningView() {
  const [selectedExample, setSelectedExample] = useState<ChessExample>(examples[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState<Map<string, ValidationError[]>>(new Map());

  useEffect(() => {
    if (isDevelopment) {
      const errors = validateAllExamples(examples);
      setValidationErrors(errors);
      
      if (errors.size > 0) {
        console.warn('Chess example validation errors detected:');
        errors.forEach((errs, exampleId) => {
          console.warn(`Example "${exampleId}":`, errs);
        });
      }
    }
  }, []);

  const handleExampleChange = (exampleId: string) => {
    const example = examples.find((ex) => ex.id === exampleId);
    if (example) {
      setSelectedExample(example);
      setCurrentStep(0);
    }
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const currentPosition = selectedExample.steps[currentStep];
  const currentExampleErrors = validationErrors.get(selectedExample.id);
  const hasErrors = currentExampleErrors && currentExampleErrors.length > 0;

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Chess Learning Assistant</h1>
        <p className="mt-2 text-muted-foreground">
          Learn chess rules through interactive examples with visual board demonstrations
        </p>
      </div>

      {isDevelopment && hasErrors && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Invalid Example Data Detected</AlertTitle>
          <AlertDescription>
            <p className="mb-2">This example contains invalid move data and should not be used for learning:</p>
            <ul className="list-disc pl-5 space-y-1">
              {currentExampleErrors.map((error, idx) => (
                <li key={idx} className="text-sm">
                  Step {error.stepIndex}: {error.message}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Select an Example</CardTitle>
            <CardDescription>Choose a chess concept to visualize and learn</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedExample.id} onValueChange={handleExampleChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {examples.map((example) => (
                  <SelectItem key={example.id} value={example.id}>
                    {example.title}
                    {isDevelopment && validationErrors.has(example.id) && ' ⚠️'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-6">
              <h3 className="mb-2 font-semibold">{selectedExample.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedExample.description}</p>
            </div>

            {!hasErrors && (
              <div className="mt-6">
                <MoveStepper
                  steps={selectedExample.steps}
                  currentStep={currentStep}
                  onStepChange={handleStepChange}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Board Position</CardTitle>
            <CardDescription>{currentPosition.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {!hasErrors ? (
              <Chessboard position={currentPosition.position} lastMove={currentPosition.lastMove} />
            ) : (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                <p>Board display disabled due to invalid example data</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
