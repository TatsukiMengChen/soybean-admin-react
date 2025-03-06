// @unocss-include
import { getRgb } from '@sa/color';

import systemLogo from '@/assets/svg-icon/logo.svg?raw';
import { DARK_CLASS } from '@/constants/app';
import { $t } from '@/locales';
import { toggleHtmlClass } from '@/utils/common';
import { localStg } from '@/utils/storage';

export function setupLoading() {
  const themeColor = localStg.get('themeColor') || '#646cff';

  const darkMode = localStg.get('darkMode') || false;

  if (darkMode) {
    toggleHtmlClass(DARK_CLASS).add();
  }

  const { b, g, r } = getRgb(themeColor);

  const primaryColor = `--primary-color: ${r} ${g} ${b}`;

  const loadingClasses = [
    'left-0 top-0',
    'left-0 bottom-0 animate-delay-500',
    'right-0 top-0 animate-delay-1000',
    'right-0 bottom-0 animate-delay-1500'
  ];

  const logoWithClass = systemLogo.replace('<svg', `<svg class="size-128px text-primary"`);

  const dot = loadingClasses
    .map(item => {
      return `<div class="absolute w-16px h-16px bg-primary rounded-8px animate-pulse ${item}"></div>`;
    })
    .join('\n');

  const loading = `
<div class="fixed-center  bg-layout flex-col" style="${primaryColor}">
  ${logoWithClass}
  <div class="w-56px h-56px my-36px">
    <div class="relative h-full animate-spin">
      ${dot}
    </div>
  </div>
  <h2 class="text-28px font-500 text-primary">${$t('system.title')}</h2>
</div>`;

  const app = document.getElementById('root');

  if (app) {
    app.innerHTML = loading;
  }
}
