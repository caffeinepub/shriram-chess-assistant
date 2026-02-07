import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ChessStep } from './examples';

interface MoveStepperProps {
  steps: ChessStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function MoveStepper({ steps, currentStep, onStepChange }: MoveStepperProps) {
  const canGoPrevious = currentStep > 0;
  const canGoNext = currentStep < steps.length - 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onStepChange(currentStep - 1)}
          disabled={!canGoPrevious}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>

        <span className="text-sm font-medium text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onStepChange(currentStep + 1)}
          disabled={!canGoNext}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-3">
        <h4 className="mb-2 text-sm font-semibold">Move List</h4>
        <div className="space-y-1">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => onStepChange(index)}
              className={`w-full rounded px-2 py-1 text-left text-sm transition-colors ${
                index === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {index + 1}. {step.move || 'Starting position'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
