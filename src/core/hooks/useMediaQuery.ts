import { useEffect, useState } from "react";

/**
 * Breakpoints padrão (baseado em Material-UI)
 */
export const BREAKPOINTS = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Hook genérico para media queries customizadas.
 *
 * @param query - Media query CSS string
 * @returns true se a media query corresponder
 *
 * @example
 * ```tsx
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const isPortrait = useMediaQuery("(orientation: portrait)");
 * const prefersColorScheme = useMediaQuery("(prefers-color-scheme: dark)");
 * ```
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        // Define o valor inicial
        setMatches(mediaQuery.matches);

        // Função de callback para mudanças
        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Adiciona listener
        mediaQuery.addEventListener("change", handleChange);

        // Cleanup
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
}

/**
 * Hook para verificar se a tela é menor ou igual a um breakpoint específico.
 *
 * @param breakpoint - Nome do breakpoint ou valor numérico em pixels
 * @returns true se a largura for menor ou igual ao breakpoint
 *
 * @example
 * ```tsx
 * const isMobile = useBreakpoint("md"); // <= 900px
 * const isSmall = useBreakpoint(480);
 * ```
 */
export function useBreakpoint(breakpoint: Breakpoint | number): boolean {
    const breakpointValue =
        typeof breakpoint === "number" ? breakpoint : BREAKPOINTS[breakpoint];

    return useMediaQuery(`(max-width: ${breakpointValue}px)`);
}
