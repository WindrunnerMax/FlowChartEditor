import type { EditorMsg, ExportMsg, InitMsg, SaveMsg } from "./interface";

export abstract class EditorEvent {
  protected abstract url: string;
  protected abstract iframe: HTMLIFrameElement | null;

  abstract onConfig(msg: InitMsg): void;
  abstract onInit(msg: InitMsg): void;
  abstract onLoad(msg: InitMsg): void;
  abstract onAutoSave(msg: SaveMsg): void;
  abstract onSave(msg: SaveMsg): void;
  abstract onExit(msg: SaveMsg): void;
  abstract onExport(msg: ExportMsg): void;

  protected postMessage = (message: unknown) => {
    this.iframe &&
      this.iframe.contentWindow &&
      this.iframe.contentWindow.postMessage(JSON.stringify(message), this.url);
  };

  protected handleMessageEvent = (event: MessageEvent) => {
    if (this.iframe && event.source === this.iframe.contentWindow && event.data) {
      try {
        const msg = JSON.parse(event.data) as EditorMsg;
        // console.log("msg", msg);
        this.handleMessage(msg);
      } catch (error) {
        console.log("MessageEvent Error", error);
      }
    }
  };

  private handleMessage = (msg: EditorMsg) => {
    switch (msg.event) {
      case "init":
        return this.onInit(msg);
      case "load":
        return this.onLoad(msg);
      case "configure":
        return this.onConfig(msg);
      case "autosave":
        return this.onAutoSave(msg);
      case "save":
        return this.onSave(msg);
      case "export":
        return this.onExport(msg);
      case "exit":
        return this.onExit(msg);
    }
  };
}
