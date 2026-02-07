import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Chessboard from './Chessboard';
import MoveStepper from './MoveStepper';
import { examples, type ChessExample } from './examples';

export default function LearningView() {
  const [selectedExample, setSelectedExample] = useState<ChessExample>(examples[0]);
  const [currentStep, setCurrentStep] = useState(0);

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

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Chess Learning Assistant</h1>
        <p className="mt-2 text-muted-foreground">
          Learn chess rules through interactive examples with visual board demonstrations
        </p>
      </div>

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
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-6">
              <h3 className="mb-2 font-semibold">{selectedExample.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedExample.description}</p>
            </div>

            <div className="mt-6">
              <MoveStepper
                steps={selectedExample.steps}
                currentStep={currentStep}
                onStepChange={handleStepChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Board Position</CardTitle>
            <CardDescription>{currentPosition.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Chessboard position={currentPosition.position} lastMove={currentPosition.lastMove} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
