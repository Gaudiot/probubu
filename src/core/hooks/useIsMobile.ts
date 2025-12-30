import { useEffect, useState } from "react";

/**
 * Hook para detectar se o dispositivo é mobile baseado na largura da tela.
 *
 * @param breakpoint - Largura em pixels para considerar mobile (padrão: 768px)
 * @returns true se a largura da tela for menor ou igual ao breakpoint
 *
 * @example
 * ```tsx
 * const isMobile = useIsMobile(); // usa 768px por padrão
 * const isSmallMobile = useIsMobile(480); // customizado para 480px
 *
 * return (
 *   <div>
 *     {isMobile ? <MobileView /> : <DesktopView />}
 *   </div>
 * );
 * ```
 */
export function useIsMobile(breakpoint: number = 768): boolean {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        // Função para verificar se é mobile
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        // Verifica imediatamente na montagem
        checkIsMobile();

        // Adiciona listener para mudanças de tamanho
        window.addEventListener("resize", checkIsMobile);

        // Cleanup
        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, [breakpoint]);

    return isMobile;
}
