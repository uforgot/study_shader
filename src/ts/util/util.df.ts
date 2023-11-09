interface ILoc {
  x: number;
  y: number;
}

export enum TYPE_DEVICE {
  DESKTOP,
  TABLET,
  MOBILE
}

export default class UtilDf {
  public static hostName = '';

  public static getIsDev(test: boolean = false): boolean {
    if (test) {
      return false;
    }
    return process.env['NODE_ENV'] === 'development';
    // return false;
  }

  public static getUrl(url: string): string {
    if (process.env.NODE_ENV === 'development') {
      // return process.env['HOST_NAME'] + url;
      return url;
    } else {
      return url;
    }
  }

  public static getIsMobile(): boolean {
    return window.innerWidth <= 701;
  }
  public static getHasTouch(): boolean {
    return navigator.maxTouchPoints > 0;
  }

  /**
   * html element 의 절대적 x y 좌표를 리턴
   * @param el
   */
  public static getAbsPos(el: HTMLElement): ILoc {
    let lx = 0,
      ly = 0;
    do {
      lx += el.offsetLeft;
      ly += el.offsetTop;
      el = el.offsetParent as HTMLElement;
    } while (el != null);

    // for (lx =0, ly=0;  el != null;  , );
    return { x: lx, y: ly };
  }

  /***
   * 정규식 특수문자를 escape 처리
   * @param str
   */
  public static getRegEscapeString(str: string): string {
    return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
  }

  /**
   * cookie 값을 셋팅
   * @param name
   * @param value
   * @param days
   */
  public static setCookie(name: string, value: number, days: number): void {
    let expires = '';
    if (days) {
      const date: Date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  /**
   * cookie name 으로 쿠키값을 리턴
   * @param name
   */
  public static getCookie(name: string): string | null {
    const nameLenPlus: number = name.length + 1;
    return (
      document.cookie
        .split(';')
        .map((c) => c.trim())
        .filter((cookie) => {
          return cookie.substring(0, nameLenPlus) === `${name}=`;
        })
        .map((cookie) => {
          return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0] || null
    );
  }

  /***
   * document 의 높이를 리턴
   */
  public static getDocumentHeight(): number {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }

  /***
   * event 의 x y 좌표를 리턴
   * @param e
   */
  public static getEventOffsetLoc(e: Event): ILoc {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    if (e.type.includes('touch')) {
      return {
        x: (e as TouchEvent).changedTouches[0].clientX - rect.x,
        y: (e as TouchEvent).changedTouches[0].clientY - rect.y
      };
    }
    e = e as MouseEvent;

    return {
      x: (e as MouseEvent).offsetX,
      y: (e as MouseEvent).offsetY
    };
  }

  public static getEventLoc(e: Event): ILoc {
    if (e.type.includes('touch')) {
      return {
        x: (e as TouchEvent).changedTouches[0].clientX,
        y: (e as TouchEvent).changedTouches[0].clientY
      };
    }
    e = e as MouseEvent;

    return {
      x: (e as MouseEvent).clientX,
      y: (e as MouseEvent).clientY
    };
  }

  public static getDiffLoc(target: ILoc, origin: ILoc): ILoc {
    return {
      x: target.x - origin.x,
      y: target.y - origin.y
    };
  }

  /***
   * 숫자의 자릿수 0 채우기
   * @param num
   * @param max
   */
  public static getDigit(num: number, max: number): string {
    const numString = `${num}`;
    let rtn = '';

    if (numString.length < max) {
      for (let i = 0; i < max - numString.length; i++) {
        rtn += '0';
      }
    }

    rtn += numString;
    return rtn;
  }

  /***
   * webp 지원여부 체크
   */
  public static async getIsEnableWebp() {
    await this.loadImage('/static/blank.webp', []);
  }

  public static async setWebpEnable() {
    return UtilDf.getIsEnableWebp()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  /***
   * array 이미지 다중 로드
   * @param url
   * @param target
   */
  public static loadImage = (url: string, target: Array<HTMLImageElement>) => {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.addEventListener('load', () => {
        if (target !== null) {
          target.push(image);
        }
        resolve(image);
      });
      image.addEventListener('error', () => {
        reject();
      });

      image.src = url;
    });
  };

  public static getDeviceType = (): TYPE_DEVICE => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return TYPE_DEVICE.TABLET;
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return TYPE_DEVICE.MOBILE;
    }
    return TYPE_DEVICE.DESKTOP;
  };

  public static getDeviceTypeString = (type: TYPE_DEVICE): string => {
    if (type === TYPE_DEVICE.TABLET) {
      return 'tablet';
    } else if (type === TYPE_DEVICE.MOBILE) {
      return 'mobile';
    }
    return 'desktop';
  };

  public static setHtmlElementByEjs(
    el: HTMLElement,
    ejsTemplate: string,
    data: any
  ) {
    // @ts-ignore
    ejs.delimiter = '$';
    // @ts-ignore
    el.insertAdjacentHTML('beforeend', ejs.render(ejsTemplate, data));
  }
}
