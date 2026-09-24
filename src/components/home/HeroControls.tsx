import Icon from "@/components/ui/Icon";
import styles from "./heroControls.module.css";

interface HeroControlsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function HeroControls({
  count,
  activeIndex,
  onSelect,
  onPrevious,
  onNext,
}: HeroControlsProps) {
  return (
    <nav className={styles.controls} aria-label="Hero slide navigation">
      <button
        type="button"
        className={styles.arrow}
        aria-label="Previous slide"
        onClick={onPrevious}
      >
        <Icon name="chevronLeft" />
      </button>
      <div className={styles.dots}>
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            className={
              index === activeIndex ? styles.dotActive : styles.dot
            }
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
      <button
        type="button"
        className={styles.arrow}
        aria-label="Next slide"
        onClick={onNext}
      >
        <Icon name="chevronRight" />
      </button>
    </nav>
  );
}
