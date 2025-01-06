const config = { boldClass: 'text-primary font-normal' };

export default function transformMarkdown(markdown: string): string {
  // XSS protection
  markdown = markdown.replace(/<[^>]*>.*?<\/[^>]*>/gs, '');

  const lines = markdown.split('\n');
  const numberedListRegex = /^(\d+)\.\s+(.*)$/;
  const resultLines: string[] = [];

  let inNumberedList = false;
  let currentListItems: string[] = [];

  for (const line of lines) {
    const match = line.match(numberedListRegex);
    if (match) {
      if (!inNumberedList) {
        inNumberedList = true;
        resultLines.push('<ol style="padding-left: 1em; list-style: decimal" class="list-decimal list-inside">');
      }
      if (currentListItems.length > 0) {
        resultLines.push(`<li>${currentListItems.join('<br>')}</li>`);
        currentListItems = [];
      }
      currentListItems.push(match[2]);
    } else if (inNumberedList) {
      currentListItems.push(line.trim() ? line : '');
    } else {
      resultLines.push(line);
    }
  }

  if (inNumberedList) {
    if (currentListItems.length > 0) {
      resultLines.push(`<li>${currentListItems.join('<br>')}</li>`);
    }
    resultLines.push('</ol>');
  }

  let result = resultLines.join('\n');
  result = result.replace(/^-\s+(.*)$/gm, '• $1');
  result = result.replace(/\*\*(.*?)\*\*/g, `<span class="${config.boldClass}">$1</span>`);
  result = result.replace(/\*(.*?)\*/g, '<i>$1</i>');

  return result;
}