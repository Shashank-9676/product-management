import { useEffect } from 'react';

export const useIntersectionObserver = (
    ref: React.RefObject<Element | null>,
    callback: () => void,
    options: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
    }
) => {
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback();
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, callback, options]);
};
