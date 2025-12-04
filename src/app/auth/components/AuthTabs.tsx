import { UIColors } from "@/core/design/ui_colors";
import { AuthTab } from "../page";

interface AuthTabsProps {
    activeTab: AuthTab;
    onTabChange: (tab: AuthTab) => void;
}

export function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
    return (
        <div className="flex shadow-lg">
            <button
                type="button"
                onClick={() => onTabChange(AuthTab.Login)}
                className={`flex-1 py-3 font-medium transition-all rounded-tl-xl ${activeTab === AuthTab.Login ? UIColors.tabActive : UIColors.tabInactive}`}
            >
                Login
            </button>
            <button
                type="button"
                onClick={() => onTabChange(AuthTab.Register)}
                className={`flex-1 py-3 font-medium transition-all rounded-tr-xl ${activeTab === AuthTab.Register ? UIColors.tabActive : UIColors.tabInactive}`}
            >
                Cadastro
            </button>
        </div>
    );
}

