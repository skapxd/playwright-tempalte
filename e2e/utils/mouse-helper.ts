import { Page } from '@playwright/test';

export const mouseHelper = async (page: Page) => {
  await page.context().addInitScript(() => {
    const box = document.createElement('div');
    const id = 'box' + window.crypto.randomUUID();
    box.id = id;
    box.style.position = 'absolute';
    box.style.width = '20px';
    box.style.height = '20px';
    box.style.backgroundColor = 'red';
    box.style.zIndex = '10000';
    box.style.pointerEvents = 'none';
    box.style.borderRadius = '100%';
    box.style.zIndex = '1000000';
    const fn = (event) => {
      document.querySelector(`#${id}`)?.remove();

      const rect = event.target.getBoundingClientRect();
      const { top, left } = rect;
      box.style.left = left + 'px';
      box.style.top = top + window.scrollY + 'px';

      document?.body?.appendChild(box);
    };

    document.addEventListener('click', fn, true);
    document.addEventListener('focus', fn, true);
    document.addEventListener(
      'blur',
      () => {
        document.querySelector(`#${id}`)?.remove();
      },
      true,
    );
    document.addEventListener('submit', fn, true);
  });
};
