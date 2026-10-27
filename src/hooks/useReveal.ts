import { useEffect } from 'react';

/**
 * Adds the `is-visible` class to any element with the `reveal` class
 * when it scrolls into the viewport. Re-runs when `dep` changes so
 * navigating between pages re-observes the newly mounted elements.
 */
export function useReveal(dep: unknown = null) {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => el.classList.remove('is-visible'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [dep]);
}
