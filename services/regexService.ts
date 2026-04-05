
import { RegexScript } from "../types";

class RegexService {
  private scripts: RegexScript[] = [
    {
      "id": "6442f8dd-353c-49b5-9551-19ef8991040c",
      "scriptName": "Xóa bỏ chuỗi tư duy đi kèm",
      "findRegex": "/<thinking>([\\s\\S]*?)</thinking>/gm",
      "replaceString": "",
      "trimStrings": [],
      "placement": [2],
      "disabled": false,
      "markdownOnly": true,
      "promptOnly": false,
      "runOnEdit": true,
      "substituteRegex": 0,
      "minDepth": null,
      "maxDepth": null
    }
  ];

  public applyScripts(text: string): string {
    if (!text) return "";
    let result = text;

    for (const script of this.scripts) {
      if (script.disabled) continue;

      try {
        // Parse the regex string (e.g., "/pattern/flags")
        const match = script.findRegex.match(/^\/(.*)\/([gimuy]*)$/);
        if (match) {
          const pattern = match[1];
          const flags = match[2];
          const regex = new RegExp(pattern, flags);
          result = result.replace(regex, script.replaceString);
        } else {
          // If not in /pattern/flags format, treat as literal string or simple pattern
          const regex = new RegExp(script.findRegex, 'g');
          result = result.replace(regex, script.replaceString);
        }
      } catch (e) {
        console.error(`Failed to apply regex script "${script.scriptName}":`, e);
      }
    }

    return result;
  }

  public addScript(script: RegexScript) {
    this.scripts.push(script);
  }

  public getScripts(): RegexScript[] {
    return this.scripts;
  }
}

export const regexService = new RegexService();
