export const formats = [
  { label: 'Bold', before: '**', after: '**', placeholder: 'bold text', shortcut: 'b' },
  { label: 'Italic', before: '*', after: '*', placeholder: 'italic text', shortcut: 'i' },
  { label: 'Heading', before: '\n## ', after: '\n', placeholder: 'Heading', shortcut: '' },
  { label: 'Link', before: '[', after: '](https://example.com)', placeholder: 'link text', shortcut: 'k' },
  { label: 'Inline code', before: '`', after: '`', placeholder: 'code', shortcut: '' },
  { label: 'Code block', before: '\n```text\n', after: '\n```\n', placeholder: 'code', shortcut: '' },
  { label: 'List', before: '\n- ', after: '\n', placeholder: 'item', shortcut: '' },
  { label: 'Task', before: '\n- [ ] ', after: '\n', placeholder: 'task', shortcut: '' },
  { label: 'Quote', before: '\n> ', after: '\n', placeholder: 'quote', shortcut: '' },
  { label: 'Image', before: '![', after: '](./image.png)', placeholder: 'image description', shortcut: '' },
]
export function insertFormat(value: string, start: number, end: number, format: typeof formats[number]) {
  const text = value.slice(start,end) || format.placeholder
  return { value: value.slice(0,start) + format.before + text + format.after + value.slice(end), start: start + format.before.length, end: start + format.before.length + text.length }
}
