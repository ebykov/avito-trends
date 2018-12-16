import '../css/special.styl';

import BaseSpecial from './base';
import Data from './data';
import { makeElement } from './lib/dom';
import interact from 'interactjs';
import Svg from './svg';
// import * as Share from './lib/share';
// import * as Analytics from './lib/analytics';
// import { makeElement } from './lib/dom';

const CSS = {
  main: 'avito-trends',
};

const EL = {};

const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

class Special extends BaseSpecial {
  constructor(params = {}) {
    super();

    Object.assign(this.params, params);
    this.saveParams();

    if (Data && params.data) {
      Object.assign(Data, params.data);
    }

    if (this.params.css) {
      this.loadStyles(this.params.css).then(() => this.init());
    } else {
      this.init();
    }
  }

  static createElements() {
    EL.main = makeElement('div', `${CSS.main}`);
    EL.mBg = makeElement('div', `${CSS.main}__bg`);

    EL.test = makeElement('div', `${CSS.main}-test`);
    EL.tOverlay = makeElement('div', `${CSS.main}-test__overlay`);
    EL.tOverlayText = makeElement('div', `${CSS.main}-test__overlay-text`);
    EL.tTitle = makeElement('div', `${CSS.main}-test__title`, {
      innerHTML: 'Расставьте предметы<br>в&nbsp;хронологическом порядке',
    });
    EL.tMonths = makeElement('div', `${CSS.main}-test__months`);

    EL.months = makeElement('div', `${CSS.main}-months`);

    months.forEach((item) => {
      const monthWrap = makeElement('div', `${CSS.main}-months__item`);
      const month = makeElement('div', [`${CSS.main}-month`, 'js-avito-month'], {
        innerHTML: `<div></div>${Svg.circle}`,
        data: {
          caption: item,
        },
      });

      monthWrap.appendChild(month);
      EL.months.appendChild(monthWrap);
    });

    EL.tMonths.appendChild(EL.months);

    EL.tGoods = makeElement('div', `${CSS.main}-test__goods`);

    Data.goods.forEach((item, i) => {
      EL.tGoods.innerHTML += `<div class="${CSS.main}-good ${CSS.main}-good--${item.id} js-avito-good" data-index="${i}" data-img="${item.fillImg}" data-name="${item.name}"><img src="${item.img}" srcset="${item.img2x} 2x" alt=""></div>`;
    });

    EL.tOverlay.appendChild(EL.tOverlayText);

    EL.test.appendChild(EL.tOverlay);
    EL.test.appendChild(EL.tTitle);
    EL.test.appendChild(EL.tMonths);
    EL.test.appendChild(EL.tGoods);

    EL.main.appendChild(EL.mBg);
    EL.main.appendChild(EL.test);
  }

  init() {
    Special.createElements();

    this.container.appendChild(EL.main);

    if (this.params.isFeed) {
      EL.main.classList.add('is-feed');
    }

    function dragMoveListener(event) {
      const { target } = event;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // console.log(new DOMMatrix(getComputedStyle(target).transform));

      let transform = `translate(${x}px, ${y}px)`;

      if (window.innerWidth < 680) {
        transform += ' scale(0.645)';
      }

      target.style.webkitTransform = target.style.transform = transform;

      target.dataset.x = x;
      target.dataset.y = y;
    }

    interact('.js-avito-good')
      .draggable({
        onmove: dragMoveListener,
        restrict: {
          restriction: EL.test,
          elementRect: {
            top: 0,
            left: 0,
            bottom: 1,
            right: 1,
          },
        },
      });

    interact('.js-avito-month')
      .dropzone({
        accept: '.js-avito-good',
        ondropactivate: (event) => {
          const good = event.relatedTarget;
          const { index } = good.dataset;

          good.classList.add('is-active');
          EL.test.classList.add('is-active');
          EL.tOverlayText.innerHTML = Data.goods[index].text;
        },
        ondropdeactivate: (event) => {
          const good = event.relatedTarget;
          good.classList.remove('is-active');

          EL.test.classList.remove('is-active');
        },
        ondragenter: (event) => {},
        ondragleave: (event) => {
          event.target.classList.remove('is-active');
        },
        ondropmove: (event) => {
          event.target.classList.add('is-active');
        },
        ondrop: (event) => {
          const month = event.target;
          const rm = month.querySelector('div');
          const good = event.relatedTarget;

          good.style.display = 'none';

          month.classList.remove('is-active');
          month.classList.add('is-selected');
          month.style.backgroundImage = `url(${good.dataset.img})`;

          rm.addEventListener('click', () => {
            good.style.display = 'block';
            good.style.webkitTransform = good.style.transform = '';
            good.dataset.x = 0;
            good.dataset.y = 0;

            month.classList.remove('is-selected');
            month.style.backgroundImage = '';
          }, { once: true });
        },
      });
  }
}

export default Special;
