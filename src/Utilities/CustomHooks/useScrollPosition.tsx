import {DependencyList, MutableRefObject, useEffect, useLayoutEffect, useRef} from "react";

interface IPosition {
    x: number;
    y: number;
}

interface IScrollProps {
    previousPosition: IPosition;
    currentPosition: IPosition;
}

type ElementRef = MutableRefObject<HTMLElement | null>;

const isBrowser = typeof window !== "undefined";
const zeroPosition = {x: 0, y: 0};

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

const getScrollPosition = ({
                               element,
                               boundingElement,
                               useWindow
                           }: { element?: ElementRef; boundingElement?: ElementRef; useWindow?: boolean; }): IPosition => {
    if (!isBrowser) {
        return zeroPosition;
    }

    if (useWindow) {
        return {x: window.scrollX, y: window.scrollY};
    }

    const targetPosition = (element?.current || document.body).getBoundingClientRect();
    const containerPosition = boundingElement?.current?.getBoundingClientRect();

    if (!targetPosition) {
        return zeroPosition;
    }

    return containerPosition ? {
        x: (containerPosition.x || 0) - (targetPosition.x || 0),
        y: (containerPosition.y || 0) - (targetPosition.y || 0),
    } : {x: targetPosition.left, y: targetPosition.top};
};

export const useScrollPosition = (
    effect: (props: IScrollProps) => void,
    {
        element,
        boundingElement,
        wait,
        useWindow,
        deps
    }: { element?: ElementRef, boundingElement?: ElementRef, wait?: number, useWindow?: boolean, deps?: DependencyList }
): void => {
    const position = useRef(getScrollPosition({useWindow}));

    let throttleTimeout: number | null = null;

    const callBack = () => {
        const currentPosition = getScrollPosition({element, boundingElement, useWindow});
        effect({previousPosition: position.current, currentPosition});
        position.current = currentPosition;
        throttleTimeout = null;
    };

    const handleScroll = () => {
        if (wait) {
            if (throttleTimeout === null) {
                throttleTimeout = window.setTimeout(callBack, wait);
            }
        } else {
            callBack();
        }
    };

    useIsomorphicLayoutEffect(() => {
        if (!isBrowser) {
            return undefined;
        }
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (throttleTimeout) {
                clearTimeout(throttleTimeout);
            }
        };
    }, deps);
};
