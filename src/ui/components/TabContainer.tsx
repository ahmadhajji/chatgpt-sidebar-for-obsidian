import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import type { GeminiHelperPlugin } from "src/plugin";
import type { TFile } from "obsidian";
import Chat, { ChatRef } from "./Chat";

export type TabType = "chat";

export interface TabContainerRef {
  getActiveChat: () => TFile | null;
  setActiveChat: (chat: TFile | null) => void;
}

interface TabContainerProps {
  plugin: GeminiHelperPlugin;
}

const TabContainer = forwardRef<TabContainerRef, TabContainerProps>(
  ({ plugin }, ref) => {
    const [activeTab] = useState<TabType>("chat");
    const chatRef = useRef<ChatRef>(null);

    useImperativeHandle(ref, () => ({
      getActiveChat: () => chatRef.current?.getActiveChat() ?? null,
      setActiveChat: (chat: TFile | null) => chatRef.current?.setActiveChat(chat),
    }));

    return (
      <div className="gemini-helper-tab-container">
        <div className="gemini-helper-tab-content">
          <div className={`gemini-helper-tab-panel ${activeTab === "chat" ? "is-active" : ""}`}>
            <Chat ref={chatRef} plugin={plugin} />
          </div>
        </div>
      </div>
    );
  }
);

TabContainer.displayName = "TabContainer";

export default TabContainer;
