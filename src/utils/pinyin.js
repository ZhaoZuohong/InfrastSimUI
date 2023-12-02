import { pinyin, customPinyin } from 'pinyin-pro';

customPinyin({
  薄: 'bo',
  栎: 'li',
  重岳: 'chong yue',
  仇白: 'qiu bai',
});

export const getPinyin = text => {
  if (/^[\w\s-]*$/.test(text)) return { full: '', head: '' };
  const py = pinyin(text, {
    toneType: 'none',
    type: 'array',
    v: true,
  });
  return {
    full: py.join(''),
    head: py.map(s => s[0]).join(''),
  };
};