import '../css/special.styl';

import interact from 'interactjs';
import BaseSpecial from './base';
import Data from './data';
import { makeElement, removeChildren } from './lib/dom';
import * as Share from './lib/share';
import { animate } from './lib/animate';
import Svg from './svg';
// import * as Analytics from './lib/analytics';
// import { makeElement } from './lib/dom';

const CSS = {
  main: 'avito-trends',
};

const EL = {};

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
    EL.mInner = makeElement('div', `${CSS.main}__inner`);
    EL.mLogo = makeElement('a', `${CSS.main}__logo`, {
      href: Data.link,
      target: '_blank',
      innerHTML: Svg.logo,
    });

    EL.main.appendChild(EL.mBg);
    EL.main.appendChild(EL.mInner);
    EL.main.appendChild(EL.mLogo);

    EL.enter = makeElement('div', `${CSS.main}-enter`);
    EL.eImg = makeElement('img', `${CSS.main}-enter__img`, {
      src: Data.img,
      srcset: `${Data.img2x} 2x`,
    });
    EL.eInner = makeElement('div', `${CSS.main}-enter__inner`);
    EL.eHeadline = makeElement('div', `${CSS.main}-enter__headline`, {
      textContent: 'тест',
    });
    EL.eTitle = makeElement('div', `${CSS.main}-enter__title`, {
      textContent: Data.title,
    });
    EL.eSubtitle = makeElement('div', `${CSS.main}-enter__subtitle`, {
      textContent: Data.subtitle,
    });
    EL.eText = makeElement('div', `${CSS.main}-enter__text`, {
      innerHTML: Data.text,
    });
    EL.eBtn = makeElement('button', `${CSS.main}-enter__btn`, {
      textContent: 'Начать',
      data: {
        click: 'start',
      },
    });

    EL.eInner.appendChild(EL.eHeadline);
    EL.eInner.appendChild(EL.eTitle);
    EL.eInner.appendChild(EL.eSubtitle);
    EL.eInner.appendChild(EL.eText);
    EL.eInner.appendChild(EL.eBtn);

    EL.enter.appendChild(EL.eImg);
    EL.enter.appendChild(EL.eInner);

    EL.test = makeElement('div', `${CSS.main}-test`);
    EL.tOverlay = makeElement('div', `${CSS.main}-test__overlay`);
    // EL.tOverlayText = makeElement('div', `${CSS.main}-test__overlay-text`);
    EL.tTitle = makeElement('div', `${CSS.main}-test__title`, {
      innerHTML: Data.hint,
    });
    EL.tMonths = makeElement('div', `${CSS.main}-test__months`);

    EL.months = makeElement('div', `${CSS.main}-months`);

    Data.months.forEach((item, i) => {
      const monthWrap = makeElement('div', `${CSS.main}-months__item`);
      const month = makeElement('div', [`${CSS.main}-month`, 'js-avito-month'], {
        innerHTML: `<div class="js-avito-month-leave"></div>${Svg.circle}`,
        data: {
          index: i,
          caption: item.name,
        },
      });

      monthWrap.appendChild(month);
      EL.months.appendChild(monthWrap);
    });

    EL.tMonths.appendChild(EL.months);

    EL.tGoods = makeElement('div', `${CSS.main}-test__goods`);

    EL.goodsList = [];
    Data.goods.forEach((item, i) => {
      const good = makeElement('div', [`${CSS.main}-good`, `${CSS.main}-good--${item.id}`, 'js-avito-good'], {
        innerHTML: `<img src="${item.img}" srcset="${item.img2x} 2x" alt="">`,
        data: {
          index: i,
          img: item.fillImg,
          name: item.name,
        },
      });
      EL.goodsList.push(good);
      // EL.tGoods.innerHTML += `<div class="${CSS.main}-good ${CSS.main}-good--${item.id} js-avito-good" data-index="${i}" data-img="${item.fillImg}" data-name="${item.name}"><img src="${item.img}" srcset="${item.img2x} 2x" alt=""></div>`;
    });

    EL.goodsList.forEach(item => EL.tGoods.appendChild(item));

    EL.tConfirmBtn = makeElement('button', `${CSS.main}-test__confirm-btn`, {
      textContent: 'Подтвердить',
      data: {
        click: 'confirm',
      },
    });

    EL.test.appendChild(EL.tOverlay);
    EL.test.appendChild(EL.tTitle);
    EL.test.appendChild(EL.tMonths);
    EL.test.appendChild(EL.tGoods);

    EL.result = makeElement('div', `${CSS.main}-result`);
    EL.rImg = makeElement('img', `${CSS.main}-result__img`);
    EL.rHead = makeElement('div', `${CSS.main}-result__head`);
    EL.rHeadline = makeElement('div', `${CSS.main}-result__headline`);
    EL.rTitile = makeElement('div', `${CSS.main}-result__title`);
    EL.rSubtitle = makeElement('div', `${CSS.main}-result__subtitle`);
    EL.rShare = makeElement('div', `${CSS.main}-result__share`);
    EL.rRestart = makeElement('div', `${CSS.main}-result__restart`, {
      innerHTML: `<span>Пройти еще раз</span>${Svg.refresh}`,
      data: {
        click: 'restart',
      },
    });
    EL.rBottom = makeElement('div', `${CSS.main}-result__bottom`);
    EL.rLogo = makeElement('a', `${CSS.main}-result__logo`, {
      href: 'https://www.avito.ru/',
      target: '_blank',
      innerHTML: Svg.logo,
    });
    EL.rText = makeElement('div', `${CSS.main}-result__text`, {
      textContent: Data.promo.text,
    });
    EL.rBtn = makeElement('a', `${CSS.main}-result__btn`, {
      href: Data.promo.link,
      target: '_blank',
      textContent: 'Начать',
    });

    EL.rHead.appendChild(EL.rHeadline);
    EL.rHead.appendChild(EL.rTitile);
    EL.rHead.appendChild(EL.rSubtitle);
    EL.rHead.appendChild(EL.rShare);
    EL.rHead.appendChild(EL.rRestart);

    EL.rBottom.appendChild(EL.rLogo);
    EL.rBottom.appendChild(EL.rText);
    EL.rBottom.appendChild(EL.rBtn);

    EL.result.appendChild(EL.rImg);
    EL.result.appendChild(EL.rHead);
    EL.result.appendChild(EL.rBottom);

    EL.mInner.appendChild(EL.enter);
  }

  getCountCorrectAnswers() {
    let correctAnswers = 0;

    Object.keys(this.answers).forEach((k) => {
      if (Data.goods[k].id === this.answers[k]) {
        correctAnswers += 1;
      }
    });

    return correctAnswers;
  }

  static getResult(score) {
    let result = '';
    Data.results.some((item) => {
      if (item.range[0] <= score && item.range[1] >= score) {
        result = item;
        return true;
      }
      return false;
    });

    return result;
  }

  start() {
    EL.main.classList.add('is-testing');
    EL.mInner.replaceChild(EL.test, EL.enter);
  }

  confirm() {
    this.correctAnswers = this.getCountCorrectAnswers();

    EL.main.classList.add('is-confirmed');

    const months = document.querySelectorAll('.js-avito-month');
    [].slice.call(months).forEach((item, i) => {
      if (this.answers[i] === Data.goods[i].id) {
        item.classList.add('is-correct');
      } else {
        item.classList.add('is-incorrect');
      }
    });

    animate(EL.tTitle, 'fadeOutUp').then(() => {
      EL.tTitle.style.opacity = 0;
    });

    animate(EL.tConfirmBtn, 'fadeOutDown').then(() => {
      EL.test.removeChild(EL.tConfirmBtn);
    });

    setTimeout(() => {
      this.complete();
    }, 2000);
  }

  complete() {
    const result = Special.getResult(this.correctAnswers);

    EL.rImg.src = result.img;
    EL.rImg.srcset = `${result.img2x} 2x`;

    EL.rHeadline.textContent = `${this.correctAnswers} из ${Data.goods.length} правильных ответов`;
    EL.rTitile.innerHTML = result.title;
    EL.rSubtitle.textContent = result.subtitle;

    animate(EL.test, 'fadeOut', '200ms').then(() => {
      EL.mInner.removeChild(EL.test);

      EL.main.classList.remove('is-testing');
      EL.main.classList.remove('is-confirmed');
      EL.main.classList.add('is-result');

      EL.mInner.appendChild(EL.result);
      removeChildren(EL.rShare);
      Share.make(EL.rShare, {
        url: `${this.params.share.url}/${this.correctAnswers}`,
        title: this.params.share.title,
        twitter: this.params.share.title,
      });

      animate(EL.result, 'fadeIn', '400ms');
    });
  }

  restart() {
    EL.main.classList.remove('is-result');
    EL.main.classList.add('is-testing');

    const leaveList = EL.months.querySelectorAll('.js-avito-month-leave');
    [].slice.call(leaveList).forEach((leave) => {
      leave.click();
    });

    EL.mInner.replaceChild(EL.test, EL.result);

    this.setInitialParams();
  }

  setInitialParams() {
    this.answers = {};
    this.answersCount = 0;
    this.correctAnswers = 0;
    this.hintShowed = 2;
  }

  init() {
    this.setInitialParams();

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

    interact('.js-avito-month:not([disabled])')
      .dropzone({
        accept: '.js-avito-good',
        ondropactivate: (event) => {
          const good = event.relatedTarget;
          const { index } = good.dataset;

          good.classList.add('is-active');
          EL.test.classList.add('is-active');
          // EL.tOverlayText.innerHTML = Data.goods[index].text;
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
          const monthIndex = month.dataset.index;
          const monthLeave = month.querySelector('.js-avito-month-leave');
          const good = event.relatedTarget;
          const goodIndex = good.dataset.index;

          this.answers[monthIndex] = Data.goods[goodIndex].id;
          this.answersCount += 1;

          good.style.display = 'none';

          month.setAttribute('disabled', true);
          month.classList.remove('is-active');
          month.classList.add('is-selected');
          month.style.backgroundImage = `url(${good.dataset.img})`;

          if (!this.hintShowed) {
            this.hintShowed = true;
          } else if (Data.months[monthIndex].text) {
            this.hintShowed = false;

            const hint = makeElement('div', `${CSS.main}-test__hint`, {
              innerHTML: `<div>${Data.months[monthIndex].text}</div>`,
            });

            EL.test.appendChild(hint);
            animate(hint, 'fadeInDown').then(() => {
              animate(hint, 'fadeOutLeft', '400ms', '2s').then(() => {
                EL.test.removeChild(hint);
              });
            });
          }

          if (this.answersCount === Data.goods.length) {
            EL.test.appendChild(EL.tConfirmBtn);
          }

          monthLeave.addEventListener('click', () => {
            this.answers[monthIndex] = undefined;
            this.answersCount -= 1;

            good.style.display = 'block';
            good.style.webkitTransform = good.style.transform = '';
            good.dataset.x = 0;
            good.dataset.y = 0;

            month.removeAttribute('disabled');
            month.classList.remove('is-selected');
            month.classList.remove('is-correct');
            month.classList.remove('is-incorrect');
            month.style.backgroundImage = '';

            if (EL.test.contains(EL.tConfirmBtn)) {
              EL.test.removeChild(EL.tConfirmBtn);
            }
          }, { once: true });
        },
      });
  }
}

export default Special;
