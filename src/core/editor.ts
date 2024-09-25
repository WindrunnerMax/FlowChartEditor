import { stringToXml } from "../utils/xml";
import { DEFAULT_STYLE_XML } from "../styles/default";
import { Editor, EditorUi, Graph } from "../editor";
import { mxEvent, mxResources } from "./mxgraph";
import type { Language } from "../editor/i18n";
import { getLanguage } from "../editor/i18n";
import type { Func } from "laser-utils";

const themes: Record<string, Node> = {};
themes[Graph.prototype.defaultThemeName] = (
  stringToXml(DEFAULT_STYLE_XML) as XMLDocument
).documentElement;

export class DiagramEditor {
  private editor: Editor | null;
  private editorUi: EditorUi | null;
  private diagramContainer: HTMLElement;

  constructor(private container: HTMLElement, private onExit: () => void) {
    this.editor = null;
    this.editorUi = null;
    this.diagramContainer = document.createElement("div");
    this.diagramContainer.className = "diagram-container geEditor";
  }

  public start = (
    lang: Language,
    init?: XMLDocument | null,
    onXMLChange?: (xml: Element) => void
  ): void => {
    this.container.appendChild(this.diagramContainer);
    this.container.style.overflow = "hidden";
    mxResources.parse(lang);
    this.editor = new Editor(false, themes);
    this.editorUi = new EditorUi(this.editor, this.diagramContainer, null, this.onExit);
    if (init) {
      this.editorUi.editor.setGraphXml(init.documentElement);
    }
    this.editor.graph.getModel().addListener(mxEvent.CHANGE, () => {
      onXMLChange && onXMLChange(this.editorUi && this.editorUi.editor.getGraphXml());
    });
  };

  public getXML = (): Element | null => {
    return this.editorUi && this.editorUi.editor.getGraphXml();
  };

  public exit = (): void => {
    this.container.style.overflow = "";
    mxEvent.removeAllListeners(window);
    mxEvent.removeAllListeners(document);
    this.editor && this.editor.destroy();
    this.editorUi && this.editorUi.destroy();
    this.container.removeChild(this.diagramContainer);
  };

  public static getLang = (lang: Func.Args<typeof getLanguage>["0"]) => {
    return getLanguage(lang);
  };
}
