import {MutableRefObject, useEffect, useLayoutEffect, useRef} from "react";

interface IPosition {
    x: number;
    y: number;
}

interface IScrollProps {
    previousPosition: IPosition;
    currentPosition: IPosition;
}

type ElementRef = MutableRefObject<HTMLElement | null>;

const isBrowser = typeof window !== `undefined`;
const zeroPosition = {x: 0, y: 0};

const getClientRect = (element?: HTMLElement | null) => element?.getBoundingClientRect();

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const getScrollPosition = ({
                               element,
                               useWindow,
                               boundingElement
                           }: { element?: ElementRef; boundingElement?: ElementRef; useWindow?: boolean; }): IPosition => {
    if (!isBrowser) {
        return zeroPosition;
    }

    if (useWindow) {
        return {x: window.scrollX, y: window.scrollY};
    }

    const targetPosition = getClientRect(element?.current || document.body);
    const containerPosition = getClientRect(boundingElement?.current);

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
    element?: ElementRef,
    useWindow?: boolean,
    wait?: number,
    boundingElement?: ElementRef
): void => {

    const position = useRef(getScrollPosition({useWindow, boundingElement}));

    let throttleTimeout: number | null = null;

    const callBack = () => {
        const currentPosition = getScrollPosition({element, useWindow, boundingElement});
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
        if (boundingElement) {
            boundingElement.current?.addEventListener("scroll", handleScroll, {passive: true});
        } else {
            window.addEventListener("scroll", handleScroll, {passive: true});
        }

        return () => {
            if (boundingElement) {
                boundingElement.current?.removeEventListener("scroll", handleScroll);
            } else {
                window.removeEventListener("scroll", handleScroll);
            }

            if (throttleTimeout) {
                clearTimeout(throttleTimeout);
            }
        };
    });
};
