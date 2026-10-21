import { Check } from "lucide-react";
import styles from "./apply.module.css";

interface ProgressIndicatorProps {
  currentStep: 1 | 2 | 3;
  onStepClick?: (step: 1 | 2 | 3) => void;
}

export default function ProgressIndicator({
  currentStep,
  onStepClick,
}: ProgressIndicatorProps) {
  const steps = [
    { number: 1, label: "Personal\nInformation" },
    { number: 2, label: "Address\nDetails" },
    { number: 3, label: "Document\nUpload" },
  ] as const;

  return (
    <nav className={styles.progressWrap} aria-label="Membership application progress">
      <ol className={styles.progressList}>
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;
          const isUpcoming = currentStep < step.number;

          const stateClass = isCompleted
            ? styles.stepCompleted
            : isActive
            ? styles.stepActive
            : styles.stepUpcoming;

          // Connector lines:
          // Line after Step 1 (connector to Step 2):
          // In reference image: golden yellow on Step 1, Step 2, and Step 3!
          // Line after Step 2 (connector to Step 3):
          // Golden yellow when currentStep === 3
          const isConnectorActive =
            index === 0
              ? currentStep >= 1
              : index === 1
              ? currentStep >= 3
              : false;

          return (
            <li key={step.number} className={`${styles.progressItem} ${stateClass}`}>
              {index < steps.length - 1 && (
                <div
                  className={`${styles.connectorLine} ${
                    isConnectorActive ? styles.connectorActive : ""
                  }`}
                  aria-hidden="true"
                />
              )}

              <button
                type="button"
                className={styles.stepNode}
                onClick={() => {
                  // Only allow clicking to go backwards or if already completed
                  if (onStepClick && step.number < currentStep) {
                    onStepClick(step.number as 1 | 2 | 3);
                  }
                }}
                disabled={step.number > currentStep}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Step ${step.number}: ${step.label.replace("\n", " ")}${
                  isCompleted ? " (Completed)" : isActive ? " (Active)" : ""
                }`}
              >
                <span className={styles.stepCircle}>
                  {isCompleted ? (
                    <Check size={18} strokeWidth={3} aria-hidden="true" />
                  ) : (
                    step.number
                  )}
                </span>
                <span className={styles.stepLabel}>
                  {step.label.split("\n").map((line, i) => (
                    <span key={i} style={{ display: "block" }}>
                      {line}
                    </span>
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
