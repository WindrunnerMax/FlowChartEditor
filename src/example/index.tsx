import { FC, useRef } from "react";
import { XML_DATA } from "./constant";
import { convertXMLToSVG } from "src/package/utils/convert";
export const DiagramExample: FC = () => {
  const container = useRef<HTMLDivElement>(null);

  const convert = () => {
    const div = container.current;
    if (div) {
      const svg = convertXMLToSVG(XML_DATA);
      div.childNodes.forEach(node => div.removeChild(node));
      svg && div.appendChild(svg);
    }
  };

  return (
    <div>
      <div>
        <textarea cols={30} rows={10} value={XML_DATA} disabled></textarea>
        <button onClick={convert}>转换</button>
        <div ref={container}></div>
      </div>
    </div>
  );
};
